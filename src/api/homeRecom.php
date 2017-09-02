<?php 
//前端发送过来的请求
	$img = isset($_GET['recommend']) ? $_GET['recommend'] : '';
/*
	获取 xiu 首页推荐数据
*/
	if($img == 'recommend' ){
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
		$sql = "select imgurl,imghref,imgdefault from xiuRecommend";
		
		//->query 执行查寻数据库内容 返回给$result
		$result = $connect->query($sql);
		//使用得到的数据
		// 把查询结果返回到一个数组中,都是返回第一行然后指针下移一行
		$imgdata = $result->fetch_all(MYSQLI_ASSOC);

		//在商品数组中遍历出 id对应的商品
		// $item是 $shopdata 数组中的所有元素
		echo json_encode($imgdata,JSON_UNESCAPED_UNICODE);
	}else if($img == 'hot'){
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
		$sql = "select imgurl,imghref,imgdefault,imgbg from xiuHot";
		
		//->query 执行查寻数据库内容 返回给$result
		$result = $connect->query($sql);
		//使用得到的数据
		// 把查询结果返回到一个数组中,都是返回第一行然后指针下移一行
		$imgdata = $result->fetch_all(MYSQLI_ASSOC);

		//在商品数组中遍历出 id对应的商品
		// $item是 $shopdata 数组中的所有元素
		echo json_encode($imgdata,JSON_UNESCAPED_UNICODE);
	}else if($img == 'found'){
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
		$sql = "select guid,imgurl,imghref,imgdefault from xiuRecommendgoods";
		
		//->query 执行查寻数据库内容 返回给$result
		$result = $connect->query($sql);
		//使用得到的数据
		// 把查询结果返回到一个数组中,都是返回第一行然后指针下移一行
		$imgdata = $result->fetch_all(MYSQLI_ASSOC);

		//在商品数组中遍历出 id对应的商品
		// $item是 $shopdata 数组中的所有元素
		echo json_encode($imgdata,JSON_UNESCAPED_UNICODE);		
	}
 ?>