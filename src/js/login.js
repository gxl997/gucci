function $toObj(str){
    if(!str){
        return {};
    }
    return JSON.parse(str);
}
$('.go').click(function () {
    let uname = $('.uname').val();
    let upwd = $('.upwd').val();
    /*
        key :  users
        value : 
        '{
            uname : upwd，
            uname : upwd
        }'
    */
    //获取cookie
    let cookie_str = $.cookie('users') ? $.cookie('users') : '';
    //转对象
    let cookie_obj = $toObj(cookie_str);
    //判断用户是否存在 
    if (uname in cookie_obj) {
        alert('用户已存在！');
        return;
    }
    //不存在，加入对象
    cookie_obj[uname] = upwd;
    //存入cookie
    $.cookie('users', JSON.stringify(cookie_obj), { expires: 7, path: '/' });
    alert('注册成功！');
})
$('#go').click(function () {
    location.href = 'login.html';
})

//手机号正则
let re = /^(13|14|15|17|18|19){1}[0-9]{9}$/;
$('.uname').focus(function(){
    $(this).val('');
})
$('.uname').blur(function(){
    if(!re.test($(this).val())){
        $(this).css({
            border : '1px solid red',
            backgroundColor : 'pink'
        });
        $('.hideOne').css({
            display : 'block'
        });
    };
})
//登录验证手机号
$('.goname').focus(function(){
    $(this).val('');
})
$('.goname').blur(function(){
    if(!re.test($(this).val())){
        $(this).css({
            border : '1px solid red',
            backgroundColor : 'pink'
        });
        $('.hide1').css({
            display : 'block'
        });
    };
})
//验证码正则
let re1 = /^\d{6}$/;
$('.input_two').focus(function(){
    $(this).val('');
})
$('.input_two').blur(function(){
    if(!re1.test($(this).val())){
        $(this).css({
            border : '1px solid red',
            backgroundColor : 'pink'
        });
        $('.hideTwo').css({
            display : 'block'
        });
    };
})

//密码正则验证
let re2 = /^\w{6,12}$/;
$('.upwd').focus(function(){
    $(this).val('');
})
$('.upwd').blur(function(){
    if(!re2.test($(this).val())){
        $(this).css({
            borderColor : 'red',
            backgroundColor : 'pink'
        });
        $('.sp').css({
            borderColor : 'red',
            backgroundColor : 'pink',
        });
        $('.hide3').css({
            display : 'block'
        });
    };
})

//登录成功
$('.goIndex').click(function(){
    let uname = $('.goname').val();
    let upwd = $('.goupwd').val();
    let cookie_str = $.cookie('users') ? $.cookie('users') : '';
    let cookie_obj = $toObj(cookie_str);
    if(uname in cookie_obj){
        if(upwd === cookie_obj[uname]){
            alert('登录成功');
            location.href = 'index.html';
        }else{
            alert('密码错误！');
        }
    }else{
        alert('用户名不存在');
    }
});