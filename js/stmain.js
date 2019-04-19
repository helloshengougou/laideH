// 实现登陆
require.config({
    baseUrl:'js',
    paths: {
        'zepto': 'zepto.min',
        'ejs': 'ejs',
        'base': 'base'
    },
    shim: {
        'base': {
            exports: 'bs'
        },
        'zepto': {
            exports: '$'
        }
    }
})

require(['store'],function(a) {
    a.add();
})