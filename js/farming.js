var ylf = (function() {
    // 每日秒杀
    function daykill() {
        var a = new Date();
        var b = new Date('2060-01-01 00:00:00');
        var cha = b -a ;
        var h = parseInt(cha/1000/60/60%24);
        var id = 1;
        // console.log(h);
  
        function add() {
            $.ajax({
                type: 'get',
                url: 'api/farming.php',
                data: {
                    id: id
                },
                dataType:'json',
                success:function(data) {
                    console.log(data)
                    var htmlStr = ejs.render($('.day-ejs').html(),{list:data});
                    $('.daykill ul').html(htmlStr);
                }
            })
            if(h = 0) {
                id ++;
                $.ajax({
                    type: 'get',
                    url: 'api/farming.php',
                    data: {
                        id: id
                    },
                    dataType:'json',
                    success:function(data) {
                        console.log(data)
                    }
                })
            }

        }
        add();    

    }
    // 达人俱乐部
    function club() {
        var flag = 1;
        var key = 'daren';
        $.ajax({
            type: 'get',
            url: 'api/farming-club.php',
            data: {
                flag: flag,
                key: key
            },
            dataType:'json',
            success:function(data) {
                // console.log(data)
                var htmlStr = ejs.render($('.da-club').html(),{daren:data});
                $('.daren ul').html(htmlStr);
            }
        })
    }
    // 热门地方馆
    function hot() {
        var flag = 2;
        var key = 'hot';
        $.ajax({
            type: 'get',
            url: 'api/farming-club.php',
            data: {
                flag: flag,
                key: key
            },
            dataType:'json',
            success:function(data) {
                // console.log(data)
                var htmlStr = ejs.render($('.hot-house').html(),{hot:data});
                $('.hotH ul').html(htmlStr);
            }
        })
    }
    // 更多
    function more() {
        var page = 10,
            x = 0,
            flag = true;
        // 首页加载的内容
        $.ajax({
                    type: 'get',
                    url: 'http://static-content.ulecdn.com/mobilead/recommond/indexListingCommentGet',
                    data: {
                        startIndex: 0,
                        pageSize: 100,
                        type: 1,
                        // jsonApiCallback: 'jsonApiCallback10',
                        sectionKeys: 'ulenp_2016_mwap_cnxh',
                    },
                    cache: true, //取消默认时间戳
                    jsonpCallback: 'jsonApiCallback10',
                    jsonp: 'jsonApiCallback',
                    dataType: 'jsonp',
                    success: function (data) {
                        // console.log(data);

                        var html = ejs.render($('.more-mo').html(), {
                            more: data
                        })
                        $('.more ul').html(html);
                    }
        })
        
        $(window).scroll(function () {
            // 浏览器的高度
            var windowH = $(window).height();
            // console.log($(window).height());
            //元素距离顶部的高度
            var moreT = $('.more').offset().top;
            // console.log($('.more').offset().top);
            //元素内容的高度
            var moreH = $('.more').height();
            //  console.log($('.more').height())
            //滚动的高度
            var scrollT = $(this).scrollTop();
            // console.log($(this).scrollTop());
            //元素底部距离元素顶部的偏移量
            var fixedmore = moreH + moreT;
            //实际滚动的高度
            var changeH = windowH + scrollT;
            if (changeH > fixedmore) {
                if (flag) {
                    flag = false;
                    var add = ['ulenp_2016_sxsj', 'ulenp_2016_jkly', 'ulenp_2016_xxls', 'ulenp_2016_mwsz', 'ulenp_2016_jxct', 'ulenp_2016_prod_list1', 'ulenp_2016_prod_list2', 'ulenp_2016_prod_list3', 'ulenp_2016_prod_list4'];
                    page++;
                    addAjax(page, x);
                    x++;
                }
            }
            // ajax请求
            function addAjax() {
                $.ajax({
                    type: 'get',
                    url: 'http://static-content.ulecdn.com/mobilead/recommond/indexListingCommentGet',
                    data: {
                        startIndex: 0,
                        pageSize: 100,
                        type: 1,
                        sectionKeys: add[x],
                    },
                    cache: true, //取消默认时间戳
                    jsonpCallback: 'jsonApiCallback' + page,
                    jsonp: 'jsonApiCallback',
                    dataType: 'jsonp',
                    success: function (data) {
                        // console.log(data.listInfo.listInfos)
                        console.log(data);
                        if (x <= 9) {
                            var html = ejs.render($('.more-mo').html(), {
                                more: data
                            })
                            $('.more ul').append(html);
                            flag = true;
                        }else if(x > 9){
                            $('.more p').css({display: 'block'})
                        }
                    }
                })
            }
        })
   
    }
    
    return {
        daykill: daykill,
        club: club,
        hot: hot,
        more: more,
    }

}) ();

ylf.daykill();//每日秒杀
ylf.club();//达人俱乐部
ylf.hot();//热门地方馆
ylf.more();//更多
