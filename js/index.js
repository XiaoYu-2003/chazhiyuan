// JavaScript Document
/*==============================banner轮播==============================*/
var mySwiper = new Swiper('.swiper', {
    loop: true, // 循环模式选项
    autoplay: {
        delay: 2000,//1秒切换一次
    },
    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
})
//鼠标覆盖停止自动切换
mySwiper.el.onmouseover = function () {
    mySwiper.autoplay.stop();
}
//鼠标离开开始自动切换
mySwiper.el.onmouseout = function () {
    mySwiper.autoplay.start();
}

/*==============================商品中心==============================*/
const carousel = document.querySelector(".carousel"),
      firstImg = carousel.querySelectorAll(".carousel img")[0],
      arrowIcons = document.querySelectorAll(".wrapper i");
let isDragStart = false, prevPageX, prevScrollLeft;
let firstImgWidth = firstImg.clientWidth + 14;

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    })
})
const dragStart = (e)=>{
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft = carousel.scrollLeft;
}
const dragging = (e)=>{
    if(!isDragStart) return;
    e.preventDefault();
    let positionDiff = e.pageX - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
}
const dragStop = ()=>{
    isDragStart = false;
}
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragStop);

/*==============================文创产品==============================*/
// 要操作的元素
const lis = document.querySelectorAll('.artwork-container li'),
      ps = document.querySelectorAll('.artwork-container li p');

// 获取移入、移出的方向
function direct(e,o){
    var w = o.offsetWidth,
        h = o.offsetHeight,
        top = o.offsetTop,
        left = o.offsetLeft,
        scrollTop = document.body.scrollTop||document.documentElement.scrollTop,
        scrollLeft = document.body.scrollLeft||document.documentElement.scrollLeft,
        offTop = top-scrollTop,
        offLeft = left-scrollLeft,
        ex = (e.pageX-scrollLeft)||e.clientX,
        ey = (e.pageY-scrollTop)||e.clientY,
        x = (ex-offLeft-w/2)*(w>h?(h/w):1),
        y = (ey-offTop-h/2)*(h>w?(w/h):1),
        angle = (Math.round((Math.atan2(y,x)*(180/Math.PI)+180)/90)+3)%4,
        directName = ['上','右','下','左'];
    return directName[angle];
}

// 鼠标事件（方向，元素，鼠标进入或离开）
function mouseEvent(angle,o,d){
    var w = o.offsetWidth,
        h = o.offsetHeight;
    var p = o.querySelector('p');     //元素下的p元素
    p.style.transition = '0s';        //默认无过渡效果
    if(d == 'in'){  //鼠标进入
        // 判断方向
        switch(angle){
            case '上':
                if(p.offsetLeft==0 && p.offsetTop==0) break;
                p.style.left = 0;
                p.style.top = -h+'px';
                setTimeout(() => {
                    p.style.left = 0;
                    p.style.top = 0;
                    p.style.transition = '0.2s';
                }, 50);
                break;
            case '右':
                if(p.offsetLeft==0 && p.offsetTop==0) break;
                p.style.left = w+'px';
                p.style.top = 0;
                setTimeout(() => {
                    p.style.left = 0;
                    p.style.top = 0;
                    p.style.transition = '0.2s';
                }, 50);
                break;
            case '下':
                if(p.offsetLeft==0 && p.offsetTop==0) break;
                p.style.left = 0;
                p.style.top = h+'px';
                setTimeout(() => {
                    p.style.left = 0;
                    p.style.top = 0;
                    p.style.transition = '0.2s';
                }, 50);
                break;
            case '左':
                if(p.offsetLeft==0 && p.offsetTop==0) break;
                p.style.left = -w+'px';
                p.style.top = 0;
                setTimeout(() => {
                    p.style.left = 0;
                    p.style.top = 0;
                    p.style.transition = '0.2s';
                }, 50);
                break;
        }
    }else if(d=='out'){  //鼠标离开
        // 判断方向
        switch(angle){
            case '上':
                setTimeout(() => {
                    p.style.left=0;
                    p.style.top=-h+'px';
                    p.style.transition='0.2s';
                    p.style.transitionDelay='0.1s';
                }, 50);
                break;
            case '右':
                setTimeout(() => {
                    p.style.left=w+'px';
                    p.style.top=0;
                    p.style.transition='0.2s';
                    p.style.transitionDelay='0.1s';
                }, 50);
                break;
            case '下':
                setTimeout(() => {
                    p.style.left=0;
                    p.style.top=h+'px';
                    p.style.transition='0.2s';
                    p.style.transitionDelay='0.1s';
                }, 50);
                break;
            case '左':
                setTimeout(() => {
                    p.style.left=-w+'px';
                    p.style.top=0;
                    p.style.transition='0.2s';
                    p.style.transitionDelay='0.1s';
                }, 50);
                break;
        }
    }
}

lis.forEach(li=>{
    li.addEventListener('mouseenter',function(e){
        e = e||window.event;
        var angle=direct(e,this);
        mouseEvent(angle,this,'in');
    })
    li.addEventListener('mouseleave',function(e){
        e = e||window.event;
        var angle=direct(e,this);
        mouseEvent(angle,this,'out');
    })
})

/*==============================虚拟直播==============================*/
onload = function(){
 var btns = document.getElementsByClassName('btn'),
  imgs = document.getElementsByClassName('box')[0].getElementsByTagName('video');

 var index = 2,
  front = 0,
  back = 0,
  offset = false,
  timer = setInterval(timer,5000);
  


 for(var i=0;i<btns.length;i++){
 (function(i){
  btns[i].onclick = function(){click(i)};
 })(i);

 btns[i].onmouseover = function(){
  offset = true;
 }
 btns[i].onmouseout = function(){
  offset = false;
 }
 }

 for(var i=0;i<imgs.length;i++){
 imgs[i].onmouseover = function(){
  offset = true;
 }
 imgs[i].onmouseout = function(){
  offset = false;
 }
 }

 function timer(){
 console.log(offset)
 if(offset){
  return;
 }
 else{
  click(1)
 }
 }

 function click(x){
 imgs[index].setAttribute('class','');
 if(x === 0){
  if(--index < 0){
  index = --imgs.length;
  }
  front = back = index;
  if(++front > --imgs.length){front = 0}
  if(--back < 0){back = --imgs.length}
  imgs[front].style.zIndex = '1';
  imgs[back].style.zIndex = '0';
 }
 else{ 
  if(++index > --imgs.length){
  index = 0; 
  }
  front = back = index;
  if(++front > --imgs.length){front = 0}
  if(--back < 0){back = --imgs.length}
  imgs[front].style.zIndex = '0';
  imgs[back].style.zIndex = '1';
 }
 imgs[index].style.zIndex = '10';
 imgs[front].setAttribute('class','front')
 imgs[back].setAttribute('class','back') 
 imgs[index].setAttribute('class','active');
 }
 }
        
