// var appendNumber = 4;
// var prependNumber = 1;
// var swiper = new Swiper('.swiper-container', {
//     pagination: '.swiper-pagination',
//     nextButton: '.swiper-button-next',
//     prevButton: '.swiper-button-prev',
//     // slidesPerView: 1,
//     slidesPerView : 4,
//     slidesPerGroup : 1,
//     initialSlide :0,
//     paginationClickable: true,
//     spaceBetween: 0,
// });
    
// document.querySelector('.prepend-2-slides').addEventListener('click', function (e) {
//     e.preventDefault();
//     swiper.prependSlide([
//         '<div class="swiper-slide">Slide ' + (--prependNumber) + '</div>',
//         '<div class="swiper-slide">Slide ' + (--prependNumber) + '</div>'
//     ]);
// });
// document.querySelector('.prepend-slide').addEventListener('click', function (e) {
//     e.preventDefault();
//     swiper.prependSlide('<div class="swiper-slide">Slide ' + (--prependNumber) + '</div>');
// });
// document.querySelector('.append-slide').addEventListener('click', function (e) {
//     e.preventDefault();
//     swiper.appendSlide('<div class="swiper-slide">Slide ' + (++appendNumber) + '</div>');
// });
// document.querySelector('.append-2-slides').addEventListener('click', function (e) {
//     e.preventDefault();
//     swiper.appendSlide([
//         '<div class="swiper-slide">Slide ' + (++appendNumber) + '</div>',
//         '<div class="swiper-slide">Slide ' + (++appendNumber) + '</div>'
//     ]);
// });

//将字符串转为对象
function $toObj(str){
    if(!str){
        return {};
    }
    return JSON.parse(str);
}
//获取元素
let $div = $('.cartList');
let $empty = $('.commodity')
//获取cookie
let cookie_str = $.cookie('carts') ? $.cookie('carts') : '';
if(!cookie_str){
    $empty.css('display','block');
}else{
    $empty.css('display','none');
    let cookie_obj = $toObj(cookie_str);
    for(let key in cookie_obj){
        let good = cookie_obj[key];
        let $ul = $('<ul></ul>').appendTo($div);
        $ul.addClass('goodInfo');
        $ul.attr('data-good-id',key);
        let str = `
            <li><img src="${good.src}" /></li>
            <li>${good.name}</li>
            <li>${good.price}</li>
            <li class="num">
                <a href="javascript:;" class="minus">-</a>
                <input type="text" name="" id="" value="${good.num}" />
                <a href="javascript:;" class="plus">+</a>
            </li>
            <li class="total">${good.price * good.num}</li>
            <li><a href="javascript:;" class="del">删除</a></li>
        `;
        $ul.html(str);
    }
}
//获取减号按钮，添加遍历事件
let minus = $('.minus');
minus.each(function(index,value){
    $(value).click(()=>{
        //获取ID
        let id = $(this).parents('.goodInfo').attr('data-good-id');
        //获取cookie
        let cookie_str = $.cookie('carts') ?  $.cookie('carts') : '';
        //转对象
        let cookie_obj = $toObj(cookie_str);
        //改变数量
        if(cookie_obj[id].num > 0 ){
            cookie_obj[id].num -- ;
        }
        //存入cookie
        $.cookie('carts',JSON.stringify(cookie_obj),{expires : 7,path : '/' });
        //修改页面显示
        $(this).next().val(cookie_obj[id].num);
        $(this).parent().next().text(cookie_obj[id].num * cookie_obj[id].price);
        
    })
})
    
        //获取加号按钮，添加遍历事件
    
    $('.plus').each(function(index,value){
        $(value).click(()=>{
            //获取ID
            let id = $(this).parents('.goodInfo').attr('data-good-id');
            //获取cookie
            let cookie_str = $.cookie('carts') ?  $.cookie('carts') : '';
            //转对象
            let cookie_obj = $toObj(cookie_str);
            //改变数量
            cookie_obj[id].num++ ;
            //存入cookie
            $.cookie('carts',JSON.stringify(cookie_obj),{expires : 7,path : '/' });
            $(this).prev().val(cookie_obj[id].num);
            $(this).parent().next().text(cookie_obj[id].num * cookie_obj[id].price);
            
        })
    })
        //获取删除按钮，添加遍历事件
    let del = $('.del');
    del.each(function(index,value){
        $(value).click(()=>{
            //获取ID
            let id = $(this).parents('.goodInfo').attr('data-good-id');
            //获取cookie
            let cookie_str = $.cookie('carts') ?  $.cookie('carts') : '';
            //转对象    
            let cookie_obj = $toObj(cookie_str);
            //删除cookie
            delete cookie_obj[id];
            //存入cookie
            $.cookie('carts',JSON.stringify(cookie_obj),{expires : 7,path : '/' });
            //删除页面
            $(this).parents('.goodInfo').remove();
            
        })
    })