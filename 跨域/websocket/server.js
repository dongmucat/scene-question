//server.js
var ws = require("nodejs-websocket")
var port = 3000;
//createServer
var server = ws.createServer(function (conn) {
    conn.on("text", function (str) {
        console.log("received: " + str);
        //send msg
        const data = '你好~我是服务端';
        conn.sendText(data);
        console.log('send:',data);
    });

    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    });

    conn.on("error", function (err) {
        console.log("handdle error");
        console.log(err);
    })
}).listen(port);
console.log("websocket server listening on port " + port);