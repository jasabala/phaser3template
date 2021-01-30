import path from 'path';
import http from 'http'
import express from 'express';
import {socketCommunication} from './GameCommunication'
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

//set up the routes that point web requests to the right files.
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

//start the game communication server to handle player data
socketCommunication(io);


//start the web server to distribute the games files.
  server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
 });
