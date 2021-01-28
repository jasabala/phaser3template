export default class Square extends Phaser.Physics.Matter.Sprite {

    constructor(scene: Phaser.Scene, i: number) {
      super(scene.matter.world, 500, -400 * i,"square")
      scene.add.existing(this)
        this.angle = Math.random() * 360
        this.setBounce(.7)
        this.setScale(.25 + Math.random() * .4)
        let color = new Phaser.Display.Color()
        color.random(180)
        this.setTint(color.color)
        this.setFriction(.9)
      }
  }