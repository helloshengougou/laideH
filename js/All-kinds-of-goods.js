(function () {
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
    back();
    var no_off = false;
    // 导航点击切换
    function nav() {
        $('.nav li').click(function () {
            $('.alert').hide();
            var i = $(this).index();//下标第一种写法
            // var i = $('tit').index(this);//下标第二种写法
            $(this).children().addClass(' nav-font').parent().siblings().children().removeClass('nav-font');
            $('.main-content').children().eq(i).show().siblings().hide();
            if ($('.b').hasClass('nav-font')) {
                $('.arrows').show();
            } else {
                $('.arrows').hide();
            }
        })
    }
    // jsonp请求
    var brand,active,bname;
    function request() {
        $.ajax({
            tpye: 'get',
            url: 'http://np.ule.com/item/searchItems.do',
            data: {
                jsonApiCallback: "Zepto1549692409066",
                fsop: 0,
                start: 1,
                end: 10,
                clsId: 28034098,
                appkey: "4b9f40822ddd5cd5",
                version_no: "apr_2010_build01",
                _: 1549692409086
               

            },
            cache: true,//取消默认时间戳
            jsonpCallback: 'Zepto1549692409066',
            jsonp: 'jsonApiCallback',
            dataType: 'jsonp',
            success: function (data) {
                // console.log(data.listInfo)
                var result = data.listInfo.listInfos;
                 brand = data.listInfo.brandInfos;
                 active =data.listInfo.promotionInfos;
                var html = ejs.render($('#tpl').html(), { shop: result })
                $('.content').append(html);
                load();
                for (var i = 0; i < brand.length; i++) {
                    var node = "<li class='shop-brand'>"+brand[i].name+"<i class='change'></i></li>"
                    $('.shop ul').append(node);
                }
                for (var i = 0; i < active.length; i++) {
                    var n = "<li class='shop-brand'>"+active[i].name+"<i class='change'></i></li>"
                    $('.active ul').append(n);
                }
                pitch_on()
            }
        })
    }
    // 触底加载jsonp
    function load() {
        var page = 1,
            flage = true;

        //  滚动高度
        $(window).scroll(function () {
            // 显示屏的高度
            var screenHeight = window.innerHeight;
            //页面的高度
            var doct = $('.content').offset().top;
            var contentH = $('.content').height();

            //  console.log(doct+contentH)
            if ($(this).scrollTop() + screenHeight >= doct + contentH) {
                if (page <= 1) {
                    if (flage) {
                        $('.floor-font').html("<div class='lazy'><img src='images/famousProduct/lazy.gif'></div>");
                        flage = false;
                        $.ajax({
                            tpye: 'get',
                            url: 'http://np.ule.com/item/searchItems.do',
                            data: {
                                jsonApiCallback: "Zepto1549698286197",
                                fsop: 0,
                                start: 11,
                                end: 20,
                                clsId: 28034098,
                                appkey: "4b9f40822ddd5cd5",
                                version_no: "apr_2010_build01",
                                _: 1549698518338
                            },
                            cache: true,//取消默认时间戳
                            jsonpCallback: 'Zepto1549698286197',
                            jsonp: 'jsonApiCallback',
                            dataType: 'jsonp',
                            success: function (data) {
                                // console.log(data.listInfo.listInfos)
                                var result = data.listInfo.listInfos;
                                var html = ejs.render($('#tpl').html(), { shop: result })
                                $('.content').append(html);
                                if (page > 1) {
                                    $('.floor-font').html("已经到底了，没有其他内容了")
                                }
                                flage = true;
                            }
                        })
                        page++;
                    }
                } else {
                    flage = false;

                }
            }
        })
    }
    // 点击触发jsonp请求
    function click_loading() {
        $('.nav .b').click(function () {
            $('.alert').hide();
            $('.content2').html('');
            // no_off = true;
            x("Zepto1549702740637", 3, 1, 10, 1549702744775);
                // console.log(111)
            nextLoad("Zepto1549711818469", 3, 11, 20, 1549711853560);
            
        })
    }
    function x(jsonApiCallback, fsop, start, end, num) {
        $.ajax({
            tpye: 'get',
            url: 'http://np.ule.com/item/searchItems.do',
            data: {
                jsonApiCallback: jsonApiCallback,
                fsop: fsop,
                start: start,
                end: end,
                clsId: 28034098,
                appkey: "4b9f40822ddd5cd5",
                version_no: "apr_2010_build01",
                _: num
            },
            cache: true,//取消默认时间戳
            jsonpCallback: jsonApiCallback,
            jsonp: 'jsonApiCallback',
            dataType: 'jsonp',
            success: function (data) {
                // console.log(data.listInfo.listInfos)
                var result = data.listInfo.listInfos;
                // var html = ejs.render($('#tpl').html(), { shop: result })
                // $('.content2').html(html);
                for (var i = 0; i < result.length; i++) {
                    var node = $('.content2').html()
                    node += "<a href='particulars.html'><div class='shop'><img src='" + result[i].imgurl + "' alt=''><div class='explain'><p class='name'>" + result[i].listname + "</p><p class='price'><span class='now'>￥" + result[i].pointPrice + "</span><span class='before'>￥" + result[i].maxPrice + "</span></p></div></div></a>"
                    $('.content2').html(node);
                }
            }
        })
    }
    // 第二页触底加载
    function nextLoad(jsonApiCallback, fsop, start, end, num) {
        var page = 1,
            flage = true;

        //  滚动高度
        $(window).scroll(function () {
            // 显示屏的高度
            var screenHeight = window.innerHeight;
            //页面的高度
            var doct = $('.content2').offset().top;
            var contentH = $('.content2').height();
            //  console.log(doct+contentH)
            if ($(this).scrollTop() + screenHeight >= doct + contentH) {
                if (page <= 1) {
                    if (flage) {
                        $('.floor-font').html("<div class='lazy'><img src='images/famousProduct/lazy.gif'></div>");
                        flage = false;
                        $.ajax({
                            tpye: 'get',
                            url: 'http://np.ule.com/item/searchItems.do',
                            data: {
                                jsonApiCallback: jsonApiCallback,
                                fsop: fsop,
                                start: start,
                                end: end,
                                clsId: 28034098,
                                appkey: "4b9f40822ddd5cd5",
                                version_no: "apr_2010_build01",
                                _: num
                            },
                            cache: true,//取消默认时间戳
                            jsonpCallback: jsonApiCallback,
                            jsonp: 'jsonApiCallback',
                            dataType: 'jsonp',
                            success: function (data) {
                                var result = data.listInfo.listInfos;
                                // var html = ejs.render($('#tpl').html(), {shop: result})
                                // $('.content').append(html);
                                for (var i = 0; i < result.length; i++) {
                                    // var node = $('.content2').html();
                                   var node = "<a href='particulars.html'><div class='shop'><img src='" + result[i].imgurl + "' alt=''><div class='explain'><p class='name'>" + result[i].listname + "</p><p class='price'><span class='now'>￥" + result[i].pointPrice + "</span><span class='before'>￥" + result[i].maxPrice + "</span></p></div></div></a>"
                                    if(!no_off){
                                        $('.content2').append(node);
                                    }
                                }
                                if (page >= 1) {
                                    $('.floor-font').html("已经到底了，没有其他内容了")
                                }
                                flage = true;
                            }
                        })
                        page++;
                    }
                } else {
                    flage = false;

                }
            }
        })
    }
    // 点击排序
    
    function sort() {
        var n = true;
        $('.arrows').click(function (e) {
            no_off = false;
            $('.alert').hide();
            e.stopPropagation();
            
            $('.content2').empty();
            if (n) {
                n = false;
                $('.content2').empty();
                $(this).attr("src", "images/famousProduct/箭头下.png");
                x("Zepto1549791605393", 2, 1, 10, 1549791608975);
                nextLoad("Zepto1549791605394", 2, 11, 20, 1549792292065);
            } else {
                n = true;
                $('.content2').empty();
                $(this).attr("src", "images/famousProduct/箭头_上.png");
                nextLoad("Zepto1549711818469", 3, 11, 20, 1549711853560);
                x("Zepto1549702740637", 3, 1, 10, 1549702744775)
               
            }
        })
    }
   
        
    
    // 点击显示隐藏侧边栏
    function side() {
        // 设备宽高
        var facilityW = $(window).width();
        var facilityH = $(window).height();
        var sideH = facilityH - $("header").height();
        $('.property').css({ height: sideH, top: $("header").height() })
        $('.side').css({ width: facilityW, height: sideH, top: $("header").height() });
        $('.icon-shaixuan').click(function () {
            // $('.side').show();
            // $('.property').css({animation:" move .6s both"})
            if ($('.side').hasClass('hide')) {
                $('.side').removeClass('hide')
                $('.property').css({ animation: " move .6s both" })
            }
            else {
                $('.property').css({ animation: " move2 .6s both" })
                setTimeout(function () { $('.side').addClass('hide') }, 600);
            }
        })
        $('.side').click(function(){
            $('.property').css({ animation: " move2 .6s both" })
            setTimeout(function () { $('.side').addClass('hide') }, 600);
        })
        $('.property').click(function(e){
            e.stopPropagation();
        })
    }
    // 侧边栏特效
    function side_active(){
        $(".brand").click(function(){
            if ($('.shop').hasClass('hiden')) {
                $('.shop').removeClass('hiden')
                // $('.shop').css({ animation: " height .6s both" })
                $('.brand .arrows').attr("src", "images/famousProduct/箭头-上-粗线条.png");
            }
            else {
                $('.shop').addClass('hiden')
                $('.brand .arrows').attr("src", "images/famousProduct/箭头-下-粗线条.png");
            }
            $('.brand .arrows').click(function(e){
                e.stopPropagation();
            })
        });
        $(".discounts").click(function(){
            if ($('.active').hasClass('hiden')) {
                $('.active').removeClass('hiden');
                // $('.shop').css({ animation: " height .6s both" })
                $('.discounts .arrow').attr("src", "images/famousProduct/箭头-上-粗线条.png");
            }
            else {
                $('.active').addClass('hiden')
                $('.discounts .arrow').attr("src", "images/famousProduct/箭头-下-粗线条.png");
            }
        });
    }
    // 侧边栏的点击加对勾
    function pitch_on(){

        // console.log($('.shop li').length)
        $('.shop li').click(function(){
            // console.log($('.shop li').length)
            $(this).children().addClass('focus').parent().siblings().children().removeClass('focus');
            var i = $(this).index() 
            bname = brand[i].id
        })
        $('.active li').click(function(){
            // console.log($('.shop li').length)
            $(this).children().addClass('focus').parent().siblings().children().removeClass('focus');
        })
        $('.pay').click(function(){
            if($(this).children().hasClass('icon-dui')){
                $(this).children().removeClass('icon-dui');
            }else{
                $(this).children().addClass('icon-dui');
            }     
        })
        $('.postage').click(function(){
            if($(this).children().hasClass('icon-dui')){
                $(this).children().removeClass('icon-dui');
            }else{
                $(this).children().addClass('icon-dui');
            }     
        })
    }
    // 通过属性选择
    function shuxing(){
        $('.btn .shore').click(function(){
            $('.alert').hide();
            $('.main-content').children().eq(2).html('');
            var x=1,m=485;
            for (var j = 0; j < brand.length; j++) {
                x++;
                m+=x;
            }
            $('.main-content').children().eq(2).show().siblings().hide();
            var startV = $('.star').val();
            var endV = $('.end').val();
            y("Zepto1550296216"+m,0,startV,endV,bname,1550290189311)
        })
    }
    function y(jsonApiCallback, fsop, start, end,bname, num) {
        $.ajax({
            tpye: 'get',
            url: 'http://np.ule.com/item/searchItems.do',
            data: {
                jsonApiCallback: jsonApiCallback,
                fsop: fsop,
                begPrice: start,
                endPrice: end,
                clsId: 28034098,
                brandId:bname,
                appkey: "4b9f40822ddd5cd5",
                version_no: "apr_2010_build01",
                _: num
            },
            cache: true,//取消默认时间戳
            jsonpCallback: jsonApiCallback,
            jsonp: 'jsonApiCallback',
            dataType: 'jsonp',
            success: function (data) {
               if(data.returnCode==0000){
                var result = data.listInfo.listInfos;
                // var html = ejs.render($('#tpl').html(), { shop: result })
                // $('.content2').html(html);
                for (var i = 0; i < result.length; i++) {
                    var node = $('.content3').html()
                    node += "<a href='particulars.html'><div class='shop'><img src='" + result[i].imgurl + "' alt=''><div class='explain'><p class='name'>" + result[i].listname + "</p><p class='price'><span class='now'>￥" + result[i].pointPrice + "</span><span class='before'>￥" + result[i].maxPrice + "</span></p></div></div></a>"
                    $('.content3').html(node);
                    
                }
                $('.property').css({ animation: " move2 .6s both" })
                setTimeout(function () { $('.side').addClass('hide') }, 600);
                // $('.alert').hide();
            }else if(data.returnCode==9999){
                $('.alert').show();
                setTimeout(function () { $('.side').addClass('hide') }, 600);
            }
            }
        })
    }
    // 通过属性选择
    shuxing()
    // 侧边栏特效
    side_active()
    // 点击显示隐藏侧边栏
    side()
    // 点击排序
    sort()
    // 导航点击切换
    nav();
    // jsonp请求
    request();

    // 点击触发jsonp请求
    click_loading();

})()