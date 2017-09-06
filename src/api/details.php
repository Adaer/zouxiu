<?php 
//前端发送过来的请求 id
	$goodsId = isset($_GET['guid']) ? $_GET['guid'] : '';
/*
	获取笔记本商品列表页数据
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


	//查找数据库中所需数据字段名 *匹配所有
	$sql = "select id,brand,type,cost,discount,size,product,colors,comment,imgS,imgM,imgL from mancloth";
	
	//->query 执行查寻数据库内容 返回给$result
	$result = $connect->query($sql);
	//使用得到的数据
	// 把查询结果返回到一个数组中,都是返回第一行然后指针下移一行
	$shopdata = $result->fetch_all(MYSQLI_ASSOC);

	//在商品数组中遍历出 id对应的商品
	// $item是 $shopdata 数组中的所有元素
	$resData;
	foreach ($shopdata as  $item) {
		if($item['id'] == $goodsId){
			$resData = $item;
		}
	};

	echo json_encode($resData,JSON_UNESCAPED_UNICODE);
 ?>