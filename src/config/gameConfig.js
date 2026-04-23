import * as Phaser from 'phaser';
import { GameScene } from '../scene/GameScene.js';

export const gameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  parent: 'game-container',
  scene: [GameScene]
};