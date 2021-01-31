import { use } from 'matter';
import Phaser from 'phaser'
import Square from '../frontend/objects/square';
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

interface RecentData {
  socketId: string,
  x: number,
  y:number,
  vx: number,
  vy:number,
  angle: number
 
}
export function socketCommunication(io: any) {

  
  let currentUsers: UserData[] = [] //array to store socketids and player data of each connection
  let recentUpdates: RecentData[] = [] //array to store socketids and player data of each connection
  
  io.on('connection', function (socket) {
    
    
    //remove the users data when they disconnect.
    socket.on('disconnect', function () {
      removeUser(currentUsers, socket);
    });

    socket.on('player update', function (data:UserData) {
      let p = recentUpdates.filter(update => update.socketId == data.socketId)
      if(p && p[0]){
         let player = p[0]
        player.x = data.x
        player.y = data.y
        player.angle = data.angle
        player.vx = data.vx,
        player.vy = data.vy
      }else{
         recentUpdates.push(data)
      }
    })

    socket.on("ready", ()=>{
      let newPlayer = createNewUser(socket)
      socket.emit("first hi",newPlayer, currentUsers);
      socket.broadcast.emit("add opponent", newPlayer);
      currentUsers.push(newPlayer)  //add user for data tracking/sharing
    })
    //welcome the new user and send user info
    

  })

  setInterval(()=>{
    io.emit("update all", recentUpdates)
    recentUpdates.forEach(data =>{
      let p = currentUsers.filter((user: UserData) => {
         return user.socketId == data.socketId
      })
      if(p && p[0]){
        let player = p[0]
        player.x = data.x
        player.y = data.y
        player.angle = data.angle
        player.vx = data.vx,
        player.vy = data.vy
      }
    })
      
    recentUpdates.length = 0

  }, 100/30)


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

function createNewUser(socket){
  let d = new Date();
  let time = d.toLocaleString('en-US', {
    hour12: true,
    timeZone: 'America/Los_Angeles'
  });

  let user: UserData = {
    socketId : socket.id,
    loginTime : new Date().getTime(),
    x: 200+Math.random()*600,
    y: 100+Math.random()*200,
    angle: Math.random()*180,
    color: "0x"+Math.floor(Math.random()*16777215).toString(16),
    vx: 1-Math.random()*2,
    vy: 1-Math.random()*2
  }  
  return user
}
    