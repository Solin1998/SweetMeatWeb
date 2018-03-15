<?php
require_once("../../init.php");
function get_index_products(){
    global $conn;
	$sql="select * from sw_evenlist";
	$result=mysqli_query($conn,$sql);
	$products=mysqli_fetch_all($result,1);
	echo json_encode($products);
}
function getartherproducts(){
    global $conn;
	@$pvid=$_REQUEST["pvid"];
	$sql="select * from sw_evenlist where pvid=$pvid";
	$result=mysqli_query($conn,$sql);
	$products=mysqli_fetch_all($result,1);
	echo json_encode($products);
}
//搜索框
function getProductsByKw(){
	global $conn;
	$output=[
	  "count"=>0,
	  "pageSize"=>6,
	  "pageCount"=>0,
      "pageNo"=>0,
	  "data"=>[]
	];
	@$pno=(int)$_REQUEST["pno"];
	if($pno) $output["pageNo"]=$pno;

	@$kw=$_REQUEST["kw"];
   $sql="select eid,ename,img,price from sw_evenlist ";
   if($kw){
	   $kws=explode(" ",$kw);
	   for($i=0;$i<count($kws);$i++){
	     //$kws[$i]=" ename like '%".$kws[$i]."%' ";
		 $sql.="where ename like '%".$kws[$i]."%' and eid>4";
	   }
   }
   
   $result=mysqli_query($conn,$sql);
   $products=mysqli_fetch_all($result,1);
   $output["count"]=count($products);
   $output["pageCount"]=
	   ceil($output["count"]/$output["pageSize"]);
   $sql.=" limit ".
	    ($output["pageNo"]*$output["pageSize"]).",".$output["pageSize"];
    $result=mysqli_query($conn,$sql);
	$output["data"]=mysqli_fetch_all($result,1);
	echo json_encode($output);
}
//getProductsByKw()
function getEvensById(){
      global $conn;
	  @$eid=$_REQUEST["eid"];
	  $out=[];
	 if($eid){
	 $sql="select det,ename,img,price from sw_evenlist where eid=$eid ";
	 $result=mysqli_query($conn,$sql);
	 $out[]=mysqli_fetch_all($result,1)[0];
	 }
	 echo json_encode($out);
}

?>