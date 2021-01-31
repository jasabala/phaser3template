import path from 'path';
import http from 'http'
import express from 'express';
import {clientConnection} from './clientConnection'
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
app.use(express.static('/../public')); 
app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname,"/../public/index.html"))
})
app.get("/mystyle.css", (req, res) =>{
    res.sendFile(path.join(__dirname,"/../public/mystyle.css"))
})
app.get("/front-bundle.js", (req, res) =>{
    res.sendFile(path.join(__dirname,"/../public/front-bundle.js"))
})
app.get("/assets/*", (req, res) =>{
    res.sendFile(path.join(__dirname,"/../public/"+req.path))
})

//start the game communication server to handle player data
clientConnection(io);


//start the web server to distribute the games files.
  server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
 });
