module.exports = {
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        proxy: {
            '/api': {
                target: 'http://localhost:8000/api',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': '', //请求的时候使用这个api就可以
                },
            },
        },
    },
}
