const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

app.use(
  '/3', // proxy all TMDb v3 API calls
  createProxyMiddleware({
    target: 'https://api.themoviedb.org',
    changeOrigin: true,                    // rewrite Host header to target
    secure: true,
    onProxyReq(proxyReq /*, req, res */) {
      // tell TMDb “yes, this really is api.themoviedb.org”
      proxyReq.setHeader('X-Forwarded-Host', 'api.themoviedb.org')
      // (optional) also override the Host header directly:
      proxyReq.setHeader('Host', 'api.themoviedb.org')
    },
    pathRewrite: { '^/3': '/3' },          // keep the same path
  })
)

app.listen(3000, () => console.log('Proxy listening on port 3000'))
