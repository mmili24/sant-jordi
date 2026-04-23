import * as Phaser from 'phaser';
export class Rose extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'rosa');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setBodySize(100, 100);
    this.setOffset(50, 50);
    this.setScale(0.15);
    this.setDepth(0);
    this.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));
    this.setCollideWorldBounds(true);
    this.anims.play('roseTurn', true);
  }
}