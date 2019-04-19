define(['zepto','ejs','base'],function($,ejs) {
    function add() {
        // _=1550745652617
        $.ajax({
            type: 'get',
            url: 'https://service.ule.com/api/item/searchItems.do',
            data: {
                storeId: 28738,
                sort: '9',
                start: '1',
                end: '3',
                appkey: '4b9f40822ddd5cd5',
                version_no: 'apr_2010_build01',

            },
            cache: true, //取消默认时间戳
            // jsonpCallback: 'jsonApicallback',
            jsonApicallback:'jsonp1',

            jsonp: 'jsonApiCallback',
            dataType: 'jsonp',
            
                // console.log(data.listInfo.listInfos)

                // var html = ejs.render($('.helpoo').html(), {
                //     list: data
                // })
                // $('section ul').html(html);
            
        })
        window.jsonp1 = function(data) {
            console.log(data);

        }
    }
    return {
        add: add,
    }
})