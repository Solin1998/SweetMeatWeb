	(()=>{
	 
 var cup=document.getElementById("cup");
 
 //var btns=cup.getElementsByClassName("a2");
 cup.onclick=e=>{
	 if(e.target.nodeName==="A" && e.target.innerHTML=="+")
	 {var btn=e.target;
	  console.log(btn);
	  var input=btn.parentNode.children[1];
      var i=parseInt(input.value);
	  
	  i++;
	  input.value=i;
	  }
     else if(e.target.nodeName==="A" && e.target.innerHTML=="-")
	 {var btn2=e.target;
	  console.log(btn2);
	  var input=btn2.parentNode.children[1];
      var i=parseInt(input.value);
	  if(i>0)
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
			  
			  
			})
		 }
	   })
	 }
	}
   })();