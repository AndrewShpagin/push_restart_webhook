# GitHub webhook handler to pull and restart the server
## The problem it solves
In the GitHub's repository settings you may provide the webhook that triggers when you push some changes. This is the simple server used as the webhook 
to restart the application on the server side as soon as user pushes some changes.

## Installing and using
First, clone this repo on your server. Fill the variables in the node.js  in correspondence to your needs:
```js
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
```
Usually the restart.sh looks like:
```
cd ~/the_app_folder/
git reset --hard
git pull
npm run build
pm2 delete some_app_id
pm2 --name some_app_id start npm -- start
```
And don't forget to open the port on your server:
```
sudo ufw allow 34567/tcp
```
