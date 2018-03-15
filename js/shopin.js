(()=>{
if(location.search!=""){
	   ajax({
	      type:"get",
		  url:"data/routes/products/getEvensById.php",
		  data:location.search.slice(1)
	   }).then(data=>{
			var p=data[0];
           var html="";
		      html+=`<div class="sp1"id="small">
				      <img src="${p.img}" alt="">
				 </div>
				
				 <div class="spp">
						 <h1>${p.ename}</h1>
						 <h3>${p.det}</h3>
						 <div>
							 <span id="price">￥${p.price}</span>
				  <p class="ps">此款甜点最适合送女友情人恋人！</p>
						</div>
				  <p>可选颜色：红<input type="radio" name="color" checked> 
						              蓝<input type="radio" name="color"></p>
						 <p class="sum"> 数量：<button class="btn">-</button>
			  <input type="text" placeholder="1" class="pt" value="1"><button class="btn">+</button></p>
						 <p><a href="script:;" class="a1">立即购买</a> <a href="script:;" class="a2">加入购物车</a></p>
			  `;
			 
			  document.querySelector("#max").innerHTML=html;
		  })
	 }

 var max=document.getElementById("max"); 
 
   
   max.onclick=e=>{
      if(e.target.nodeName=="BUTTON"&&e.target.innerHTML=="+"){
	     var btn=e.target;
    
		 var input=btn.parentNode.children[1];
         var i=parseInt(input.value);
	  
	       i++;
	      input.value=i;
	  }
	  if(e.target.nodeName=="BUTTON"&&e.target.innerHTML=="-"){
	      var btn=e.target;
         
		  var input=btn.parentNode.children[1];
          var i=parseInt(input.value);
		  if(i>1)
		  i--;
		  input.value=i;
	  }  
	  if(e.target.nodeName=="A"&& e.target.innerHTML=="立即购买"){
		  ajax({
		       type:"get",
			   url:"data/routes/isLogin.php"
		  }).then(data=>{
		        if(data.ok==0){
				 location="intovip.html";
				}else{
				  var btn=e.target; 
		          var count=btn.parentNode.parentNode
				          .children[4].children[1].value;	     		
				ajax({
				    type:"get",
				    url:"data/routes/cart/addToCart.php",
				    data:location.search.slice(1)+"&count="+count
				})					
				   location="dogcar.html"+location.search;		
				}
		  })
	       
	
	  }
    if(e.target.nodeName=="A"&& e.target.innerHTML=="加入购物车"){
		  ajax({
		       type:"get",
			   url:"data/routes/isLogin.php"
		  }).then(data=>{
		        if(data.ok==0){
				 location="intovip.html";
				}else{
				  var btn=e.target; 
		          var count=btn.parentNode.parentNode
				          .children[4].children[1].value; console.log(1);	     		
				ajax({
				    type:"get",
				    url:"data/routes/cart/addToCart.php",
				    data:location.search.slice(1)+"&count="+count
				})				
					     alert("成功加入购物车");
                         location.reload();
													   		
				}
		  })
	      
	
	  }
   }
 /*加载的HTML无法使用定点找元素 for(var btn of btns){
    btn.onclick=e=>{
	  var btn=e.target;
	  var input=btn.parentNode.children[1];
      var i=parseInt(input.value);
	  console.log(i);
	  if (btn.innerHTML=="+")
	  {i++;
	  }
	  else if(i>0){
	  i--;}
	  input.value=i;
	}
   }*/


   
 })();