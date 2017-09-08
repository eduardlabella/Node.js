var http = require("http"),
  fs = require("fs");


http.createServer(function(req,res){
  fs.readFile("./index.html",function(err,html){
    var html_string = html.toString();
    //Expresión regular que busca en el HTML donde haya {x}
    var variables = html_string.match(/[^\{\}]+(?=\})/g);

    var nombre = "Edu";
    //variables ['nombre']
    for(var i = variables.length -1; i >= 0; i--){
      var value = eval(variables[i]);
      //reemplaza el contenido entre {} por el contenido
      html_string = html_string.replace("{"+variables[i]+"}",value);
    };
    //manda el contenido
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(html_string);
    res.end();
  });
}).listen(8080);
