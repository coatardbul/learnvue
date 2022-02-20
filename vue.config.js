//创建vue.config.js文件
module.exports = {
    lintOnSave: false,//是否在保存时检查
    devServer: {
        host: 'localhost',//本机ip
        port: 8087,//本机端口
        open: true,
        proxy: {
            '/river': {  //代理别名
                target: 'http://47.105.148.90:9002',   //代理目标值
                changeOrigin: true,
                secure: true,
                pathRewrite: {  //替换路径中的/api
                    '^/river': '/river'
                }
                /*pathRequiresRewrite: {
                  '^/api': ''
                }*/
            },
            '/stock': {  //代理别名
                target: 'http://47.105.148.90:9006',   //代理目标值
                changeOrigin: true,
                secure: true,
                pathRewrite: {  //替换路径中的/api
                    '^/stock': '/stock'
                }
                /*pathRequiresRewrite: {
                  '^/api': ''
                }*/
            }
        },
        overlay: {
            warning: false,
            errors: true
        }
    }
}
