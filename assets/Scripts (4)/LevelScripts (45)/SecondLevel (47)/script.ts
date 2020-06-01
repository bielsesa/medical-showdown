class SecondLevelBehavior extends Sup.Behavior {
  
  inGameMusicPlayer = new Sup.Audio.SoundPlayer("Sounds/Music/FirstSecondLevelMusic", 0.8, { loop: true });  
  levelWon: boolean = false;
  pauseMenu: boolean = false;
  player: PlayerBehavior;  
  collectibleBodies: Sup.ArcadePhysics2D.Body[] = [];
  
  awake() {
    Sup.ArcadePhysics2D.setGravity(0, -0.02);
    // start music
    this.inGameMusicPlayer.play();
    this.player = Sup.getActor("Player").getBehavior(PlayerBehavior);
  }

  update() {  
    // check collectibles
    this.collectibleBodies = [];
    let collectibleActors = Sup.getActor("Collectibles").getChildren();
    for (let collectibleActor of collectibleActors) this.collectibleBodies.push(collectibleActor.arcadeBody2D);
    Sup.log(`Number of collectibles: ${this.collectibleBodies.length}`);
    
    if (this.collectibleBodies.length == 0) {
      this.levelWon = true;
    }
    
    if (Sup.Input.wasKeyJustPressed("ESCAPE")) {
      this.pauseMenu = true;
      Sup.getActor("PauseMenu").setVisible(true);
      this.player.setPaused(true);
    }
    
    if (this.pauseMenu && Sup.Input.wasKeyJustPressed("RETURN")) {
      this.pauseMenu = false;
      Sup.getActor("PauseMenu").setVisible(false);
      this.player.setPaused(false);
    }
    
    // es comprova si s'ha guanyat el nivell
    // i es pasa al següent
    if (this.levelWon) {
      this.inGameMusicPlayer.stop();
      Sup.loadScene("Scenes/ThirdLevel");
    }
  }
  
  setLevelWon() {
    this.levelWon = true;
  }
}
Sup.registerBehavior(SecondLevelBehavior);
