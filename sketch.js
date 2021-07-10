var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running, monkey_stopping
var banana, bananaImage, obstacle, obstacleImage
var  backgroundImage;
var FoodGroup, obstacleGroup
var invisibleground; 

var score = 0
var survivaltime;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png", "Monkey_09.png", "Monkey_10.png")
  monkey_stopping = loadAnimation("sprite_0.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage = loadImage("jungle.jpg");

}



function setup() {

  createCanvas(600, 400);

 

  ground = createSprite(350, 200, 900, 30);
  ground.velocityX = -2;
  //ground.x = ground.width / 2;
  ground.visible = true;
  ground.addImage(backgroundImage);
  ground.scale=0.7;
  
  invisibleground = createSprite(300,360,600,20);
  invisibleground.visible = false;
  
   monkey = createSprite(60, 250, 50, 50);
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("stopping", monkey_stopping);
  monkey.scale = 0.12;

  obstacleGroup = new Group();
  FoodGroup = new Group();
  
  score = 0;
  survivaltime = 0

}


function draw() {

  background("white");
  
  
  console.log(monkey.y);

 


  
 //Put score and survival time after draw Sprites, it is not visible otherwise
  
  
  if (gameState === PLAY) 
  {
    survivaltime = survivaltime + Math.round(getFrameRate()/60);
     
    if (ground.x < 250) 
    {

      ground.x = 360;
    }
      Spawnbanana();
      Spawnobstacles();

    if (keyDown("space") && monkey.y > 312) 
     {

      monkey.velocityY = -20;

     }

    monkey.velocityY = monkey.velocityY + 1.0
    
    if (monkey.isTouching(FoodGroup))
      {
        FoodGroup.destroyEach();
         score = score + 5;
        //Below line is resetting score, delete it.
        //when score 10,20,30, 40 scale monkey to bigger size.
    switch(score) 
       {
         case 10: monkey.scale = 0.21; //change this to .2 
           break;
         case 20: monkey.scale = 0.25; //change this to .25
           break;
         case 30: monkey.scale = 0.31; //change this to .3
           break;
         case 40: monkey.scale = 0.41; //change to .4
           break;
           default: break;
       }
      }
      
   if (obstacleGroup.isTouching(monkey))
     {
       monkey.scale = 0.12;
     //additional activity, keep a counter, first time scale monkey
    //second time gamestate=end
       
     }

  }
    else if (gameState === END)
       {
         
         obstacleGroup.setVelocityXEach(0);
         FoodGroup.setVelocityXEach(0);
         monkey.changeAnimation("stopping", monkey_stopping);
         ground.velocityX=0;
       }
 
         monkey.collide(invisibleground);


         drawSprites();
  
    stroke("black");
  textSize(20);
  text("Survival Time:" + survivaltime, 200, 50);
  
     stroke("black");
  textSize(20);
  text("Score:" + score, 400, 50);

}

function Spawnobstacles() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(650, 340, 50, 50);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -5;
    obstacle.setLifetime = 400;
    obstacle.scale = 0.1;

    obstacleGroup.add(obstacle);
  }
}

function Spawnbanana()
{
  
  if (frameCount % 120 === 0) 
  {
    var banana = createSprite(650,320,50,50)
    banana.addImage( bananaImage);
    banana.velocityX = -5;
    banana.setLifetime = 400;
    banana.scale = 0.1;
    
    banana.y = Math.round(random(120,200));
    
  
    
    FoodGroup.add(banana);
  }
}



