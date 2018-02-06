window.onload=function(){
  var x=0;//
  var oImg=document.getElementById('img1');
  var aImg=document.getElementsByTagName('img');
  var oLastImg=oImg;

  for(var i=1;i<77;i++){
    var oNewImg=document.createElement('img');
    oNewImg.src="./img/miaov ("+i+").jpg";
    oNewImg.style.display='none';
    document.body.appendChild(oNewImg);
  }  

  document.onmousedown=function(ev){
    var oEvent=ev||event;

    var disX=oEvent.clientX-x;

    document.onmousemove=function(ev){
      var oEvent=ev||event;

      x=oEvent.clientX-disX;
      //document.title=x;
      var l=-parseInt(x/10);
      if(l>0){
        l=l%77;
      }
      else{
        l=l+(-Math.floor(l/77)*77);
      }
      //document.title=l;

      if(oLastImg!=aImg[l]){
        oLastImg.style.display='none';
        aImg[l].style.display='block';
        oLastImg=aImg[l];
      }


      //oImg.src="img/miaov ("+l+").jpg";


      return false;//防止拖拽时图片被选中 ie
    }

    document.onmouseup=function(){
      document.onmousemove=null;
      document.onmouseup=null;
    }

    return false;//防止拖拽时图片被选中 chrome
  }
}