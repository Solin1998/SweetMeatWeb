(()=>{
   //查找id为TXTName的文本框，为期添加失去焦点事件；
    var txtName=document.getElementById("txtName");
    var txtPwd=document.getElementById("txtPwd");
   txtName.onblur=e=>{
      
	  checkName(e.target);
   }
   function checkName(txt){
    return new Promise(callback=>{
    ajax({
	       type:"post",
		   url:"data/routes/checkName.php",
           data:"vuname="+txt.value.trim(),
		   dataType:"text"
	  }).then(text=>{
	       if(text=="false")
			   alert("用户名已经存在");
		   else
			   callback();
	  })
		  })
   }
 
      var rpwd=document.getElementById("pwdre");
      var pwd=document.getElementById("txtPwd");

      rpwd.onblur=()=>{
		 if (rpwd.value!=pwd.value)
		   {alert("两次密码必须一样");
		}else if(rpwd.value==""){
			alert("密码不能为空");}
		}
       /*var phone=document.getElementsByName("phone")[0];
			phone.onblur=()=>{
			 if(phone.value!=/^\d{13}$/)
			 alert("请输入正确手机位");
			
			}*/
 document.getElementById("btnReg").onclick=()=>{
      checkName(txtName)
	   .then(()=>{
	     ajax({
		   type:"post",
		   url:"data/routes/register.php",
		   data:"vuname="+txtName.value.trim()+"&pwd="+txtPwd.value.trim(),
		   dataType:"text"
		 }).then(()=>{
		     location="intovip.html";
		   })
	  })
   }
 
})();