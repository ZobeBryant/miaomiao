// commomJS写法
module.exports = {
    devServer :{
        proxy : {
            '/ajax' : {
                target : 'http://m.maoyan.com',
                changeOrign : true
            }
        }
    }
}