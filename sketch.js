const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var tower;
var backgroundImg;

var canon;

var angle;

var mycannonball;
var ground;

var Cannonarray = [];
var boatarray = [];

var boatAnimation = [];
var boatSpriteData, boatSpriteSheet;

var brokenBoatAnimation = [];
var brokenBoatSpritedata, brokenBoatSpritesheet;

var explosion;

var isGameOver=false

var GameOver

var backgroundSound;
var PirateLaugh

var isLaughing=false;

var boxes = [24, 200, "sahil", -35, null, false];
console.log(boxes);
boxes.push(1000, 2000);
boxes.pop();
boxes.pop();
boxes.pop();
boxes.pop();

// var numbers=[[1,2,3],[4,5,6]]
// console.log(numbers[1][1])

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  boatSpriteData = loadJSON("./assets/boat/boat.json");
  boatSpriteSheet = loadImage("./assets/boat/boat.png");
  brokenBoatSpritedata = loadJSON("./assets/boat/broken_boat.json");
  brokenBoatSpritesheet = loadImage("./assets/boat/broken_boat.png");

  explosion = loadSound("./assets/cannon_explosion.mp3");
  backgroundSound = loadSound("./assets/background_music.mp3")
  PirateLaugh = loadSound("./assets/pirate_laugh.mp3")
}

function setup() {
  createCanvas(1000, 600);

  engine = Engine.create();
  world = engine.world;

  tower = new Tower(150, 350, 160, 300);
  ground = new Ground(0, height - 20, width * 2, 5);

  angle = -PI / 4;
  canon = new Cannon(180, 100, 250, 100, angle);

  var boatFrames = boatSpriteData.frames;
  // console.log(boatFrames)

  for (var i = 0; i < boatFrames.length; i += 1) {
    var pos = boatFrames[i].position;
    console.log(pos);

    var img = boatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    // console.log(img)
    boatAnimation.push(img);
  }

  var brokenFrames = brokenBoatSpritedata.frames;
  // console.log(boatFrames)

  for (var i = 0; i < brokenFrames.length; i += 1) {
    var pos = brokenFrames[i].position;
    // console.log(pos)

    var img = brokenBoatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    // console.log(img)
    brokenBoatAnimation.push(img);
  }
}

function draw() {
  background(51);
  Engine.update(engine);

  image(backgroundImg, 0, 0, width, height);
  tower.display();
  ground.display();
  canon.display();
  
  if(!backgroundSound.isPlaying()){
    backgroundSound.play()
    backgroundSound.setVolume(0.5)
  }
  showboats();
  for (var i = 0; i < Cannonarray.length; i += 1) { 
    showBalls(Cannonarray[i], i);
  for (var j = 0; j < boatarray.length; j += 1) {
    if (Cannonarray[i] !== "undefined" && boatarray[j] !== "undefined") {
      var collision = Matter.SAT.collides(
        Cannonarray[i].body,
        boatarray[j].body
      );
      if (collision.collided) {
        boatarray[j].remove(j);
        Matter.World.remove(world, Cannonarray[i].body);
        Cannonarray.splice(i, 1);
        i--;
      }
      }
    }
  }
}
function keyPressed() {
  if (keyCode === 32) {
    mycannonball = new CannonBall(canon.x, canon.y, 50);
    mycannonball.trajectory = [];
    Matter.Body.setAngle(mycannonball.body, canon.angle);
    Cannonarray.push(mycannonball);
    // console.log(Cannonarray);
  }
}

function showBalls(ball, index) {
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 80) {
    Matter.World.remove(world, ball.body);
    Cannonarray.splice(index, 1);
  }
}
function keyReleased() {
  if (keyCode === 32) {
    Cannonarray[Cannonarray.length - 1].shoot();
    explosion.play()
  }
}

function showboats() {
  if (boatarray.length > 0) {
    if (
      boatarray.length < 4 &&
      boatarray[boatarray.length - 1].body.position.x < width - 300
    ) {
      var position = [-130, -100, 40, -80];
      var p = random(position);
      boat = new Boat(width, height - 50, 150, 150, p, boatAnimation);
      boatarray.push(boat);
    }

    for (var i = 0; i < boatarray.length; i += 1) {
      boatarray[i].display();
      boatarray[i].animate();

      Matter.Body.setVelocity(boatarray[i].body, { x: -1, y: 0 });
     var collision=Matter.SAT.collides(tower.body,boatarray[i].body)
      if(collision.collided && !boat[i].isbroken){
        if(!isLaughing && !PirateLaugh.isPlaying()){
          PirateLaugh.play()
        isLaughing=true
        }
        isGameOver=true;

        GameOver()
      }
     


      


    }
  } else {
    boat = new Boat(width, height - 50, 150, 150, -100, boatAnimation);
    boatarray.push(boat);
  }
}

// var number=[2,3,5,7,11,13,17]
// console.log(number.splice(1,3))

function greeting() {
  console.log("hello students");
}



function GameOver(){
  swal({
    title:"GameOver",
    confirmButtonText:"play again",
    imageUrl:"https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
    imageSize:"150x150"

  },function(isConfirm){
    if(isConfirm){
      location.reload()


    }

  })

}


