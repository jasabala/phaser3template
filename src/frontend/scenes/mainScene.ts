
import io from 'socket.io-client'
import Square from '../objects/square'
import Ball from '../objects/ball'

interface UserData {
  socketId: string,
  loginTime: string,
  x: number,
  y:number,
  vx: number,
  vy:number
  angle: number,
  color: string
}


export default class MainScene extends Phaser.Scene {
 
  firstHi = false  
  playersConnectedText: Phaser.GameObjects.Text
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

    this.playersConnectedText = this.add.text(20,20,"")
    this.matter.world.setBounds(0,0,1024,750, 50,true, true, false, true)
    
      this.socket = io()
      this.socket.on("first hi", (data: UserData, opponentData: UserData[])=>{
        if(this.firstHi != true){
          this.firstHi = true
        this.player = new Square(this, data)     
        opponentData.forEach((o)=>{
          let opponent = new Square(this, o)     
          this.opponents.push(opponent)
        })
        this.time.addEvent({ delay: 1000/60,  loop: true, callback: this.updateState(), callbackScope: this });
        }        
      })

      this.socket.on("add opponent", (data: UserData)=>{
        let opponent = new Square(this, data)     
        this.opponents.push(opponent)
         
      })
      this.socket.on("remove player", (pSocket)=>{
        let o:Square[] = this.opponents.filter((player:Square) => { return player.socketId == pSocket})
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
            opponent.setVelocityX(p.vx)
            opponent.setVelocityY(p.vY)
            opponent.angle = p.angle
          }

        })
         
      })     
  }

  updateState(){
    let oldX = 0
    let oldY = 0
    let oldAngle = 0

    //send a position update only if position is changed
    return ()=>{

      this.playersConnectedText.setText("clients connected: "+(this.opponents.length+1).toString())


      if(this.player && (Math.abs(this.player.x - oldX) > 3 || Math.abs(this.player.y - oldY) > 3)){
        let data = {
          socketId: this.socket.id,
          x: this.player.x,
          y: this.player.y,
          vx: this.player.body.velocity.x,
          vy: this.player.body.velocity.x,
          angle: this.player.angle
        }
        this.socket.emit("player update", data)
        oldX = this.player.x
        oldY = this.player.y
        oldAngle = this.player.angle
      }         
    }    
  }

}
