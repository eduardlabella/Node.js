var http = require("http"),
  fs = require("fs"),
  parser = require("./params_parser.js");

var p = parser.parse;

http.createServer(function(req,res){

  if(req.url.indexOf("favicon.ico") > 0){ return; }

  fs.readFile("./index.html",function(err,html){
    var html_string = html.toString();
    //Expresión regular que busca en el HTML donde haya {x}
    var arreglo_parametros = [],parametros = {};
    var variables = html_string.match(/[^\{\}]+(?=\})/g);
    var nombre = "Edu";

    var parametros = p(req);


    for(var i = variables.length -1; i >= 0; i--){
      var variable = variables[i];
      //reemplaza el contenido entre {} por el contenido
      html_string = html_string.replace("{"+variables[i]+"}",parametros[variable]);
    };
    //manda el contenido
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(html_string);
    res.end();
  });
}).listen(8080);
