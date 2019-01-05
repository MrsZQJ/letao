$(function () {
    function getQueryString(name) {
        //获取地址栏的url
        var str = location.search;
        str = str.substr(1);
        str = decodeURI(str);
        var arr = str.split('&');
        console.log(arr);
        for (var i = 0; i < arr.length; i++) {
            var arr1 = arr[i].split('&');
            if (arr1[0] == name) {
                return arr1[1];
            }
        }
    }

    var key = getQueryString('key');


    function queryProduct() {
        $.ajax({
            data: {
                page: 1,
                pageSize: 4,
                proName: key,
            },
            url: "/product/queryProduct",
            success: function (zhou) {
                console.log(zhou);
                var html = template('abccba', zhou);
                $('.mui-card-content .mui-row').html(html);

            }
        })
    }
    queryProduct();


    var obj = {
        page: 1,
        pageSize: 4,
    }

    var page=1;
    $('.btn-search').on('tap', function () {
        key = $('.input-search').val().trim();
        if (!key) {
            mui.alert('输入不能为空', 'hello word', function () {});
            return;
        }
        queryProduct();
    })


    $('.yemian .mui-card .mui-card-header a').on('tap', function () {
        var sort = $(this).data('bbb');
        var sortType = $(this).data('aaa');

        console.log(sortType);
        console.log(sort);
        sort = sort == 1 ? 2 : 1;
        $(this).data('bbb', sort);
        //给对象obj通过[]添加属性
        obj[sortType] = sort;

        $.ajax({
            data: obj,
            url: "/product/queryProduct",
            success: function (zhou) {
                console.log(zhou);
                var html = template('abccba', zhou);
                $('.mui-card-content .mui-row').html(html);
            }
        })

        $(this).addClass('active').siblings().removeClass('active');
        if (sort == 1) {
            $(this).find('i').removeClass("mui-icon-arrowdown").addClass('mui-icon-arrowup');
        } else {
            $(this).find('i').removeClass("mui-icon-arrowup").addClass('mui-icon-arrowdown');
        }
        page=1;
    })


    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                height: 50, //可选,默认50.触发下拉刷新拖动距离,
                auto: false, //可选,默认false.首次加载自动下拉刷新一次
                contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function(){
                    setInterval(function(){
                        queryProduct();
                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                        mui('#refreshContainer').pullRefresh().refresh(true);
                        page=1
                    },1500)
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            up: {
                height: 50, //可选,默认50.触发下拉刷新拖动距离,
                auto: false, //可选,默认false.首次加载自动下拉刷新一次
                contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function(){
                    setInterval(function(){
                        page++;
                        $.ajax({
                            url:'/product/queryProduct',
                            data:{
                                page:page,
                                proName: key,
                                pageSize: 4,
                            },
                            success:function(res){
                                if(res.data.length>0){
                                    var html=template('abccba',res);
                                    $('.mui-card-content .mui-row').append(html);
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                                }
                                else{
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                }
                            }
                        })
                    },2000)
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });
})