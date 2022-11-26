const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    pages: {
        'login': {
            // 入口文件，相当于单页面的 main.js
            entry: 'src/modules/login/login.js',
            // 模板文件
            template: 'src/modules/login/login.html',
            // 编译后 dist 目录下输出的文件，可以包含子目录
            filename: 'login/login.html'
        },
        'student_center':{
            entry: 'src/modules/student_center/student_center.js',
            template: 'src/modules/student_center/student_center.html',
            filename:'index.html'
        }
    },

    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                    }
                }
            ]
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"],
            alias: {}
        },
    }
})
