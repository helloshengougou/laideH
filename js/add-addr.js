$(function () {

    //地址框
    $('.ceng i').click(function () {
        $('.ceng').hide()
    })
    //地址选择
    $('.location input').click(function () {
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
                            $('.location input').val(p + ' ' + c + ' ' + a)
                        } else {
                            $('.location input').val(p + ' ' + c + ' ' + a + ' ' + t)                            
                        }
                        console.log(p, c, a, t)
                    })
                })
            })
        })
    })
})
//点击选中的地址
$(function () {
    $('.ceng span').click(function () {
        $(this).addClass('active').siblings().removeClass('active')
        $('.select div').eq($(this).index()).show().siblings().hide()
    })
})
$(function () {
    //保存地址
    $('.save-addr').click(function () {
        addr(1)
    })
    //设为默认地址
    $('.change-addr').click(function () {
        addr(0)
    })
    //验证
    function addr(sty) {
        var newObj = {
            user:user,
            consignee : $('#userName').val(),
            num : $('#phoneNumber').val(),
            addr1 : $('#addrDetailName').val(),
            addr2 : $('#userAddress').val(),
            postCode: $('#postCode').val(),
            style:sty
        }
        //收货人
        if (newObj.user.length == 0) {
            $('.tip-box').html('收货人不能为空,请重新填写!').show()
            setTimeout(function () {
                $('.tip-box').hide()
            },1500)
            return false;
        } 
        //手机号
        if (newObj.num.length == 0) {
            $('.tip-box').html('请填写手机号码!').show()
            setTimeout(function () {
                $('.tip-box').hide()
            },1500)
            return false;
        } else if (!/^1[3-9]\d{9}$/.test(newObj.num)) {
            $('.tip-box').html('手机号码格式错误!').show()
            setTimeout(function () {
                $('.tip-box').hide()
            },1500)
            return false;
        }
        //地址
        if (newObj.addr1.length == 0 || newObj.addr2.length == 0) {
            $('.tip-box').html('请填写详细地址!').show()
            setTimeout(function () {
                $('.tip-box').hide()
            },1500)
            return false;
        } else if (newObj.addr2.length <= 5) {
            $('.tip-box').html('详细地址字数必须5位以上!').show()
            setTimeout(function () {
                $('.tip-box').hide()
            },1500)
            return false;
        }
        //邮编
        if (newObj.postCode.length == 0) {
            $('.tip-box').html('请填写邮政编码!').show()
            setTimeout(function () {
                $('.tip-box').hide()
            },1500)
            return false;
        } else if (!/^[1-9]\d{5}$/.test(newObj.postCode)) {
            $('.tip-box').html('邮政编码格式错误!').show()
            setTimeout(function () {
                $('.tip-box').hide()
            },1500)
            return false;
        }
        add(newObj) 
    }
})
//地址写入数据库
function add(data) {
    $.ajax({
        type: 'get',
        url: 'api/doAddr.php',
        data: {
            style: data.style,
            user: data.user,
            consignee: data.consignee,
            num : data.num,
            addr1 : data.addr1,
            addr2 : data.addr2,
            postCode: data.postCode,
        },
        dataType: 'json',
        success: function (data) {
            if (data.code == 0) {
                window.location.href='addr-list.html'
            }
        }
    })
}