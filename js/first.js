(()=>{
    ajax({
	type:"get",
    url:"data/routes/products/index_product.php"
	}).then(products=>{
		var html1="";
		for(var i=0;i<products.length;i++){
			var p=products[i];
			if(i<4){
				html1+=`<div class="show1">
					<div class="haddle">${p.ename} </div>
					<a href="shopin.html?eid=${p.eid} "><img src="${p.img}" alt=""></a>
				</div>`
			};
		}
	    document.querySelector("#ppshow").innerHTML=html1;
		var html2="";
		for(var j=4;j<products.length;j++){
			var p=products[j];
			html2+=`<div class="fire1">
						<a href="shopin.html?eid=${p.eid}"><img src="${p.img}" alt=""></a>
						<h3>￥${p.price}</h3>
						<h4><a href="">会员7折</a></h4>
						<p> ${p.ename}
							
						</p>
					</div>`;
		}
		document.querySelector("#cup").innerHTML=html2;
	})
  //轮播
//鼠标点击播
window.onload = function() {
            var list = document.getElementById('lister');var prev = document.getElementById('prev');
            var next = document.getElementById('next');

            function animate(offset) {
                //获取的是style.left，是相对左边获取距离，所以第一张图后style.left都为负值，
                //且style.left获取的是字符串，需要用parseInt()取整转化为数字。
                var newLeft = parseInt(list.style.left) + offset;
                list.style.left = newLeft + 'px';
				if(newLeft<-3000){
                       list.style.left = -600 + 'px';
                   }
                if(newLeft>-600){
                       list.style.left = -3000 + 'px';
                  }
            }

            prev.onclick = function() {             
                animate(600);
            }
            next.onclick = function() {  
                animate(-600);
            }
        }
//定时器调用点击效果轮播
var timer;
function play() {
    timer = setInterval(function () {
        prev.onclick()
    }, 1500)
}
play();
//鼠标移入时 停止自动轮播
var container = document.getElementById('container');

            function stop() {
                clearInterval(timer);
            }
            container.onmouseover = stop;
            container.onmouseout = play;

//小圆点跟随变换
 var buttons = document.getElementById('buttons').getElementsByTagName('span');
            var index = 1;

            function buttonsShow() {
                //这里需要清除之前的样式
                for (var i = 0; i < buttons.length; i++) {
                    if (buttons[i].className == 'on') {
                        buttons[i].className = '';
                    }
                }
                //数组从0开始，故index需要-1
                buttons[index - 1].className = 'on';
            }

            prev.onclick = function() {
                index -= 1;
                if (index < 1) {
                    index = 5;
                }
                buttonsShow();
                animate(600);
            }
            next.onclick = function() {
                //由于上边定时器的作用，index会一直递增下去，我们只有5个小圆点，所以需要做出判断
                index += 1;
                if (index > 5) {
                    index = 1;
                }
                buttonsShow();
                animate(-600);
            }
//var timer=setInterval(lun,2000);
     /*else if(e.target.nodeName==="SPAN"){
	   ajax({
		   
	      type:"get",
		  url:"data/routes/isLogin.php"
	   }).then(data=>{
		   console.log(data);
	      if(data.ok==0){
			  var url=location.href;
		      url=encodeURIComponent(url);
			 location="intovip.html?back="+url;
	     }else{
		    var eid=e.target.parentNode.parentNode
				.children[0].href.split("=")[1];
	        var count=e.target.parentNode.children[1].value;
			ajax({
			     type:"get",
			     url:"data/routes/cart/addToCart.php",
				 data:"eid="+eid+"&count="+count,
			     dataType:"text"
			}).then(()=>{
				e.target.parentNode.children[1].value=0;
			    alert("ok!");
			  
			  
			})
		 }
	   })
	 }*/
	//}
 
 })();
 