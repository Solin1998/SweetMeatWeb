<?php
require_once("../../init.php");
function addToCart(){
      global $conn;
	  session_start();
	  @$id=$_SESSION["id"];
	  @$eid=$_REQUEST["eid"];
	  @$count=$_REQUEST["count"];
	  if($id){
		  $sql="select * from sw_dogcar where id=$id 
		   and eid=$eid";
		   $result=mysqli_query($conn,$sql);
		  if(count(mysqli_fetch_all($result,1))){
           $sql="update sw_dogcar set count=count+$count where id=$id 
		   and eid=$eid";
		  }else{
			$sql="insert into sw_dogcar(id,eid,count) values($id,$eid,$count)";}
	     mysqli_query($conn,$sql);
		 }
}
function updateCart(){
         global $conn;
		 @$iid=$_REQUEST["iid"];
		 @$count=$_REQUEST["count"];
		 $sql="";
		 if($count==0)
			 $sql="delete from sw_dogcar where iid=$iid";
		 else
			 $sql="update sw_dogcar set count=$count where iid=$iid";
		mysqli_query($conn,$sql);
}
function getCart(){
    global $conn;
	session_start();
	@$id=$_SESSION["id"];
	
	if($id){
	 $sql="select ename,price,count,img,iid from sw_dogcar as sw_dogcar left join sw_evenlist as sw_evenlist on sw_dogcar.eid = sw_evenlist.eid where sw_dogcar.id =1";
	 $result=mysqli_query($conn,$sql);
	 echo json_encode(mysqli_fetch_all($result,1));
	}else{
	  echo json_encode([]);
	}
}
function clearCart(){
	global $conn;
    session_start();
   @$id=$_SESSION["id"];
   
   if($id){
   $sql="delete from sw_dogcar where id=$id";
   mysqli_query($conn,$sql);
}
}

?>