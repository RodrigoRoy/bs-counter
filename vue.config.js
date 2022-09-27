const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      customFileProtocol: "./", // fix css @font-face url
      builderOptions: {
        appId: 'com.electron.bs-counter',
        productName: 'BS Counter',
        publish: ['github'],
        win: {
          target: ['nsis', 'zip'],
          icon: 'public/favicon.ico'
        }
      }
    }
  }
})
