$(function () {
    $('header .user-info p').html(user.substr(0, 3) + "****" + user.substr(7))
    $('.icon-sangedian').click(function () {
        $('.classfiy-pop').addClass('active')
    })
    $('.classfiy-pop').click(function () {
        $('.classfiy-pop').removeClass('active')
    })
    $('button').click(function () {
        delCookie('user')
        window.location.href = "index.html";
    })
})