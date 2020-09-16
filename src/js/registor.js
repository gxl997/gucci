function $toObj(str){
    if(!str){
        return {};
    }
    return JSON.parse(str);
}
$('#sub').click(function () {
    let uname = $('#uname').val();
    let upwd = $('#upwd').val();
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