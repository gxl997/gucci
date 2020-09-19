
$(function(){
//顶部滑动效果
    let timer = null;
    $('#show').mouseover(function(){
            $('.place').fadeIn(500,()=>{
                $('.place').show(); 
            })
    });
    $('.place').mouseover(function(){
        clearTimeout(timer)
        $('.place').fadeIn(500,()=>{
            $('.place').show(); 
        })
    });
    $('#show,.place').mouseout(function(){
        timer = setTimeout(() => {
            $('.place').fadeOut(500,()=>{
                $('.place').hide(); 
            })
        }, 1000);
    });
})
    