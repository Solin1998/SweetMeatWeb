(()=>{
  ajax({
	   type:"get",
	   url:"foot.html",
	   dataType:"html"
  })
    .then(html=>{
      var header=document.getElementById("footer");
	  header.innerHTML=html;
  })
})();