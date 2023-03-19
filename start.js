const cp = require('child_process');
const config = require('./config');
const ports = config.ports;
for(let i = 0; i < ports.length; i++) {
    let port = ports[i];
    const sp = cp.spawn('node', ['index.js', port]);
    sp.stdout.on('data', (data) => {
        console.log('data', data.toString());
    });
    sp.stderr.on('data', (data) => {
        console.error(`stderr: ${data.toString()}`);
    });
}
