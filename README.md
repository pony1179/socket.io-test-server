## socket.io-test-server 
### 1. 项目启动
#### node start.js 会在三个端口 3001， 3002，3003 分别启动三个服务

### 2. 通过 postman 访问本服务，触发 socket 通信，模拟服务器向浏览器发送消息
### 3. API
#### 3.1 服务端向客户端发送固定消息
#### method: POST
#### URL: http://127.0.0.1:3001(3002或3003)/message 

#### 3.2 服务端向客户端发送固定消息（可以模拟独立进程通过 server 向 client 发送消息）
#### method: POST
#### URL: http://127.0.0.1:3001(3002或3003)/sendToUser
#### body: { userId: "4001-test"}

### 4. attachment 目录
#### 目录下为 nginx 配置 socket.io 模版
