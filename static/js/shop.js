$(function(){

	
//	菜单显示隐藏
	$('.tittle').hover(function(){
		$('.menu').css('display','block');
	},function(){
		$('.menu').hover(function(){
			$('.menu').css('display','block');
		},function(){
			$('.menu').css('display','none');
		});
		$('.menu').css('display','none');
	})
	
//	得到图片
	if(document.location.search){
		im = getItem();
		$.ajax({
			"url":"../json/commodity.json",
			"success":function(res){
				$.each(res,function(){
//					拿到各类中的具体数据   
					$.each(this.data, function(){
						if(this.item==im){
//							console.log(this);
//							标题
							$('#dmt_tle').html(this.title);
							//大图片加载完动画显示
							$('.dmi_big').find('ul').append($('<li><img src='+'../img/'+this.bigimg+' /></li>'));
							$('.dmi_big').find('li').animate({
								'width':360,
								'height':360
							});
//							小图
							$('.dmi_small').find('ul').append($('<li  class='+'dmis_active'+'><img id="cartSmallImg" sImg='+this.bigimg+' src='+'../img/'+this.bigimg+' /></li>'));
//							标题
							$('.dmt_top').append($('<h2>'+this.title+'</h2>'));
//							小标题
							$('.dmt_top').append($('<h3>'+this.intro+'</h3>'));
//							零售价
							$('.dmtbl_t').append($('<span>零&nbsp;售&nbsp;价：<del>'+this.LRP+'</del></span>'));
//							批发价
							$('.dmtbl_t').append($('<span>批&nbsp;发&nbsp;价：<b class="price">'+this.price+'&nbsp;</b>&nbsp;一个也批发，单单返钱花</span>'));
//							商品评价
							$('.dmtbl_t').append($("<span>&nbsp;&nbsp;&nbsp;&nbsp;商品评价：<img src='../img/star-on.png' alt=2 title='很满意'><img src='../img/star-on.png' alt=2 title='很满意'><img src='../img/star-on.png' alt=2 title='很满意'><img src='../img/star-on.png' alt=2 title='很满意'><img src='../img/star-on.png' alt=2 title='很满意'><a href='#dbrt_review'>(0条评论)</a></span>"));
						}
					});
				});
			},
			"error":function(){
				alert('你寻找的商品丢了')
			}
		})
	}
	else{
		alert('没有商品信息')
		$('#details').css('display','none');
	}
	
//	寄送地址
	$('.dmtbl_by').find('ul').find('li').on('click',function(){
		$('.dmtbl_by').find('a').find('b').html($(this).html())
	})
	
//	购买数量
	$('.count_sum').find('a').eq(0).on('click',function(){
		var sum = $('#count').val();
		sum++;
		$('#count').val(sum);
		return false;
	})
	$('.count_sum').find('a').eq(1).on('click',function(){
		var sum = $('#count').val();
		sum--;
		if(sum<=0){
			$('#count').val(1);
			return false;
		}
		$('#count').val(sum);
		return false;
	})

//	分享图片
	for(var i=0;i<$('.share').find('ul').find('li').length;i++){
		x=144;
		x+=(i*24);
		$('.share').find('ul').find('li').eq(i).find('img').css({
			"top":-x+"px"
		})
		
	}
//	立即购买
	$('#nowBuy').on('click',function(){
		adminCart();	
		setTimeout(function(){
			window.location.href='cart.html';
		},1500)
		return false;
	})
//	添加到购物车
//	来个定时器...
	var timer = '';
	$('#addCart').on('click',function(){
		clearTimeout(timer);
		$('.shoppingCart').stop().slideDown();
		
		adminCart();	
		changeCart();
		
		timer = setTimeout(function(){
			$('.shoppingCart').slideUp(500);
		},3000)
		
		return false;
	})
	
//	关闭购物信息
	$('.close').on('click',function(){
		$('.shoppingCart').css('display','none');
		return false;
	})
	
	
//	随机抽四件商品
	
	
	for(var i=0;i<4;i++){
		var	n = parseInt(Math.random()*(shopRdm()-1)+1);
		var ele = shopRdm(n);
		
		var oLi = $('<li/>');
		var oDl = $('<dl/>')
		$('<a href="shop.html?'+ele.item+'"><img src=../'+ele.img+'></a>').appendTo(oLi);
		$('<dt>'+ele.title+'</dt>').appendTo(oDl);
		$('<dd>特价：<em>'+ele.price+'</em></dd>').appendTo(oDl);
		$('<dd><a href="shop.html?'+ele.item+'">马上开抢</a></dd>').appendTo(oDl);
		oDl.appendTo(oLi);
		oLi.appendTo($('.randomGoods').find('ul'));
	}
	
//	tab切换
	$('#dbr_top').find('h2').on('click',function(){
		$('#dbr_top').find('h2').removeClass('curve');
		$(this).addClass('curve');
		$('#dbr_top').css({'position':'fixed',"top":0})
//		var i = $(this).index();
//		switch(i){
//			case 0 : $('#dbrt_description,#dbrt_img,#dbrt_review,#purchaseConsulting').css('display','block');break;
//	
//			case 1 : $('#dbrt_description').hide();
//					 $('#dbrt_img,#dbrt_review,#purchaseConsulting').css('display','none');break;
//			case 2 : $('#dbrt_review').css('display','block');
//					 $('#dbrt_img,#dbrt_description,#purchaseConsulting').css('display','none');break;
//			case 3 : $('#purchaseConsulting').css('display','block');
//					 $('#dbrt_description,#dbrt_img,#dbrt_review').css('display','none');break;
//		}
	})
	$(window).scroll(function(){
		if($(window).scrollTop()<=1100){
			$('#dbr_top').css('position','relative');
		}
		if($(window).scrollTop()>=1100){
			$('#dbr_top').css({'position':'fixed',"top":0})
		}
	})
	
	
	
//	评价
	$('#dbrt_review').find('h2').on('click',function(){
		$('#dbrt_review').find('h2').removeClass('curve');
		$(this).addClass('curve');
	})
//	

//	菜单切换显示隐藏
	$('.dbl_commodity').find('i').click(function(){
		$(this).next('ul').slideToggle();
		if($(this).html()=="+"){
			$(this).html("-");
		}else{
			$(this).html("+");
		}
	})
	
	//	随机抽5件商品
	
	
	for(var i=0;i<5;i++){
		var	n = parseInt(Math.random()*(shopRdm()-1)+1);
		var ele = shopRdm(n);
		
		var oLi = $('<li/>');
		var oDl = $('<dl/>')
		$('<a href="shop.html?'+ele.item+'"><img src=../'+ele.img+'></a>').appendTo(oLi);
		$('<dt><a href="shop.html?'+ele.item+'">'+ele.title+'</a></dt>').appendTo(oDl);
		$('<dd><em>'+ele.price+'</em></dd>').appendTo(oDl);
		oDl.appendTo(oLi);
		oLi.appendTo($('.dbl_list').find('ul'));
	}


})
//===========end================

