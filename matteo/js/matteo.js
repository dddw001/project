window.onload=function(){
  var oLogoImg=document.querySelector('.logo-img');

  oLogoImg.onmouseover=function(){
    this.src="img/logo2.png";
  }
  oLogoImg.onmouseout=function(){
    this.src="img/logonew.png";
  }
}