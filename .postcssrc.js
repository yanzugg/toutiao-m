module.exports = {
  plugins: {
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    // 配置使用postcss-pxtorem插件
    'postcss-pxtorem': {
      rootValue({file}){
       return file.indexOf('vant')!==-1  ? 37.5 :75
      },
      propList: ['*'],
      exclude:'github-markdown'
    }
  }
}