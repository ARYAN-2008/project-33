var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions =[];
var divisionHeight=300;
var score =0;
function setup() {
  createCanvas(480, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  for (var k = 0; k <=80; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  for (var j = 75; j <=width; j=j+50) { 
    plinkos.push(new Plinko(j,75));
  }

  for (var j = 50; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,175));
  }

  for(var j = 75; j<=width-10; j=j=50)
  {
    plinkos.push(new Plinko(j,275))
  }
  
  //create 4th row of plinko objects
  for(var j = 50; j <= width-10; j=j+50)
  {
    plinkos.push(new Plinko(j,375))
  }

  if(frameCounr%60===0){
    particles.push(new Particle(random(width/2-10), random(width/2+10), 10, 10))
  }
  
    
}
 


function draw() {
  background("black");
  textSize(20)
  text("score",+score, 20, 20)
  fill("white");

  text(mouseX + "," + mouseY, 20, 50);
  textSize(35)
  text(" 500 ", 5, 550);
  text(" 500 ", 80, 550);
  text(" 500 ", 160, 550);
  text(" 500 ", 240, 550);
  text(" 100 ", 320, 550);
  text(" 100 ", 400, 550);
  text(" 100 ", 480, 550);
  text(" 200 ", 560, 550);
  text(" 200 ", 640, 550);
  text(" 200 ", 720, 550);
 
  Engine.update(engine);
  ground.display();

  if ( gameState =="end") {
    
    textSize(100);
    text("GameOver", 150, 250);
    
  }
  
  //display the plinkos 
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();   
  }
   
  //display the divisions
  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  for (var j = 0; j < particles.length; j++) {
   
    particles[j].display();


    if(ball!==null){
      ball.display();

      if (ball.body.position.y>760){
        if(ball.body.position.x<300){
          score=score+500;
          ball=null;
          if(count>=5)gameState="end";
        }
      }
    }
    else if (ball.body.position.x < 600 && ball.body.position.x > 301 ) 
    {
          score = score + 100;
          ball=null;
          if ( count>= 5) gameState ="end";

    }
    else if (ball.body.position.x < 900 && ball.body.position.x > 601 )
    {
          score = score + 200;
          ball=null;
          if ( count>= 5)  gameState ="end";
  }
 }  
}

function mousePressed()
{
  if(gameState!=="end")
  {
      count++;
     ball=new Ball(mouseX, 10, 10, 10); 
  }   
}