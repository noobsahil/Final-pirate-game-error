class Boat {
  constructor(x, y, w, h, boatposition, animation) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.boatposition = boatposition;
    this.animation = animation;
    this.speed = 0.05;
    this.broken=false;
    var options = {
      isStatic: false,
      restitution: 0.6,
      frcition: 1.0,
      density: 1.0,
    };
    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h);
    World.add(world, this.body);
    this.image = loadImage("./assets/boat.png");
  }
  animate() {
    this.speed += 0.05;
  }

  remove(index){
      this.animation=brokenBoatAnimation;
      this.speed=0.05;
      this.width=300,
      this.height=300;

     setTimeout(()=>{
      Matter.World.remove(world, boatarray[index].body)
      boatarray.splice(index,1)
   }  ,2000)
      
  }

  
  
  display() {
    var angle = this.body.angle;
    var pos = this.body.position;
    // var index= floor(25%4)
    //  console.log(index)
    var index = floor(this.speed % this.animation.length);
    // console.log(index);
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.animation[index], 0, this.boatposition, this.w, this.h);
    pop();
  }
}

