class CannonBall {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.trajectory = []

    var options = {
      isStatic: true,
      restitution: 0.8,
      friction: 1.0,
      density: 1.0,
    };

    this.body = Bodies.circle(this.x, this.y, this.r, options);
    World.add(world, this.body);

    this.image = loadImage("assets/cannonball.png");
  }

  shoot() {
    var Velocity = p5.Vector.fromAngle(canon.angle)
    Velocity.mult(20)
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, { x: Velocity.x, y: Velocity.y });
  }

  display() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.r, this.r);
    pop();


    
    if (this.body.velocity.x > 0 && this.body.position.x > 180) {
      var CannonBall_Position = [this.body.position.x, this.body.position.y]
      this.trajectory.push(CannonBall_Position)
      // console.log(this.trajectory)
    }

    for (var i = 0; i < this.trajectory.length; i += 1) {
      image(this.image, this.trajectory[i][0], this.trajectory[i][1], 5,5)
    }
  }
}
