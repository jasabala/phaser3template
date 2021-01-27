
export function socketCommunication(socket: any) {
    let d = new Date();
    let time = d.toLocaleString('en-US', {
      hour12: true,
      timeZone: 'America/Los_Angeles'
    });
  
    socket.on('disconnect', function () {
      console.log('disconnect');
      socket.removeAllListeners();
    });
  
    socket.emit("first hi", "You have connected to the socket port");
  }
    