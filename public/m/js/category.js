// import { templates } from "handlebars";

// import { template } from "handlebars";

$(function(){
    mui('.mui-scroll-wrapper').scroll({
        indicators: false,
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });


    $.ajax({
        url:'/category/queryTopCategory',
        success:function(data){
            // console.log(data);
            var html=template('category-left',data);
            $('.aaa-left ul').html(html);
        }
    })
    $('.aaa-left ul').on('tap','li a',function(){
        var id=$(this).data('id');
        // console.log(id);
        $(this).parent().addClass('active').siblings().removeClass('active');
        getfenglei(id);
    })
    function getfenglei(id){
        $.ajax({
            url:'/category/querySecondCategory',
            data:{id:id},
            success:function(data){
                console.log(data);
                var html=template('category-right',data);
                $('.aaa-right .mui-row').html(html);
            }
        })
    }
    
})