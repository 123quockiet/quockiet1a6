// ============================================================================
// HẠT GIỐNG TRO TÀN – ĐẠI SỐ VECTƠ | COMBAT QUIZ SCENE
// ============================================================================

class CombatScene extends Phaser.Scene {
  constructor() {
    super('CombatScene');
  }

  init(data) {
    this.monsterData = data.monsterData;
    this.playerX = data.playerX;
    this.question = data.question;
    this.timeLeft = 20;
    this.timerEvent = null;
    this.isAnswering = false;
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Dark duel backdrop overlay
    this.add.rectangle(width / 2, height / 2, width, height, 0x070913, 0.92);

    // Arena Floor
    const arenaFloor = this.add.rectangle(width / 2, 420, width - 80, 4, 0x3a4b73);

    // Dual combatants:
    // 1. Kael on the Left
    const playerTexture = this.textures.exists('player_idle_0') ? 'player_idle_0' : 'player_idle';
    this.playerSprite = this.add.sprite(220, 360, playerTexture);
    this.playerSprite.setScale(0.7);
    if (this.anims.exists('player_idle')) {
      this.playerSprite.play('player_idle');
    }

    const playerLabel = this.add.text(220, 240, 'Kael - Hiệp Sĩ', {
      fontFamily: '"Press Start 2P"',
      fontSize: '10px',
      color: '#00e5ff'
    }).setOrigin(0.5);

    // 2. Monster on the Right
    let monTexture = 'mon_' + this.monsterData.id;
    if (!this.textures.exists(monTexture)) {
      if (this.monsterData.type === 'boss') monTexture = 'mon_boss_malakar';
      else if (this.monsterData.id.includes('orc')) monTexture = 'mon_orc_axe';
      else monTexture = 'mon_slime';
    }

    this.monsterSprite = this.add.sprite(width - 240, 360, monTexture);
    this.monsterSprite.setScale(this.monsterData.type === 'boss' ? 0.9 : 0.65);
    this.monsterSprite.setFlipX(true);

    const monsterLabel = this.add.text(width - 240, 240, this.monsterData.name, {
      fontFamily: '"Press Start 2P"',
      fontSize: '10px',
      color: this.monsterData.type === 'boss' ? '#ff3366' : '#ffaa00'
    }).setOrigin(0.5);

    // Monster HP Bar in Combat
    this.monHpBarBg = this.add.rectangle(width - 240, 265, 180, 14, 0x330000);
    this.monHpBarFill = this.add.rectangle(width - 330, 265, 180, 14, 0xff2244).setOrigin(0, 0.5);
    this.monHpText = this.add.text(width - 240, 265, `${this.monsterData.maxHp} HP`, {
      fontFamily: '"Press Start 2P"',
      fontSize: '8px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // Boss Giant Banner if Boss Malakar
    if (this.monsterData.type === 'boss') {
      const bossBarBox = this.add.rectangle(width / 2, 45, 620, 40, 0x1a0510, 0.9);
      bossBarBox.setStrokeStyle(2, 0xff0044);
      this.add.text(width / 2, 45, '👑 TRÙM CUỐI: THẦN MA GIÁP MALAKAR', {
        fontFamily: '"Press Start 2P"',
        fontSize: '11px',
        color: '#ff2255'
      }).setOrigin(0.5);
    }

    // 3. Quiz Combat Box (Bottom half)
    this.createQuizUI();

    // 4. Start 20s Countdown Timer
    this.startTimer();
  }

  createQuizUI() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Quiz container box
    const boxY = height - 165;
    const qBox = this.add.rectangle(width / 2, boxY, width - 60, 240, 0x0e1322, 0.98);
    qBox.setStrokeStyle(3, 0xffd700);

    // Question header & Category tag
    this.add.text(width / 2, boxY - 95, `[ ${this.question.monsterTitle} ]`, {
      fontFamily: '"Press Start 2P"',
      fontSize: '11px',
      color: '#ffd700'
    }).setOrigin(0.5);

    // Timer display bar
    const timerW = 380;
    this.timerBarBg = this.add.rectangle(width / 2, boxY - 70, timerW, 10, 0x222233);
    this.timerBarFill = this.add.rectangle(width / 2 - timerW / 2, boxY - 70, timerW, 10, 0x00ff88).setOrigin(0, 0.5);
    this.timerText = this.add.text(width / 2 + timerW / 2 + 25, boxY - 70, '20s', {
      fontFamily: '"Press Start 2P"',
      fontSize: '9px',
      color: '#00ff88'
    }).setOrigin(0, 0.5);

    // Question Content Text
    this.qText = this.add.text(width / 2, boxY - 45, this.question.question, {
      fontFamily: '"Press Start 2P"',
      fontSize: '11px',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: width - 120 }
    }).setOrigin(0.5);

    // 4 Options A, B, C, D (2x2 Grid)
    this.optionButtons = [];
    const positions = [
      { x: width / 2 - 270, y: boxY + 15 },
      { x: width / 2 + 270, y: boxY + 15 },
      { x: width / 2 - 270, y: boxY + 68 },
      { x: width / 2 + 270, y: boxY + 68 }
    ];

    this.question.options.forEach((optText, idx) => {
      const pos = positions[idx];
      const btnBg = this.add.rectangle(pos.x, pos.y, 480, 42, 0x1b233a, 0.95);
      btnBg.setStrokeStyle(2, 0x4a6fa5);

      const label = this.add.text(pos.x - 225, pos.y, optText, {
        fontFamily: '"Press Start 2P"',
        fontSize: '9px',
        color: '#ffffff',
        align: 'left',
        wordWrap: { width: 450 }
      }).setOrigin(0, 0.5);

      btnBg.setInteractive({ useHandCursor: true });

      btnBg.on('pointerover', () => {
        if (this.isAnswering) return;
        btnBg.fillColor = 0x2d3a5e;
        btnBg.setStrokeStyle(3, 0xffd700);
        label.setColor('#ffd700');
        soundManager.playClick();
      });

      btnBg.on('pointerout', () => {
        if (this.isAnswering) return;
        btnBg.fillColor = 0x1b233a;
        btnBg.setStrokeStyle(2, 0x4a6fa5);
        label.setColor('#ffffff');
      });

      btnBg.on('pointerdown', () => {
        if (this.isAnswering) return;
        this.selectAnswer(idx, btnBg, label);
      });

      this.optionButtons.push({ bg: btnBg, label });
    });
  }

