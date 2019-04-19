define(['zepto.min','ejs','base'],function($,ejs) {
    function add() {
        $.ajax({
            type: 'get',
            url: 'http://search.ule.com/api/recommend',
            data: {
                // jsoncallback:'Zepto1550403903067',
                restype: 2001,
                moduleKeys:'ulenp_2016_prod_list2',
                times:'1550406148446&_=1550406148447',
            },
            cache: true, //取消默认时间戳
            jsonpCallback: 'Zepto1550403903067',
            jsonp: 'jsoncallback',
            dataType: 'jsonp',
            success: function (data) {
                // console.log(data.listInfo.listInfos)
                console.log(data);

                var html = ejs.render($('.helpoo').html(), {
                    list: data
                })
                $('section ul').html(html);
            }
        })
    
    }  
    return {
        add: add
    };
})
    // 请求jsonp数据
    // moduleKeys=ulenp_2016_prod_list2&times=1550406148446&_=1550406148447
 

// ylfp.add() //请求数据