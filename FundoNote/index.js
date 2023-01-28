//.ENV

//require("dotenv").config();
//console.log(process.env.APP_PORT);

//

const http = require('http');
const data = require('./source');
http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type': 'application\json'});
    res.write(JSON.stringify(data));
    res.end();
}).listen(3000);
