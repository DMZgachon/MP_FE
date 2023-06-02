const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(
    '/api',
    createProxyMiddleware({
        target: 'http://dmz02.com',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '',
        },
    })
);

app.listen(3000, () => {
    console.log('Proxy server is running on port 3000');
});