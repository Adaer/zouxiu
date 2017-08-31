<?php 
/*检测连接*/
	$servername = 'localhost';
	$username = 'root';
	$password = '';
	$database = 'pingdb';
//link
	$connect = new mysqli($servername,$username,$password,$database);
//check link
	if($connect->connect_error){
		die('连接失败'.$connect->connect_error);
	}
//set codeformat
	$connect->set_charset('utf8');

 ?>
