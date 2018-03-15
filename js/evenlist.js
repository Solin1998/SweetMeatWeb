function loadPro(pno=0){
	//加载货物
  ajax({
	type:"get",
    url:"data/routes/products/getProductsByKw.php",
	data:location.search.slice(1)+"&pno="+pno
	}).then(output=>{
		
		var data=output.data;
		var html="";
     
		for(var i=0;i<data.length;i++){
			var p=data[i];
			
			html+=`<div class="fire1">
						<a href="shopin.html?eid=${p.eid}"><img src="${p.img}" alt=""></a>
						<h3>￥${p.price}</h3>
						<h4><a href="">会员7折</a></h4>
						<p>
							<a class="a1">-</a>
							<input type="text" placeholder="1" value="1">
							<a class="a2">+</a>
				            <span>打包带走</span>
						</p>
					</div>`;
		}
		document.querySelector("#cup").innerHTML=html;

      //分页
	  var pageCount=output.pageCount,
		  pageNo=output.pageNo;
	  var html=`<button>上一页</button>当前页面：`;
	     html+=`<input type="text" placeholder="1" value="1">`;
	     html+=`<button>去到此页面</button> <button>下一页</button>`;
		 var ulPages=document.getElementById("page");
		 
		 
	     ulPages.innerHTML=html;
		 
		 ulPages.children[1].value=pageNo+1;
	//为p(ulPages)绑定noclick
	
	     ulPages.onclick=e=>{
		   var input=ulPages.children[1]
			if(e.target.nodeName=="BUTTON"&&e.target==ulPages.children[2]){
				   var btns=e.target;
				   console.log(btns);
				   var pno=input.value-1;
				   loadPro(pno);
		   }
		   else if(e.target.nodeName=="BUTTON"
		           &&e.target==ulPages.children[0]
				   &&input.value>=2){
		            var pno=input.value-2;
		            loadPro(pno);
		   }
		   else if(e.target.nodeName=="BUTTON"
		           &&e.target==ulPages.children[3]){
				   var pno=input.value;
				   loadPro(pno);
				   }
		 }
	})
}
function loadCart(){
	//加载购物车
	ajax({
	   type:"get",
	    url:"data/routes/cart/getCart.php"
	}).then(data=>{
	      var html="";
		  var total=0;
		   var n=0;
		   
		  for(var p of data){
		  html+=`<p><b name=${p.iid}>${p.ename}</b>
								 <button>-</button>
								  <a href="">${p.count}</a>
									<button>+</button></p>   	  
		  `;
		  total+=p.price*p.count;
		  n+=parseInt(p.count);
		   
		  console.log(n);
	    }   
	  
    var b1=document.querySelector("#b1");
		   b1.innerHTML=n;
  var b2=document.querySelector("#b2");
		   b2.innerHTML=total.toFixed(2);
      document.querySelector("#cart>.elens")
		      .innerHTML=html;
	 document.querySelector("#cart")
		    .onclick=e=>{
	    
			//购物车BTNS点击事件
       
		if(e.target.nodeName=="BUTTON"&&e.target.innerHTML=="+"){
			var n=e.target.parentNode.children[2].innerHTML;
			n++;
			e.target.parentNode.children[2].innerHTML=n;
			 var iid= e.target.parentNode
				       .children[0].getAttribute("name");
			
			 ajax({
			     type:"get",
					 url:"data/routes/cart/updateCart.php",
					 data:"iid="+iid+"&count="+n,
					 dataType:"text"
			 }).then(loadCart);
	       }
		if(e.target.nodeName=="BUTTON"&&e.target.innerHTML=="-"){
            var n=e.target.nextSibling.nextSibling.innerHTML;
			n--; 
			e.target.nextSibling.nextSibling.innerHTML=n;
			 var iid= e.target.parentNode
				       .children[0].getAttribute("name");
			
			 ajax({
			     type:"get",
					 url:"data/routes/cart/updateCart.php",
					 data:"iid="+iid+"&count="+n,
					 dataType:"text"
			 }).then(loadCart);}
			
	  }
	  
  document.querySelector("#cart>.title>a")
		  .onclick=()=>{
	  console.log(document.querySelector("#cart>.title>a"));
	     ajax({
		    type:"get",
			url:"data/routes/cart/clearCart.php",
		    dataType:"text"
		 }).then(()=>{
		   document.querySelector("#cart>.elens")
		           .innerHTML=" ";
		          location.reload();
		    })
		 
	  
	}
	
	})
   
}
(()=>{
    loadPro();
	loadCart();
	
 var cup=document.getElementById("cup");
 
 //var btns=cup.getElementsByClassName("a2");
   cup.onclick=e=>{
	 if(e.target.nodeName==="A" && e.target.innerHTML=="+")
	 {var btn=e.target;
	 
	  var input=btn.parentNode.children[1];
      var i=parseInt(input.value);
	  
	  i++;
	  input.value=i;
	  }
     else if(e.target.nodeName==="A" && e.target.innerHTML=="-"){
	  var btn2=e.target;
	  var input=btn2.parentNode.children[1];
      var i=parseInt(input.value);
	  if(i>1)
	  i--;
	  input.value=i;}
     else if(e.target.nodeName==="SPAN"){
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
			   loadCart();
			   
			})
		 }
	   })
	 }
	}
 var sach=document.getElementById("sach");
  sach.onclick=e=>{
	    var pid=e.target.getAttribute("data-i");	  
	  console.log(pid);
	  ajax({
	type:"get",
    url:"data/routes/products/getartherproducts.php",
	data:"pvid="+pid
	}).then(output=>{	
		var data=output;
		var html="";
		for(var i=0;i<data.length;i++){
			var p=data[i];
			html+=`<div class="fire1">
						<a href="shopin.html?eid=${p.eid}"><img src="${p.img}" alt=""></a>
						<h3>￥${p.price}</h3>
						<h4><a href="">会员7折</a></h4>
						<p>
							<a class="a1">-</a>
							<input type="text" placeholder="1" value="1">
							<a class="a2">+</a>
				            <span>打包带走</span>
						</p>
					</div>`;
		}
		document.querySelector("#cup").innerHTML=html;
	})   
  }
 
})();	
