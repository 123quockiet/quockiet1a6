// ============================================================================
// HẠT GIỐNG TRO TÀN – ĐẠI SỐ VECTƠ | PHASER 3 GAME CONFIG
// ============================================================================

window.addEventListener('load', () => {
  const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 1280,
    height: 720,
    pixelArt: true,
    roundPixels: true,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 880 },
        debug: false
      }
    },
    scene: [
      PreloadScene,
      MenuScene,
      GameScene,
      CombatScene,
      VictoryScene,
      GameOverScene
    ]
  };

  window.game = new Phaser.Game(config);

  // Mute button handler in DOM
  const muteBtn = document.getElementById('mute-btn');
  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      const isMuted = soundManager.toggleMute();
      muteBtn.textContent = isMuted ? '🔇 ĐÃ TẮT TIẾNG' : '🔊 ÂM THANH';
    });
  }
});
