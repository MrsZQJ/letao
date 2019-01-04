$(function () {

    $('.search-shang form button').on('tap', function () {
        var search = $('.search-shang form input').val().trim();
        if (search == "") {
            mui.toast('不能填空', {
                duration: 'short'
            });
            return false;
        }
        var arr = localStorage.getItem('jiang');
        arr = JSON.parse(arr) || [];
        if (arr.indexOf(search) != -1) {
            arr.splice(arr.indexOf(search), 1);
        }
        arr.unshift(search);
        arr = JSON.stringify(arr);
        // console.log(arr);
        localStorage.setItem('jiang', arr);
        $('.search-shang form input').val("");
        shen();
    })

    shen();
    function shen() {
        var arr = localStorage.getItem('jiang');
        arr = JSON.parse(arr) || [];
        var html = template('tpi', {
            list: arr
        });
        $('.mui-card-content ul').html(html);
    }

    $('.mui-card-header a').on('tap',function(){
        localStorage.clear('jiang');
        shen();
    })

    $('.mui-card-content ul').on('tap','li',function(){
        // console.log(1111);
        var ccc=$(this).parent().data('ccc');
        var arr=localStorage.getItem('jiang');
        arr=JSON.parse(arr);
        arr.splice(ccc,1);
        arr=JSON.stringify(arr);
        localStorage.setItem('jiang',arr);
        shen();
    })
})