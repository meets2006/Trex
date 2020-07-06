var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage, cloudimg, rand, o1, o2, o3, o4, o5, o6, rand1, PLAY=0, END=1, Gamestate=PLAY, count, obstaclesGroup, cloudsGroup, jump,die,cp;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloudimg = loadImage("cloud.png");
  groundImage = loadImage("ground2.png")
  o1 = loadImage("obstacle1.png");
  o2 = loadImage("obstacle2.png");
  o3 = loadImage("obstacle3.png");
  o4 = loadImage("obstacle4.png");
  o5 = loadImage("obstacle5.png");
  o6 = loadImage("obstacle6.png");
  
 jump= loadSound('jump.mp3');
  cp = loadSound('checkPoint.mp3');
  die = loadSound('die.mp3');
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  count = 0;
  
  
  obstaclesGroup=createGroup();
  cloudsGroup=createGroup();
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
}

function draw() {
  background(200);
  text("Score: " + count, 400,80);
  if (Gamestate===PLAY)
  {
     ground.velocityX = -2;
     if(keyDown("space") && trex.y>161) {
    trex.velocityY = -10;
       jump.play();
  }
  
    if (count>0 && count%100===0)
    {
      cp.play();
    }
    count=Math.round(frameCount/4);
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
    if (obstaclesGroup.isTouching(trex))
    {
      Gamestate=END;
      die.play();
    }
   spawnClouds();
  spawnObstacles();
  } else if (Gamestate===END)
  {
    trex.velocityY=0;
    ground.velocityX=0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
  }
  console.log(trex.y)
  
  trex.collide(invisibleGround);
 
  drawSprites();
}


function spawnClouds()
{
  if (frameCount%60===0)
  {
    var cloud = createSprite(600,100,10,10);
    cloud.addImage("cloud",cloudimg);
    cloud.velocityX=-3;
    rand=random(50,150);
    cloud.y=rand;
    trex.depth=cloud.depth+1;
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles()
{
  if (frameCount%70===0)
  {
    var obstacle = createSprite(600,170,10,10);
    rand1=Math.round(random(1,6));
    obstacle.velocityX=-3;
    obstacle.scale=0.5;
    obstaclesGroup.add(obstacle);
    switch (rand1)
    {
        case 1: obstacle.addImage("o11",o1)
        break;
        
        case 2: obstacle.addImage("o22",o2)
        break;
        
        case 3: obstacle.addImage("o33",o3)
        break;
        
        case 4: obstacle.addImage("o44",o4)
        break;
        
        case 5: obstacle.addImage("o55",o5)
        break;
        
        case 6: obstacle.addImage("o66", o6)
        break;
        
        default:break;
    }
   
  }
}
    