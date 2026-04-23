export function createAnims(anims) {
  anims.create({
    key: 'run',
    frames: anims.generateFrameNumbers('jordi', { start: 0, end: 7 }),
    frameRate: 14,
    repeat: -1
  });

  anims.create({
    key: 'jump',
    frames: anims.generateFrameNumbers('jordi', { start: 11, end: 15 }),
    frameRate: 7,
    repeat: 0
  });

  anims.create({
    key: 'idle',
    frames: anims.generateFrameNumbers('jordi', { start: 16, end: 19 }),
    frameRate: 4,
    repeat: -1
  });

  anims.create({
    key: 'roseTurn',
    frames: anims.generateFrameNumbers('rosa', { start: 0, end: 6 }),
    frameRate: 8,
    repeat: -1
  });

  anims.create({
    key: 'princessIdle',
    frames: anims.generateFrameNumbers('princes', { start: 0, end: 2 }),
    frameRate: 3,
    repeat: -1
  });
}