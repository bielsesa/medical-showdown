class StartGame extends Sup.Behavior {
  
  inGameMusicPlayer = new Sup.Audio.SoundPlayer("Sounds/Music/MainMenuMusic", 0.8, { loop: true });
  countKosOpacity = 0;
  opacityInterval;
  countEnterPressed = 0;
  initialLevel;
  
  awake() {
    // get level where the player ended last run
    this.initialLevel = Sup.Storage.get("level");
    if (this.initialLevel == "" || this.initialLevel == undefined || this.initialLevel == null) this.initialLevel = "FirstLevel";
    
    // start music
    this.inGameMusicPlayer.play();
    
    // start showing art
    this.opacityInterval = Sup.setInterval(200, () => {
      if (this.countKosOpacity <= 5) {
        let currentOpacity = Sup.getActor("Kos").spriteRenderer.getOpacity();
        Sup.getActor("Kos").spriteRenderer.setOpacity(currentOpacity + 0.2);
        this.countKosOpacity++;
      } else {
        Sup.clearInterval(this.opacityInterval);
      }
    })
  }
  
  update() {
    if (Sup.Input.wasKeyJustPressed("RETURN")) {
      if (this.countEnterPressed == 0) {
        Sup.getActor("Main").setVisible(false);
        Sup.getActor("Kos").setVisible(false);
        Sup.getActor("KosSprite").setVisible(true);
        Sup.getActor("VirusSprite").setVisible(true);
        this.countEnterPressed++;
      } else {
        this.inGameMusicPlayer.stop();
        Sup.clearInterval(this.opacityInterval);
        Sup.loadScene(`Scenes/${this.initialLevel}`);
      }      
    }
  }
}
Sup.registerBehavior(StartGame);
