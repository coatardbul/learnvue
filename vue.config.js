//创建vue.config.js文件
module.exports = {
    lintOnSave: false,//是否在保存时检查
    devServer: {
        host: 'localhost',//本机ip
        port: 8087,//本机端口
        open: true,
        proxy: {
            '/river': {  //代理别名
                target: 'http://124.222.217.230:9002',   //代理目标值
                changeOrigin: true,
                secure: true,
                pathRewrite: {  //替换路径中的/api
                    '^/river': '/river'
                }

            },
            '/gl': {  //代理别名
                target: 'https://mapv.baidu.com',   //代理目标值
                changeOrigin: true,
                secure: true,
                pathRewrite: {  //替换路径中的/api
                    '^/gl': '/gl'
                }

            },
            '/stock': {  //代理别名
                target: 'http://localhost:9006',   //代理目标值
                changeOrigin: true,
                secure: true,
                pathRewrite: {  //替换路径中的/api
                    '^/stock': '/stock'
                }

            }
        },
        overlay: {
            warning: false,
            errors: true
        }
    }
}
