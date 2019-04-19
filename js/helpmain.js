// 实现登陆
require.config({
    baseUrl:'js',
    paths: {
        'zepto.min': 'zepto.min',
        'ejs': 'ejs',
        'base': 'base',
    },
    shim: {
        'base': {
            exports: 'bs'
        },
        'zepto.min': {
            exports: '$'
        }
    }
})

require(['helpoor'],function(a) {
    a.add();
})