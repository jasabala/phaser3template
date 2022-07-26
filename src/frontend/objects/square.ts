export default class Square extends Phaser.Physics.Matter.Sprite {
  socketId: string
  loginTime: number
  
  constructor(scene: Phaser.Scene, data) {
      
      super(scene.matter.world,data.x,data.y,"square")
      scene.add.existing(this)
        this.socketId = data.socketId
        this.angle = data.angle
        this.setBounce(.9)
        this.setScale(.7)
        this.setTint(data.color)
        this.setFriction(.5)
        this.loginTime = data.loginTime
      }

  }