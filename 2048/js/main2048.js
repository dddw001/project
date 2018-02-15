var board=new Array();
var score=0;
var hasConflicted=new Array();//是否已经移动

$(document).ready(function(){
  newgame();
});

function newgame(){
  //初始化棋盘格
  init();
  //在随机2个格子生成数字
  genrateOneNum();
  genrateOneNum();
}

function init(){
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      var gridCell=$("#grid-cell-"+i+"-"+j);     
      gridCell.css('top',getPosTop(i,j));
      gridCell.css('left',getPosLeft(i,j));      
    }
  }

  //把board变成二维数组 并初始化
  for(var i=0;i<4;i++){
    board[i]=new Array();
    hasConflicted[i]=new Array();
    for(var j=0;j<4;j++){
      board[i][j]=0;//当为0时，不显示
      hasConflicted[i][j]=false;
    }
  }

  //根据board数组中的值，对棋盘上的数字进行改变
  updateBoardView();

  score=0;
  updateScore(score);
}

//用户每次操作之后都要更新棋盘
function updateBoardView(){
  $(".number-cell").remove();
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>')
      var theNumberCell=$("#number-cell-"+i+"-"+j);

      if(board[i][j]==0){//此时theNumberCell不显示
        theNumberCell.css('width','0px');
        theNumberCell.css('height','0px');
        theNumberCell.css('top',getPosTop(i,j)+50);
        theNumberCell.css('left',getPosLeft(i,j)+50);  
      }
      else{//theNumberCell把相应的gridCell覆盖
        theNumberCell.css('width','100px');
        theNumberCell.css('height','100px');
        theNumberCell.css('top',getPosTop(i,j));
        theNumberCell.css('left',getPosLeft(i,j));  
        theNumberCell.css('backgroundColor',getNumberBackgroundColor(board[i][j]));
        theNumberCell.css('color',getNumberColor(board[i][j]));
        theNumberCell.text(board[i][j]);
      }

      hasConflicted[i][j]=false;
    }
  }
}

function genrateOneNum(){
  //先判断是否有空格可以生成数字
  if(nospace(board)){
    return false;
  }

  //随机一个位置
  var randx=parseInt(Math.floor(Math.random()*4));
  var randy=parseInt(Math.floor(Math.random()*4));

  //优化产生随机数
  var times=0;

  //判断这个位置上是否有不为0 的数字
  while(times<50){
    if(board[randx][randy]==0){
      break;
    }
    randx=parseInt(Math.floor(Math.random()*4));
    randy=parseInt(Math.floor(Math.random()*4));
    times++;
  }

  if(times==50){
    for(var i=0;i<4;i++){
      for(var j=0;j<4;j++){
        if(board[i][j]==0){
          randx=i;
          randy=j;
        }
      }
    }
  }

  //随机一个数字 2或4 55概率
  var randNum=Math.random()<0.5?2:4;
  //在随机位置显示随机数字
  board[randx][randy]=randNum;
  showNumberWithAnimation(randx,randy,randNum);
  return true;
}

$(document).keydown(function(event){
  switch(event.keyCode){
    case 37://left
      //当玩家按下左键，首先判断能否向左移动，然后生成一个随机数在一个随机位置，然后判断游戏是否结束
      if(moveLeft()){
        setTimeout("genrateOneNum()",210);
        setTimeout("isgameover()",300);
      }
      break;
    case 38://up
      if(moveUp()){
        setTimeout("genrateOneNum()",210);
        setTimeout("isgameover()",300);
      }
      break;
    case 39://right
      if(moveRight()){
        setTimeout("genrateOneNum()",210);
        setTimeout("isgameover()",300);
      }
      break;
    case 40://down
      if(moveDown()){
        setTimeout("genrateOneNum()",210);
        setTimeout("isgameover()",300);
      }
      break;
    default:
      break;
  }
})

function isgameover(){
  if(nospace(board)&&nomove(board)){
    gameover();
  }
}

function gameover(){
  alert("gameover!");
}

function moveLeft(){
  if(!canMoveLeft(board)){
    return false;
  }

  for(var i=0;i<4;i++){
    for(var j=1;j<4;j++){
      if(board[i][j]!=0){
        for(var k=0;k<j;k++){
          if(board[i][k]==0&&noBlock(i,k,j,board)){
            showMoveAnimation(i,j,i,k);
            board[i][k]=board[i][j];
            board[i][j]=0;
            continue;
          }
          else if(board[i][k]==board[i][j]&&noBlock(i,k,j,board)&&!hasConflicted[i][k]){
            showMoveAnimation(i,j,i,k);
            board[i][k]+=board[i][j];
            board[i][j]=0;

            score+=board[i][k];
            updateScore(score);

            hasConflicted[i][k]=true;
            continue;
          }
        }
      }
    }
  }

  setTimeout("updateBoardView()",200);
  return true;
}

function moveRight(){
  if(!canMoveRight(board)){
    return false;
  }

  for(var i=0;i<4;i++){
    for(var j=0;j<3;j++){
      if(board[i][j]!=0){
        for(var k=j+1;k<4;k++){
          if(board[i][k]==0&&noBlock(i,j,k,board)){
            showMoveAnimation(i,j,i,k);
            board[i][k]=board[i][j];
            board[i][j]=0;
            continue;
          }
          else if(board[i][k]==board[i][j]&&noBlock(i,j,k,board)&&!hasConflicted[i][k]){
            showMoveAnimation(i,j,i,k);
            board[i][k]+=board[i][j];
            board[i][j]=0;
            score+=board[i][k];
            updateScore(score);
            hasConflicted[i][k]=true;
            continue;
          }
        }
      }
    }
  }

  setTimeout("updateBoardView()",200);
  return true;
}

function moveUp(){
  if(!canMoveUp(board)){
    return false;
  }

  for(var i=1;i<4;i++){
    for(var j=0;j<4;j++){
      if(board[i][j]!=0){
        for(var k=0;k<i;k++){
          if(board[k][j]==0&&noBlock2(i,k,j,board)){
            showMoveAnimation(i,j,k,j);
            board[k][j]=board[i][j];
            board[i][j]=0;
            continue;
          }
          else if(board[k][j]==board[i][j]&&noBlock2(i,k,j,board)&&!hasConflicted[k][j]){
            showMoveAnimation(i,j,k,j);
            board[k][j]+=board[i][j];
            board[i][j]=0;
            score+=board[k][j];
            updateScore(score);
            hasConflicted[k][j]=false;
            continue;
          }
        }
      }
    }
  }

  setTimeout("updateBoardView()",200);
  return true;
}

function moveDown(){
  if(!canMoveDown(board)){
    return false;
  }
  for(var i=0;i<3;i++){
    for(var j=0;j<4;j++){
      if(board[i][j]!=0){
        for(var k=i+1;k<4;k++){
          if(board[k][j]==0&&noBlock2(i,k,j,board)){
            showMoveAnimation(i,j,k,j);
            board[k][j]=board[i][j];
            board[i][j]=0;
            continue;
          }
          else if(board[k][j]==board[i][j]&&noBlock2(i,k,j,board)&&hasConflicted[k][j]){
            showMoveAnimation(i,j,k,j);
            board[k][j]+=board[i][j];
            board[i][j]=0;
            score+=board[k][j];
            updateScore(score);
            hasConflicted[k][j]=true;
            continue;
          }
        }
      }
    }
  }

  setTimeout("updateBoardView()",200);
  return true;
}





