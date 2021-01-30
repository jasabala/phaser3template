
import io from 'socket.io-client'
import Square from '../objects/square'
import Ball from '../objects/ball'

interface UserData {
  socketID: string,
  loginTime: string,
  x: number,
  y:number
}

export default class MainScene extends Phaser.Scene {
 
    player: Square
    socket: SocketIOClient.Socket


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
    this.player = new Square(this)
    
      this.socket = io()
      this.socket.on("first hi", (data: UserData)=>{
        this.player.setPos(data.x, data.y)
          console.log("connected: ")
      })

     
  }

  update(){
    
  }
}
