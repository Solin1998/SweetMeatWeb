<?php
 require_once("../init.php");
 function register(){
    global $conn;
	@$vuname=$_REQUEST["vuname"];
	@$pwd=$_REQUEST["pwd"];
	@$em=$_REQUEST["em"];
	@$phone=$_REQUEST["phone"];
	@$vname=$_REQUEST["vname"];
	@$vbirth=$_REQUEST["vbirth"];

	if($vuname&&$pwd){
		$sql="insert into sw_viplist(id,vuname,pwd,em,phone,vname,vbirth) values(null,'$vuname','$pwd','$em','$phone','$vname','$vbirth')";
		mysqli_query($conn,$sql);
	}
 }
function checkName(){
   global $conn;
   @$vuname=$_REQUEST["vuname"];
   if($vuname){
     $sql="select * from sw_viplist where vuname='$vuname'";
	 $result=mysqli_query($conn,$sql);
	 $user=mysqli_fetch_all($result,1);
	 if(count($user)!=0)
		   return false;
	 else
		 return true;
   }
 }
function login(){
   global $conn;
   @$vuname=$_REQUEST["vuname"];
   @$pwd=$_REQUEST["pwd"];
   if($vuname&&$pwd){
	   $sql="select * from sw_viplist where vuname='$vuname' and binary pwd='$pwd'";
	   $result=mysqli_query($conn,$sql);
	   $user=mysqli_fetch_all($result,1);
	   if(count($user)!=0){
		   session_start();
		   $_SESSION["id"]=$user[0]["id"];
		   return true;
	   }else
		   return false;
   }
 }
function logout(){
	 session_start();
     $_SESSION["id"]=null;
  }
function isLogin(){
	    global $conn;
	    session_start();
       @$id=$_SESSION["id"];
        if($id){
		  
		  $sql="select vuname from sw_viplist where id=$id";
		  $result=mysqli_query($conn,$sql);
		  $user=mysqli_fetch_all($result,1);
		  return ["ok"=>1,"vuname"=>$user[0]["vuname"]];
		}
	    else
			return ["ok"=>0];
 }

?>