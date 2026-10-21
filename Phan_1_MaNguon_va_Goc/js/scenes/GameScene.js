// ============================================================================
// HẠT GIỐNG TRO TÀN – ĐẠI SỐ VECTƠ | GAME SCENE (PLATFORMER EXPLORATION)
// ============================================================================

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  init(data) {
    this.battleReturnData = data || {};
    this.worldWidth = 7000;
    this.worldHeight = 720;
    this.groundY = 620;
    this.monstersGroup = null;
    this.activeNpc = null;
    this.isDialogueOpen = false;
    this.isShopOpen = false;
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Set world physics bounds
    this.physics.world.setBounds(0, 0, this.worldWidth, this.worldHeight);

    // 1. Parallax Backgrounds
    this.createParallaxBackground();

    // 2. Platforms & Ground
    this.createWorldTerrain();

    // 3. Player Creation
    this.createPlayer();

    // 4. NPCs (Wizard Eldrin & Blacksmith Arthur)
    this.createNPCs();

    // 5. Spawn 10 Monsters along the road
    this.createMonsters();

    // 6. Camera Follow
    this.cameras.main.setBounds(0, 0, this.worldWidth, this.worldHeight);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    // 7. Input Controls (Keyboard)
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    // 8. Persistent In-game HUD
    this.createHUD();

    // 9. Intro Banner
    this.showChapterBanner("RỪNG HOANG DÃ – CHƯƠNG 1");

    // Fade in
    this.cameras.main.fadeIn(400, 0, 0, 0);

    // Handle return from battle if any
    if (this.battleReturnData && this.battleReturnData.defeatedMonsterId) {
      this.handleDefeatedMonster(this.battleReturnData.defeatedMonsterId);
    }
  }

  createParallaxBackground() {
    // Distant mountain sky repeated
    for (let x = 0; x < this.worldWidth; x += 1370) {
      if (this.textures.exists('bg_mountains')) {
        const bgM = this.add.image(x, 200, 'bg_mountains').setOrigin(0, 0.5).setScrollFactor(0.2);
        bgM.setDisplaySize(1376, 500);
      }
      if (this.textures.exists('bg_forest')) {
        const bgF = this.add.image(x, 380, 'bg_forest').setOrigin(0, 0.5).setScrollFactor(0.5);
        bgF.setDisplaySize(1376, 450);
        bgF.setAlpha(0.7);
      }
    }
  }

  createWorldTerrain() {
    this.platforms = this.physics.add.staticGroup();

    // Main Ground spanning the entire 7000px length
    for (let x = 0; x < this.worldWidth; x += 250) {
      let ground;
      if (this.textures.exists('tile_grass')) {
        ground = this.platforms.create(x + 125, this.groundY + 50, 'tile_grass');
        ground.setDisplaySize(250, 120);
      } else {
        const r = this.add.rectangle(x + 125, this.groundY + 50, 250, 120, 0x3d2817);
        ground = this.platforms.add(r);
      }
      ground.refreshBody();
    }

    // Elevated platforms & obstacles
    const platformLocs = [
      { x: 1000, y: 480, w: 200 },
      { x: 1600, y: 450, w: 250 },
      { x: 2200, y: 460, w: 200 },
      { x: 2800, y: 440, w: 250 },
      { x: 3400, y: 460, w: 220 },
      { x: 4100, y: 450, w: 260 },
      { x: 4750, y: 440, w: 240 },
      { x: 5400, y: 450, w: 300 }
    ];

    platformLocs.forEach(loc => {
      const p = this.platforms.create(loc.x, loc.y, 'tile_grass');
      p.setDisplaySize(loc.w, 35);
      p.refreshBody();
    });

    // Decorative cave & chests
    if (this.textures.exists('prop_cave')) {
      this.add.image(6500, this.groundY - 100, 'prop_cave').setDisplaySize(300, 250);
    }
    if (this.textures.exists('prop_chest')) {
      this.add.image(1000, 430, 'prop_chest').setDisplaySize(60, 50);
      this.add.image(2800, 390, 'prop_chest').setDisplaySize(60, 50);
    }
  }

  createPlayer() {
    // If returning from battle, restore position
    const startX = (this.battleReturnData && this.battleReturnData.playerX) ? this.battleReturnData.playerX : 120;
    const startY = this.groundY - 70;

    const initialTexture = this.textures.exists('player_idle_0') ? 'player_idle_0' : 'player_idle';
    this.player = this.physics.add.sprite(startX, startY, initialTexture);
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.35); // Scale appropriately from the high-res 250px frame
    this.player.body.setSize(120, 220);
    this.player.body.setOffset(60, 60);

    if (this.anims.exists('player_idle')) {
      this.player.play('player_idle');
    }

    this.physics.add.collider(this.player, this.platforms);
  }

  createNPCs() {
    this.npcs = this.physics.add.staticGroup();

    // 1. Pháp sư Eldrin at x: 220
    const wizard = this.add.container(220, this.groundY - 45);
    const wBg = this.add.circle(0, 0, 24, 0x6a1b9a);
    const wHat = this.add.triangle(0, -22, -18, 0, 18, 0, 0, -28, 0x9c27b0);
    const wIcon = this.add.text(0, -3, '🧙', { fontSize: '24px' }).setOrigin(0.5);
    const wLabel = this.add.text(0, -42, 'Pháp Sư Eldrin [E]', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '8px',
      color: '#ffd700',
      backgroundColor: '#111827'
    }).setOrigin(0.5);
    wizard.add([wBg, wHat, wIcon, wLabel]);
    wizard.npcType = 'wizard';
    this.wizardObj = wizard;

    // 2. Thợ rèn Arthur at x: 420
    const arthur = this.add.container(420, this.groundY - 45);
    const aBg = this.add.circle(0, 0, 24, 0xb71c1c);
    const aIcon = this.add.text(0, -3, '⚒️', { fontSize: '24px' }).setOrigin(0.5);
    const aLabel = this.add.text(0, -42, 'Cửa Hàng Arthur [E]', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '8px',
      color: '#00e5ff',
      backgroundColor: '#111827'
    }).setOrigin(0.5);
    arthur.add([aBg, aIcon, aLabel]);
    arthur.npcType = 'arthur';
    this.arthurObj = arthur;
  }

  createMonsters() {
    this.monsters = [];
    const monsterDataList = GAME_DATA.monsters;

    monsterDataList.forEach((mData, idx) => {
      // Check if monster already defeated in global state
      if (window.defeatedMonsters && window.defeatedMonsters.includes(mData.id)) {
        return;
      }

      let textureKey = 'mon_' + mData.id;
      if (!this.textures.exists(textureKey)) {
        if (mData.type === 'boss') textureKey = 'mon_boss_malakar';
        else if (mData.id.includes('orc')) textureKey = 'mon_orc_axe';
        else textureKey = 'mon_slime';
      }

      const monSprite = this.physics.add.sprite(mData.x, this.groundY - 60, textureKey);
      monSprite.setScale(mData.type === 'boss' ? 0.65 : 0.45);
      monSprite.setCollideWorldBounds(true);
      this.physics.add.collider(monSprite, this.platforms);

      // Monster info tag above head
      const tagColor = mData.type === 'boss' ? '#ff3366' : (mData.type === 'medium' ? '#ffaa00' : '#44ff88');
      const nameTag = this.add.text(mData.x, this.groundY - 120, `${idx + 1}. ${mData.name}`, {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '8px',
        color: tagColor,
        backgroundColor: '#0a0a16',
        padding: { x: 4, y: 3 }
      }).setOrigin(0.5);

      // Quest mark pulsing
      const questIcon = this.add.text(mData.x, this.groundY - 145, '⚔️', { fontSize: '14px' }).setOrigin(0.5);
      this.tweens.add({
        targets: questIcon,
        y: this.groundY - 155,
        duration: 700,
        yoyo: true,
        repeat: -1
      });

      monSprite.dataRef = mData;
      monSprite.nameTag = nameTag;
      monSprite.questIcon = questIcon;

      // Small patrol idle tween
      this.tweens.add({
        targets: monSprite,
        x: mData.x + 30,
        duration: 2000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });

      this.monsters.push(monSprite);
    });
  }

  handleDefeatedMonster(monsterId) {
    if (!window.defeatedMonsters) window.defeatedMonsters = [];
    if (!window.defeatedMonsters.includes(monsterId)) {
      window.defeatedMonsters.push(monsterId);
    }
    this.showChapterBanner(`ĐÃ DIỆT QUÁI THÀNH CÔNG!`);
  }

  update() {
    if (this.isDialogueOpen || this.isShopOpen) {
      this.player.setVelocityX(0);
      return;
    }

    const speed = GAME_DATA.player.speed;
    const isMovingLeft = this.cursors.left.isDown || this.keyA.isDown;
    const isMovingRight = this.cursors.right.isDown || this.keyD.isDown;
    const isJumping = this.cursors.up.isDown || this.keyW.isDown || this.keySpace.isDown;

    if (isMovingLeft) {
      this.player.setVelocityX(-speed);
      this.player.setFlipX(true);
      if (this.player.body.touching.down && this.anims.exists('player_run') && this.player.anims.currentAnim?.key !== 'player_run') {
        this.player.play('player_run');
      }
    } else if (isMovingRight) {
      this.player.setVelocityX(speed);
      this.player.setFlipX(false);
      if (this.player.body.touching.down && this.anims.exists('player_run') && this.player.anims.currentAnim?.key !== 'player_run') {
        this.player.play('player_run');
      }
    } else {
      this.player.setVelocityX(0);
      if (this.player.body.touching.down && this.anims.exists('player_idle') && this.player.anims.currentAnim?.key !== 'player_idle') {
        this.player.play('player_idle');
      }
    }

    // Jump
    if (isJumping && this.player.body.touching.down) {
      this.player.setVelocityY(-420);
      soundManager.playAttack();
    }

    // Proximity check with NPCs
    const distToWizard = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.wizardObj.x, this.wizardObj.y);
    const distToArthur = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.arthurObj.x, this.arthurObj.y);

    if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
      if (distToWizard < 80) {
        this.openDialogue(GAME_DATA.dialogues.introWizard);
      } else if (distToArthur < 80) {
        this.openShop();
      }
    }

    // Proximity check with Monsters -> Trigger Combat Scene
    this.monsters.forEach(m => {
      if (!m.active) return;
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, m.x, m.y);
      if (dist < 85) {
        this.startCombat(m);
      }
    });

    // Update tags position
    this.monsters.forEach(m => {
      if (m.nameTag) {
        m.nameTag.x = m.x;
        m.questIcon.x = m.x;
      }
    });

    // Update HUD stats
    this.updateHUD();
  }

  startCombat(monsterSprite) {
    soundManager.playBossRoar();
    this.cameras.main.flash(300, 255, 255, 255);
    this.scene.pause();
    this.scene.launch('CombatScene', {
      monsterData: monsterSprite.dataRef,
      playerX: this.player.x,
      question: GAME_DATA.questions[monsterSprite.dataRef.questionIndex]
    });
  }

  openDialogue(dialogueLines) {
    this.isDialogueOpen = true;
    soundManager.playClick();
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const dlgContainer = this.add.container(0, 0).setScrollFactor(0);
    const dlgBg = this.add.rectangle(width / 2, height - 120, width - 80, 160, 0x111628, 0.96);
    dlgBg.setStrokeStyle(3, 0xffd700);

    let currentIdx = 0;
    const speakerText = this.add.text(60, height - 185, dialogueLines[0].speaker, {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '12px',
      color: '#ffd700'
    });

    const bodyText = this.add.text(60, height - 150, dialogueLines[0].text, {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '11px',
      color: '#ffffff',
      wordWrap: { width: width - 120 }
    });

    const nextPrompt = this.add.text(width - 220, height - 55, 'NHẤP CHUỘT / [E] TIẾP...', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '9px',
      color: '#00e5ff'
    });

    dlgContainer.add([dlgBg, speakerText, bodyText, nextPrompt]);

    const advance = () => {
      soundManager.playClick();
      currentIdx++;
      if (currentIdx < dialogueLines.length) {
        speakerText.setText(dialogueLines[currentIdx].speaker);
        bodyText.setText(dialogueLines[currentIdx].text);
      } else {
        dlgContainer.destroy();
        this.isDialogueOpen = false;
      }
    };

    dlgBg.setInteractive({ useHandCursor: true });
    dlgBg.on('pointerdown', advance);
  }

  openShop() {
    this.isShopOpen = true;
    soundManager.playClick();
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const shopContainer = this.add.container(0, 0).setScrollFactor(0);
    const dimmer = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.75);
    dimmer.setInteractive();

    const panel = this.add.rectangle(width / 2, height / 2, 700, 440, 0x141829, 0.98);
    panel.setStrokeStyle(3, 0x00e5ff);

    const title = this.add.text(width / 2, height / 2 - 180, '🏪 CỬA HÀNG THỢ RÈN ARTHUR', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '14px',
      color: '#ffd700'
    }).setOrigin(0.5);

    shopContainer.add([dimmer, panel, title]);

    // Shop item list
    GAME_DATA.shopItems.forEach((item, idx) => {
      const iy = height / 2 - 110 + idx * 70;
      const itemBox = this.add.rectangle(width / 2, iy, 640, 56, 0x222a42);
      itemBox.setStrokeStyle(1, 0x4a6fa5);

      const nameText = this.add.text(width / 2 - 290, iy - 16, item.name, {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '11px',
        color: '#ffffff'
      });

      const descText = this.add.text(width / 2 - 290, iy + 6, item.desc, {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '9px',
        color: '#a0aec0'
      });

      const buyBtn = this.add.rectangle(width / 2 + 230, iy, 120, 36, 0xffaa00);
      buyBtn.setInteractive({ useHandCursor: true });
      const buyText = this.add.text(width / 2 + 230, iy, `${item.cost} VÀNG`, {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '9px',
        color: '#000000'
      }).setOrigin(0.5);

      buyBtn.on('pointerdown', () => {
        if (GAME_DATA.player.gold >= item.cost) {
          GAME_DATA.player.gold -= item.cost;
          soundManager.playCoin();
          if (item.effect.hp) GAME_DATA.player.hp = Math.min(GAME_DATA.player.maxHp, GAME_DATA.player.hp + item.effect.hp);
          if (item.effect.attack) GAME_DATA.player.attack += item.effect.attack;
          if (item.effect.defense) GAME_DATA.player.defense += item.effect.defense;
          buyText.setText("ĐÃ MUA!");
          this.time.delayedCall(800, () => buyText.setText(`${item.cost} VÀNG`));
          this.updateHUD();
        } else {
          soundManager.playWrong();
          buyText.setText("THIẾU VÀNG!");
          this.time.delayedCall(800, () => buyText.setText(`${item.cost} VÀNG`));
        }
      });

      shopContainer.add([itemBox, nameText, descText, buyBtn, buyText]);
    });

    // Close button
    const closeBtn = this.add.rectangle(width / 2, height / 2 + 185, 160, 36, 0xb71c1c);
    closeBtn.setInteractive({ useHandCursor: true });
    const closeText = this.add.text(width / 2, height / 2 + 185, 'ĐÓNG [X]', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '11px',
      color: '#ffffff'
    }).setOrigin(0.5);

    closeBtn.on('pointerdown', () => {
      soundManager.playClick();
      shopContainer.destroy();
      this.isShopOpen = false;
    });

    shopContainer.add([closeBtn, closeText]);
  }

  createHUD() {
    const width = this.cameras.main.width;
    this.hudGroup = this.add.container(0, 0).setScrollFactor(0);

    // Left HUD Frame: Avatar, HP/MP/EXP
    const hudBox = this.add.rectangle(140, 55, 250, 85, 0x0f1422, 0.9);
    hudBox.setStrokeStyle(2, 0x4a6fa5);

    // Avatar square
    const avatar = this.add.rectangle(45, 55, 45, 45, 0x1e3a8a);
    avatar.setStrokeStyle(2, 0xffd700);
    const avatarIcon = this.add.text(45, 55, '🛡️', { fontSize: '20px' }).setOrigin(0.5);

    // Heart icons (3 hearts)
    this.heartTexts = this.add.text(80, 24, '❤️❤️❤️', { fontSize: '13px' });

    // HP Bar
    this.hpBarBg = this.add.rectangle(170, 48, 120, 10, 0x330000);
    this.hpBarFill = this.add.rectangle(110, 48, 120, 10, 0x00ff66).setOrigin(0, 0.5);
    this.hpLabel = this.add.text(170, 48, '100/100', { fontFamily: '"Press Start 2P"', fontSize: '7px', color: '#fff' }).setOrigin(0.5);

    // MP Bar
    this.mpBarBg = this.add.rectangle(170, 64, 120, 10, 0x001133);
    this.mpBarFill = this.add.rectangle(110, 64, 120, 10, 0x00bfff).setOrigin(0, 0.5);

    // EXP Bar
    this.expBarFill = this.add.rectangle(110, 78, 120, 6, 0xffd700).setOrigin(0, 0.5);

    // Right HUD: Gold, Gems, Keys
    const curBox = this.add.rectangle(width - 120, 45, 210, 65, 0x0f1422, 0.9);
    curBox.setStrokeStyle(2, 0x4a6fa5);
    this.goldText = this.add.text(width - 210, 25, '🪙 50 VÀNG', { fontFamily: '"Press Start 2P"', fontSize: '8px', color: '#ffd700' });
    this.gemText = this.add.text(width - 210, 42, '💎 5 ĐÁ QUÝ', { fontFamily: '"Press Start 2P"', fontSize: '8px', color: '#00e5ff' });
    this.keyText = this.add.text(width - 210, 58, '🗝️ 1 CHÌA KHÓA', { fontFamily: '"Press Start 2P"', fontSize: '8px', color: '#ffffff' });

    // Hotbar (bottom center)
    const hotbarY = this.cameras.main.height - 35;
    const hotbarBox = this.add.rectangle(width / 2, hotbarY, 360, 45, 0x111827, 0.88);
    hotbarBox.setStrokeStyle(2, 0xffd700);

    const slots = ['[1] ⚔️', '[2] 🧪 Máu', '[3] 🧪 Mana', '[4] 📜 Sách', '[5] ⚡ Skill'];
    slots.forEach((s, i) => {
      this.add.text(width / 2 - 160 + i * 70, hotbarY, s, {
        fontFamily: '"Press Start 2P"',
        fontSize: '7px',
        color: '#ffffff'
      }).setOrigin(0.5).setScrollFactor(0);
    });

    this.hudGroup.add([
      hudBox, avatar, avatarIcon, this.heartTexts,
      this.hpBarBg, this.hpBarFill, this.hpLabel,
      this.mpBarBg, this.mpBarFill, this.expBarFill,
      curBox, this.goldText, this.gemText, this.keyText,
      hotbarBox
    ]);
  }

  updateHUD() {
    const p = GAME_DATA.player;
    // HP
    const hpRatio = Math.max(0, p.hp / p.maxHp);
    this.hpBarFill.width = 120 * hpRatio;
    this.hpLabel.setText(`${Math.max(0, Math.floor(p.hp))}/${p.maxHp}`);

    // Hearts
    let heartsStr = '';
    for (let i = 0; i < p.hearts; i++) heartsStr += '❤️';
    for (let i = p.hearts; i < 3; i++) heartsStr += '🖤';
    this.heartTexts.setText(heartsStr);

    // MP
    const mpRatio = Math.max(0, p.mp / p.maxMp);
    this.mpBarFill.width = 120 * mpRatio;

    // Currency
    this.goldText.setText(`🪙 ${p.gold} VÀNG`);
    this.gemText.setText(`💎 ${p.gems} ĐÁ QUÝ`);
  }

  showChapterBanner(text) {
    const width = this.cameras.main.width;
    const banner = this.add.container(width / 2, 160).setScrollFactor(0);
    const bg = this.add.rectangle(0, 0, 540, 50, 0x000000, 0.85);
    bg.setStrokeStyle(2, 0xffd700);
    const label = this.add.text(0, 0, text, {
      fontFamily: '"Press Start 2P"',
      fontSize: '12px',
      color: '#ffd700'
    }).setOrigin(0.5);

    banner.add([bg, label]);
    banner.setScale(0);

    this.tweens.add({
      targets: banner,
      scale: 1,
      duration: 350,
      ease: 'Back.easeOut',
      onComplete: () => {
        this.time.delayedCall(2200, () => {
          this.tweens.add({
            targets: banner,
            alpha: 0,
            y: 120,
            duration: 400,
            onComplete: () => banner.destroy()
          });
        });
      }
    });
  }
}
