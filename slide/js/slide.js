window.onload=function(){
  //1.选元素
  var aPicLi=document.getElementById('pic_list').getElementsByTagName('li');
  var aTxtLi=document.getElementById('text_list').getElementsByTagName('li');
  var oIcoUl=document.getElementById('ico_list').getElementsByTagName('ul')[0];
  var aIcoLi=document.getElementById('ico_list').getElementsByTagName('li');
  var oBtnPrev=document.getElementById('btn_prev');
  var oBtnNext=document.getElementById('btn_next');
  var oDiv=document.getElementById('box');
  var iNow=0;//当前图片的index
  var iNowUlLeft=0;//ul往左移几个
  var timer;
  
  //2.加事件
  //小图标切换className
  for(var i=0;i<aIcoLi.length;i++){
    aIcoLi[i].index=i;
    //先去掉所有li的className
    aIcoLi[i].onclick=function(){
      if(iNow==this.index){
        return;
      }
      iNow=this.index;
      tab();
    }
  }

  function tab(){
    for(var j=0;j<aIcoLi.length;j++){
        aIcoLi[j].className="";
        // aPicLi[j].style.filter="opacity(0)";
        // aPicLi[j].style.opacity=0;
        startMove(aPicLi[j],{'opacity':'0'});
        aTxtLi[j].getElementsByTagName("h2")[0].className="";
      }
      aIcoLi[iNow].className="active";
      // aPicLi[this.index].style.filter="opacity(100)";
      // aPicLi[this.index].style.opacity=1;
      startMove(aPicLi[iNow],{'opacity':100});
      aTxtLi[iNow].getElementsByTagName("h2")[0].className="show";
  }
  
  timer=setInterval(autoPlay,3000)

  function autoPlay(){
    iNow++;
    if(iNow>=aIcoLi.length){
      iNow=0;
    }
    if(iNow<iNowUlLeft){
      iNowUlLeft=iNow;
    }
    else if(iNow>=iNowUlLeft+7){
      iNowUlLeft=iNow-6;
    }
    oBtnPrev.className=iNowUlLeft==0?"btn":"btn showBtn";
    oBtnNext.className=iNowUlLeft==aIcoLi.length-7?"btn":"btn showBtn";
    startMove(oIcoUl,{'left':-aIcoLi[0].offsetWidth*iNowUlLeft}); 
    tab();
  }

  oDiv.onmouseover=function(){
    clearInterval(timer);
  }
  oDiv.onmouseout=function(){
    timer=setInterval(autoPlay,3000);
  }

  oBtnPrev.onclick=function(){
    if(iNowUlLeft>0){
      iNowUlLeft--;
      oBtnPrev.className=iNowUlLeft==0?"btn":"btn showBtn";
      oBtnNext.className=iNowUlLeft==aIcoLi.length-7?"btn":"btn showBtn"; 
      //oIcoUl.style.left=-aIcoLi[0].offsetWidth*iNowUlLeft+'px';
      startMove(oIcoUl,{'left':-aIcoLi[0].offsetWidth*iNowUlLeft})
    }

  }
    oBtnNext.onclick=function(){
      if(iNowUlLeft<aIcoLi.length-7){
        iNowUlLeft++;
        oBtnPrev.className=iNowUlLeft==0?"btn":"btn showBtn";
        oBtnNext.className=iNowUlLeft==aIcoLi.length-7?"btn":"btn showBtn";            
        //oIcoUl.style.left=-aIcoLi[0].offsetWidth*iNowUlLeft+'px';
        startMove(oIcoUl,{'left':-aIcoLi[0].offsetWidth*iNowUlLeft})
      }
  }
}