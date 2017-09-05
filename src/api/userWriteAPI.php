<?php 
	/*
		与用户相关的所有操作
		* 增 insert
		* 删 delete
		* 查 select
		* 改 update
	 */
/*--查询  写入！！！！！*/
/*--查询  写入！！！！！*/
/*--查询  写入！！！！！*/		
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
	$tel = isset($_GET['reg_phone']) ? $_GET['reg_phone'] : '';
	// $password = isset($_GET['reg_pwd']) ? $_GET['reg_pwd'] : '';
	//md5加密
	// $password = md5($password);

	//查询数据库
	$sql = "select * from reguser ";
	if($tel){
		$sql .="Where tel = '$tel'";
	}
	$result = $connect->query($sql);	
	$userInfo = $result->fetch_all(MYSQLI_ASSOC);
	$len = count($userInfo);
	//查找 reguser 表 用户信息，写入值
	//判断前端出来的值是否在数据库中存在
	if($len>0){
		
		echo "exist";
		die();
	}
	else{
		//写入数据库
		$wirteSQL = "insert into reguser(tel) values('$tel')";//,'$password')";
		$result2 = $connect->query($wirteSQL);
		if($result2){
			echo "writeOK";
		}
	}



 ?>