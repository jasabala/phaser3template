interface UserData {
  socketID: string,
}
export function socketCommunication(io: any) {

  
  let d = new Date();
  let time = d.toLocaleString('en-US', {
    hour12: true,
    timeZone: 'America/Los_Angeles'
  });
  let currentUsers: UserData[] = [] //aarray to store socketids and player data of each connection


  io.on('connection', function (socket) {
    currentUsers.push(createNewUser(socket))

    socket.on('disconnect', function () {
      let u:UserData[] = currentUsers.filter((user:UserData) =>{user.socketID === socket.id})
      console.log('disconnect');
      socket.removeAllListeners();
    });

    socket.emit("first hi", "You have connected to the socket port");
  })

}

function createNewUser(socket){
  let user: UserData = {
    socketID : socket.id
  }  
  return user
}
    