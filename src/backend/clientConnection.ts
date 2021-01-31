import {GameCommunication} from './gameComm'
import Phaser from 'phaser'

interface UserData {
  socketId: string,
  loginTime: number,
  x: number,
  y:number,
  vx: number,
  vy:number
  angle: number,
  color: string
}

export function clientConnection(io: any) {

  
  let currentUsers: UserData[] = [] //array to store socketids and player data of each connection

  
  io.on('connection', function (socket) {
    
    GameCommunication(io, socket, currentUsers)  
    
    //remove the users data when they disconnect.
    socket.on('disconnect', function () {
      removeUser(currentUsers, socket);
    });
  })

     setInterval(()=>{
    var time = new Date();
    console.log(currentUsers.length+" logged in @ "+ time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
     }, 5000) 
  }

function removeUser(currentUsers: UserData[], socket: SocketIO.Socket) {
  let u: UserData[] = currentUsers.filter((user: UserData) => { return user.socketId == socket.id; });
  if (u && u[0]) {
    socket.broadcast.emit("remove player", u[0].socketId);
    currentUsers.splice(currentUsers.indexOf(u[0]), 1);
  }
  socket.removeAllListeners();
}

 