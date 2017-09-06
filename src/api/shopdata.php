<?php 
/*
	获取男装数据
	 *可查ID
	 *可分页请求
*/
	$servername = 'localhost';
	$username = 'root';
	$password = '';
	$database = 'pingdb';
	//连接数据库
	$connect = new mysqli($servername,$username,$password,$database);
	//检查数据库连接
	if($connect->connect_error){
		die('连接失败'.$connect->connect_error);
	}	
	//设置请求到的数据编码
	$connect->set_charset('utf8');
	//获取到ID
	$id = isset($_GET['guid']) ? $_GET['guid'] : '';

	//查找数据库中所需数据字段名 *匹配所有
	$sql = "select guid,brand,type,cost,discount,size,imgurl from mancloth";
	//查找指定id
	if($id){
		$sql .="Where guid = '$id'";
	}
	//查找指定id的数据库
	$result = $connect->query($sql);
	//使用得到的数据
	$shopdata = $result->fetch_all(MYSQLI_ASSOC);
	/*------翻页按钮---------*/
	$page_no = isset($_GET['pageNo']) ? $_GET['pageNo'] : 1;
	// 每页显示数
	$qty = isset($_GET['qty']) ? $_GET['qty'] : 20;
	$res = array(
		'data'=>array_slice($shopdata, ($page_no-1)*$qty,$qty),
		'qty'=>$qty,
		'total'=>count($shopdata)
	);	
	//返回数据给前端(防止中文转义)
	echo json_encode($res,JSON_UNESCAPED_UNICODE);
 ?>