class ThirdLevelBehavior extends Sup.Behavior {
  
  inGameMusicPlayer = new Sup.Audio.SoundPlayer("Sounds/Music/ThirdFourthLevelMusic", 0.8, { loop: true });  
  levelWon: boolean = false;
  
  awake() {
    Sup.ArcadePhysics2D.setGravity(0, -0.02);
    // start music
    this.inGameMusicPlayer.play();
  }

  update() {
    if (this.levelWon) {
      this.inGameMusicPlayer.stop();
    }
  }
}
Sup.registerBehavior(ThirdLevelBehavior);