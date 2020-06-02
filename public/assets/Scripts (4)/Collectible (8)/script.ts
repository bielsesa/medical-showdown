class CollectibleBehavior extends Sup.Behavior {
  playerActor: Sup.Actor;
  playerBehavior: PlayerBehavior;
  
  awake() {
    this.playerActor = Sup.getActor("Player");
    this.playerBehavior = this.playerActor.getBehavior(PlayerBehavior);
  }

  update() {
    // check if the collectible collided with the player
    if (Sup.ArcadePhysics2D.intersects(this.actor.arcadeBody2D, this.playerActor.arcadeBody2D)) {
        // remove the collectible      
      Sup.Audio.playSound("Sounds/FX/CollectItem");
      this.actor.destroy();
    }
  }
}
Sup.registerBehavior(CollectibleBehavior);
