$(document).ready(function () {

    function bannerSwiper(){
        var bannerSwiper = new Swiper('#banner', {
            autoplay: 5000,
            visibilityFullFit: true,
            // loop: true,
            pagination: {
                el: '.swiper-pagination',
            }
        });
    }
    bannerSwiper();

    
    // 遮罩层
    function zzc(){
        $("header p").click(function(){
            $(".zzc").show()
        })
        $(".zzc").click(function(){
            $(this).hide()
        })
        $(".zzc ul").click(function(e){
            e.stopPropagation()
        })
        $("header ul li").click(function(){
            $(this).addClass("yangshi").siblings().removeClass("yangshi")
        })
    }
    zzc()
    

    // 详情
    function xq(){
        $(".xq").click(function(){
            $(".particulars").show()
            $("nav").hide();
            $("main").hide();
            $("footer").hide();
        })
        $(".sp").click(function(){
            $(".particulars").hide()
            $("nav").show();
            $("main").show();
            $("footer").show();
        })
    }
    xq()
    
    //选择规格
    $(".specification-option").click(function(){

    }) 

    // 收藏
    function sc(){
        $(".estimate-text3").click(function(){
       
            if($(this).hasClass("estimate-text4")){
                $(this).removeClass("estimate-text4")
            }else{
                $(this).addClass("estimate-text4")
            }
        })
    }
    sc()
    

    //地址
    function addr(){
        $('.ceng').click(function () {
            $('.ceng').hide()
        })
        $('.ceng i').click(function () {
            $('.ceng').hide()
        })
        $(".addr").click(function(e){
            e.stopPropagation()
        })
        //地址选择
        $('.site-option').click(function (e) {
           
            $('.ceng').show()
            $('.ceng .address').children().eq(0).addClass('active').siblings().removeClass('active')
            $('.select').children().html('')
            $('.ceng .address').children('.active').nextAll().html('')
            $('.province').show()
            var p, c, a, t;
            var provinceHtml = '';
            $.each(place, function (pro, citys) {
                provinceHtml += "<p>" + pro + "</p>";
    
            })
            $('.province').html(provinceHtml)
    
    
            $('.province').on('click', 'p', function () {
                $(this).parent().next().show().siblings().hide()
                var cityHtml = '';
                p = $(this).html()
                $('.ceng .address').children().eq(0).html(p).removeClass('active').next().addClass('active').html('请选择')
                $('.ceng .address').children('.active').nextAll().html('')
                $.each(place[p][0], function (city, areas) {
                    cityHtml += "<p>" + city + "</p>";
                })
                $('.city').html(cityHtml)
    
                $('.city').on('click', 'p', function () {
                    $(this).parent().next().show().siblings().hide()
                    var areaHtml = '';
                    c = $(this).html()
                    $('.ceng .address').children().eq(1).html(c).removeClass('active').next().addClass('active').html('请选择')
                    $('.ceng .address').children('.active').nextAll().html('')
                    $.each(place[p][0][c], function (index, obj) {
                        $.each(obj, function (area, towns) {
                            areaHtml += "<p>" + area + "</p>";
                        })
                    })
                    $('.area').html(areaHtml)
                    $('.area').on('click', 'p', function () {
                        $(this).parent().next().show().siblings().hide()
                        var townHtml = '<p>暂不选择</p>';
                        a = $(this).html()
                        $('.ceng .address').children().eq(2).html(a).removeClass('active').next().addClass('active').html('请选择')
                        $('.ceng .address').children('.active').nextAll().html('')
                        $.each(place[p][0][c][$(this).index()], function (key, town) {
                            var arr = town.split('、')
                            $.each(arr, function (index, val) {
                                townHtml += "<p>" + val + "</p>";
                            })
                        })
                        $('.town').html(townHtml)
                        $('.town').on('click', 'p', function () {
                            t = $(this).html()
                            $('.ceng .address').children().eq(3).html(t)
                            $('.ceng').hide()
                            if (t == '暂不选择') {
                                $('.dizhi').html(p + ' ' + c + ' ' + a)
                                // $('.dizhi').html("11111111")
                            } else {
                                $('.dizhi').html(p + ' ' + c + ' ' + a )  
                                // $('.dizhi').html("22222222")                         
                            }
                            console.log(p, c, a, t)
                        })
                    })
                })
            })
        })
    }
    addr()
    
    getCookie("user")
    // 加入购物车
    $(".add").click(function(){
        
        var user = getCookie("user")
        if(user){
            $.ajax({
                type:"GET",
                url:"api/addCar.php",
                data:{
                    listId:2804123,
                    user:user,
                    listNum:1
                },
                dataType:"json",
                success:function(data){
                    console.log(data)
                }
            })
        }else{
            location.href= "login.html"
        }
        
    })
})