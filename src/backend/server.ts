import path from 'path';
import http from 'http'
import express from 'express';
import {socketCommunication} from './serverutils'
//import mysql from 'mysql'


const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);  
const io = require('socket.io')(server);

// let db =  mysql.createPool({
//     host: '',
//     user: ',
//     password: '',
//     database: ''
//   });


app.use(express.static('/../build-client')); 

app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname,"/../build-client/index.html"))
})
app.get("/mystyle.css", (req, res) =>{
    res.sendFile(path.join(__dirname,"/../build-client/mystyle.css"))
})
app.get("/bundle-front.js", (req, res) =>{
    res.sendFile(path.join(__dirname,"/../build-client/bundle-front.js"))
})

app.get("/assets/*", (req, res) =>{
    res.sendFile(path.join(__dirname,"/../build-client/"+req.path))
})

io.on('connection', function (socket) {
    socketCommunication(socket);
  })
  
  
server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
 });
