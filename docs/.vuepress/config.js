
module.exports = {
  title: 'webpack plugin 开发流程',
  description: '终极目标是开发一个资源打包完成自动上传七牛的插件',
  head: [],
  themeConfig: {
    nav: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: 'webpack plugin',
        link: '/plugin/'
      }
    ],
    sidebar: [
      {
        title: '目录',
        collapsable: true,
        children: [
          '/plugin/test',
          '/plugin/basic',
          '/plugin/custom'
        ]
      }
    ],
    sidebarDepth: 2
  }
}
