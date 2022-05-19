var bg,bgImg;
var player, playerImg;
var coin,coinImg, starImg, coinGroup,starGroup;
var  enemy1, enemy2, enemy3, enemy4;
var score = 0;
var coins = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY
var gameOver, gameOverImg, restart,restartImg;
var shipGroup, ship;


function preload(){
bgImg = loadImage("background.png");
playerImg = loadImage("rocket1.png");
coinImg = loadImage("coin.png");
starImg = loadImage("star1.png");
enemy1 = loadImage("enemy.png");
enemy2 = loadImage("enemy2.png");
enemy3 = loadImage("enemy3.png");
enemy4 = loadImage("enemy4.png");
gameOverImg = loadImage("gameOver.png")
restartImg = loadImage("restart.png")


}
function setup(){
    createCanvas(400,400)

    bg = createSprite(200,200)
    bg.scale = 2.0
    bg.addImage(bgImg);
    bg.velocityY = 5;
  

    player = createSprite(200,300)
    player.addImage(playerImg);
    player.scale=0.2

    coinGroup = new Group();
    starGroup = new Group();
    shipGroup = new Group();

    gameOver = createSprite(200,200)
    gameOver.scale=0.5;
    gameOver.addImage(gameOverImg)
    gameOver.visible = false;

    restart = createSprite(200,240)
    restart.scale=0.5;
    restart.addImage(restartImg)
    restart.visible = false;
    
    




}
function draw(){
    background(220)
    drawSprites();
    push();
    textSize(20);
    stroke("yellow")
    text("Score:",20,20)
    text(score,100,20)
    text("Coins:",20,40)
    text(coins,100,40)
    pop();

   
    
   
    if(gameState === PLAY){
        score = score + Math.round(getFrameRate()/60);
        if(bg.y>400){
            bg.y = height/2
        }
        if(keyDown("right")){
            player.x = player.x+3
        }
        if(keyDown("left")){
            player.x = player.x-3
        }
        if(keyDown("space")){
            player.velocityY =  -10
          }
          player.velocityY = player.velocityY  +0.8
          var select_coins = Math.round(random(1,2))
          if(frameCount % 80 ===0){
              if(select_coins ==1){
                  createCoin();
              }else {
                  createStar();
              }
                
          }
          if(player.isTouching(coinGroup)|| player.isTouching(starGroup)){
            coins = coins+1
            coinGroup.destroyEach();
            starGroup.destroyEach();
        }
        createShip1();
        if( player.y>400|| player.isTouching(shipGroup)){
            gameState=END
        }

    }
    else if (gameState === END){
        bg.velocityY = 0;
        player.velocityY = 0;
        shipGroup.setVelocityYEach(0);
        coinGroup.setLifetimeEach(-1);
        starGroup.setLifetimeEach(-1);

        coinGroup.setVelocityYEach(0);
        starGroup.setVelocityYEach(0);
        gameOver.visible = true;
        restart.visible = true;

       
    }
    if(mousePressedOver(restart)){
        reset();
    }
   
    
   
    
    
   
}
function reset(){
    gameState = PLAY
    score=0;
    coins=0
    coinGroup.destroyEach();
    starGroup.destroyEach();
    shipGroup.destroyEach();
    bg.velocityY = 5;
    gameOver.visible=false
    restart.visible=false
    player.y = 300
    player.x =200



}

function createCoin(){
    coin =  createSprite(random(50, 350),40, 10, 10);
    coin.addImage(coinImg)
    coin.velocityY = 3
    coin.scale = 0.5;
    coin.lifetime = 150;
    coinGroup.add(coin)
}
function createStar(){
    var star =  createSprite(random(50, 350),40, 10, 10);
    star.addImage(starImg)
    star.velocityY = 3
    star.scale = 0.1;
    star.lifetime = 150;
    starGroup.add(star)
}
function createShip1(){
    if(frameCount%200===0){
         ship =  createSprite(random(50, 350),40, 10, 10);
        
        ship.velocityY = 3;
        ship.scale = 0.6;
        ship.lifetime = 150;
        
        var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: ship.addImage(enemy1);
              break;
      case 2: ship.addImage(enemy2);
              break;
      case 3: ship.addImage(enemy3);
              break;
      case 4: ship.addImage(enemy4);
              break;
              default:break;
    }
    shipGroup.add(ship)
   
}
}
