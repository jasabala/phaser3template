import Phaser from 'phaser'
interface UserData {
  socketId: string,
  loginTime: string,
  x: number,
  y:number,
  angle: number
  color: string
}
export function socketCommunication(io: any) {

  
  let currentUsers: UserData[] = [] //array to store socketids and player data of each connection
  
  io.on('connection', function (socket) {
    //remove the users data when they disconnect.
    socket.on('disconnect', function () {
      let u:UserData[] = currentUsers.filter((user:UserData) => { return user.socketId == socket.id})
   //   console.log(currentUsers.length)
      if(u && u[0]){
   //     console.log("removing user :",u)        
        socket.broadcast.emit("remove player", u[0].socketId)
        currentUsers.splice(currentUsers.indexOf(u[0]), 1);
      }
      socket.removeAllListeners();
    });

    socket.on('player update', function (data) {
      let u:UserData[] = currentUsers.filter((user:UserData) => { return user.socketId == socket.id})
      if(u && u[0]){
        let player = u[0]
        player.x = data.x
        player.y = data.y
        player.angle = data.angle
      }
   //   console.log(currentUsers)
    });

    //welcome the new user and send user info
    let newPlayer = createNewUser(socket)
    socket.emit("first hi",newPlayer, currentUsers);
    socket.broadcast.emit("add opponent", newPlayer);
    currentUsers.push(newPlayer)  //add user for data tracking/sharing

  })

  setInterval(()=>{
    io.emit("update all", currentUsers)
  }, 100/30)

  function sendPlayerData(){
  }

}

function createNewUser(socket){
  let d = new Date();
  let time = d.toLocaleString('en-US', {
    hour12: true,
    timeZone: 'America/Los_Angeles'
  });

  let user: UserData = {
    socketId : socket.id,
    loginTime : time,
    x: 200+Math.random()*600,
    y: 100+Math.random()*200,
    angle: Math.random()*180,
    color: "0x"+Math.floor(Math.random()*16777215).toString(16)
  }  
  return user
}
    