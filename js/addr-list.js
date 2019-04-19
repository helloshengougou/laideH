
$(function () {
    //获取收货地址信息
    $.ajax({
        type: 'get',
        url: 'api/doAddrList.php',
        data: {
            user: user
        },
        dataType: 'json',
        success: function (data) {
            if (data.code == 0) {
                // console.log(data.data)
                var listHtml = ejs.render($('#listl').html(), { listData: data.data });
                $('.addr-list').html(listHtml)
                chD()
                bianji()
            }
        }
    })
    //点击默认收货地址
    function chD() {
        $('.addr-list .default i').click(function () {
            var _this=$(this)
            var listID = _this.parents('li').data('id')
            $.ajax({
                type: 'get',
                url: 'api/changeDefault.php',
                data: {
                    user: user,
                    id:listID
                },
                dataType: 'json',
                success: function (data) {
                    if (data.code == 0) {
                        $('.icon-dui1').removeClass('icon-dui1').addClass('icon-yuan').next().removeClass('active')
                        _this.removeClass('icon-yuan').addClass('icon-dui1').next().addClass('active')
                    }
                }
            })

        })
    }
    //修改地址信息
    function bianji() {
        $('.icon-bianji').click(function () {
            var listID = $(this).parents('li').data('id')
            setCookie('listID', listID)
            location.href="change-addr.html"
        })
    }
})