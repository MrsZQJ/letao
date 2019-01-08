$(function () {
    $('.mui-btn-primary.btn-register').on('tap', function () {
        var check = true;
        mui(".mui-input-group input").each(function (index, value) {
            //若当前input为空，则alert提醒 
            if (!this.value || this.value.trim() == "") {
                var label = this.previousElementSibling;
                mui.toast(label.innerText + "不允许为空");
                check = false;
                return false;
            }
        }); //校验通过，继续执行业务逻辑 
        if (check) {
            var mobile = $('.mobile').val();
            // 2.1 判断当前手机号输入是否合法 是否满足11位 以 1   第二位 3 4 5 6 7 8 9中的一个 后面跟着9个数字结尾 !号是取反如果不符合
            if (!(/^1[3456789]\d{9}$/.test(mobile))) {
                mui.toast("手机号输入不合法请重新输入");
                return false;
            }
            var username = $('.username').val();
            var password1 = $('.password1').val();
            var password2 = $('.password2').val();
            // 2.2 判断2次输入的密码是否一致
            if (password1 != password2) {
                mui.toast("两次输入的密码不一致");
                return false;
            }
            // 当前用户输入的vcode
            var vcode = $('.vcode').val();
            // 2.3 判断当前输入的验证码 是否和 后台返回  全局变量的验证码是否一致
            if (vcode != zhouquan) {
                mui.toast("验证码输入错误");
                return false;
            }

            // 3. 调用注册APi去注册 传人这些参数
            $.ajax({
                url: '/user/register',
                type: 'post',
                data: {
                    username: username,
                    password: password1,
                    mobile: mobile,
                    vCode: zhouquan,
                },
                success: function (data) {
                    // 4. 判断当前注册是否成功
                    if (data.success) {
                        // 5. 如果成功 跳转到登录去登录页面 跳转到登录并且跟上登录成功后要 跳转到的url
                        // 我从注册去登录 我登录成功去到个人中心
                        location = 'login.html?returnUrl=user.html';
                    } else {
                        // 6. 失败就提示用户失败的原因
                        mui.toast(data.message);
                    }
                }
            })
        }
    })


    var zhouquan='';
    $('.get-vcode').on('tap',function(){
        $.ajax({
            url:'/user/vCode',
            success:function(data){
                zhouquan=data.vCode;
                console.log(zhouquan);
                
            }
        })
    })
})