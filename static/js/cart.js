$(function(){
	$('#banner').on('click',function(){
		window.location.href="../index.html";
	})
//	购物车
	aaa();
function aaa(){
		var usr = $.cookie('logging')?$.cookie('logging'):'un';
		if($.cookie(usr)==''){
			$.cookie(usr,"",{expires:7, path:"/"});
			changeCart();
			$('#myCart').css({
			'height':"300px",
			'text-align':'center',
			'color':'#02AFFF',
			'line-height':"300px",
			"font-size": "40px",
				"background":"url(../img/wsp.png) no-repeat center center"
			}).html("").click(function(){
				window.location.href='../index.html';
			});
		}
			
}
//	商品详情
	goodsDetails();

	
	$('.gwc').on("mouseenter",function(){
		$('#product').html($('<img src="../img/loading.gif" style="margin-top:20px"/>'));
	});
	
	
	
	$('#checkAll').on('click',function(){
		if($('#checkAll').is(':checked')){
			$('.itemSelection').prop('checked','checked');
			goodsDetails();
		}else{
			$('.itemSelection').prop('checked','')
			$('.nprice').html("0.00");
			$('.total').html("0.00");
		}
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	$('.nextStep').find('a').click(function(){
		if($.cookie('logging')){
			alert('请先登录!');
			return false;
		}else{
			alert('结算成功，再见！');
		}
		ifCart();
		return false;
	})
	
//	购物车是否为空
	function ifCart(){
		var usr = $.cookie('logging')?$.cookie('logging'):'un';
			$.cookie(usr,"",{expires:7, path:"/"});
			changeCart();
			$('#myCart').css({
			'height':"300px",
			'text-align':'center',
			'color':'#02AFFF',
			'line-height':"300px",
			"font-size": "40px",
			"background":"url(../img/wsp.png) no-repeat center center"
		}).html("").click(function(){
			window.location.href='../index.html';
		});
		}
		
	
	//	随机抽四件商品
	for(var i=0;i<4;i++){
		var	n = parseInt(Math.random()*(shopRdm()-1)+1);
		var ele = shopRdm(n);
		
		var oLi = $('<li/>');
		var oDl = $('<dl/>')
		$('<a href="shop.html?'+ele.item+'"><img src=../'+ele.img+'></a>').appendTo(oLi);
		$('<dt>'+ele.title+'</dt>').appendTo(oDl);
		$('<dd><em>'+ele.price+'</em></dd>').appendTo(oDl);
		$('<dd><a href="shop.html?'+ele.item+'">添加到购物车</a></dd>').appendTo(oDl);
		oDl.appendTo(oLi);
		oLi.appendTo($('.possibleBuy').find('ul'));
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
//	商品详情
	
	function goodsDetails(fn){
		var	goodsCart = lookCart();
		var kind = goodsCart.kind;
		var numPrice = goodsCart.numPrice;
//		商品存在  清空dl
		if(goodsCart){
			$('.mc_btm').find('dl').html("");
		}
		//	商铺  
		var odt = $('<dt/>');
		$('<img src="../img/gfdp.png"/>').appendTo(odt);
		odt.appendTo($('.mc_btm').find('dl'));
		
		var ix = 0;
//		img item num price tittle
		$.each(goodsCart.data, function(){

//			item: "39", num: "1", price: "11", img: "1_05174898309521446_360.jpg", tittle: "得力(deli)8553 32mm彩色长尾夹/长尾票夹 24只/筒"
//			商品ID  数量存在
			if(this.item && this.num){
				var item = this.item;


				var odd = $('<dd item='+item+'/>');
				var delSpan =  $('<span class="sd_span"></span>')
				$('<input type="checkbox" class="itemSelection" checked="checked" ix='+(ix++)+'>').appendTo(odd);
				$('<a href=shop.html?'+this.item+'><img src=../img/'+this.img+'></a>').appendTo(odd);
				$('<title>'+this.tittle+'</title>').appendTo(odd);
				$('<span>￥<i class="price">'+this.price+'.00</i></span>').appendTo(odd);
				$('<span><a class="cut" href="#">-</a><input class="oneNum" type="text" value='+this.num+'><a class="add" href="#">+</a></span>').appendTo(odd);
				$('<span>￥<i  class="nprice">'+(this.price*this.num)+'.00</i></span>').appendTo(odd);
				$('<a href="#">收藏</a>').appendTo(delSpan)
//				在创建时绑定点击事件并把自身id传入给删除cookie的方法    回调
				$('<a class="cart_del" href="#">删除</a>').appendTo(delSpan).on('click',function(){
					delCart(item);
					goodsDetails();
					aaa();
					return false;
				});
				

				delSpan.appendTo(odd);
				odd.appendTo($('.mc_btm').find('dl'));
				
//				加减点击事件
//				off()  重复绑定的问题
				$('.cut,.add').off().on("click",function(){
					var item = $(this).closest('dd').attr('item');
					var num = $(this).parent().find('.oneNum').val();
					if($(this).hasClass('cut')){
						num--;
						if(num<=0){
							num=1;
						}
						$(this).parent().find('.oneNum').val(num);
					}
					if($(this).hasClass('add')){
						num++;
						if(num<=0){
							num=1;
						}
						$(this).parent().find('.oneNum').val(num);
					}
					addCart(item,num);
					goodsDetails();
					return false;
				})
				if(fn){
					fn();
				}
			}	
		});
//		合计
		$('<div class="summation"><span>店铺合计：</span><em >￥<i class="total">0.00</i></em></div>').appendTo($('.mc_btm').find('dl'))
	
		$('.num').html(kind);
		$('.total').html(numPrice+".00")
		
		
		ckbtn();
	};
	
})		
	//单选按钮
	function ckbtn(){
		$('.itemSelection').off().click(function(){
//			小计   判断条件
			var np = 0;
			var panduan = true;
			var panduan1 = true;
			if($(this).is(':checked')){
				$(this).closest('dd').find('.nprice').html(
					(parseInt($(this).closest('dd').find('.price').html())*parseInt($(this).closest('dd').find('.oneNum').val()))+'.00'
				)
			}else{
				$(this).closest('dd').find('.nprice').html('0.00')
			}
			
			
			
//			有一个不选中
			for(var i=0;i<$('.itemSelection').length;i++){
				if(!$('.itemSelection').eq(i).is(':checked')){
					panduan = false;
					break;
				}
			}
			if(!panduan){
				$('#checkAll').prop('checked','')
			}
//			没有一个不选中
			for(var i=0;i<$('.itemSelection').length;i++){
				if(!$('.itemSelection').eq(i).is(':checked')){
					console.log('d')
					panduan1 = false;
					break;
				}
			}
			if(panduan1){
				console.log('lll')
				$('#checkAll').prop('checked','checked')
			}
			






			for(var i=0;i<$('.nprice').length;i++){
				np += parseInt($('.nprice').eq(i).html())	
			}
			$('.total').html(np+".00")
		})
		
	}

	



//	增
	function addCart(_good,_sum){
		var addGood = _good;
		var addNum = _sum;
		var goods = lookCart();
		var arr = goods.data;
		var str = "";
		for(var i=0;i<arr.length;i++){
			var commodity = arr[i];
			if(commodity.item == addGood){
				commodity.num = addNum;
			}
			
//					item num price img tittle
			if(commodity.item){
				str += commodity.item+","+commodity.num+","+commodity.price+","+commodity.img+","+commodity.tittle+"?";
			}
		}
		$.cookie(goods.ur,str,{expires:7, path:"/"})
	}
	

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
	
