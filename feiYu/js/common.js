window.onload=function(){
  var aA=document.getElementById('list1').getElementsByTagName('a');
  
  for(var i=0;i<aA.length;i++){
    aA[i].onclick=function(){
      for(var j=0;j<aA.length;j++){
        aA[j].className="";
      }    
      this.className='active';
    }
    aA[i].onmouseenter=function(){
      if(this.className=='active'){
        this.className='h';
      }
    }
    aA[i].onmouseout=function(){
      if(this.className=='h'){
        this.className='active';
      }
    }
  }


}