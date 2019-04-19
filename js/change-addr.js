$(function () {
    //获取cookie
    var listID = getCookie("listID")
    //请求对应ID的数据
    $.ajax({
        type: 'get',
        url: 'api/get-addr.php',
        data: {
            id:listID
        },
        dataType: 'json',
        success: function (data) {
            if (data.code == 0) {
                doData(data.data[0])
            }
        }
    })
    //数据填入文本框
    function doData(data) {
        $('#userName').val(data.consignee)
        $('#phoneNumber').val(data.addrNum)
        $('#addrDetailName').val(data.addr1)
        $('#userAddress').val(data.addr2)
        $('#postCode').val(data.postCode)
    }
    //点击删除
    function delAddr() {
        $('.icon-shanchu').click(function () {
            $.ajax({
                type: 'get',
                url: 'api/del-addr.php',
                data: {
                    id:listID
                },
                dataType: 'json',
                success: function (data) {
                    if (data.code == 0) {
                        window.location.href='addr-list.html'
                    }
                }
            })
        })
    }
    delAddr()
})
$(function () {
    //保存地址
    $('.save-addr1').click(function () {
        addr(1)
    })
    //设为默认地址
    $('.change-addr1').click(function () {
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
//改变数据库信息
function add(data) {
    $.ajax({
        type: 'get',
        url: 'api/change-addr.php',
        data: {
            id:getCookie("listID"),
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