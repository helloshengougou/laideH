$(function () {
    $.ajax({
        type: 'get',
        url: 'api/user-info.php',
        data: {
            user: user,
        },
        dataType: 'json',
        success: function (data) {
            if (data.code == 0) {
                $('main .addr').html(data.data[0].addr1 +' '+ data.data[0].addr2)
            }
        }
    })
})