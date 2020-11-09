var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  //creating the canvas
  createCanvas(400, 400);
  
  //creating ground
  ground = createSprite(300, 360, 900, 10);
  ground.x = ground.width/2;
  ground.shapeColor = 'green';
  
  //creating monkey
  monkey = createSprite(50, 320, 40, 40);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  //making moving ground
  ground.velocityX = -3;
  
  //creating group for banana and obstacles
  FoodGroup = new Group();
  obstacleGroup = new Group();
  

  
}


function draw() {
  //color of the background
  background('skyblue');
  
  //monkey.debug = true;
  monkey.setCollider('circle', 0, 0, 300);
  
  //making ground infinite
  if (ground.x <= 0); {
    ground.x = ground.width/2;
  }
  
  //monkey should collide with the ground
  monkey.collide(ground);
  
  //checking the y position of the monkey
  //  console.log(monkey.y);
  
  //giving gravity to monkey
  monkey.velocityY = monkey.velocityY + 0.7;
  
  
  //making monkey to jump when space is pressed
  if (keyDown("space") && monkey.y > 324) {
    monkey.velocityY = -12;
  }
  
  if (obstacleGroup.isTouching(monkey)) {
    FoodGroup.velocity = 0;
    obstacleGroup.velocity = 0;
    ground.velocity = 0;
  }
  
  //these function were written below
  bananas();
  obstacles();
  
  //survival time
  stroke('black');
  textSize(30);
  fill('black');
  text("Survival Time: " + score, 90, 60);
  score = Math.ceil(frameCount/frameRate());
  
  
  
  
  
  drawSprites();
}

//creating function for banana
function bananas() {
  //banana will create after every 80 frames
  if (frameCount % 80 === 0) {
    banana = createSprite(420, Math.round(random(220, 300)), 20, 20);// creating bananas
    banana.addImage(bananaImage);  //adding image to the bananas
    banana.velocityX = -6;  //giving velocity to the bananas
    banana.scale = 0.1;  //resizing the banana
    banana.lifetime = 100;  //banana lifetime
    FoodGroup.add(banana);//adding banana to the food group
  }
}

//creating function for obstacle
function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(420, 340, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -6;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}



