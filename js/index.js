(function () {
    var user = getCookie('user');
    if (user) {
        login()
    } 
    function login() {
        $('header i').show()
        $('header .user').removeClass('cont')
    }
})()

function getData() {
    //banner和nav数据
    $.ajax({
        type: "get",
        url: "https://static-content.ulecdn.com//mobilead/recommond/getMobileRecommond.do",
        data: {
            sectionKeys: 'ule_wap_index,WAP_INDEX_NAV',
            isAlone:1,
        },
        cache:true,//取消默认时间戳
        jsonpCallback: 'jsonApiCallback',
        jsonp:'jsonApiCallback',
        dataType:'jsonp',
    })
    //广告位数据
    $.ajax({
        type: "get",
        url: "https://static-content.ulecdn.com/mobilead/recommond/dwRecommond.do",
        data: {
            restype:2002,
            sectionKeys: 'wap_index_brand,wap_onlyphone,wap_index_agricultur,wap_index_picActivity,wap_index_agricultur,wap_index_jlx,wap_onlyphone,wap_index_dp,wap_index_yljx_banner,wap_index_yljx_item',
        },
        cache:true,//取消默认时间戳
        jsonpCallback: 'jsonApiCallback1',
        jsonp:'jsonApiCallback',
        dataType:'jsonp',
    })
    //底部猜您喜欢数据
    $.ajax({
        type: "get",
        url: "https://static-content.ulecdn.com/mobilead/recommond/indexListingCommentGet",
        // ?sectionKeys=&&&&jsonApiCallback=jsonApiCallback3
        data: {
            sectionKeys: 'ule_android_index_prodlist',
            startIndex: 0,
            pageSize: 10,
            type:1
        },
        cache:true,//取消默认时间戳
        jsonpCallback: 'jsonApiCallback3',
        jsonp:'jsonApiCallback',
        dataType:'jsonp',
    })
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
//banner和nav
function jsonApiCallback(result) {
    var navData = result.WAP_INDEX_NAV.data;
    var bannerData = result.ule_wap_index.data;
    var navHtml = ejs.render($('#navl').html(), { navData: navData });
    var bannerHtml = ejs.render($('#bannerl').html(), { bannerData: bannerData });
    $('nav').html(navHtml);
    $('.banner .swiper-wrapper').html(bannerHtml);
    banner.banner1();
    
}
//广告位
function jsonApiCallback1(result) {
    var adData = result.wap_index_picActivity;
    var iconData = result.wap_index_brand;
    var farmingData = result.wap_index_agricultur;
    var goodstorData = result.wap_index_dp;
    var adHtml = ejs.render($('#adl').html(), { adData: adData });
    var iconHtml = ejs.render($('#iconl').html(), { iconData: iconData });
    var farmingHtml = ejs.render($('#farmingl').html(), { farmingData: farmingData });
    var goodstorHtml = ejs.render($('#goodstorl').html(), { goodstorData: goodstorData });
    $('.ad .ad-pic').html(adHtml);
    $('.ad .swiper-wrapper').html(iconHtml);
    $('.farming .content').html(farmingHtml);
    $('.goodstor .swiper-wrapper').html(goodstorHtml);
    banner.banner2();
    banner.banner3();
}
//热搜
function jsonApiCallback2(result) {
    var hotData = result.wap_searchkeyword;
    var hotHtml = ejs.render($('#hotl').html(), { hotData: hotData });
    $('.hot-search').html(hotHtml);
    $('input').attr({ placeholder: result.wap_search_default_value[0].title })
    
}
//底部猜您喜欢
function jsonApiCallback3(result) {
    var listData = result.result;
    var listHtml = ejs.render($('#listl').html(), { listData: listData });
    $('.more .content').append(listHtml);
}
//轮播图
var banner = function () {
    function banner1() {
        bannerSwiper = new Swiper('.banner-container', {
            loop: true, // 循环模式选项
            autoplay: true, //自动播放
            autoplay: {
                disableOnInteraction: false,
            },
            pagination: {
                el: '.banner-pagination',
                clickable: true,
            }
        })
    }
    function banner2() {
        iconSwiper = new Swiper('.icon-container', {
            freeMode: true,//free模式 不会贴合
            freeModeMomentum: false,//释放后立即停止
            resistanceRatio : 0,//值越小抵抗越大越难将slide拖离边缘，0时完全无法拖离。
            slidesPerView : 'auto',//显示数量
        })
    }
    function banner3() {
        gootstorSwiper = new Swiper('.goodstor-container', {
            pagination: {
                el: '.goodstor-pagination',
                clickable: true,
            },
        })
    }
    return {
        banner1:banner1,//头部轮播图
        banner2:banner2,//广告图标滑动效果
        banner3:banner3//今日好店铺
    }
}
banner=banner()
//滚动加载
$(function () {
    var winH = window.innerHeight;//窗口高度
    var conTop = $('.more .content').offset().top;//距离页面顶部高度
    var n = 0, flag = true;
    $(window).scroll(function () {
        var conH = $('.more .content').height();//内容高度
        var scrTop = $(window).scrollTop();//卷起高度
        if (conH + conTop - scrTop - winH <= 0) {
            if (flag) {
                flag = false;
                n+=10;
                $.ajax({
                    type: "get",
                    url: "https://static-content.ulecdn.com/mobilead/recommond/indexListingCommentGet",
                    data: {
                        sectionKeys: 'ule_android_index_prodlist',
                        startIndex:n,
                        pageSize: 10,
                        type:1
                    },
                    cache:true,//取消默认时间戳
                    jsonpCallback: 'jsonApiCallback3',
                    jsonp:'jsonApiCallback',
                    dataType: 'jsonp',
                    success: function (data) {
                        if (data.result.length == 10) {
                            flag = true;
                        } else {
                            $('.more .no-data').show()
                            $('.more .loading').hide()
                        }
                    }
                })
            }
        }
    })
})
//头部搜索框样式变换/返回顶部
$(function () {
    $('.go-back').click(function () {
        
        $("html,body").scrollTo( {toT : 0} );

    })
    $(window).scroll(function () { 
        var nH = $('nav').offset().top
        var hH = $('header').height();//内容高度        
        var scrTop = $(window).scrollTop();//卷起高度
        if (scrTop+hH >= nH) {
            $('header').addClass('active')
        } else {
            $('header').removeClass('active')
        }
    })
})
//搜索模块
// $(function () {
//     var handle=function(e){e.preventDefault()}
//     //显示
//     $('header .search').click(function () {
//     console.log($('.search-container'))

//         $('.search-container').show();
//         $('body,html').get(0).addEventListener('touchmove', handle, { passive: false });
//         $('.search-container input').get(0).focus();
        
//     })
//     //隐藏
//     $('.search-container .icon-cuo').click(function () {
//         $('.search-container').hide()
//         $('.search-container input').val('')
//         $('.search-list').html('')
//         $('body,html').get(0).removeEventListener('touchmove', handle, {passive:false}) 
//     })
//     //清除搜索框内的x按钮
//     $('.search-container input').keyup(function () {
//         var val = $(this).val();
//         if (val.length > 0) {
//             $(this).next().next().show()
//         } else {
//             $(this).next().next().hide()
//         }
//     })
//     //清除搜索框内容
//     $('.search-container .icon-cuo1').click(function () {
//         $('.search-container input').val('')
//         $('.search-list').html('')
//         $(this).hide()
//     })
//     //搜索结果列表
//     // var time = new Date();
//     // $(document).keyup(function (e) {
//     //     $('.search-list').html('')
//     //     clearTimeout(time1)
//     //     var time1=setTimeout(function () { 
//     //         if ($('.search-container input').val()) {
//     //             $.ajax({
//     //                 type: "get",
//     //                 url: "http://search.ule.com/api/suggest.action",
//     //                 jsonpCallback: 'searchList',
//     //                 data: {
//     //                     query: $('.search-container input').val(),
//     //                     _: time.getTime(),
//     //                 },
//     //                 dataType: 'jsonp',
//     //             })
//     //         }
//     //     },500)
            
//         // })
        
//     // window.searchList = function (data) {
//     //     var time2 = setTimeout(function () {
//     //         $('.search-list').html('')
//     //     console.log(data)
//     //     $.each(data, function (val, num) {
//     //         var node = $("<li><a href='All-kinds-of-goods.html'><p>" + val + "</p><i class='iconfont icon-zhixiang-zuoshang'></i></a></li>")
//     //         $('.search-list').append(node)
//     //     })
//     //     },0)
        
//     // }
// })