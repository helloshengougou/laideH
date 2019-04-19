//右上角点击出现导航
// var user='123'
$(function () {
    $('.icon-sangedian').click(function () {
        $('.classfiy-pop').addClass('active')
    })
    $('.classfiy-pop').click(function () {
        $('.classfiy-pop').removeClass('active')
    })
})
//请求购物车数据
$(function () {
    $.ajax({
        type: 'get',
        url: 'api/doCar.php',
        data: {
            style: 1,
            user: user
        },
        dataType: 'json',
        success: function (data) {
            // if (data.code == 0) {
                localStorage.cart = JSON.stringify(data.data)
                doData()
            // }
        }
    })
})
//处理数据
function doData() {
    var cartData = JSON.parse(localStorage.cart)
    if (cartData.length > 0) {
        $('footer').addClass('hp')
        var cartHtml=ejs.render($('#cartl').html(), { cartData: cartData });
        $('main').append(cartHtml)
        mycar()
    } else {
        $('main').addClass('no')
        $('.fixed-btn').show()
        $('main .more').show()
        $('main .nocenter').addClass('nocenter1')
        getData()
        nocontent()
    }
    
}
//购物车
function mycar() {
    //全选
    $('footer .select-all').click(function () {
        $(this).toggleClass('active')//全选按钮

        if ($(this).hasClass('active')) {//商品和店铺选中状态
            $('main i').addClass('icon-dui1').removeClass('icon-yuan')
        } else {
            $('main i').removeClass('icon-dui1').addClass('icon-yuan')
        }
        
        $('footer .btn-gotocar').removeClass('active')//结算按钮
        $('main i').each(function (index,val) {
            if (($(val).hasClass('icon-dui1'))) {
                $('footer .btn-gotocar').addClass('active')//结算按钮
                return false;
            }
        })

        sum()
    })
    //店铺选择
    $('main .car-store .chk-store').click(function () {
        var flag = true;
        $(this).toggleClass('icon-dui1').toggleClass('icon-yuan')//店铺状态

        if ($(this).hasClass('icon-dui1')) {//商品状态
            $(this).parent().next().find('i').addClass('icon-dui1').removeClass('icon-yuan')
        } else {
            $(this).parent().next().find('i').removeClass('icon-dui1').addClass('icon-yuan')
        }
        // $(this).parent().next().find('i').toggleClass('icon-dui1').toggleClass('icon-yuan')//商品状态
        $.each($('main .car-store .chk-store'), function () {//遍历每个店铺/确定全选状态
            if ($(this).hasClass('icon-dui1')) {
                flag = false;
                return false;
            }
        })
        if (flag) {
            // console.log(1)
            $('footer .select-all').addClass('active')
        } else {
            $('footer .select-all').removeClass('active')
        }

        $('footer .btn-gotocar').removeClass('active')//结算按钮
        $('main i').each(function (index,val) {
            if (($(val).hasClass('icon-dui1'))) {
                $('footer .btn-gotocar').addClass('active')//结算按钮
                return false;
            }
        })

        sum()
    })
    //商品
    $('main .chk-item').click(function () {
        var flag = true,flag2=true;
        $(this).toggleClass('icon-dui1').toggleClass('icon-yuan')//商品状态
        $.each($(this).parents('.store-items').find('i'), function () {//遍历商品/判断店铺状态
            if ($(this).hasClass('icon-yuan')) {
                flag = false;
                return false;
            }
        })
        if (flag) {
            // console.log(1)
            $(this).parents('.store-items').prev().find('.chk-store').addClass('icon-dui1').removeClass('icon-yuan')
        } else {
            $(this).parents('.store-items').prev().find('.chk-store').addClass('icon-yuan').removeClass('icon-dui1')
        }

        $.each($('main .chk-store'), function () {//遍历店铺/判断全选状态
            if ($(this).hasClass('icon-yuan')) {
                flag2 = false;
                return false;
            }
        })
        if (flag2) {
            $('footer .select-all').addClass('active')
        } else {
            $('footer .select-all').removeClass('active')
        }


        $('footer .btn-gotocar').removeClass('active')//结算按钮
        $('main i').each(function (index,val) {
            if (($(val).hasClass('icon-dui1'))) {
                $('footer .btn-gotocar').addClass('active')//结算按钮
                return false;
            }
        })

        sum()

    })


    //数量
    $('main .btn-down').click(function () {
        var id = $(this).parents('.store-item').data('option')
        var _this = $(this);
        var n = $(this).next().val();
        n--;
        if (n <= 1) {
            $(this).addClass("disabled");
            n = 1;
        }
        changeNum(_this,n,id)
    })
    $('main .btn-up').click(function () {
        $(this).prev().prev().removeClass('disabled');
        var _this2 = $(this);
        var id = $(this).parents('.store-item').data('option')
        var n = $(this).prev().val();
        n++;
        changeNum(_this2,n,id)
    })
    //结算
    function sum() {
        var num = 0,sum=0;
        $('main i.chk-item').each(function () {
            if ($(this).hasClass('icon-dui1')) {
                num += parseInt($(this).parents('.store-item').find('.goods-num').val())
                sum += parseFloat($(this).parents('.store-item').find('.price').html().slice(1))*parseInt($(this).parents('.store-item').find('.goods-num').val())
            }
        })
        $('footer .btn-gotocar span').html(num)
        $('footer strong').html('￥'+sum.toFixed(2))
    }
    //改变数据库中购物车商品数量
    function changeNum(obj,n,id) {
        
        $.ajax({
            type: 'get',
            url: 'api/doCar.php',
            data: {
                style: 3,
                user: user,
                id: id,
                n:n
            },
            dataType: 'json',
            success: function (data) {
                if (data.code == 0) {
                    obj.parent().children(".goods-num").val(n)
                    var num = 0;
                    obj.parents('.store-items').children().each(function (index) {
                        num+=parseInt(obj.parents('.store-items').find('.goods-num').eq(index).val())
                    })
                    obj.parents('.car-store').find('.order-num span').html(num)
                    sum()
                    changeLS(id, n)
                    changePrice(obj)
                }
            }
        })
        
    }
    //店铺商品价格
    function changePrice(obj) {
        var dis = 0,price=0;
        obj.parents('.store-items').children().each(function (index) {
            dis += parseFloat(parseInt(obj.parents('.store-items').find('.goods-num').eq(index).val()) * (parseFloat(obj.parents('.store-items').find('del').eq(index).html().slice(1)) - parseFloat(obj.parents('.store-items').find('span.price').eq(index).html().slice(1))))
            price += parseFloat(parseInt(obj.parents('.store-items').find('.goods-num').eq(index).val()) * (parseFloat(obj.parents('.store-items').find('span.price').eq(index).html().slice(1))))
        })
        obj.parents('.car-store').find('.all-dis span').html('￥'+dis.toFixed(2))
        obj.parents('.car-store').find('.all-total').html('￥'+price.toFixed(2))
    }
    //删除商品
    function del() {
        var rd,listId;
        function w() {
            var r = document.documentElement;
            var a = r.getBoundingClientRect().width;
                if (a > 750 ){
                    a = 750;
                } 
            rd = 7.5/a;
            }
            w();

        var _x_start, _x_move, left_start;
        $(".store-item").on("touchstart", function (e) {
            _x_start = e.touches[0].pageX;
            left_start = $(this).css("left");
        })
        $(".store-item").on("touchmove", function (e) {
            _x_move = e.touches[0].pageX;
            if ((parseFloat(left_start) == 0 && parseFloat(_x_move) < parseFloat(_x_start)) || (parseFloat(left_start) != 0 && parseFloat(_x_move) > parseFloat(_x_start))) {
                $(this).css("left", parseFloat(_x_move*rd) - parseFloat(_x_start*rd) + parseFloat(left_start) + "rem");
            }
        })
        $(".store-item").on("touchend", function (e) {
            var _x_end = e.changedTouches[0].pageX;
            if (_x_end < _x_start) {
                $(this).css("left", '-1.2rem');
            } else {
                $(this).css("left", '0rem');
            }
        })
        
        $('.item-box').on('touchmove', function (e) { e.preventDefault(); });
        $('.delete').click(function () {
            var _this = $(this);
            listId = $(this).prev().data('option')
            btn(_this)
            $('.tips').show()
        })
        function btn(_this) {
            $('.tips .cancel').click(function () {
                $('.tips').hide()
            })
            $('.tips .enter').click(function () {
                $('.tips').hide()
                _this.html('删除中...')
                $.ajax({
                    type: 'get',
                    url: 'api/doCar.php',
                    data: {
                        style:2,
                        id: listId,
                        user:user
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == 0) {
                            _this.prev().find('.chk-item').addClass('icon-yuan').removeClass('icon-dui1');
                            sum()
                            delLS(listId)
                            changeNum(_this)
                            changePrice(_this)
                            _this.parents('.item-box').remove();
                            for (var i = 0; i < $('main').children().length; i++){
                                
                                if($('main').children().eq(i).find('.store-item').length==0){
                                    $('main').children().eq(i).remove();
                                }
                            }
                            if ($('main').children().length == 0) {
                            history.go(0)
                            }
                        }
                    }
                })
            })
        }
    }
    del()
}
//底部猜您喜欢
function jsonApiCallback3(result) {
    var listData = result.result;
    var listHtml = ejs.render($('#listl').html(), { listData: listData });
    $('.more .content').append(listHtml);
}
//滚动加载
function nocontent() {
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
                        }
                    }
                })
            }
        }
    })
}
//第一次加载
function getData() {
    $.ajax({
        type: "get",
        url: "https://static-content.ulecdn.com/mobilead/recommond/indexListingCommentGet",
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
}
//返回顶部
$(function () {
    $('.go-back').click(function () {
        $("html,body").scrollTo( {toT : 0} );
    })
})
//本地存储数据删除
function delLS(Id) {
    var cartData = JSON.parse(localStorage.cart);
    var newData = [];
    $.each(cartData, function (index, val) { 
        if (val.listId != Id) {
            newData.push(val)
        } 
    })
    localStorage.removeItem('cart');
    localStorage.cart = JSON.stringify(newData);
}
//本地存储数据改变
function changeLS(Id,n) {
    var cartData = JSON.parse(localStorage.cart);
    var newData = [];
    $.each(cartData, function (index, val) { 
        if (val.listId == Id) {
            val.listNum = n;
        } 
        newData.push(val)
        localStorage.removeItem('cart');
        localStorage.cart = JSON.stringify(newData);
    })
}
