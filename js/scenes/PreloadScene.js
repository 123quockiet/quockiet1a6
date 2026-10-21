// ============================================================================
// HẠT GIỐNG TRO TÀN – ĐẠI SỐ VECTƠ | PRELOAD SCENE
// ============================================================================

class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x0a0618);

    // Title text
    const title = this.add.text(width / 2, height / 2 - 80, 'HẠT GIỐNG TRO TÀN', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '28px',
      color: '#ffd700',
      stroke: '#3a1c02',
      strokeThickness: 6
    }).setOrigin(0.5);

    const subtitle = this.add.text(width / 2, height / 2 - 35, '— ĐẠI SỐ VECTƠ —', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '16px',
      color: '#00e5ff'
    }).setOrigin(0.5);

    // Loading Bar outline
    const barW = 480;
    const barH = 28;
    const barX = width / 2 - barW / 2;
    const barY = height / 2 + 30;

    const barBg = this.add.rectangle(width / 2, barY + barH / 2, barW, barH, 0x1a1c2e);
    barBg.setStrokeStyle(3, 0xffd700);

    const progressFill = this.add.rectangle(barX + 4, barY + 4, 0, barH - 8, 0x00ff88);
    progressFill.setOrigin(0, 0);

    const percentText = this.add.text(width / 2, barY + barH + 25, 'ĐANG TẢI TÀI NGUYÊN... 0%', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '11px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // Phaser load events
    this.load.on('progress', (val) => {
      progressFill.width = (barW - 8) * val;
      percentText.setText(`ĐANG TẢI TÀI NGUYÊN... ${Math.floor(val * 100)}%`);
    });

    this.load.on('complete', () => {
      percentText.setText('KHỞI TẠO XONG!');
    });

    // Load assets (both ASCII alias and fallback handling)
    this.load.image('asset_player', 'assets/player.png');
    this.load.image('asset_map', 'assets/map.png');
    this.load.image('asset_monster_vfx', 'assets/monster_vfx.png');
    this.load.image('asset_combat_vfx', 'assets/combat_vfx.png');
    this.load.image('asset_ui_hud', 'assets/ui_hud.png');
    this.load.image('asset_ui_menu', 'assets/ui_menu.png');
    this.load.image('asset_ui_char', 'assets/ui_char.png');
    this.load.image('asset_ui_npc', 'assets/ui_npc.png');
    this.load.image('asset_ui_notif', 'assets/ui_notif.png');
    this.load.image('asset_ui_quiz', 'assets/ui_quiz.png');
  }

  create() {
    // Slice sub-textures from the 10 sheets
    TextureHelper.setupSprites(this);
    TextureHelper.generateFallbackTextures(this);

    // Fade to Menu
    this.cameras.main.fadeOut(400, 0, 0, 0);
    this.time.delayedCall(450, () => {
      this.scene.start('MenuScene');
    });
  }
}
