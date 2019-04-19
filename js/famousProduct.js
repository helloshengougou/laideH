(function () {
    // 返回上一页
    function back() {
        $('.icon-iconfontjiantou1').click(function () {
            window.history.back();
            window.onpageshow = function (event) {
                if (event.persisted) {
                    window.location.reload();
                }
            }
        })
    }
    //banner 轮播
    function banner() {
        var mySwiper = new Swiper('.swiper-container', {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },
            autoplay: {
                delay: 4000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
            },
        })
    }
    // ajax触底加载
    function load() {
        var page = 1,
            flage = true;

        //  滚动高度
        $(window).scroll(function () {
            // 显示屏的高度
            var screenHeight = window.innerHeight;
            //页面的高度
            var doct = $('.more').offset().top;
            var moreH =$('.more').height();
            var array=["gdmcprod","zhlzhprod","djxxprodGoods","czdjprodGoods","njzcprodGoods"]
            //  console.log(doct+moreH)
            if ($(this).scrollTop() + screenHeight >= doct+moreH) {
                if (page<=array.length) {
                    if (flage) {
                        $('.floor-font').html("<div class='lazy'><img src='images/famousProduct/lazy.gif'></div>");
                        flage = false;
                        $.ajax({
                            tpye: 'get',
                            url: 'https://service.ule.com/api/mobile/indexListingCommentGet.do',
                            data: {
                                jsonApiCallback: "jsonp"+page,
                                moduleKeys: "ulenp2017_famousProduct_"+array[page-1],
                                startIndex: 0,
                                pageSize: 100,
                                type: 1,
                                appkey: "4b9f40822ddd5cd5",
                                version_no: "apr_2010_build01",
                            },
                            cache: true,//取消默认时间戳
                            jsonpCallback: 'jsonp'+page,
                            jsonp: 'jsonApiCallback',
                            dataType: 'jsonp',
                            success: function (data) {
                                // console.log(data.result)
                                $('.floor-font').html("拉动继续加载")
                                var result = data.result;
                                var html = ejs.render($('#tpl').html(), {shop: result})
                                $('.more').append(html);
                                
                                if(page>5){
                                    $('.floor-font').html("已经到底了，没有其他内容了")
                                }
                                flage = true;   
                                
                            } 
                        })
                        page++;
                    }
                }else{
                    flage = false;
                   
                }
            }
        })
    }



    // 返回上一页
    back();
    //banner 轮播
    banner();
    // ajax触底加载
    load()
})()