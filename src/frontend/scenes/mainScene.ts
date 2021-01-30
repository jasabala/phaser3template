
import io from 'socket.io-client'
import Square from '../objects/square'
import Ball from '../objects/ball'

interface UserData {
  socketId: string,
  loginTime: string,
  x: number,
  y:number
  angle: number,
  color: string
}

export default class MainScene extends Phaser.Scene {
 
    player: Square
    socket: SocketIOClient.Socket
    opponents: Square[] = []


    constructor() {
    super('MainScene')
  }

  init(data: any) { }
  preload() {
      this.load.image("square", "assets/square.png")
      this.load.image("circle", "assets/circle.png")
   }

  create() {

    this.matter.world.setBounds(0,0,1024,750, 50,true, true, false, true)
    
      this.socket = io()
      this.socket.on("first hi", (data: UserData, opponentData: UserData[])=>{
        this.player = new Square(this, data)        
        console.log("adding player", this.player.x, this.player.y)
        opponentData.forEach((o)=>{
          this.opponents.push(new Square(this, o))
          console.log("adding opponent", o)
        })
        this.time.addEvent({ delay: 1000/30,  loop: true, callback: this.updateState, callbackScope: this });
      })

      this.socket.on("add opponent", (data: UserData)=>{
        console.log("adding opponent")
          this.opponents.push(new Square(this, data))
         
      })
      this.socket.on("remove player", (pSocket)=>{
        let o:Square[] = this.opponents.filter((player:Square) => { return player.socketId == pSocket})
        console.log(this.opponents.length)
        if(o && o[0]){
          let p = o[0]
          this.opponents.splice(this.opponents.indexOf(p, 1))
          p.destroy()

        }
      })
      this.socket.on("update all", (data: any[])=>{
        data.forEach((p)=>{
          let o:Square[] = this.opponents.filter((player:Square) => { return player.socketId == p.socketId})       
          if(o && o[0] && o[0].socketId != this.player.socketId){
            let opponent = o[0]
            opponent.x = p.x
            opponent.y = p.y
            opponent.angle = p.angle
          }

        })
         
      })     
  }

  updateState(){
    //console.log("sent")
    if(this.player){
      let data = {
        x: this.player.x,
        y: this.player.y,
        angle: this.player.angle
      }
      this.socket.emit("player update", data)
    //  console.log("sent", data)
    }
  }

}
