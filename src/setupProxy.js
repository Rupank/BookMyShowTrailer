const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        proxy("/serv", {
            target: "https://in.bookmyshow.com",
            changeOrigin: true
        })
    )
}