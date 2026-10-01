# Actualiza enlaces con coincidencia exacta de artista, tema y disco.
# Requiere Python 3, Node y curl; no se ejecuta durante el build.
import json, subprocess, unicodedata, urllib.parse, concurrent.futures
from pathlib import Path
from datetime import date
root=str(Path(__file__).resolve().parents[1])+"/"
output=Path(root+"src/archivo/escuchas.json")
existing=json.loads(output.read_text()) if output.exists() else {}
data=json.loads(subprocess.check_output(['node','--input-type=module','-e','import {loadArchivo} from "./src/archivo.mjs"; console.log(JSON.stringify(loadArchivo().entries))'],cwd=root))
def norm(s): return ''.join(c for c in unicodedata.normalize('NFKD',s).lower() if c.isalnum())
def resolve(e):
 url='https://itunes.apple.com/search?'+urllib.parse.urlencode(dict(term=e['artista']+' '+e['tema'],entity='song',limit=25,country='AR'))
 try:
  rows=json.loads(subprocess.check_output(['curl','-fsS','--max-time','25',url]))['results']
  matches=[r for r in rows if norm(r.get('artistName',''))==norm(e['artista']) and norm(r.get('trackName',''))==norm(e['tema']) and norm(r.get('collectionName',''))==norm(e['disco'])]
  if matches:
   r=matches[0]
   return e['slug'],dict(url=r['trackViewUrl'].replace('&uo=4',''),provider='Apple Music',artist=r['artistName'],track=r['trackName'],album=r['collectionName'],verified=date.today().isoformat())
 except Exception as ex: print(e['slug'],str(ex))
 return e['slug'],None
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool: results=dict(pool.map(resolve,data))
matched={k:v for k,v in results.items() if v}
existing.update(matched)
output.write_text(json.dumps(existing,ensure_ascii=False,indent=2)+'\n')
print('Verified',len(matched),'of',len(data));print('Unmatched:',[k for k,v in results.items() if not v])
