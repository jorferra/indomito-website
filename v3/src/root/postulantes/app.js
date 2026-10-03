(function(){
  var ESTADOS=["postulado","aceptado","confirmado","asistió","no asistió","lista de espera"];
  var convs=[], posts=[], active=null;
  var $=function(id){return document.getElementById(id)};
  var sel=function(v){return v&&typeof v==="object"?v.name:(v||"")};
  var slug=function(s){return s.normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/\s+/g,"-")};
  var el=function(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e};

  function showMsg(title,body,isErr){var m=$("msg");m.hidden=false;m.className="note"+(isErr?" err":"");m.textContent="";m.appendChild(el("strong",null,title));if(body)m.appendChild(el("span",null,body))}

  function convName(id){var c=convs.find(function(x){return x.id===id});return c?c.nombre:id}
  function renderTabs(){
    var t=$("tabs");t.textContent="";
    var ids=convs.map(function(c){return c.id});
    posts.forEach(function(p){if(p.conv&&ids.indexOf(p.conv)<0)ids.push(p.conv)});
    if(!active||ids.indexOf(active)<0)active=ids[0]||null;
    ids.forEach(function(id){
      var n=posts.filter(function(p){return p.conv===id}).length;
      var b=el("button","tab",convName(id).replace(/^Laboratorio Sensorial: /,"")+" · "+n);
      b.type="button";b.setAttribute("aria-pressed",String(id===active));
      b.onclick=function(){active=id;render()};t.appendChild(b);
    });
  }

  function render(){
    renderTabs();
    var c=convs.find(function(x){return x.id===active})||{id:active,nombre:convName(active)};
    var mine=posts.filter(function(p){return p.conv===active}).sort(function(a,b){return (b.recibido||"").localeCompare(a.recibido||"")});
    $("conv-k").textContent=c.estado?("Convocatoria "+c.estado):"Convocatoria";
    $("conv-h").textContent=c.nombre||"Sin convocatorias";
    var adentro=mine.filter(function(p){return p.estado==="aceptado"||p.estado==="confirmado"||p.estado==="asistió"}).length;
    if(c.cupo){$("meter").hidden=false;$("meter-n").textContent=adentro+" / "+c.cupo;$("meter-t").textContent="lugares asignados";$("meter-bar").style.width=Math.min(100,adentro/c.cupo*100)+"%"}else{$("meter").hidden=true}
    var cs=$("counts");cs.textContent="";
    ESTADOS.forEach(function(s){var n=mine.filter(function(p){return p.estado===s}).length;if(!n)return;var sp=el("span");sp.appendChild(el("strong",null,String(n)));sp.appendChild(document.createTextNode(" "+s));cs.appendChild(sp)});
    var l=$("list");l.textContent="";
    if(!mine.length){l.appendChild(el("p","empty","Todavía no hay nadie anotado en esta convocatoria."));return}
    mine.forEach(function(p){l.appendChild(card(p))});
  }

  function card(p){
    var r=el("article","p");
    var left=el("div","left");
    left.appendChild(el("div","name",p.nombre||"Sin nombre"));
    var ct=el("div","contact");
    if(p.wa){var a=el("a",null,"WhatsApp "+p.wa);a.href="https://wa.me/"+p.wa.replace(/\D/g,"");a.target="_blank";a.rel="noopener";ct.appendChild(a)}
    if(p.email){ct.appendChild(el("span",null,p.email))}
    if(p.ig){var g=el("a",null,"@"+p.ig);g.href="https://www.instagram.com/"+encodeURIComponent(p.ig);g.target="_blank";g.rel="noopener";ct.appendChild(g)}
    left.appendChild(ct);
    r.appendChild(left);
    var side=el("div","side");
    side.appendChild(el("span","pill s-"+slug(p.estado||"postulado"),p.estado||"postulado"));
    var s=el("select","estado");s.id="estado-"+p.id;s.setAttribute("aria-label","Estado de "+(p.nombre||"postulante"));
    ESTADOS.forEach(function(e){var o=el("option",null,e);o.value=e;if(e===p.estado)o.selected=true;s.appendChild(o)});
    s.onchange=function(){setEstado(p,s.value,r,s)};
    side.appendChild(s);
    if(p.recibido){var d=new Date(p.recibido);side.appendChild(el("span","when",d.toLocaleDateString("es-AR",{day:"numeric",month:"short"})+" · "+d.toLocaleTimeString("es-AR",{hour:"2-digit",minute:"2-digit"})))}
    r.appendChild(side);
    if(p.motivo)r.appendChild(el("p","motivo",p.motivo));
    return r;
  }

  function setEstado(p,v,row,s){
    var prev=p.estado;row.classList.add("saving");s.disabled=true;
    fetch("/api/admin/estado",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:p.id,estado:v}),credentials:"same-origin"})
      .then(function(r){if(!r.ok)throw r.status;p.estado=v;$("msg").hidden=true;render()})
      .catch(function(c){s.value=prev;row.classList.remove("saving");s.disabled=false;showMsg("No se guardó el cambio de "+(p.nombre||"esta persona"),c===403?"Tu sesión venció. Recargá la página.":"Probá de nuevo en un momento.",true)});
  }

  function load(){
    var btn=$("refresh");btn.disabled=true;btn.textContent="Actualizando…";
    fetch("/api/admin/datos",{credentials:"same-origin",cache:"no-store"}).then(function(r){if(!r.ok)throw r.status;return r.json()})
    .then(function(d){
      convs=d.convocatorias||[];
      convs.sort(function(a,b){return (a.estado==="abierta"?0:1)-(b.estado==="abierta"?0:1)||(a.id==="lista-espera")-(b.id==="lista-espera")});
      posts=(d.postulantes||[]).map(function(p){return {id:p.id,nombre:p.nombre,email:p.email,wa:p.whatsapp,ig:p.instagram,motivo:p.motivo,conv:p.convocatoria,estado:p.estado,recibido:p.recibido}});
      $("msg").hidden=true;render();
      $("foot").textContent="Leído "+new Date().toLocaleTimeString("es-AR",{hour:"2-digit",minute:"2-digit"})+" · "+posts.length+" postulaciones en total · "+(d.email||"");
    }).catch(function(c){
      if(c===403)showMsg("No tenés acceso a este panel","Entrá con el mail autorizado. Si ya lo hiciste, pedí que lo agreguen a la lista.",true);
      else showMsg("No se pudo leer la base","Probá Actualizar en un momento.",true);
      $("conv-h").textContent="Sin datos";
    }).then(function(){btn.disabled=false;btn.textContent="Actualizar"});
  }

  $("refresh").onclick=load;
  load();
})();
