function getData() {
    //热搜数据
    $.ajax({
        type: "get",
        url: "https://static-content.ulecdn.com/mobilead/recommond/dwRecommond.do",
        data: {
            restype:2002,
            sectionKeys: 'wap_onlyphone,wap_onlyphone,wap_search_default_value,wap_searchkeyword',
        },
        cache:true,//取消默认时间戳
        jsonpCallback: 'jsonApiCallback2',
        jsonp:'jsonApiCallback',
        dataType:'jsonp',
    })
}
getData()

//热搜
function jsonApiCallback2(result) {
    var hotData = result.wap_searchkeyword;
    var hotHtml = ejs.render($('#hotl').html(), { hotData: hotData });
    $('.hot-search').html(hotHtml);
    $('input').attr({ placeholder: result.wap_search_default_value[0].title })
    
}



//搜索模块
$(function () {
    // var handle=function(e){e.preventDefault()}
    //显示
    // $('header .search').click(function () {
    //     $('.search-container').show();
    //     // $('body,html').get(0).addEventListener('touchmove', handle, { passive: false });
    //     $('.search-container input').get(0).focus();
        
    // })
    //隐藏
    // $('.search-container .icon-cuo').click(function () {
    //     $('.search-container').hide()
    //     $('.search-container input').val('')
    //     $('.search-list').html('')
    //     // $('body,html').get(0).removeEventListener('touchmove', handle, {passive:false}) 
    // })
    //清除搜索框内的x按钮
    $('.search-container input').keyup(function () {
        var val = $(this).val();
        if (val.length > 0) {
            $(this).next().next().show()
        } else {
            $(this).next().next().hide()
        }
    })
    //清除搜索框内容
    $('.search-container .icon-cuo1').click(function () {
        $('.search-container input').val('')
        $('.search-list').html('')
        $(this).hide()
    })
    //搜索结果列表
    var time = new Date();
    $(document).keyup(function (e) {
        $('.search-list').html('')
        clearTimeout(time1)
        var time1=setTimeout(function () { 
            if ($('.search-container input').val()) {
                $.ajax({
                    type: "get",
                    url: "http://search.ule.com/api/suggest.action",
                    jsonpCallback: 'searchList',
                    data: {
                        query: $('.search-container input').val(),
                        _: time.getTime(),
                    },
                    dataType: 'jsonp',
                })
            }
        },500)
            
        })
        
    window.searchList = function (data) {
        var time2 = setTimeout(function () {
            $('.search-list').html('')
        console.log(data)
        $.each(data, function (val, num) {
            var node = $("<li><a href='All-kinds-of-goods.html'><p>" + val + "</p><i class='iconfont icon-zhixiang-zuoshang'></i></a></li>")
            $('.search-list').append(node)
        })
        },0)
        
    }
})