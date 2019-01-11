$(function(){
	//	已登录用户
	if($.cookie('logging')){
		var str = $.cookie('logging');
		$('<span>您好 <a href='+"#"+'><i>'+str+'</i></a>，欢迎来到米米乐商城<a href="#" class="exit" style="margin-left:4px">[退出]</a></span>').appendTo($('.hd_login'))
//		信息栏 用户名
		$('.username').html(str);
//		会员信息
		$('.memberinfo').html('银米会员').css('color','red');
		var oSp = $('<span/>');
		oSp.addClass('logged');
		$('<div class="strip-range" style="width:'+'40%'+'"></div>').appendTo(oSp);
		$('<span>您还差<em class="integral">'+'1200'+'</em>积分，达到金米会员</span>').appendTo($('.login'))
		oSp.appendTo($('.login'));
		
		
//		到登录页的时候
		if(window.location.pathname=="/mmloo/page/login.html" || window.location.pathname=="/page/login.html"){
			$('.urna').find('input').val(str);	
			$.cookie('logging',"",{expires:7, path:"/"});
		}

		
		
		
		//		没有商品
		if(!$.cookie($.cookie('logging'))){
			$('#product').html($('<span style="height:60px;line-height:60px">您的购物车中暂无商品，赶快选择心爱的商品吧！</span>'));			
		}
		//	有商品的时候修改内容
		else{
			changeCart();
		}
	}else{
//		如果没有登录的用户 就把logging设为空 为了方便后边购物车的判断
		$.cookie('logging',"",{expires:7, path:"/"});
		
//		坑  首页与其他页面跳转路径不一样
//		console.log(window.location)
//		pathname: "/page/register.html"   pathname: "/mmloo/index.html",   pathname: "/index.html", pathname: "/"
//		这是首页
		if(window.location.pathname=="/mmloo/index.html" || window.location.pathname=="/index.html" || window.location.pathname=='/'){
			$('<span><a href="page/login.html">登录</a></span>').appendTo($('.hd_login'));
			$('<span><a href="page/register.html">注册</a></span>').appendTo($('.hd_login'));
			//个人栏 好像只有index.html有
			$('.username').html('Hi,您好');
			var oSp = $('<span/>');
			oSp.addClass('not_Logged');
			$('<a href="page/login.html">登录</a>').appendTo(oSp);
			$('<a href="page/register.html">注册</a>').appendTo(oSp)
			oSp.appendTo($('.login'));
	
//			导航购物车
			$('#product').html($('<img src="img/loading.gif" style="margin-top:20px"/>'));
			
		
		}
//		其他页
		else{
			$('<span><a href="login.html">登录</a></span>').appendTo($('.hd_login'));
			$('<span><a href="register.html">注册</a></span>').appendTo($('.hd_login'));
			$('#product').html($('<img src="../img/loading.gif" style="margin-top:20px"/>'));
		}
		

	}
//	退出
	$('.exit').on('click',function(){
		setTimeout(function(){
		if(window.location.pathname=="/mmloo/index.html" || window.location.pathname=="/index.html" || window.location.pathname=='/'){
				window.location.href='page/login.html';
			}
			else{
				window.location.href='login.html';
			}

		},1000)
		return false;
	});











		//登录的用户
		console.log("已登录用户："+$.cookie('logging'));
		console.log("全部用户："+$.cookie('user'));
		//购物车详情         如果已登录用户为空  然后$.cookie()会把所有的cookie取出来 un==未登录
		console.log(lookCart());
		changeCart();
//		console.log(window.location)















//		header导航   移入显示下拉栏
	$('#header .list>li').hover(function(){
		$(this).css({'background':'#FFF'});
		$(this).find('ul').width($(this).width()).show();
//		移入移出ul中的li 让li分别改变背景  第一个为函数移入  第二个移出
		$(this).find('li').hover(function(){
			$(this).css('background','#EEE')
		},function(){
			$(this).css('background','')
		})
	},function(){
		$(this)	.css({'background':''});
		$(this).find('ul').hide();
	});
	
	
	//这里有的页面没有用到这个方法 没有引入对应的js
	//可能出现 Uncaught ReferenceError: submenu is not defined
	try{
		//	子菜单
		submenu();
	}catch(e){
		//TODO handle the exception
	}
	//回到顶部
	$('.backTop').click(function(){
		$('html,body').scrollTop(0);
	})
	


	
//	删除    因为元素是在添加到购物车进行的   然后再查找节点是在页面加载完成时做的  添加到购物车时创建的节点就找不到   加入购物车后重新刷新才行    移入这个位置的时候再执行这个方法
// 	
function moveDelCart(){
	$('.cart_del').on('click',function(){
		delCart($(this).attr('item'));
		changeCart();
		if($('#shopNum').html()==0){
			$('#product').html($('<span style="height:60px;line-height:60px">您的购物车中暂无商品，赶快选择心爱的商品吧！</span>'));			
		}
	})
}

//不知道移入li 显示购物车的写哪去了  还好jq不会覆盖
$('.gwc').mouseenter(function(){
	moveDelCart();
})

	
	
	
	
	
	
})
//================end===============

