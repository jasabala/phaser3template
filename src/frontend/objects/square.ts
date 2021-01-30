export default class Square extends Phaser.Physics.Matter.Sprite {
  socketId: string
  
  constructor(scene: Phaser.Scene, data) {
      
      super(scene.matter.world,data.x,data.y,"square")
      scene.add.existing(this)
        this.socketId = data.socketId
        this.angle = data.angle
        this.setBounce(.7)
        this.setScale(.5)
        this.setTint(data.color)
        this.setFriction(.9)
      }

      //server will set the position after first connect
      setPos(x: number,y: number){
        this.x = x
        this.y = y
      }
  }