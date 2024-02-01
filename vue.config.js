const path = require('path')
const copy_plugin = require('copy-webpack-plugin')
const wasm_file = resolve('node_modules/mediainfo.js/dist/MediaInfoModule.wasm')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    publicPath: './',
    productionSourceMap: false,
    devServer: {
        hot: true,
        host: 'localhost',
        port: 8888,
        https: false,
        proxy: {
            '/api': {
                target: process.env.VUE_APP_BASE_URL,
                changOrigin: true,
                timeout: 60 * 1000,
                ws: false,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/ws2': {
                target: process.env.VUE_APP_BASE_WS_URL,
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/ws2': ''
                },
            }
        },
        client: {
            overlay: false
        }
    },
    configureWebpack: {
        plugins: [
            // npm run dev 时拷贝到dist目录下
            new copy_plugin({
                patterns: [{from: wasm_file, to: '.'}]
            }),
            // npm run build 时拷贝到dist/js目录下
            new copy_plugin({
                patterns: [{from: wasm_file, to: '/js'}]
            })
        ]
    }
})
