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
        "publish": {
          "provider": "github",
        },
        win: {
          target: ["nsis", "portable", "zip"],
          icon: "public/favicon.ico"
        }
      }
    }
  }
})
