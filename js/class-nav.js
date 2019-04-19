var classfiy = (function (){
    // 点击头部搜索框出现搜索容器
    function searchBtn(){
        $('.search').click(function(){
            $('.search-container').removeClass('hide').addClass('.show').siblings().addClass('hide')
        })
    }
    function closeBtn(){
        $('.close').click(function(){
            $('.search-container').removeClass('show').addClass('hide').siblings().addClass('show')
        })
    }
    // 头部点击分类按钮出现或隐藏
    function classBtn(){

        $('.menu').click(function(){
            $('.classfiy-pop').removeClass('hide').addClass('show')
        })
    }
    // 点击遮罩层隐藏分类
    function maskLayer(){
        $('.mask-layer').click(function (){
            // e=e||e.event;
            // e.stopPropagetion();
            $('.classfiy-pop').removeClass('show').addClass('hide')
        })
    }

    // 点击分类导航加载数据
    function clickNav(){
        // var num;
        var tpl = $('#tpl').html();
        var recom = $('.recom').html();
        var def = $('.default').html();
        var cat1 = $('.cat').html();
        //默认显示热门品牌
        $(function(){

            $.ajax({
                type:'get',
                url:'api/classify.php',
                data:{
                    cont:'热门推荐',
                    num:1
                },
                dataType:'json',
                success:function(data){
                    // console.log(data)
                    var htmlStr = ejs.render(tpl,{list:data})
                    $('.brand-area').html(htmlStr)
                },
                error:function(data){
                    // console.log(data)
                }
            })
        })
        // 默认显示为您推荐
        $(function(){
            $.ajax({
                type:'get',
                url:'api/default.php',
                data:{
                    fl:'1f'
                },
                dataType:'json',
                success:function(data){
                    // console.log(data)
                    var htmlStr = ejs.render(def,{list:data})
                    $('.hot-area').html(htmlStr)
                },
            })
        })
        // 点击加载热门品牌
        $('.nav-category li').click(function(){
            var active = $(this).html();
            // console.log(active);
            var cls = $(this).attr('data-id');
            $(this).addClass('active').siblings().removeClass('active');
            
            function hot(){
                var num=1;
                $.ajax({
                    type:'get',
                    url:'api/classify.php',
                    data:{
                        cont:active,
                        num:num
                    },
                    dataType:'json',
                    success:function(data){
                        // console.log(data)
                        var htmlStr = ejs.render(tpl,{list:data})
                        $('.brand-area').html(htmlStr)
                    },
                })
            }
            hot();
            function cat(){
                var num =2;
                $.ajax({
                    type:'get',
                    url:'api/classify.php',
                    data:{
                        fl:cls,
                        num:num
                    },
                    dataType:'json',
                    success:function(data){
                        // console.log(data.list[0].dataId)
                        // console.log(data)
                        var htmlStr = ejs.render(cat1,{list:data})
                        $('.hot-area').html(htmlStr)
                    }
                })
            }
            cat()
            // 加载轮播图
            $.ajax({
                type:'get',
                url:'api/banner.php',
                data:{
                    cls:cls
                },
                dataType:'json',
                success:function(data){
                    console.log(data)
                    var htmlStr = ejs.render(recom,{list:data})
                    $('.banner-area').html(htmlStr);
                    new Swiper('#bg', {
                        autoplay:true,
                        loop : true,
                        pagination: {
                            el: '.swiper-pagination',
                            dynamicBullets: true,
                        },
                    });
                }
            })
            
            
        })
    }
    

    return{
        searchBtn:searchBtn,
        closeBtn:closeBtn,
        classBtn:classBtn,
        maskLayer:maskLayer,
        clickNav:clickNav,
    }
})()
classfiy.searchBtn();
classfiy.closeBtn();
classfiy.classBtn();
classfiy.maskLayer();
classfiy.clickNav();