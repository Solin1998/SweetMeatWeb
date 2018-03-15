(()=>{
    function loadStatus(){
		//判断登录:
		var loginList=document.getElementById("loginList");
		console.log(loginList);
		var welcomeList=document.getElementById("welcomeList");
		console.log(welcomeList);
		ajax({
			type:"get",
			url:"data/routes/isLogin.php"
		}).then(data=>{//data:{ok:1,uname:xxx}
			console.log(data);
			if(data.ok==1){
				loginList.style.display="none";
				welcomeList.style.display="block";
				//console.log(document.getElementById("vuname"));
				//document.getElementById("vuname").innerHTML=data.uname;
					
			}else{
				loginList.style.display="block";
				welcomeList.style.display="none";
			}
		});
	}



	 ajax({
		type:"get",
		url:"header.html",
		dataType:"html"
	})
	.then(html=>{
		var header=document.getElementById("header");
		header.innerHTML=html;
   //搜索框
        if(location.search)
           document.getElementById("textsearch")
			       .value=decodeURI(
			        location.search.split("=")[1]
			        );



        document.querySelector("[data-btn=search]")
	     .onclick=()=>{
          var kw=document.getElementById("textsearch")
			             .value.trim();
           if (kw!=="")
           {location="evenlist.html?kw="+kw;
           }
	  
         }
     loadStatus()
 //注销   
	 
     document.getElementById("out").onclick=()=>{
			ajax({
				type:"get",
				url:"data/routes/logout.php",
				dataType:"text"
			}).then(()=>{
				location.reload();
			})
		}
	
	})
	
    
	
})();