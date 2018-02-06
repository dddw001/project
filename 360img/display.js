window.onload=function(){
  var x=0;//
  var oImg=document.getElementById('img1');

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
      oImg.src="img/miaov ("+l+").jpg";


      return false;//防止拖拽时图片被选中 ie
    }

    document.onmouseup=function(){
      document.onmousemove=null;
      document.onmouseup=null;
    }

    return false;//防止拖拽时图片被选中 chrome
  }
}