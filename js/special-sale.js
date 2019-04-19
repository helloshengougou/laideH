var sale = (function(){
    function banner(){
        var btm = $('.ban-tmp').html();
        $.ajax({
            type:'get',
            url:'https://static-content.ulecdn.com/mobilead/recommond/dwRecommond.do',
            data:{
                restype: 2002,
                sectionKeys: 'event2017_temai_bannerImg',
            },
            cache:true,
            jsonpCallback:'jsonApiCallback1',
            jsonp:'jsonApiCallback',
            dataType:'jsonp',
            success:function(data){
                // console.log(data)
                var htmlStr = ejs.render(btm,{list:data});
                $('.banner').html(htmlStr);
                new Swiper('.swiper-container',{
                    autoplay:true,
                    loop:true,
                    pagination:{
                        el: '.swiper-pagination',
                        dynamicBullets: true
                    }
                })
            }
        })
    }
    function week(){
        $.ajax({
            type:'get',
            url:'https://static-content.ulecdn.com/mobilead/recommond/dwRecommond.do',
            data:{
                restype:2002,
                sectionKeys:'event2017_temai_weekImg'
            },
            cache:true,
            jsonApiCallback:'jsonApiCallback2',
            jsonp:'jsonApiCallback',
            dataType:'jsonp',
        })
    }
    window.weekCb = function(data){
        // console.log(data)
        var htmlStr = ejs.render($('.week-tmp').html(),{list:data})
        $('.week').html(htmlStr)
    }
    function upNew(){
        $.ajax({
            type:'get',
            url:'https://merchant.ule.com/merchantservice/merchant/spcialSellHttpServiceForPhone.do',
            data:{
                jsonCallBack:'newPro',
            },
            jsonp:'jsonCallback',
            dataType:'jsonp',
        })
    }
    function countdown(){
        var etime = $('.countdown').attr('end-time'),
            stime = $('.countdown').attr('start-time')
        var nowDate = new Date(),
            endDate = new Date(etime),
            startDate = new Date(stime),
            timeD = endDate - nowDate;
        // var now = nowDate.getFullYear() +'-'+(+nowDate.getMonth()+1)+'-'+nowDate.getDate();
            d = nowDate.toLocaleDateString();
        // console.log(d)
        
        var d = parseInt(timeD/1000/60/60/24),
            h = parseInt(timeD/1000/60/60%24),
            m = parseInt(timeD/1000/60%60),
            s = parseInt(timeD/1000%60);
        // console.log(d+"天"+h+"时"+m+"分"+s+"秒" )
            $('.sct-d').html(d)
            $('.sct-h').html(h)
            $('.sct-m').html(m)
            $('.sct-s').html(s)
    }
    window.newPro=function (data){
        console.log(data)
        var htmlStr = ejs.render($('.newpro-tmp').html(),{list:data})
        $('.new-pro').html(htmlStr)
    }
    
    function timer(){
        // countdown()
        setInterval(countdown,1000)
    }
    function scrollH(){
        $('.back-btn').click(function(e){
            e=e||e.preventDefault();
            $('html,body').scrollTop(0)
        })
        $(window).scroll(function(){
            if($(window).scrollTop()>=300){
                $('.go-back').addClass('move')
            }else{
                $('.go-back').removeClass('move')
            }
        })
    }

    
    
    return{
        banner:banner,
        week:week,
        upNew:upNew,
        timer:timer,
        scrollH:scrollH
    }
})()

sale.banner();
sale.week();
sale.upNew();
sale.timer();
sale.scrollH()
