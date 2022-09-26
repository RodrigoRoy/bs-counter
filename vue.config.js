const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "com.electron.bs-counter",
        productName: "BS Counter",
        win: {
          target: "portable",
          // icon: "public/favicon.ico"
        }
      }
    }
  }
})
