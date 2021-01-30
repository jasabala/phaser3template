import Phaser from 'phaser'
interface UserData {
  socketID: string,
  loginTime: string,
  x: number,
  y:number
}
export function socketCommunication(io: any) {

  
  let currentUsers: UserData[] = [] //array to store socketids and player data of each connection


  io.on('connection', function (socket) {
    let newPlayer = createNewUser(socket)
    currentUsers.push(newPlayer)  //add user for data tracking/sharing

    //remove the users data when they disconnect.
    socket.on('disconnect', function () {
      let u:UserData[] = currentUsers.filter((user:UserData) => { return user.socketID == socket.id})
      console.log(currentUsers.length)
      if(u && u[0]){
        console.log("removing user :",u)
        currentUsers.splice(currentUsers.indexOf(u[0]), 1);
      }
      socket.removeAllListeners();
    });

    //welcome the new user and send user info
    socket.emit("first hi",newPlayer);
  })

}

function createNewUser(socket){
  let d = new Date();
  let time = d.toLocaleString('en-US', {
    hour12: true,
    timeZone: 'America/Los_Angeles'
  });

  let user: UserData = {
    socketID : socket.id,
    loginTime : time,
    x: 100+Math.round(Math.random()*1000),
    y: 100+Math.round(Math.random()*1000),
  }  
  return user
}
    