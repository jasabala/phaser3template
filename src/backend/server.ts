import path from 'path';
import http from 'http'
//import socketIo from 'socket.io-client'
import express from 'express';

// rest of the code remains same
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);  
const io = require('socket.io')(server);

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.use(express.static('/../buildClient')); 

app.get("/", (req, res) =>{
    console.log(express.static(path.resolve(__dirname,"/../buildClientClient/index.html")))
    res.sendFile(path.join(__dirname,"/../buildClient/index.html"))
})
app.get("/bundle-front.js", (req, res) =>{
    console.log("/bundle-front.js")
    console.log(path.join(__dirname,"/../buildClient/bundle-front.js"))
    res.sendFile(path.join(__dirname,"/../buildClient/bundle-front.js"))
})

app.get("/assets/*", (req, res) =>{
    res.sendFile(path.join(__dirname,"/../buildClient/"+req.path))
})


io.on("connection", (socket)=>{
    console.log("wewewewewewe")
    socket.emit("first hi", "Phaser game running with sockets")
})

