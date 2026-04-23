import * as Phaser from 'phaser';
import { gameConfig } from './config/gameConfig.js';

document.getElementById('play-btn').addEventListener('click', () => {
  document.getElementById('landing').classList.add('hidden');
  document.getElementById('game-play').classList.remove('hidden');
  new Phaser.Game(gameConfig);
});

document.getElementById('retry-btn').addEventListener('click', () => {
  location.reload();
});