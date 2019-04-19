$(document).ready(function () {
    // 顶部swiper左右滑动效果
    var navSwiper = new Swiper('#header', {
        // freeMode: true,
        // slidesPerView: 'auto',
        // slideToClickedSlide: true,
        // freeModeSticky: true,
        slideToClickedSlide:true,
        centeredSlides : true,
        slidesPerView : 5,
        loop:true,
    });

    $("#header .swiper-slide").click(function(){
        $(this).addClass("col").siblings().removeClass("col");
    })
    var bannerSwiper = new Swiper('#banner', {
        autoplay: 5000,
        visibilityFullFit: true,
        // loop: true,
        pagination: {
            el: '.swiper-pagination',
        }
    });  

    function ajax(nav){
        // $(".list").html("")
        $.ajax({
            type:"GET",
            url:"api/groupBooking.php",
            data:{
                class:nav
            },
    
            dataType:"json",
            success: function(data){
                console.log(data[0])
                // console.log(1111)
                var html,message="";
                for(var i=0;i<10;i++){
                     html = ejs.render(document.getElementById('tpl').innerHTML, {data: data});
                     message += html;
                }
                
                $(".list").html(message)
                console.log(html)
            }   
        })
    }
    ajax("精品")


    // 导航点击
    $("#header .swiper-slide").click(function(){
        // $(this).html();
        console.log($(this).html())
        $(".list").html("")
        ajax($(this).html())
    })

    //触底加载
      
})









