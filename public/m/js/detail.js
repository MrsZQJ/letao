$(function () {





    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    var id = GetQueryString('id');
    // console.log(id); 

    //ajax渲染页面
    $.ajax({
        url: '/product/queryProductDetail',
        data: {
            id: id
        },
        success: function (data) {

            var str = data.size;
            str = str.split('-');
            var size = [];
            for (var i = str[0]; i <= str[1]; i++) {
                size.push(i);
            }
            // console.log(size);
            data.size = size;
            console.log(data);
            var html = template('lpl', data);
            $('#main .mui-scroll').html(html);
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 1500 //自动轮播周期，若为0则不自动播放，默认为0；
            });
            mui('.product-num').numbox();
            //点击尺码
            $('.chima button').on('tap',function(){
                $(this).addClass('mui-btn-primary').siblings().removeClass('mui-btn-primary');
            })
        }
    })


    $('.btn-join').on('tap', function () {
        if(!$('.mui-btn.mui-btn-primary').length){
            mui.toast('请选择尺码!!');
            return false;
        }
        if(!mui('.mui-numbox').numbox().getValue()){
            mui.toast('请选择数量!!');
            return false;
        }
        var size=$('.mui-btn.mui-btn-primary').data('size');
        console.log(size);
        var num=mui('.mui-numbox').numbox().getValue();
        console.log(num);
        
        $.ajax({
            url:'/cart/addCart',
            type:'post',
            data:{
                productId:id,
                num:num,
                size:size,
            },
            success:function(data){
                if(data.success){
                    // 6. 表示添加成功
                    console.log('快乐');
                    
                }else{
                    // 7. 不是成功就都是失败 跳转到登录页面 注意在商品详情页面 
                    // 跳转到登录的时候吧当前商品详情页面的url带过去 通过url参数 值是当前页面的url
                    alert('1111');
                    location = 'login.html?returnUrl='+location.href;
                }
            }
        })
    })
})