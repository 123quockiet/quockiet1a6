// ============================================================================
// HẠT GIỐNG TRO TÀN – ĐẠI SỐ VECTƠ | VICTORY SCENE
// ============================================================================

class VictoryScene extends Phaser.Scene {
  constructor() {
    super('VictoryScene');
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Victory celebration background
    this.add.rectangle(width / 2, height / 2, width, height, 0x07111e);

    // Confetti particles
    for (let i = 0; i < 60; i++) {
      const px = Phaser.Math.Between(0, width);
      const py = Phaser.Math.Between(-50, height);
      const colors = [0xffd700, 0x00ff88, 0x00e5ff, 0xff007f, 0xffffff];
      const color = Phaser.Utils.Array.GetRandom(colors);
      const spark = this.add.circle(px, py, Phaser.Math.Between(2, 4), color);
      this.tweens.add({
        targets: spark,
        y: height + 50,
        x: px + Phaser.Math.Between(-80, 80),
        duration: Phaser.Math.Between(3000, 6000),
        repeat: -1,
        delay: Phaser.Math.Between(0, 2500)
      });
    }

    // Trophy / Seed icon
    const crown = this.add.text(width / 2, 120, '🌱✨🏆✨🌱', { fontSize: '32px' }).setOrigin(0.5);
    this.tweens.add({
      targets: crown,
      scale: 1.15,
      duration: 1000,
      yoyo: true,
      repeat: -1
    });

    // Title
    this.add.text(width / 2, 190, 'CHIẾN THẮNG HUY HOÀNG!', {
      fontFamily: '"Press Start 2P"',
      fontSize: '24px',
      color: '#ffd700',
      stroke: '#000',
      strokeThickness: 6
    }).setOrigin(0.5);

    this.add.text(width / 2, 235, 'HẠT GIỐNG TRO TÀN ĐÃ NẢY MẦM VĨNH CỬU', {
      fontFamily: '"Press Start 2P"',
      fontSize: '12px',
      color: '#00e5ff'
    }).setOrigin(0.5);

    // Summary Card
    const card = this.add.rectangle(width / 2, 380, 640, 220, 0x141e38, 0.95);
    card.setStrokeStyle(3, 0xffd700);

    const statsText = [
      `⚔️ HIỆP SĨ: ${GAME_DATA.player.name} (CẤP ${GAME_DATA.player.level})`,
      `👾 QUÁI VẬT ĐÃ DIỆT: 10/10 (BAO GỒM BOSS MALAKAR)`,
      `📐 LÝ THUYẾT VECTƠ: THÀNH THẠO 10/10 CHUYÊN ĐỀ`,
      `🪙 TỔNG VÀNG THU THẬP: ${GAME_DATA.player.gold} VÀNG`,
      `🌟 ĐẠT DANH HIỆU: ĐẠI THẦN ĐẠI SỐ VECTƠ`
    ];

    this.add.text(width / 2, 380, statsText.join('\n\n'), {
      fontFamily: '"Press Start 2P"',
      fontSize: '10px',
      color: '#ffffff',
      align: 'center',
      lineSpacing: 8
    }).setOrigin(0.5);

    // Play again button
    const btn = this.add.rectangle(width / 2, 540, 360, 48, 0x2e7d32);
    btn.setStrokeStyle(2, 0xffd700);
    const btnLabel = this.add.text(width / 2, 540, 'CHƠI LẠI TỪ ĐẦU', {
      fontFamily: '"Press Start 2P"',
      fontSize: '12px',
      color: '#ffffff'
    }).setOrigin(0.5);

    btn.setInteractive({ useHandCursor: true });
    btn.on('pointerover', () => {
      btn.fillColor = 0x388e3c;
      btnLabel.setColor('#ffd700');
    });
    btn.on('pointerout', () => {
      btn.fillColor = 0x2e7d32;
      btnLabel.setColor('#ffffff');
    });

    btn.on('pointerdown', () => {
      soundManager.playClick();
      this.resetGameData();
      this.scene.start('MenuScene');
    });
  }

  resetGameData() {
    GAME_DATA.player.hp = GAME_DATA.player.maxHp;
    GAME_DATA.player.hearts = 3;
    GAME_DATA.player.gold = 50;
    GAME_DATA.player.exp = 0;
    GAME_DATA.player.level = 1;
    window.defeatedMonsters = [];
  }
}
