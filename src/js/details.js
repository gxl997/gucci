
//将字符串转为对象
function $toObj(str){
    if(!str){
        return {};
    }
    return JSON.parse(str);
}

let $buy = $('#buy');
			init();
			$buy.click(()=>{
                location.href = 'cart.html';
			})
			let $to_cart = $('.addToCart');
			//遍历添加事件
			$to_cart.each(function(i,value){
				$(value).on('click',(event)=>{
					//商品id
					let good_id = $(this).parent().attr('data-good-id');
					//商品名称
					let good_name = $(this).prev().prev().text();
					//商品src
					let good_src = $(this).siblings('img').attr('src');
					//商品价格
					let good_price = parseInt($(this).prev().text());
					/*
						key : carts
						value :
						'{
							'sp1' : {
								name : '',
								price : '',
								src : '',
								num : ''
							}	
						}'
					*/
					//判断购物车中是否存在 
					//获取cookie
					let cookie_str = $.cookie('carts') ? $.cookie('carts') : '';
					//转对象
					let cookie_obj = $toObj(cookie_str);
					//判断对象中是否存在当前购买的商品
					if(good_id in cookie_obj){
						cookie_obj[good_id].num ++;
					}else{
						cookie_obj[good_id] = {
							"name" : good_name,
							"src" : good_src,
							"price" : good_price,
							"num" : 1
						}
					}
					$.cookie('carts',JSON.stringify(cookie_obj),{expires : 7,path : '/'});

					//获取图片---飞
					// let $img = $(this).siblings('img').clone().css({width : 50,height : 50});
					// $img.fly({
					// 	start: {
					// 		left: event.pageX,
					// 		top: event.pageY
					// 	},
					// 	end: {
					// 		left: $buy.offset().left,
					// 		top: $buy.offset().top,
					// 		width: 0,
					// 		height: 0
					// 	},
					// 	onEnd: function(){
					// 		var num = parseInt(/(\d+)/.exec($buy.val())[1]);
					// 		$buy.val(`购物车(${++ num})`)
					// 	}
                    // });
                    init();
				})
			})


			function init(){
				//获取cookie
				let cookie_str = $.cookie('carts') ? $.cookie('carts') : '';
				//转对象
				let cookie_obj = $toObj(cookie_str);
				let sum = 0;
				for(let i  in cookie_obj){
					sum += cookie_obj[i].num;
				}
				$buy.val(`购物车(${sum})`)
			}