  startTimer() {
    this.timeLeft = 20;
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      repeat: 20,
      callback: () => {
        if (this.isAnswering) return;
        this.timeLeft--;
        const ratio = Math.max(0, this.timeLeft / 20);
        this.timerBarFill.width = 380 * ratio;

        if (this.timeLeft <= 5) {
          this.timerBarFill.fillColor = 0xff2244;
          this.timerText.setColor('#ff2244');
        } else if (this.timeLeft <= 10) {
          this.timerBarFill.fillColor = 0xffaa00;
          this.timerText.setColor('#ffaa00');
        }

        this.timerText.setText(`${this.timeLeft}s`);

        if (this.timeLeft <= 0) {
          this.handleTimeout();
        }
      }
    });
  }

  selectAnswer(selectedIdx, btnBg, label) {
    if (this.isAnswering) return;
    this.isAnswering = true;
    if (this.timerEvent) this.timerEvent.remove();
    const w = this.cameras.main.width;
    const h = this.cameras.main.height;

    const isCorrect = selectedIdx === this.question.correct;

    if (isCorrect) {
      // GREEN BORDER & [ĐÚNG!]
      btnBg.fillColor = 0x10552b;
      btnBg.setStrokeStyle(3, 0x00ff88);
      label.setText(`[ĐÚNG! ✔] ` + this.question.options[selectedIdx]);
      label.setColor('#00ff88');

      soundManager.playCorrect();
      this.time.delayedCall(400, () => this.executePlayerAttack());
    } else {
      // RED BORDER & [SAI!]
      btnBg.fillColor = 0x5a1020;
      btnBg.setStrokeStyle(3, 0xff2244);
      label.setText(`[SAI! ✖] ` + this.question.options[selectedIdx]);
      label.setColor('#ff2244');

      // Highlight the correct one
      const correctBtn = this.optionButtons[this.question.correct];
      correctBtn.bg.setStrokeStyle(3, 0x00ff88);
      correctBtn.label.setColor('#00ff88');

      soundManager.playWrong();
      this.time.delayedCall(500, () => this.executeMonsterAttack());
    }
  }

  handleTimeout() {
    this.isAnswering = true;
    this.timerText.setText("HẾT GIỜ!");
    soundManager.playWrong();

    // Show correct answer
    const correctBtn = this.optionButtons[this.question.correct];
    correctBtn.bg.setStrokeStyle(3, 0x00ff88);
    correctBtn.label.setColor('#00ff88');

    this.time.delayedCall(600, () => this.executeMonsterAttack());
  }

  executePlayerAttack() {
    // 1. Kael Attack animation & dash forward
    if (this.anims.exists('player_attack')) {
      this.playerSprite.play('player_attack');
    }
    soundManager.playAttack();

    this.tweens.add({
      targets: this.playerSprite,
      x: this.playerSprite.x + 80,
      duration: 150,
      yoyo: true,
      onYoyo: () => {
        // Spawn Slash VFX & particles on monster
        soundManager.playCrit();
        this.cameras.main.shake(250, 0.018);

        // Slash effect
        const slashFx = this.textures.exists('vfx_crit_slash') ? 'vfx_crit_slash' : 'vfx_slash';
        if (this.textures.exists(slashFx)) {
          const slash = this.add.image(this.monsterSprite.x, this.monsterSprite.y, slashFx);
          slash.setScale(0.8);
          this.tweens.add({
            targets: slash,
            alpha: 0,
            scale: 1.2,
            duration: 350,
            onComplete: () => slash.destroy()
          });
        }

        // Damage Floating Text
        const damageVal = this.monsterData.type === 'boss' ? 'CRIT! -320' : 'CRIT! -150';
        this.showFloatingDamage(this.monsterSprite.x, this.monsterSprite.y - 60, damageVal, '#ffd700');

        // Monster hurt flash
        this.monsterSprite.setTint(0xff0000);
        this.tweens.add({
          targets: this.monsterSprite,
          x: this.monsterSprite.x + 40,
          alpha: 0.2,
          duration: 300,
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            this.monsterSprite.clearTint();
            this.handleVictoryOverMonster();
          }
        });
      }
    });
  }

  executeMonsterAttack() {
    // Monster dashes forward & attacks
    soundManager.playMonsterAttack();

    this.tweens.add({
      targets: this.monsterSprite,
      x: this.monsterSprite.x - 80,
      duration: 180,
      yoyo: true,
      onYoyo: () => {
        soundManager.playHit();
        this.cameras.main.shake(300, 0.022);

        // Player hurt flash & knockback
        this.playerSprite.setTint(0xff0000);
        this.showFloatingDamage(this.playerSprite.x, this.playerSprite.y - 60, `-${this.monsterData.attack} HP`, '#ff2244');

        // Deduct player stats
        GAME_DATA.player.hp = Math.max(0, GAME_DATA.player.hp - this.monsterData.attack);
        if (GAME_DATA.player.hp <= 30 && GAME_DATA.player.hearts > 1) {
          GAME_DATA.player.hearts--;
        }

        this.tweens.add({
          targets: this.playerSprite,
          x: this.playerSprite.x - 50,
          duration: 250,
          yoyo: true,
          onComplete: () => {
            this.playerSprite.clearTint();
            // Check if player died
            if (GAME_DATA.player.hp <= 0) {
              this.handlePlayerDefeat();
            } else {
              // Retry question
              this.time.delayedCall(1200, () => {
                this.resetForRetry();
              });
            }
          }
        });
      }
    });
  }

  resetForRetry() {
    this.isAnswering = false;
    this.optionButtons.forEach((btn, idx) => {
      btn.bg.fillColor = 0x1b233a;
      btn.bg.setStrokeStyle(2, 0x4a6fa5);
      btn.label.setText(this.question.options[idx]);
      btn.label.setColor('#ffffff');
    });
    this.startTimer();
  }

  handleVictoryOverMonster() {
    // Reward Player
    GAME_DATA.player.gold += this.monsterData.goldReward;
    GAME_DATA.player.exp += this.monsterData.expReward;

    soundManager.playLevelUp();
    this.showFloatingDamage(this.playerSprite.x, this.playerSprite.y - 90, `+${this.monsterData.goldReward} VÀNG`, '#ffd700');

    // Level up check
    if (GAME_DATA.player.exp >= GAME_DATA.player.maxExp) {
      GAME_DATA.player.level++;
      GAME_DATA.player.exp = 0;
      GAME_DATA.player.maxExp += 50;
      GAME_DATA.player.attack += 10;
      GAME_DATA.player.hp = GAME_DATA.player.maxHp;
      this.showLevelUpNotification();
    }

    this.time.delayedCall(1600, () => {
      // If defeated Question 10 (Boss Malakar final question) -> Game Complete Victory!
      if (this.question.id === 10) {
        this.scene.stop('GameScene');
        this.scene.start('VictoryScene');
      } else {
        // Return to Game Scene
        this.scene.stop();
        this.scene.resume('GameScene');
        const gameScene = this.scene.get('GameScene');
        if (gameScene) {
          gameScene.handleDefeatedMonster(this.monsterData.id);
        }
      }
    });
  }

  handlePlayerDefeat() {
    this.cameras.main.fade(600, 0, 0, 0);
    this.time.delayedCall(650, () => {
      this.scene.stop('GameScene');
      this.scene.start('GameOverScene');
    });
  }

  showFloatingDamage(x, y, text, color) {
    const dmgText = this.add.text(x, y, text, {
      fontFamily: '"Press Start 2P"',
      fontSize: '13px',
      color: color,
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);

    this.tweens.add({
      targets: dmgText,
      y: y - 50,
      alpha: 0,
      duration: 1000,
      onComplete: () => dmgText.destroy()
    });
  }

  showLevelUpNotification() {
    const width = this.cameras.main.width;
    const banner = this.add.container(width / 2, 140);
    const bg = this.add.rectangle(0, 0, 360, 48, 0x111c38, 0.95);
    bg.setStrokeStyle(3, 0xffd700);
    const txt = this.add.text(0, 0, `⚡ LÊN CẤP! (LV.${GAME_DATA.player.level}) ⚡`, {
      fontFamily: '"Press Start 2P"',
      fontSize: '11px',
      color: '#ffd700'
    }).setOrigin(0.5);
    banner.add([bg, txt]);

    this.tweens.add({
      targets: banner,
      scale: 1.1,
      duration: 250,
      yoyo: true,
      repeat: 3,
      onComplete: () => banner.destroy()
    });
  }
}
