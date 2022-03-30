class Ground {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
  
      var options = {
        isStatic: true,
      };
  
      this.body = Bodies.rectangle(
        this.x,
        this.y,
        this.width,
        this.height,
        options
      );
      World.add(world, this.body);
  
    
    }
  
    display() {
      var position= this.body.position
      var angle=this.body.angle
  
  
      push()
      translate(position.x,position.y)
      rotate(angle)
      fill("white")
      rectMode(CENTER)
      rect(0,0,this.width,this.height)
      
      pop()
  }
  }
  