//随机抽取商品 同步
	function shopRdm(item){
		var dataLgh = 0;
		var spw = "";
 		$.ajax({
			"type":"get",
			"url":"../json/commodity.json",
			"async":false,
			"success":function(res){
//				console.log(res)
				$.each(res, function() {
					$.each(this.data, function() {
						dataLgh++;
						if(this.item==item){
							spw = this;
						}
					})
				})
			}
		});
		if(item){
			return spw;
		}
		else{
			return dataLgh;					
		}
	}
	

function getItem(){
	var im = document.location.search;
		im = im.replace('?','');
		return im;
}

//添加到购物车
function adminCart(){
//	总价
	var grossPrice = 0;
//	商品数量
	var  goodsNum = 0;
		var use = $.cookie('logging')==""?"un":$.cookie('logging');
		var str = '';
		var judge = false;
		var sum = $('#count').val();
		var item = getItem();
		var img = $('#cartSmallImg').attr('sImg');
		var tle = $('.dmt_top').find('h2').html();
//		console.log(tle)
		
		//class中的html ： ¥2099.00&nbsp; 得到2099
		var price =parseInt($('.price').html().replace('¥',''));
//		如果商品数量小于等于0
		if(sum<=0){
			alert('请填写商品数量')
			$('#count').val(1)
		}

//		item,sum,price,img,tle
		if($.cookie(use)){
	//		重新计算前先清0
			grossPrice = 0;
			goodsNum = 0;
			var cart = $.cookie(use);
//			console.log(cart)
			var cart1 = cart.split('?');
			for(var i=0;i<cart1.length;i++){
				var cart2 = cart1[i].split(',');
				if(cart2[0]==item){ 
//					有这条商品信息 数量想加
//					console.log(cart2[1]);
					s = cart2[1] = (parseInt(cart2[1]) + parseInt(sum));
					judge = true;
				}
//重新存储所有的购物信息       item或sum为空就不存了，不然到后边全是undefined ?
				if(cart2[0] && cart2[1]){
					str += cart2[0]+","+cart2[1]+","+cart2[2]+","+cart2[3]+","+cart2[4]+"?";
				}
				if(cart2[1]){
					goodsNum++;
//					console.log(parseInt(cart2[1]) +"  "+parseInt(cart2[2]) )
	//				顺便算下价格先
					grossPrice += (parseInt(cart2[1])*parseInt(cart2[2]));
				}
				
			}
		}
		
//		没有就添加新的商品
		if(!judge){
			goodsNum++;
			str += item+","+sum+","+price+","+img +","+ tle +"?";
			grossPrice += price*sum;
		}
//		看下总价
//		console.log("¥"+grossPrice+".00")
		$.cookie(use,str,{expires:7, path:"/"})
		$('.num').html(goodsNum);
		$('.alwaysNum').html("¥"+grossPrice+".00");
		
		
}
