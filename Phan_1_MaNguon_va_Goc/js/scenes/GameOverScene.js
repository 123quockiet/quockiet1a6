// ============================================================================
// HẠT GIỐNG TRO TÀN – ĐẠI SỐ VECTƠ | GAME OVER SCENE
// ============================================================================

class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Dark red death background
    this.add.rectangle(width / 2, height / 2, width, height, 0x180509);

    // Skull icon
    this.add.text(width / 2, 160, '💀', { fontSize: '48px' }).setOrigin(0.5);

    // Title
    const title = this.add.text(width / 2, 240, 'BẠN ĐÃ TỬ TRẬN', {
      fontFamily: '"Press Start 2P"',
      fontSize: '28px',
      color: '#ff2244',
      stroke: '#000000',
      strokeThickness: 8
    }).setOrigin(0.5);

    this.tweens.add({
      targets: title,
      scale: 1.05,
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    this.add.text(width / 2, 290, 'Bóng tối Malakar đã nuốt chửng linh hồn Kael...', {
      fontFamily: '"Press Start 2P"',
      fontSize: '11px',
      color: '#a0aec0'
    }).setOrigin(0.5);

    // Tip card
    const tipBox = this.add.rectangle(width / 2, 380, 580, 110, 0x2b0f16, 0.9);
    tipBox.setStrokeStyle(2, 0xff2244);

    const tip = [
      'GỢI Ý VECTƠ:',
      '• Đọc kỹ câu hỏi và các điều kiện cùng hướng, cùng phương.',
      '• Nhớ quy tắc 3 điểm: AB + BC = AC (nối đuôi điểm B).',
      '• Ghé cửa hàng thợ rèn Arthur mua thêm Bình Máu trước khi chiến!'
    ];

    this.add.text(width / 2, 380, tip.join('\n'), {
      fontFamily: '"Press Start 2P"',
      fontSize: '9px',
      color: '#ffcccc',
      align: 'left',
      lineSpacing: 8
    }).setOrigin(0.5);

    // Respawn button
    const btn = this.add.rectangle(width / 2, 510, 320, 48, 0x991b1b);
    btn.setStrokeStyle(2, 0xffd700);
    const btnText = this.add.text(width / 2, 510, 'HỒI SINH (THỬ LẠI)', {
      fontFamily: '"Press Start 2P"',
      fontSize: '12px',
      color: '#ffffff'
    }).setOrigin(0.5);

    btn.setInteractive({ useHandCursor: true });
    btn.on('pointerover', () => {
      btn.fillColor = 0xb91c1c;
      btnText.setColor('#ffd700');
    });
    btn.on('pointerout', () => {
      btn.fillColor = 0x991b1b;
      btnText.setColor('#ffffff');
    });

    btn.on('pointerdown', () => {
      soundManager.playClick();
      // Revive with half HP & 2 hearts
      GAME_DATA.player.hp = GAME_DATA.player.maxHp;
      GAME_DATA.player.hearts = 3;
      this.scene.start('GameScene', { playerX: 120 });
    });
  }
}
