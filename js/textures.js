// ============================================================================
// HẠT GIỐNG TRO TÀN – ĐẠI SỐ VECTƠ | TEXTURE SLICER & PIXEL GENERATOR
// ============================================================================

window.TextureHelper = {
  // Crop a rectangle from an image and add it as a new Phaser Texture
  cropTexture(scene, sourceKey, newKey, x, y, width, height) {
    if (!scene.textures.exists(sourceKey)) return false;
    const canvas = scene.textures.createCanvas(newKey, width, height);
    if (!canvas) return false;
    const ctx = canvas.getContext();
    const sourceImage = scene.textures.get(sourceKey).getSourceImage();
    ctx.drawImage(sourceImage, x, y, width, height, 0, 0, width, height);
    canvas.refresh();
    return true;
  },

  // Setup all sub-textures from the 2752x1536 sheets
  setupSprites(scene) {
    console.log("Setting up sprites and sliced textures...");

    // 1. Player Animations frames from player.png (2752 x 1536, ~11 cols x 5 rows)
    const frameW = Math.floor(2752 / 11); // ~250px
    const frameH = Math.floor(1536 / 5);  // ~307px

    // Extract Idle frames (Row 0)
    for (let i = 0; i < 6; i++) {
      this.cropTexture(scene, 'asset_player', `player_idle_${i}`, i * frameW, 0 * frameH, frameW, frameH);
    }
    // Extract Walk / Run frames (Row 1 & 2)
    for (let i = 0; i < 6; i++) {
      this.cropTexture(scene, 'asset_player', `player_run_${i}`, i * frameW, 1 * frameH, frameW, frameH);
    }
    // Extract Attack frames (Row 3)
    for (let i = 0; i < 4; i++) {
      this.cropTexture(scene, 'asset_player', `player_attack_${i}`, (i + 3) * frameW, 3 * frameH, frameW, frameH);
    }
    // Hurt & Dead (Row 4)
    this.cropTexture(scene, 'asset_player', 'player_hurt', 8 * frameW, 4 * frameH, frameW, frameH);
    this.cropTexture(scene, 'asset_dead', 'player_dead', 10 * frameW, 4 * frameH, frameW, frameH);

    // 2. Map backgrounds & tiles from map.png (2752 x 1536)
    // Mountain parallax background (Top right)
    this.cropTexture(scene, 'asset_map', 'bg_mountains', 1376, 0, 1376, 600);
    // Forest backdrop (Top left)
    this.cropTexture(scene, 'asset_map', 'bg_forest', 0, 0, 1376, 600);
    // Ground Grass Platform Tile
    this.cropTexture(scene, 'asset_map', 'tile_grass', 0, 600, 250, 150);
    // Cave entrance
    this.cropTexture(scene, 'asset_map', 'prop_cave', 550, 950, 300, 250);
    // Spikes trap
    this.cropTexture(scene, 'asset_map', 'prop_spikes', 1376, 1200, 500, 200);
    // Chest
    this.cropTexture(scene, 'asset_map', 'prop_chest', 1930, 750, 150, 120);

    // 3. Monsters & Boss from monster_vfx.png (2752 x 1536)
    // Slime (green blob)
    this.cropTexture(scene, 'asset_monster_vfx', 'mon_slime', 950, 850, 250, 200);
    // Mushroom (poison spitter)
    this.cropTexture(scene, 'asset_monster_vfx', 'mon_mushroom', 50, 250, 180, 200);
    // Spider
    this.cropTexture(scene, 'asset_monster_vfx', 'mon_spider', 720, 250, 180, 180);
    // Bat
    this.cropTexture(scene, 'asset_monster_vfx', 'mon_bat', 1380, 240, 180, 180);
    // Panther
    this.cropTexture(scene, 'asset_monster_vfx', 'mon_panther', 920, 420, 220, 180);
    // Orc Axeman
    this.cropTexture(scene, 'asset_monster_vfx', 'mon_orc_axe', 1400, 420, 200, 220);
    // Orc Enraged (Red flame)
    this.cropTexture(scene, 'asset_monster_vfx', 'mon_orc_enrage', 450, 780, 220, 250);
    // Orc Leader (Big war hammer)
    this.cropTexture(scene, 'asset_monster_vfx', 'mon_orc_leader', 2450, 420, 250, 260);
    // Boss Malakar (Bottom row)
    this.cropTexture(scene, 'asset_monster_vfx', 'mon_boss_malakar', 60, 1250, 250, 270);
    this.cropTexture(scene, 'asset_monster_vfx', 'boss_slash_fx', 250, 1250, 700, 270);
    this.cropTexture(scene, 'asset_monster_vfx', 'boss_abyssal_spike', 1000, 1250, 800, 270);
    this.cropTexture(scene, 'asset_monster_vfx', 'boss_shield', 1850, 1250, 850, 270);

    // 4. Combat VFX from combat_vfx.png
    this.cropTexture(scene, 'asset_combat_vfx', 'vfx_slash', 100, 300, 400, 200);
    this.cropTexture(scene, 'asset_combat_vfx', 'vfx_crit_slash', 1200, 280, 500, 250);
    this.cropTexture(scene, 'asset_combat_vfx', 'vfx_fire', 100, 680, 300, 200);
    this.cropTexture(scene, 'asset_combat_vfx', 'vfx_ice_lightning', 1000, 680, 400, 200);
    this.cropTexture(scene, 'asset_combat_vfx', 'vfx_poison', 2000, 680, 400, 200);
    this.cropTexture(scene, 'asset_combat_vfx', 'player_hurt_fx', 400, 1150, 350, 250);
    this.cropTexture(scene, 'asset_combat_vfx', 'player_knockback_fx', 950, 1150, 750, 250);

    // 5. Boss Bar from ui_notif.png
    this.cropTexture(scene, 'asset_ui_notif', 'ui_boss_bar', 50, 1050, 1900, 350);

    // Register Phaser Animations
    this.createAnimations(scene);
  },

  createAnimations(scene) {
    if (!scene.anims.exists('player_idle')) {
      scene.anims.create({
        key: 'player_idle',
        frames: [
          { key: 'player_idle_0' },
          { key: 'player_idle_1' },
          { key: 'player_idle_2' },
          { key: 'player_idle_3' },
          { key: 'player_idle_4' },
          { key: 'player_idle_5' }
        ].filter(f => scene.textures.exists(f.key)),
        frameRate: 6,
        repeat: -1
      });
    }

    if (!scene.anims.exists('player_run')) {
      scene.anims.create({
        key: 'player_run',
        frames: [
          { key: 'player_run_0' },
          { key: 'player_run_1' },
          { key: 'player_run_2' },
          { key: 'player_run_3' },
          { key: 'player_run_4' },
          { key: 'player_run_5' }
        ].filter(f => scene.textures.exists(f.key)),
        frameRate: 10,
        repeat: -1
      });
    }

    if (!scene.anims.exists('player_attack')) {
      scene.anims.create({
        key: 'player_attack',
        frames: [
          { key: 'player_attack_0' },
          { key: 'player_attack_1' },
          { key: 'player_attack_2' },
          { key: 'player_attack_3' }
        ].filter(f => scene.textures.exists(f.key)),
        frameRate: 12,
        repeat: 0
      });
    }
  },

  // Generates high quality pixel art canvas fallback if asset file is missing
  generateFallbackTextures(scene) {
    // Player fallback
    if (!scene.textures.exists('player_idle_0')) {
      const c = scene.textures.createCanvas('player_idle_0', 48, 64);
      const ctx = c.getContext();
      // Body (blue armor)
      ctx.fillStyle = '#2b5c8f'; ctx.fillRect(14, 20, 20, 28);
      // Red cape
      ctx.fillStyle = '#c0282b'; ctx.fillRect(8, 22, 10, 26);
      // Helmet / head
      ctx.fillStyle = '#8ea4c8'; ctx.fillRect(16, 8, 16, 16);
      ctx.fillStyle = '#ffccaa'; ctx.fillRect(18, 14, 12, 8); // face
      // Sword
      ctx.fillStyle = '#d0d8e8'; ctx.fillRect(34, 18, 4, 30);
      ctx.fillStyle = '#e5a823'; ctx.fillRect(32, 36, 8, 4); // crossguard
      c.refresh();
    }

    // Slime fallback
    if (!scene.textures.exists('mon_slime')) {
      const c = scene.textures.createCanvas('mon_slime', 48, 40);
      const ctx = c.getContext();
      ctx.fillStyle = '#22cc44';
      ctx.beginPath();
      ctx.arc(24, 26, 18, Math.PI, 0, false);
      ctx.fill();
      ctx.fillRect(6, 26, 36, 10);
      // Eyes
      ctx.fillStyle = '#ffffff'; ctx.fillRect(16, 18, 4, 6); ctx.fillRect(28, 18, 4, 6);
      ctx.fillStyle = '#111111'; ctx.fillRect(18, 20, 2, 4); ctx.fillRect(30, 20, 2, 4);
      c.refresh();
    }
  }
};
