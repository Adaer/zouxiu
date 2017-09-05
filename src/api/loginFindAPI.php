<?php 
	/*
		与用户相关的所有操作
		* 增 insert
		* 删 delete
		* 查 select
		* 改 update
	 */
/*--只查询 用户名和密码是否对应  不写入！！！！！*/

	$servername = 'localhost';
	$username = 'root';
	$password = '';
	$database = 'pingdb';

	$connect = new mysqli($servername,$username,$password,$database);
	//检查数据库连接
	if($connect->connect_error){
		die('连接失败'.$connect->connect_error);
	}	
	// 编码格式
	$connect->set_charset('utf8');
	//接收前端数据 用于用户数据查询 密码修改	
	//接收到的是 参数：变量 get参数 不是get变量
	$tel = isset($_POST['userName']) ? $_POST['userName'] : '';
	$pwd = isset($_POST['userPwd']) ? $_POST['userPwd'] : '';


	//查询数据库
	$sql = "select * from reguser Where tel = '$tel' AND password = '$pwd'";

	$result = $connect->query($sql);	

	$userInfo = $result->fetch_all(MYSQLI_ASSOC);

	$len = count($userInfo);
	// var_dump($len);

	// if($result->num_rows>0){
	// 	echo "success";
	// }else{
	// 	echo "fail";
	// }
	if($len > 0){
		echo "success";
	}else{
		echo "fail";
	}
 ?>