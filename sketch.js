var path,truck;
var object1,object2,object3;
var dustbin1,dustbin2,dustbin3;
var pathImg,truckimg,stoneimg,plantimg;
var ob1img,ob2img,ob3img

var gameOverImg,cycleBell;
var waste1,waste2,waste3
var dustbin1img,dustbin2img,dustbin3img
var ob1G, ob2G,ob3G,stoneGroup,plantGroup; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  dustbin1img = loadImage('images/blue.png')
  dustbin2img = loadImage('images/green.png')
  dustbin3img = loadImage('images/red.png')


}

function setup(){
  
createCanvas(1200,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
truck  = createSprite(70,150);
truck.addAnimation("truckrunning",truckimg);
truck.scale=0.07;
  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
ob1G = new Group();
ob2G = new Group();
ob3G = new Group();
stoneGroup = new Group();
plantGroup = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  dustbin1 = createSprite
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   truck.y = World.mouseY;
  
   edges= createEdgeSprites();
   truck .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      obstacle1();
    } else if (select_oppPlayer == 2) {
      obstacle2();
    } else {
      obstacle3();
    }
  }
  
   if(ob1G.isTouching(truck)){
     gameState = END;
     object1.velocityY = 0;
     object1.addAnimation("opponentobject1",oppPink2Img);
    }
    
    if(ob2G.isTouching(truck)){
      gameState = END;
      object2.velocityY = 0;
      object2.addAnimation("opponentobject2",oppYellow2Img);
    }
    
    if(redCG.isTouching(truck)){
      gameState = END;
      object3.velocityY = 0;
      object3.addAnimation("opponentobject3",oppRed2Img);
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    path.velocityX = 0;
    truck.velocityY = 0;
    truck.addAnimation("SahilRunning",mainRacerImg2);
  
    ob1G.setVelocityXEach(0);
    ob1G.setLifetimeEach(-1);
  
    ob2G.setVelocityXEach(0);
    ob2G.setLifetimeEach(-1);
  
   ob3G.setVelocityXEach(0);
   ob3G.setLifetimeEach(-1);
    
    if(keyDown("UP_ARROW")) {
      reset();
    }
}
}

function obstacle1(){
        object1 =createSprite(1100,Math.round(random(50, 250)));
        object1.scale =0.06;
        object1.velocityX = -(6 + 2*distance/150);
        object1.addAnimation("opponentobject1",oppPink1Img);
        object1.setLifetime=170;
        ob1G.add(object1);
}

function obstacle2(){
        object2 =createSprite(1100,Math.round(random(50, 250)));
        object2.scale =0.06;
        object2.velocityX = -(6 + 2*distance/150);
        object2.addAnimation("opponentobject2",oppYellow1Img);
        object2.setLifetime=170;
        ob2G.add(object2);
}

function obstacle3(){
        object3 =createSprite(1100,Math.round(random(50, 250)));
        object3.scale =0.06;
        object3.velocityX = -(6 + 2*distance/150);
        object3.addAnimation("opponentobject3",oppRed1Img);
        object3.setLifetime=170;
       ob3G.add(object3);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  truck.addAnimation("SahilRunning",truckimg);
  
  ob1G.destroyEach();
  ob2G.destroyEach();
 ob3G.destroyEach();
  
  distance = 0;
}