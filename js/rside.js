(()=>{
  ajax({
	   type:"get",
	   url:"rside.html",
	   dataType:"html"
  })
    .then(html=>{
      var header=document.getElementById("rs");
	  header.innerHTML=html;
  })
})();