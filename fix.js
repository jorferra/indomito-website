const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

for (const f of files) {
  let p = path.join(dir, f);
  let c = fs.readFileSync(p, 'utf-8');
  
  // Revert Link components back to standard <a> tags
  c = c.replace(/<Link/g, '<a');
  c = c.replace(/<\/Link>/g, '</a>');
  
  // Convert root URLs to hash URLs so GitHub Pages doesn't 404
  c = c.replace(/href="\/carta"/g, 'href="#/carta"');
  c = c.replace(/href="\/servicio"/g, 'href="#/servicio"');
  c = c.replace(/href="\/agenda"/g, 'href="#/agenda"');
  c = c.replace(/href="\/laboratorio"/g, 'href="#/laboratorio"');
  c = c.replace(/href="\/club"/g, 'href="#/club"');
  c = c.replace(/href="\/tienda"/g, 'href="#/tienda"');
  c = c.replace(/href="\/nosotros"/g, 'href="#/nosotros"');
  c = c.replace(/href="\/contacto"/g, 'href="#/contacto"');
  c = c.replace(/href="\/"/g, 'href="#/"');

  // Also catch single quotes
  c = c.replace(/href='\/carta'/g, "href='#/carta'");
  c = c.replace(/href='\/servicio'/g, "href='#/servicio'");
  c = c.replace(/href='\/agenda'/g, "href='#/agenda'");
  c = c.replace(/href='\/laboratorio'/g, "href='#/laboratorio'");
  c = c.replace(/href='\/club'/g, "href='#/club'");
  c = c.replace(/href='\/tienda'/g, "href='#/tienda'");
  c = c.replace(/href='\/nosotros'/g, "href='#/nosotros'");
  c = c.replace(/href='\/contacto'/g, "href='#/contacto'");
  c = c.replace(/href='\/'/g, "href='#/'");

  fs.writeFileSync(p, c);
}

// Update main.jsx to use HashRouter
let main = fs.readFileSync(path.join(dir, 'main.jsx'), 'utf-8');
main = main.replace('BrowserRouter', 'HashRouter');
main = main.replace('BrowserRouter', 'HashRouter');
fs.writeFileSync(path.join(dir, 'main.jsx'), main);
