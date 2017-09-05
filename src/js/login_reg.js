/**	
 *  header js
 *  by:lfping
 *  time:2017年9月4日09:43:32
 *  log:网站注册登录 js
 */
//由于引用configjs文件时 里面的配置不保证路径中的文件谁先被引用
//所以先引用config 再引用里面的js别名
require(['config'],function(){
	require(['jQuery','codeVerify','commonJS'],function(){
		//input获得焦点 label上移 top：-38px 原位置：38px
		//input 空值 提示 ；输入错误提示，出现二维码，

		/*------------手机注册---------------*/
		var $Reg = $("#reg"),//登录按钮
			$regPhone = $("#reg_phone"),//手机号
			$vcode = $("#put_vcode"),//验证码
			$phoneTips = $(".phone_tips"),//手机输入状态提示
			$msgTips = $(".msg_tips");//短信验证码提示

		var accordPhone = false,
			accordVocd = false;
		//实例化验证码
		var verifyCode = new GVerify("vcode");

		$regPhone.blur(function(){
			var $phoneVal = $(this).val();
				$phoneVal = $phoneVal.trim();

			//显示验证码 
			$vcode.parent("li").show();
			
			$vcode.blur(function(){
				var code = $(this).val().trim();
				var res = verifyCode.validate(code);

				if(res){
					// 验证码正确
					$(this).next().removeClass().addClass("vcode-tips-acc");
					accordVocd = true;	
					return true;				
				}else{
					//验证码错误
					$(this).next().removeClass().addClass("vcode-tips-err");
					accordVocd = false;
					return false;
				}
			})	

			//表单验证
			if($phoneVal == "" || $phoneVal.length < 1 || $phoneVal == null){
				$phoneTips.html("请输入有效的手机号！").css({
					color:"#D2041F",
					display:"block"			
				})
				accordPhone = false;
				return false;
			}	

			if((/^1[34578]\d{9}$/).test($phoneVal)){
				$phoneTips.html("").css({
					display:"none"
				});
				//如果手机号码格式正确 发送请求 查看是否已存在 exist(usable)
				$.ajax({
					url:"../api/userFindAPI.php",
					data:{
						reg_phone:$phoneVal
					},
					success:function(data){
						if(data == "exist"){
							$phoneTips.html("手机号码已被注册！").css({
								color:"#D2041F",
								display:"block"	
							})
						}else if(data == "usable"){
							console.log("手机号可用");
							accordPhone = true;
						}
					}
				})
				return true;
			}else if($phoneVal.length > 0){
				//手机号码格式不正确
				$phoneTips.html("手机号码格式不正确！").css({
					color:"#D2041F",
					display:"block"			
				})	
				accordPhone = false;	
				return false;		
			}		
		})

		//表单提交验证
		$Reg.on("click",function(){
			if(accordPhone=== false || accordVocd === false){
				alert("手机号、验证码未填写或错误");
				return false;
			}else if(accordPhone === true && accordVocd === true){
				//页面跳转 数据库写入用户信息
				$.ajax({
					url:"../api/userWriteAPI.php",
					data:{
						reg_phone:$regPhone.val()
					},
					type:"post",
					success:function(res){
						console.log(res)
						if(res == "writeOK"){
							window.location.href = "http://localhost/xiu/src/index.html";
							// $("#reg_info").attr({action:"http://localhost/xiu/src/index.html"});
							// 写入cookie 用户名
							
						}else if(res == "exist"){
							console.log("已被注册或重复注册")
						}
					}
				})
			}
		})

/*------------用户登录-----------------*/
		var $shell = $(".shell"),
			$type_msg = $shell.find(".type_msg"),
			$type_pwd = $shell.find(".type_pwd");
		var $login = $("#login");	
		var $loginTips = $(".login_tips");//登录提示

		//切换登录窗口
		$shell.on("click",function(e){
			if($(e.target).hasClass("type_pwd")){
				$(e.target).css({
					color:"#333",
					borderBottom:"2px solid #666"
				}).prev("a").css({
					color:"#666",
					borderBottom:"0 none"
				});			
				$(".login_type").stop().show(100);
				$(".reg_phone_type").stop().hide(100);
				$login.show();
				$Reg.hide();
			}else if($(e.target).hasClass("type_msg")){
				$(e.target).css({
					color:"#333",
					borderBottom:"2px solid #666"					
				}).next("a").css({
					color:"#666",
					borderBottom:"0 none"
				});			
				$(".login_type").stop().hide(100);
				$(".reg_phone_type").stop().show(100);		
				$Reg.show();
				$login.hide();
			}
		})
		//点击发送账号密码校验
		$login.on("click",function(){
			var $userVal = $("#login_user").val().trim(),
				$userPwd = $("#login_pwd").val();
			if($userVal !== "" && $userVal.length > 0 && $userPwd !== "" && $userPwd.length > 0){
				$.ajax({
					url:"../api/loginFindAPI.php",
					type:"POST",
					data:{
						userName : $userVal,
						userPwd : $userPwd
					},
					success:function(res){
						console.log(res)
						if(res == "success"){
							$loginTips.show().html("登录成功！").css({
								color:"#58bc58"
							})
						}else if(res == "fail"){
							$loginTips.show().children("p").html("用户名或密码错误！").css({
								color:"#f33"
							})
						}
					}
				})
				
			}else{
				$loginTips.show().children("p").html("请输入用户名或密码").css({
					color:"#f33"
				})
			}
		})



	})
})

