//	购物车
//	查
	function lookCart(){
//		kind num numPrice img 
//		商品种类     总计
		var str = []; 
		var kind = 0;
		var numPrice = 0;
		var cke = $.cookie('logging')==""?"un":$.cookie('logging');
		if($.cookie(cke)){
			var cart = $.cookie(cke);
			cart = cart.split('?');
			for (var i=0;i<cart.length;i++){
				cart1 = cart[i].split(',');
//				判断商品是否存在
				if(cart1[0]){
					/***
					 * item num price img tittle
					 */
					str.push({item:cart1[0],num:cart1[1],price:cart1[2],img:cart1[3],tittle:cart1[4]});
					kind++;
					lRP = cart1[2];
					numPrice += parseInt(cart1[2])*parseInt(cart1[1]);
				}
			}	
		}
		//返回用户 + 整个数组 + 种类 + 总价
		return {
			ur:cke,
			data:str,
			kind:kind,
			numPrice:numPrice
		};
	}
	
//	删
/***
 * 要删除的商品的id
 * @param {Object} good
 */
	function delCart(_good){
		var good = _good;
		var goods = lookCart();
		var arr = goods.data;
		var str = "";
		for(var i=0;i<arr.length;i++){
			var commodity = arr[i];
			if(commodity.item==good){
				commodity.item = "";
			}
//					item num price img tittle
			if(commodity.item){
				str += commodity.item+","+commodity.num+","+commodity.price+","+commodity.img+","+commodity.tittle+"?";
			}
		}
		$.cookie(goods.ur,str,{expires:7, path:"/"})
	}
	
	
	
	// 改   只是修改导航中显示的内容。。 
	function changeCart(){
		var cart = lookCart();
		
		$('.num').html(cart.kind);
		$('#total').html("¥"+cart.numPrice+".00")
		
		var oD = $('<dl/>')
		$.each(cart.data, function(res){
			var odd = $('<dd/>'); 			
			if(window.location.pathname=="/mmloo/index.html" || window.location.pathname=="/index.html" || window.location.pathname=='/'){
				$('<a href=page/shop.html?'+this.item+'><img src='+"img/"+this.img+'></a>').appendTo(odd);
				$('<a href=page/shop.html?'+this.item+'><span>'+this.tittle+'</span></a>').appendTo(odd);
			}else{
				$('<a href=shop.html?'+this.item+'><img src='+'../img/'+this.img+'></a>').appendTo(odd);
				$('<a href=shop.html?'+this.item+'><span>'+this.tittle+'</span></a>').appendTo(odd);
			}
			$('<div><i>¥'+this.price+'.00x'+this.num+'</i><em item='+this.item+' class="cart_del">删除</em></div>').appendTo(odd);
			odd.appendTo(oD);
		});
		
		$('#product').html(oD);
	}











