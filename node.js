const http = require('http'); 
var cp = require('child_process'); 

const express = require('express'); 
const app = express(); 
const server = http.createServer(app);

// the path to the script that will be executed as soon as the webhook triggers
// The script may do anyting, I use it to restart the Node.js server of the bigger application
const scriptPath = '~/restart.sh';

// The webhook URI that will be triggered by GitHub. Change the command to some unique string. The full URI looks like:
// http://ip_address:port/restart-app-8765ABX32
const restartCommand = '/restart-app-8765ABX32';

// The command to get info about the last restart 
const infoCommand = '/info';

// The port to be used for this node
const port = 34567; 

// The report html begin and the end. The report text will be in the middle.
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

