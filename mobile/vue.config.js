const proxy = require('http-proxy-middleware')

module.exports = {
  publicPath: '/mobile', // url 前缀
  outputDir: process.env.outputDir, // 打包文件名称
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_API_URL,
        changeOrigin: true,
      },
    }
  },
}
