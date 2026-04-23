import * as Phaser from 'phaser';
import { createAnims } from '../anims/anims.js';
import { Player } from '../entities/player.js';
import { Rose } from '../entities/rosa.js';
import { HUD } from '../ui/HUD.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.tempsRestant = 60;
    this.gameActive = true;
  }

  preload() {
    this.load.image('sky', 'assets/fondo.png');
    this.load.image('ground', 'assets/tile-grass.png');
    this.load.image('tower', 'assets/torre.png');
    this.load.image('rosaFull', 'assets/rosa-full.png');
    this.load.image('grass', 'assets/grass.png');
    this.load.image('rock', 'assets/rock.png');
    this.load.image('flower1', 'assets/flower1.png');
    this.load.image('flower2', 'assets/flower2.png');
    this.load.image('flower3', 'assets/flower3.png');
    this.load.spritesheet('princes', 'assets/princess-idle.png',
      { frameWidth: 68, frameHeight: 68 });
    this.load.spritesheet('jordi', 'assets/jordi-sprite.png',
      { frameWidth: 68, frameHeight: 68 });
    this.load.spritesheet('rosa', 'assets/rosa.png',
      { frameWidth: 163, frameHeight: 166 });
  }

  create() {
    this.add.image(400, 300, 'sky');

    createAnims(this.anims);

    this.#createPlatforms();

    this.player = new Player(this, 20, 451);

    this.rosaGroup = this.physics.add.group();
    for (let i = 0; i < 10; i++) {
      const rose = new Rose(this, 23 + i * 78, 0);
      this.rosaGroup.add(rose);
    }

    this.princess = this.physics.add.sprite(730, 100, 'princes').setScale(1.1);
    this.princess.setBodySize(30, 50);
    this.princess.setOffset(18, 14);
    this.princess.setGravityY(470);
    this.princess.setCollideWorldBounds(true);
    this.princess.setDepth(2);
    this.princess.anims.play('princessIdle', true);

    this.add.image(747, 306, 'tower').setScale(0.245).setDepth(3);

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.rosaGroup, this.platforms);
    this.physics.add.collider(this.princess, this.platforms);
    this.physics.add.overlap(
      this.player,
      this.rosaGroup,
      this.#collectRosa,
      null,
      this
    );

    this.hud = new HUD(this);

    this.#startTimer();
  }

  update() {
    if (!this.gameActive) return;
    this.player.update();
  }

  #collectRosa(player, rose) {
    rose.disableBody(true, true);
    const collectedRoses = 10 - this.rosaGroup.countActive(true);
    this.hud.updateRoses(collectedRoses);

    if (this.rosaGroup.countActive(true) === 0) {
      this.#win();
    }
  }

  #startTimer() {
    this.time.addEvent({
      delay: 1000,
      repeat: 59,
      callback: () => {
        this.tempsRestant--;
        this.hud.updateTimer(this.tempsRestant);
        if (this.tempsRestant <= 0) {
          this.#gameOver();
        }
      }
    });
  }

  #win() {
    this.gameActive = false;
    this.physics.pause();
    this.time.removeAllEvents();
    document.getElementById('retry-btn').classList.add('visible');
    this.add.text(400, 300, 'HAS GUANYAT!', {
      fontSize: '48px',
      fill: '#da2c38'
    }).setOrigin(0.5).setDepth(20);
  }

  #gameOver() {
    this.gameActive = false;
    this.physics.pause();
    document.getElementById('retry-btn').classList.add('visible');
    this.add.text(400, 300, 'TEMPS ESGOTAT!', {
      fontSize: '48px',
      fill: '#da2c38'
    }).setOrigin(0.5).setDepth(20);
  }

  #createPlatforms() {
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(719, 176, 'ground').setScale(0.050).setAlpha(0).refreshBody();

    const terra = [
      [20,580],[60,580],[100,580],[140,580],[180,580],[220,580],
      [260,580],[300,580],[340,580],[380,580],[420,580],[460,580],
      [500,580],[540,580],[580,580],[620,580],[660,580],[700,580],
      [740,580],[782,540]
    ];

    const plataformes = [
      [20,280],[60,280],[60,400],[100,400],[180,160],[200,160],
      [240,160],[260,360],[300,360],[320,360],[220,490],[260,490],
      [360,260],[400,260],[440,400],[480,400],[520,400],[540,220],
      [560,220],[600,220],[640,440],[680,440]
    ];

    [...terra, ...plataformes].forEach(([x, y]) => {
      this.platforms.create(x, y, 'ground').setScale(0.050).refreshBody();
    });

    this.add.image(300, 580, 'grass').setScale(0.05).setOrigin(0.5, 1);
    this.add.image(600, 580, 'grass').setScale(0.05).setOrigin(0.5, 1);
    this.add.image(50, 580, 'rock').setScale(0.05).setOrigin(0.5, 1);
    this.add.image(505, 580, 'flower2').setScale(0.07).setOrigin(0.5, 1);
    this.add.image(40, 280, 'grass').setScale(0.05).setOrigin(0.5, 1.2);
    this.add.image(60, 400, 'grass').setScale(0.05).setOrigin(0.5, 1.2);
    this.add.image(200, 160, 'grass').setScale(0.05).setOrigin(0.5, 1.2);
    this.add.image(280, 360, 'flower1').setScale(0.07).setOrigin(0.5, 1);
    this.add.image(240, 490, 'flower3').setScale(0.07).setOrigin(0.5, 1.2);
    this.add.image(360, 260, 'grass').setScale(0.05).setOrigin(0.5, 1.2);
    this.add.image(440, 400, 'rock').setScale(0.05).setOrigin(0.5, 1.02);
    this.add.image(560, 220, 'grass').setScale(0.05).setOrigin(0.5, 1.2);
  }
}