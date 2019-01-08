$(function () {
    $('#main .mui-btn-primary').on('tap', function () {
        var username = $('.mui-input-clear').val().trim();
        // 3. 进行非空判断
        if (!username) {
            mui.toast('请输入用户名', {
                duration: 'short',
                type: 'div'
            });
            // return 结束后面的代码不执行
            return false; // 不进行结束后面的代码而且阻止默认行为
        }
        var password = $('.mui-input-password').val().trim();
        if (!password) {
            mui.toast('请输入密码', {
                duration: 'short',
                type: 'div'
            });
            return false;
        }


        $.ajax({
            url: "/user/login",
            type: "post",
            data: {
                username: username,
                password: password,
            },
            success: function (data) {
                if (data.success) {
                    // 6. 成功 就跳转回我需要返回的页面的url  通过地址栏参数去获取这个我要返回 的url
                    var returnUrl = getQueryString('returnUrl');
                    console.log(returnUrl)
                    // 7. 使用location去跳转到这个url地址
                    location = returnUrl;
                } else {
                    // 7. 失败提示用户失败的信息
                    mui.toast(data.message, {
                        duration: 'short',
                        type: 'div'
                    });
                }
            }
        })
    })

    // 2. 点击免费注册 跳转到注册页面
    $('.btn-register').on('tap', function () {
        location = 'register.html';
    });
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        // console.log(r); 
        if (r != null) return decodeURI(r[2]);
        return null;
    }
})