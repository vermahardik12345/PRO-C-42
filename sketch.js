    var play=1;
    var end=0;
   
    var gamestate=play;
    var back,backimg;
    var monkey,monkeyimg;
    var score;
    var bananagroup,obstaclegroup;
    var bananaimg,obstacleimg;
    var invig;
    var gamestate=play;
    var hitcount; 
    var diesound,eatingsound;
    var restart,restartimg;
  
  function preload(){
  
    monkeyimg=loadAnimation("Monkey_01.png","Monkey_02.png",
    "Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")

   
    backimg=loadImage("jungle.jpg");
    
    
    bananaimg=loadImage("banana.png");
    
    
    obstacleimg=loadImage("stone.png");
    
    diesound=loadSound("the-price-is-right-losing-horn.mp3");
    eatingsound=loadSound("salamisound-8770086-skorpa-bite-off-and-chew.mp3");
    restartimg=loadImage("restart.png");
  }

function setup() {
  createCanvas(600, 600);

  
 
  
     
      back=createSprite(20,20,600,600);
      back.addImage(backimg);
      back.scale=2.0;
     
    

      
      monkey=createSprite(90,450,10,10);
      monkey.addAnimation("running",monkeyimg);
      monkey.scale=0.2;

      restart=createSprite(300,300,10,10);
      restart.addImage(restartimg);
      restart.scale=1;
      invig=createSprite(300,520,600,15);
      invig.visible=false;
       
       score=0;
       hitcount=0; 
  
      bananagroup=new Group();
      obstaclegroup=new Group();
    }

function draw() {
  background(220);

  
  
    if(gamestate===play){
      restart.visible=false;
      back.velocityX=-3;
    if(back.x<0){
      back.x=back.width/2;
    }  
     if(keyDown("space")&&monkey.y >= 200){
       monkey.velocityY=-15;
     }
     
      monkey.velocityY=monkey.velocityY+1.5;
      
      if(bananagroup.isTouching(monkey)){
        bananagroup.destroyEach();
        score=score+1;
        monkey.scale+=0.02;
        eatingsound.play();
      }
      
      if(obstaclegroup.isTouching(monkey)){
        obstaclegroup.destroyEach();
        hitcount=hitcount+1;
        monkey.scale-=0.02;
      }
      switch(score){
        case 6: monkey.scale=0.25;
          break;
        
        case 10:monkey.scale=0.3;
          break;
          
          case 12:monkey.scale=0.35;
          break;
          
          case 18:monkey.scale=0.4;
          break;
          
          case 25:monkey.scale=0.45;
          break;
          
          case 30:monkey.scale=0.5;
      }
      
      
       
      spawnbanana();
      spawnrock();
      
      if(hitcount===5){
        monkey.visible=false;
        gamestate=end;
      }
    }else if(gamestate===end){
      background("black");
     textSize(20);
      fill("blue");
      text("MONKEY DIED",300,300);
      back.visible=false;
      back.velocityX=0;
      bananagroup.destroyEach();
    }
    
  
  monkey.collide(invig);
  

    drawSprites();
     fill("red");
   textSize(20);
   text("BANANACOUNT:"+score,200,100);
   text("HITCOUNT:"+hitcount,200,150);
 push();
fill("blue");
  text("DO NOT GET HITTEN 5 TIMES ELSE YOU WILL BE OUT ",50,200);
pop();
}


function spawnbanana(){
  if(frameCount%150===0){
  banana=createSprite(450,50,10,10);
  banana.addImage(bananaimg);
  banana.scale=0.05;
  banana.y=Math.round(random(200,250));
  banana.velocityX=-3;
  banana.lifetime=200;
    monkey.depth=banana.depth+1;
  bananagroup.add(banana);
  }
}
function spawnrock(){
  if(frameCount%200===0){
  obstacle=createSprite(450,480,10,10);
  obstacle.collide(invig);  
  obstacle.addImage(obstacleimg);
  obstacle.scale=0.2;
  obstacle.x=Math.round(random(400,450));
  obstacle.velocityX=-3
  obstacle.lifetime=200;
  obstaclegroup.add(obstacle);
  }
}
