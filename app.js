const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');
const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');
const { debug } = require('console');

const pubClient = createClient({ url: "redis://default:redispw@localhost:55000" });
const subClient = pubClient.duplicate();
const handlerMessage = (nsp, message) => {
    nsp.emit('message', message);
}
function startServer (port) {
    let nsp = null;
    const io = new Server();
    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json({ limit: '50mb' }));
    app.post('/message', (req, res) => {
        handlerMessage(nsp, {name:'server', serverPort: portVar})
        res.send('ok');
    });
    app.post('/sendToUser', (req, res) => {
        const userId = req.body.userId;
        io.of('/server').to(userId).emit('message', {name:'server', serverPort: portVar});
        res.send('ok');
    });
    const server = http.Server(app);
    let portVar = port;
    io.adapter(createAdapter(pubClient, subClient));
    Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
        io.attach(server);
        server.listen(portVar, () => {
            console.log('listening on port ' + portVar);
        });
    });
    
    if (!nsp) {
        nsp = io.of('/server').on('connection',(socket) => {
            socket.on('join', async (data) => {
                console.log('' + portVar + '端口收到了join事件，data in io server', data);
                socket.join(data);
            });
            console.log('' + portVar + '端口与socket建立连接');
            socket.on('message', (data) => {
                console.log(portVar, '端口收到了数据，data in io server', data);
            })

        })
    }
    
    
}

module.exports = startServer;

