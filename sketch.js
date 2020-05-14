const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const MouseConstraint = Matter.MouseConstraint;
const Mouse = Matter.Mouse;

var engine,world;
var particles = [];


function setup() {
  createCanvas(900,600);
  
  engine = Engine.create();
  world = engine.world; 

  // Creating a canvas mouse
  var canvasmouse = Mouse.create(canvas.elt);

  // Changing the pixel ratio according to the density of the screen
  canvasmouse.pixelRatio = pixelDensity();

  // Adding canvas mouse to the mouse constraint
  var op = {
    Mouse: canvasmouse
  }

  // Creating the mouse constraint
  mConstraint = MouseConstraint.create(engine, op);

  // Adding mConstraint to the world
  World.add(world,mConstraint);

  // Defining wood's options
  var wood_options = {
    isStatic: true
  }

  // Creating a wood
  wood = Bodies.rectangle(450,200,800,50,wood_options);
  
  // Adding the wood to the world
  World.add(world,wood);

  // Creating a particle
  particle = new Particle(450,500,50);
  
  // Adding the particle to the world
  World.add(world,particle);

  // Adding the properties to the chain with the help of a variable
  var constraint_options = {
     
    // Setting the chain start and end point
    bodyA: wood,
    bodyB: particle.body,

    // Setting the length of the chain
    length: 300,

    // Setting the stiffness of the chain
    stiffness: 0.4
  }

  // Creating a constraint
  var constre = Constraint.create(constraint_options);

  // Adding the constraint to the world
  World.add(world,constre);
}



// Main part of the code called
function draw() {

  // Colouring the background black
  background(0); 
  
  // Upadating the engine
  Engine.update(engine);

  // Displaying the text
  textSize(45);
  textFont("Algerian");
  fill("white");
  stroke("red");
  strokeWeight(3);
  text("Click on the particle to move it.", 50,50);
  text("Press 'spacebar' to stop the pendulum.", 0 , 100);

  // Making an ellipse at the particle's position
  particle.display();

  // Making a line from wood to the particle
  stroke("White");
  strokeWeight(10)
  line(wood.position.x,wood.position.y,particle.body.position.x,particle.body.position.y);

  // Creating a rectangle at the wood's position
  stroke("yellow");
  strokeWeight(4);
  rectMode(CENTER);
  rect(wood.position.x,wood.position.y,800,50);

  // Drawing a line between the mouse and the particle which is clicked 
  if(mConstraint.body) {
    var pos = mConstraint.body.position;
    var offset = mConstraint.constraint.pointB;
    var m = mConstraint.mouse.position;
    line(pos.x + offset.x,pos.y + offset.y,m.x,m.y)
  }

  if(keyDown(32)) {
    particle.body.position.x = 450;
    particle.body.position.y = 500;
  }
  
}
