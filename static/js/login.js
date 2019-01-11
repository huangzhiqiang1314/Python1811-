// $(function(){
//
// 	//登录
// 	var urna=0,pswd=0;
// 	$('.urna').find('input').blur(function(){
// 		unVerify();
// 	});
// 	//密码
// 	$('.pswd').find('input').blur(function(){
// 		pwVerify();
// 	});
// 	function unVerify(){
// 		urna=0;
// 		if($('.urna').find('input').val()==""){
// 			$('.urna').find('span').css('display','block');
// 		}else{
// 			$('.urna').find('span').css('display','none');
// 			urna=1;
// 		}
// 	}
// 	function pwVerify(){
// 		pswd=0;
// 		if($('.pswd').find('input').val()==""){
// 			$('.pswd').find('span').css('display','block');
// 		}else{
// 			$('.pswd').find('span').css('display','none');
// 			pswd=1;
// 		}
// 	}
//
//
// 	$('.login_in').find('a').eq(0).on('click',function(){
// 		var user = $('.urna').find('input').val();
// 		var pswd = $('.pswd').find('input').val();
// 		unVerify();
// 		pwVerify();
// //		用户名和密码不为空 否则else提示
// 		if(urna&&pswd){
// //			判断是否有已注册用户
// 			if($.cookie('user')){
// 				var str = $.cookie('user');
// 			}else{
// //				没有cookie
// 				$('.urna').find('span').css('display','block').html('用户不存在');
// 				return;
// 			}
// //			有用户
// 			var str1 = str.split('?');
// //			设置main的样式并清空
// 			$('#main').css({
// 							'height':"300px",
// 							'text-align':'center',
// 							'color':'#02AFFF',
// 							'line-height':"300px",
// 							"font-size": "40px"
// 			}).html("");
// //			遍历每一组用户
// 			for(var i=0;i<str1.length;i++){
// 				var str2 = str1[i].split(',');
// //				判断是否有输入的用户名
// 				console.log("取出"+str2);
// 				console.log("输入"+user);
// 				if(str2[0]==user){
// //					对应密码是否正确
// 					if(str2[1]==pswd){
// 						$('#main').html('登录成功');
// 						$.cookie('logging',user,{expires:7, path:"/"});
// //						1.5秒后跳转
// 						setTimeout(function(){
// 							window.location.href='../index.html';
// 						},1500)
// 					}
// 					else{
// 						$('#main').html('用户名或密码错误,请重新输入');
// //						刷新本页
// 						setTimeout(function(){
// 							window.location.reload();
// 						},1500)
// 					}
// //					找到输入的用户名和cookie中的对比 并阻止函数继续进行
// 					return;
// 				}
// 			}
// //			遍历完没有发现输入用户
// 			$('#main').html('用户不存在');
// 				setTimeout(function(){
// 				window.location.reload();
// 			},1500)
// 		}else{
// 			$('.urna').find('span').css('display','block');
// 			$('.pswd').find('span').css('display','block');
// 		}
// //		阻止a的默认事件
// 		return false;
// 	})
// })
