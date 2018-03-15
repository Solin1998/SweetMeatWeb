(()=>{
   function getcar(){
      ajax({
	        type:"get",
			url:"data/routes/cart/getCart.php"
	  }).then(data=>{
		    var sub=document.getElementById("sub");
		         console.log(data[0]);
	        for(var i=0;i<data.length;i++){
                var xp=(data[i].price)*(data[i].count)*0.7;
				var html="";
			  var html=`
				<td>${data[i].ename}</td>
				<td>${data[i].price}</td>
				<td>0.7</td>
				<td name="${data[i].iid}"> 
				    <button>-</button><b>${data[i].count}</b>
			        <button>+</button>
				</td>
				<td>${(parseFloat(xp)).toFixed(2)}</td>
				<td name="${data[i].iid}"><button>X</button>删除</td>`;
                 sub.innerHTML+=html;
			
			var pay=document.getElementById("payfor");
			var dlae=parseFloat(pay.innerHTML);	
			    pay.innerHTML=(dlae+parseFloat(xp)).toFixed(2);
				}
			   
		      sub.onclick=e=>{

                 
			   if(e.target.nodeName=="BUTTON"&&e.target.innerHTML=="-"){		   
			    var n=e.target.nextSibling.innerHTML;
				var iid=e.target.parentNode.getAttribute("name");
				n--;
				e.target.nextSibling.innerHTML=n; 
				  ajax({
				         type:"get",
						 url:"data/routes/cart/updateCart.php",
						 data:"iid="+iid+"&count="+n
				   })
						 location.reload();
						 
				
			   }
			   if(e.target.nodeName=="BUTTON"&&e.target.innerHTML=="+"){
			    var n=e.target.parentNode.children[1].innerHTML; 
				var iid=e.target.parentNode.getAttribute("name");
				   n++;
                   e.target.parentNode.children[1].innerHTML=n;

				   ajax({
				         type:"get",
						 url:"data/routes/cart/updateCart.php",
						 data:"iid="+iid+"&count="+n
				   })
						 location.reload();

			   }
			   if(e.target.nodeName=="BUTTON"&&e.target.innerHTML=="X"){
				    e.target.parentNode.parentNode.innerHTML=" ";
					var iid=e.target.parentNode.getAttribute("name");
					ajax({
				         type:"get",
						 url:"data/routes/cart/updateCart.php",
						 data:"iid="+iid+"&count=0"
				   })
						 location.reload();

			   }
			  }
		   
	  })
   
   }
getcar();
})()