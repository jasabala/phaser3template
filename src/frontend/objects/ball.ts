export default class Ball extends Phaser.Physics.Matter.Sprite {

  constructor(scene: Phaser.Scene, i: number) {
    super(scene.matter.world, 500, -50 * i,"circle")
    scene.add.existing(this)
      this.angle = Math.random() * 360
      this.setBounce(.7)
      this.setScale(.1 + Math.random() * .4)
      this.setCircle(this.width*this.scale/2)
      let color = new Phaser.Display.Color()
      color.random(180)
      this.setTint(color.color)
      this.setFriction(.9)
    }
}
