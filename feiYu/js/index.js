window.onload=function(){
  var aA=document.getElementById('list1').getElementsByTagName('a');
  var aTravale=document.getElementsByClassName('item');
  var aArrow=document.getElementsByClassName('arrow');
  var aTeamBtn=document.getElementsByClassName('team-btn');
  var oTeamImg=document.getElementsByClassName('team-img')[0].getElementsByTagName('img')[0];
  
  // for(var i=0;i<aA.length;i++){
  //   aA[i].onclick=function(){
  //     for(var j=0;j<aA.length;j++){
  //       aA[j].className="";
  //     }
  //     this.className='active';
  //   }
  //   aA[i].onmouseenter=function(){
  //     if(this.className=='active'){
  //       this.className='h';
  //     }
  //   }
  //   aA[i].onmouseout=function(){
  //     if(this.className=='h'){
  //       this.className='active';
  //     }
  //   }
  // }

  for(var i=0;i<aTravale.length;i++){
    aTravale[i].index=i;
    aTravale[i].onmouseover=function(){
     // aArrow[this.index].src="file:///D:/JSCode/-project/feiYu/img/g_08.png";
      aArrow[this.index].src="img/g_08.png";
    }
    aTravale[i].onmouseout=function(){
      aArrow[this.index].src="img/g_17.png";
    }
  }

  //console.log(aTeamBtn);
  aTeamBtn[0].onclick=aTeamBtn[1].onclick=changeImg;
  function changeImg(){
    if(oTeamImg.src.indexOf('fengjing')!=-1){
      oTeamImg.src="img/1499894474.jpg";
    }
    else{
      oTeamImg.src="img/fengjing.jpg";
    }
  }

}