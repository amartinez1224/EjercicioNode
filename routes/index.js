var express = require('express');
var router = express.Router();
const axios = require('axios');
var fs = require('fs');

let proveedrores = "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json"
let clientes = "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json"

/* GET home page. */
router.get('/proveedores', function(req, res, next) {
  axios.get(proveedrores)
  .then(function (response) {
    let encabezado = "<th>ID</th><th>Compañia</th><th>Contacto</th>";
    let filas = "";
    for(var i = 0; i < response.data.length; i++) {
      var obj = response.data[i];
      filas += "<tr><td>"+obj.idproveedor+"</td><td>"+obj.nombrecompania+"</td><td>"+obj.nombrecontacto+"</td></tr>"
  }
  fs.readFile('tabla.html', "utf8", function(err, data) {
    console.log(typeof(data));
    data = data.replace(/\(title\)/g, 'Proveedores');
    data = data.replace("(header)", encabezado);
    data = data.replace("(body)", filas);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
  });

});

router.get('/clientes', function(req, res, next) {
  axios.get(clientes)
  .then(function (response) {
    let encabezado = "<th>ID</th><th>Cliente</th><th>Contacto</th>";
    let filas = "";
    for(var i = 0; i < response.data.length; i++) {
      var obj = response.data[i];
      filas += "<tr><td>"+obj.idCliente+"</td><td>"+obj.NombreCompania+"</td><td>"+obj.NombreContacto+"</td></tr>"
  }
  fs.readFile('tabla.html', "utf8", function(err, data) {
    console.log(typeof(data));
    data = data.replace(/\(title\)/g, 'Clientes');
    data = data.replace("(header)", encabezado);
    data = data.replace("(body)", filas);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
  });

});

module.exports = router;
