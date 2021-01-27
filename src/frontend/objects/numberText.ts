export default class NumberText extends Phaser.GameObjects.Text {

  constructor(scene: Phaser.Scene, x, y, theText, theStyle) {
    super(scene, Phaser.Math.Between(-3000,3000), Phaser.Math.Between(-3000,3000), theText, theStyle)
  
    let color = new Phaser.Display.Color()
    color.random(100,255)    
    this.setTint(color.color)
    scene.add.text(this.x, this.y*.7, theText)
  }
    

}
