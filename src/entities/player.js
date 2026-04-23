import * as Phaser from 'phaser';
export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'jordi');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(1.2);
    this.setBodySize(30, 51);
    this.setOffset(18, 14);
    this.setGravityY(470);
    this.setDepth(0);
    this.setCollideWorldBounds(true);

    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  update() {
    const onGround = this.body.touching.down;

    if (this.cursors.left.isDown) {
      this.setVelocityX(-170);
      this.setFlipX(true);
      if (onGround) this.anims.play('run', true);

    } else if (this.cursors.right.isDown) {
      this.setVelocityX(170);
      this.setFlipX(false);
      if (onGround) this.anims.play('run', true);

    } else {
      this.setVelocityX(0);
      if (onGround) this.anims.play('idle', true);
    }

    if (this.cursors.up.isDown && onGround) {
      this.setVelocityY(-400);
      this.anims.play('jump', true);
    }

    if (!onGround && this.body.velocity.y > 0) {
      this.anims.play('jump', true);
      this.anims.setCurrentFrame(this.anims.currentAnim.frames[3]);
    }
  }
}