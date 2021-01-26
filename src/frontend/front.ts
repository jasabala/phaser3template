import Phaser from 'phaser'
import io from 'socket.io-client'

import GameScene from './gameScene'

const DEFAULT_WIDTH = 1024
const DEFAULT_HEIGHT = 800

const config: Phaser.Types.Core.GameConfig = {
  backgroundColor: '#2222ff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [
    GameScene
  ],
  physics: {
    default: 'matter',
    matter: {
      debug: true,
      gravity: { y: .75 }
    }
  },
}

window.addEventListener('load', () => {
  let game = new Phaser.Game(config)
})