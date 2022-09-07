module.exports = {
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
    devServer: {
        proxy: {
            "/upload": {
                target: 'http://mallapi.duyiedu.com'
            }
        }
    }
}
