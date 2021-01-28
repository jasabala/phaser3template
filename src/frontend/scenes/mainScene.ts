
import io from 'socket.io-client'
import Square from '../objects/square'
import Ball from '../objects/ball'

export default class MainScene extends Phaser.Scene {
 
    socket: any
    block: any
    block2: any

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
      this.socket.on("first hi", (msg: any)=>{
          console.log("connected: ", msg)
      })

        for(let i = 0; i< 800; i++){

          let circle = Math.random() < .5
          if(circle){
          new Ball(this,i)
          }else{
            new Square(this,i)
          }
        }
        
        this.block = this.matter.add.sprite(512,420,"square")
        this.block.setStatic(true)
        this.block.setScale(5.4, 1.5).setFriction(.9)
        this.block2 = this.matter.add.sprite(512,420,"square")
        this.block2.setStatic(true)
        this.block2.setScale(5.4, 1.5).setFriction(.9).angle+=90
   
  }

  update(){
    this.block.angle+=1.5
    this.block2.angle+=1.5
  }
}
