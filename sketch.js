var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var jumpingGhost, ghostImg2
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var ground
var leftBoundary, rightBoundary
var play, end
var monster
var monstersGroup, monster
var youwon, gameover


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  ghostImg2 = loadImage("ghost-jumping.png");
  monsterImg = loadImage("monster.png");
  gameoverImg = loadImage("GameOver.png");
  youwonImg = loadImage("YouWon.png");

}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300, 500)
  ghost.addImage("ghost", ghostImg)
  ghost.scale = .4
  
  ground = createSprite(300,580,600,10)
  ground.visible = false

  door = createSprite(-300, -85)
  door.addImage("door", doorImg)
  door.scale = 1.3

  monster = createSprite(-100,-200,30,20);
  monster.addImage("monster", monsterImg)
  monster.scale  = 0.05

  gameover = createSprite(300,300,50,50);
  gameover.addImage("gameover", gameoverImg)
  gameover.scale = 0.2
  gameover.visible = false

  youwon = createSprite(300,300,50,50);
  youwon.addImage("youwon", youwonImg)
  youwon.scale = 0.3
  youwon.visible = false

  doorsGroup = createGroup()
  monstersGroup = createGroup()

  leftBoundary = createSprite(10,300,100,600);
  leftBoundary.visible = false 

  rightBoundary = createSprite(580,300,100,600);
  rightBoundary.visible = false

  //ghost.debug = true
  ghost.setCollider("rectangle",-40,-40,60,100)

  play = true
}

function draw() {
  background(200);
  ghost.x = World.mouseX
  ghost.y = World.mouseY
  
  edges = createEdgeSprites()
  ghost.collide(edges[3])
  ghost.collide(leftBoundary)
  ghost.collide(rightBoundary)

  //spookySound.play()
  
  spawnDoors();

  spawnMonsters();


  

  if(tower.y > 400){
      tower.y = 300
    }
    ghost.collide(ground)
    drawSprites()
    
    if(ghost.isTouching(monster)){
      gamestate = "endLoser";
      gameover.visible = true
      drawSprites()
      tower.velocityY = 0
      doorsGroup.destoryEach()
      doorsGroup.destoryEach()
      
     }   

     if(ghost.isTouching(door)){
       gamestate = "endWinner";
       youwon.visible = true
       drawSprites()
       play = true
       doorsGroup.destoryEach()
       doorsGroup.destoryEach()
      
     }

     function spawnMonsters(){
       /*
       if (frameCount % 60 === 0){
         var monster = createSprite(300,300,30,20)

         var rand = Math.round(random(1,4));
         switch(rand){
           case 1: monster = monster1;
                   break;
           case 2: monster = monster2;
                   break;
           case 3: monster = monster3;
                   break;
           case 4: monster = monster4;
                   break;
           default: break;
         }
         monster.scale = 0.05;
         monster.lifetime = 300;

         monstersGroup.add(monster);
   }
   */
   if (frameCount % 60 === 0) {
    monster = createSprite(300,0,30,30);
    monster.x = Math.round(random(50,500));
    monster.addImage(monsterImg);
    monster.scale = 0.05
    monster.velocityY = 3
    monster.lifetime = 134;
    monstersGroup.add(monster);
  }
  }

  function spawnDoors(){
    if (frameCount % 150 === 0) {
      door = createSprite(300,0,30,30);
      door.x = Math.round(random(50,500));
      door.addImage(doorImg);
      door.scale = 1.3
      door.velocityY = 3
      door.lifetime = 134;
      doorsGroup.add(door);
    }
  }
}
