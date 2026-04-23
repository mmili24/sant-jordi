export class HUD {
  constructor(scene) {
    scene.add.image(30,15, 'rosaFull')
    .setScale(0.25)
    .setOrigin(0, 0)
    .setDepth(10);

    this.rosaText = scene.add.text(65, 25, '0 / 10', {
      fontSize: '24px',
      fill: '#ffffff'
    }).setDepth(10);  

    this.timerText = scene.add.text(650, 25, '60s', {
      fontSize: '24px',
      fill: '#ffffff'
    }).setDepth(10);
  }

  updateRoses(count) {
    this.rosaText.setText(count + ' / 10');
  }

  updateTimer(seconds) {
    this.timerText.setText(seconds + 's');
  }
}