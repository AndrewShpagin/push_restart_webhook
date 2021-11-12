const http = require('http'); 
var cp = require('child_process'); 

const express = require('express'); 
const app = express(); 
const server = http.createServer(app);
const scriptPath = '~/restart.sh';
const restartCommand = '/restart-app';
const infoCommand = '/info';
const port = 34567; 
const header = `<html><meta charset="UTF-8"><style>div {white-space: pre;font-family: 'Roboto Mono', monospace;}</style><div>`;
const pageEnd = '</div></html>';

let lastReport='nothing new there.';

app.use(restartCommand, (req, res, next) => { 
  console.log('Restart requested.'); 
  cp.exec(scriptPath, {}, (code, stdout, stderr) => {  
    if(code) lastReport = stderr;
    else lastReport = stdout;
  });
  res.writeHead(200); 
  res.end('Restart request accepted.');
});

app.use(infoCommand, (req, res, next) => { 
  res.writeHead(200);
  res.end(header + lastReport + pageEnd);
});

console.log('Auto-restart sever started at:', port);
server.listen(port);

