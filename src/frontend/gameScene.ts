
import io from 'socket.io-client'

export default class SceneLogin extends Phaser.Scene {
 
    socket: any

    constructor() {
    super('LoginScene')
  }

  init(data: any) { }
  preload() {
      this.load.image("player", "assets/player.png")
   }

  create() {

    
      this.socket = io()
      this.socket.on("first hi", (msg: any)=>{
          console.log("connected: ", msg)
      })

      this.matter.add.sprite(200,200, "player").angle -= 60
      this.matter.add.sprite(400,200, "player").angle = 120
      this.matter.add.rectangle(512,700,1004,10).isStatic = true

      
    
  }
}
