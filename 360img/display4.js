window.onload=function(){
  var x=0;//
  var oImg=document.getElementById('img1');
  var aImg=document.getElementsByTagName('img');
  var oLastImg=oImg;
  var lastX=0;
  var iSpeed=0;
  var timer;

  for(var i=1;i<77;i++){
    (function(oNewImg){
      var oImg=new Image();
    oImg.onload=function(){
      oNewImg.src=this.src;
    }
    oImg.src="./img/miaov ("+i+").jpg";
    oNewImg.style.display='none';
    document.body.appendChild(oNewImg);
    })(document.createElement('img'));
  }  

  document.onmousedown=function(ev){
    var oEvent=ev||event;

    var disX=oEvent.clientX-x;

    clearInterval(timer);

    document.onmousemove=function(ev){
      var oEvent=ev||event;

      x=oEvent.clientX-disX;
      //document.title=x;
      
      move();

      //oImg.src="img/miaov ("+l+").jpg";

      iSpeed=x-lastX;
      lastX=x;

      return false;//防止拖拽时图片被选中 ie
    }

    document.onmouseup=function(){
      document.onmousemove=null;
      document.onmouseup=null;

      //document.title=iSpeed;
      timer=setInterval(function(){
        x+=iSpeed;
              if(iSpeed>0){
          iSpeed--;
        }
        else if(iSpeed<0){
          iSpeed++;
        }
        else if(iSpeed==0){
          clearInterval(timer);
        }
        move();
      },30);
    }

    function move(){
      var l=-parseInt(x/10);
      if(l>0){
        l=l%77;
      }
      else{
        l=l+(-Math.floor(l/77)*77);
      }
      //document.title=iSpeed;

      if(oLastImg!=aImg[l]){
        oLastImg.style.display='none';
        aImg[l].style.display='block';
        oLastImg=aImg[l];
      }
    }

    return false;//防止拖拽时图片被选中 chrome
  }
}