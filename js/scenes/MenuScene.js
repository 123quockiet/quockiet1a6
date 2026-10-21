// ============================================================================
// HẠT GIỐNG TRO TÀN – ĐẠI SỐ VECTƠ | MENU SCENE
// ============================================================================

class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background: Draw Parallax forest or UI menu
    if (this.textures.exists('asset_ui_menu')) {
      const bg = this.add.image(width / 2, height / 2, 'asset_ui_menu');
      bg.setDisplaySize(width, height);
      bg.setAlpha(0.45);
    } else {
      this.add.rectangle(width / 2, height / 2, width, height, 0x0e0824);
    }

    // Particle embers
    for (let i = 0; i < 35; i++) {
      const px = Phaser.Math.Between(0, width);
      const py = Phaser.Math.Between(0, height);
      const ember = this.add.circle(px, py, Phaser.Math.Between(1, 3), 0xffaa00, 0.7);
      this.tweens.add({
        targets: ember,
        y: py - Phaser.Math.Between(80, 200),
        x: px + Phaser.Math.Between(-40, 40),
        alpha: 0,
        duration: Phaser.Math.Between(2500, 5000),
        repeat: -1,
        delay: Phaser.Math.Between(0, 3000)
      });
    }

    // Game Title Card
    const titleBox = this.add.rectangle(width / 2, 130, 760, 150, 0x110d24, 0.88);
    titleBox.setStrokeStyle(3, 0xffd700);

    const titleText = this.add.text(width / 2, 110, 'HẠT GIỐNG TRO TÀN', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '34px',
      color: '#ffd700',
      stroke: '#000000',
      strokeThickness: 8
    }).setOrigin(0.5);

    const subtitleText = this.add.text(width / 2, 160, '⚔ ĐẠI SỐ VECTƠ - HÀNH TRÌNH TRI THỨC ⚔', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '14px',
      color: '#00e5ff'
    }).setOrigin(0.5);

    // Subtle pulsing animation on title
    this.tweens.add({
      targets: [titleText, subtitleText],
      scale: 1.03,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Menu Buttons
    const btnStartY = 290;
    const btnGap = 70;

    const btnNewGame = this.createMenuButton(width / 2, btnStartY, 'CHƠI MỚI (NEW GAME)', () => {
      soundManager.playClick();
      soundManager.startBGM();
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.time.delayedCall(550, () => {
        this.scene.start('GameScene');
      });
    });

    const btnHowToPlay = this.createMenuButton(width / 2, btnStartY + btnGap, 'HƯỚNG DẪN ĐIỀU KHIỂN', () => {
      soundManager.playClick();
      this.showGuideModal();
    });

    const btnAudio = this.createMenuButton(width / 2, btnStartY + btnGap * 2, 'ÂM THANH: BẬT / TẮT', () => {
      const isMuted = soundManager.toggleMute();
      btnAudio.textObj.setText(isMuted ? 'ÂM THANH: [ĐÃ TẮT]' : 'ÂM THANH: [ĐANG BẬT]');
    });

    // Character preview portrait
    if (this.textures.exists('player_idle_0')) {
      const playerPreview = this.add.sprite(width / 2 - 280, 420, 'player_idle_0');
      playerPreview.setScale(0.55);
      if (this.anims.exists('player_idle')) {
        playerPreview.play('player_idle');
      }
    }

    // Footer info
    this.add.text(width / 2, height - 30, '© 2026 Hạt Giống Tro Tàn • Sẵn sàng triển khai trên GitHub Pages', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '9px',
      color: '#8c8cba'
    }).setOrigin(0.5);

    this.cameras.main.fadeIn(400, 0, 0, 0);
  }

  createMenuButton(x, y, label, onClick) {
    const btnW = 420;
    const btnH = 50;

    const bg = this.add.rectangle(x, y, btnW, btnH, 0x1f2438, 0.95);
    bg.setStrokeStyle(2, 0x4a6fa5);

    const textObj = this.add.text(x, y, label, {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '12px',
      color: '#ffffff'
    }).setOrigin(0.5);

    bg.setInteractive({ useHandCursor: true });

    bg.on('pointerover', () => {
      bg.fillColor = 0x364166;
      bg.setStrokeStyle(3, 0xffd700);
      textObj.setColor('#ffd700');
      soundManager.playClick();
    });

    bg.on('pointerout', () => {
      bg.fillColor = 0x1f2438;
      bg.setStrokeStyle(2, 0x4a6fa5);
      textObj.setColor('#ffffff');
    });

    bg.on('pointerdown', onClick);

    return { bg, textObj };
  }

  showGuideModal() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const modalGroup = this.add.container(0, 0);
    const dimmer = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.75);
    dimmer.setInteractive();

    const panel = this.add.rectangle(width / 2, height / 2, 680, 420, 0x141829, 0.98);
    panel.setStrokeStyle(3, 0x00e5ff);

    const title = this.add.text(width / 2, height / 2 - 170, '📖 HƯỚNG DẪN CHƠI', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '16px',
      color: '#ffd700'
    }).setOrigin(0.5);

    const guideContent = [
      '1. DI CHUYỂN: Phím [A]/[D] hoặc Mũi tên Trái / Phải.',
      '2. NHẢY: Phím [W], [Phím Cách (Space)] hoặc Mũi tên Lên.',
      '3. TƯƠNG TÁC: Phím [E] để trò chuyện NPC Pháp Sư / Cửa hàng.',
      '4. CHIẾN ĐẤU VECTƠ: Tiến lại gần quái vật để kích hoạt đố vui.',
      '   - TRẢ LỜI ĐÚNG: Kael tung đòn chém chí mạng tiêu diệt quái!',
      '   - TRẢ LỜI SAI: Quái vật phản đòn sát thương, trừ HP/Mạng.',
      '5. TIÊU DIỆT 10 QUÁI VẬT: Từ Slime đến Trùm Cuối Malakar!'
    ];

    const bodyText = this.add.text(width / 2, height / 2 - 20, guideContent.join('\n\n'), {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '10px',
      color: '#d0d8e8',
      align: 'left',
      lineSpacing: 10
    }).setOrigin(0.5);

    const closeBtnBg = this.add.rectangle(width / 2, height / 2 + 165, 180, 40, 0x2b3552);
    closeBtnBg.setStrokeStyle(2, 0xffd700);
    const closeBtnText = this.add.text(width / 2, height / 2 + 165, 'ĐÃ HIỂU [X]', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '11px',
      color: '#ffffff'
    }).setOrigin(0.5);

    closeBtnBg.setInteractive({ useHandCursor: true });
    closeBtnBg.on('pointerdown', () => {
      soundManager.playClick();
      modalGroup.destroy();
    });

    modalGroup.add([dimmer, panel, title, bodyText, closeBtnBg, closeBtnText]);
  }
}
