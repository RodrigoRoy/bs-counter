<template>
  <v-app>
    <!-- Main interface: Buttons and counter text -->
    <v-main :style="{ backgroundColor: colorPick}">
      <v-container>
        <v-row align="center" justify="center" class="text-center">
          <!-- Button +1 -->
          <v-col xs="12" sm="6">
            <v-btn @click="add" block color="secondary" elevation="8" raised x-large>
              +1 {{ displayName }}
              <v-img :src="require(`./assets/${iconFile}`)" class="my-3" contain height="28" width="28" />
            </v-btn>
          </v-col>

          <!-- Button -1 -->
          <v-col xs="12" sm="6" v-show="!hideRemoveButton">
            <v-btn @click="remove" block color="secondary" elevation="8" raised x-large>
              -1 {{ displayName }}
              <v-img :src="require(`./assets/${iconFile}`)" class="my-3" style="filter: grayscale(100%)" contain height="28" />
            </v-btn>
          </v-col>

          <!-- Counter text -->
          <v-col cols="12">
            <p class="text-h1 mb-2" :style="`color: ${colorTextPick}; font-family: ${fontFile} !important;`">
              {{ count }}
            </p>
          </v-col>

        </v-row>
      </v-container>
    </v-main>

    <!-- Color configuration -->
    <v-container id="colors" v-show="showColorPicker">
      <v-row>
        <v-col xs="12" sm="6">
          <p>Background color</p>
          <v-color-picker v-model="colorPick" :swatches="swatches" show-swatches hide-canvas hide-mode-switch dot-size="15" mode="rgba" width="100%"></v-color-picker>
        </v-col>

        <v-col xs="12" sm="6">
          <p>Text color</p>
          <v-color-picker v-model="colorTextPick" :swatches="swatches" show-swatches hide-canvas hide-mode-switch dot-size="15" mode="rgba" width="100%"></v-color-picker>
        </v-col>

        <v-col cols="12">
          <v-btn @click="showColorPicker = !showColorPicker">Close color edit</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- Text, font and icon configuration -->
    <v-container id="configuration" v-show="showConfig">
      <v-row>
        <v-col>
          <!-- Text to display on buttons -->
          <v-text-field v-model="displayName" counter maxlength="20" hint="E.g. live, coin, death, item, etc." label="Name to display"></v-text-field>

          <!-- Icon to show on buttons -->
          <v-select v-model="icon" :items="itemSelect" label="Icon">
            <!-- Template after (click) selection -->
            <template v-slot:selection="{ item }">
              <v-img :src="require(`./assets/${item.image}`)" class="mr-2" contain max-height="14" max-width="14" /> {{ item.name }}
            </template>
            <!-- Template on selection (menu display) -->
            <template v-slot:item="{ item }">
              <v-img :src="require(`./assets/${item.image}`)" class="mr-2" contain max-height="14" max-width="14" /> {{ item.name }}
            </template>
          </v-select>

          <!-- Font to uso on buttons -->
          <v-select v-model="fontText" :items="fontSelect" label="Font text">
            <!-- Template after (clic) selection -->
            <template v-slot:selection="{ item }">
              <span :style="`font-family: ${item.font} !important`">{{ item.name }}</span>
            </template>
            <!-- Template on selection (menu display) -->
            <template v-slot:item="{ item }">
              <span :style="`font-family: ${item.font} !important`">{{ item.name }}</span>
            </template>
          </v-select>

          <!-- Counter number -->
          <v-text-field v-model="count" type="number" label="Counter"></v-text-field>

          <v-btn @click="showConfig = !showConfig">Close configuration</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- Footer for configuration using system bar and icons -->
    <v-system-bar lights-out>
      <!-- This align the icons to the right -->
      <v-spacer></v-spacer>

      <!-- Reset counter to zero (0) -->
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-icon @click="count = 0" v-bind="attrs" v-on="on">mdi-restore</v-icon>
        </template>
        <span>Reset</span>
      </v-tooltip>

      <!-- Show/hide the "-1 button" -->
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-icon @click="hideRemoveButton = !hideRemoveButton" v-bind="attrs" v-on="on">{{ hideRemoveButton ? 'mdi-eye-off' : 'mdi-eye'}}</v-icon>
        </template>
        <span>Hide -1 button</span>
      </v-tooltip>

      <!-- Show/hide the text, font and icon configuration -->
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-icon @click="swapConfigMenu" v-bind="attrs" v-on="on">mdi-cog</v-icon>
        </template>
        <span>Configuration</span>
      </v-tooltip>

      <!-- Show/hide the color configuration -->
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-icon @click="swapColorMenu" v-bind="attrs" v-on="on">mdi-palette</v-icon>
        </template>
        <span>Edit colors</span>
      </v-tooltip>

      <!-- Swapt dark and light theme -->
      <!-- <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-icon @click="swapTheme" v-bind="attrs" v-on="on">{{ $vuetify.theme.dark ? 'mdi-weather-night' : 'mdi-white-balance-sunny'}}</v-icon>
        </template>
        <span>Light/dark theme</span>
      </v-tooltip> -->
    </v-system-bar>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  // Set the default values for the first time. Restore previos config from local storage
  beforeMount(){
    this.$vuetify.theme.dark = localStorage.getItem('theme') || true
    this.colorPick = localStorage.getItem('color') || '#000'
    this.colorTextPick = localStorage.getItem('textColor') || '#FFF'
    this.displayName = localStorage.getItem('name') || 'Coin'
    this.iconFile = localStorage.getItem('icon') || 'Coin_56px.png'
    this.fontFile = localStorage.getItem('font') || 'arcadepix'
    this.hideRemoveButton = localStorage.getItem('hideButton') || false
    this.count = Number(localStorage.getItem('count')) || 0
  },

  data: () => ({
    // Main counter
    count: 0,

    // Text to display on buttons
    displayName: '',

    // Image to use on buttons
    icon: null,

    // Path to the image file for the buttons
    iconFile: '',

    // Name of the font-family to use on main counter
    fontText: null,

    // Path to the ttf file to use on main counter
    fontFile: '',

    // Background color
    colorPick: '#FFF',

    // Text color
    colorTextPick: '#000',

    // Items to show as icons on buttons
    itemSelect: [
      { name: 'Coin', image: 'Coin_56px.png'},
      { name: 'Heart', image: 'Heart_56px.png'},
      { name: 'Rupee', image: 'Rupees_56px.png'},
    ],

    // Fonts to show as text for the main counter
    fontSelect: [
      { name: 'Arcadepix', font: 'arcadepix'},
      { name: 'SM Maker', font: 'smm'},
      { name: 'Jumpman', font: 'jumpman'},
    ],

    // Default colors to show on color configuration
    swatches: [
      ['#FF0000', '#00FFFF', '#FFFFFF'], // red, cyan, white
      ['#00FF00', '#FF00FF', '#000000'], // green, magenta, black
      ['#0000FF', '#FFFF00'],  // blue, yellow
    ],

    // Hide or show the "-1 button"
    hideRemoveButton: false,

    // Show or hide the color configuration container
    showColorPicker: false,

    // Show or hide the text, font and icon config container
    showConfig: false,
  }),

  // Every data change is saved to the local storage in order to keep the user's config
  watch: {
    colorPick(newValue){
      localStorage.setItem('color', newValue)
    },
    colorTextPick(newValue){
      localStorage.setItem('textColor', newValue)
    },
    displayName(newValue){
      localStorage.setItem('name', newValue)
    },
    icon(newValue){
      this.iconFile = newValue.image // the "real" value is in the property 'image'
      localStorage.setItem('icon', newValue.image)
    },
    fontText(newValue){
      this.fontFile = newValue.font // the "real" value is in the property 'font'
      localStorage.setItem('font', newValue.font)
    },
    hideRemoveButton(newValue){
      localStorage.setItem('hideButton', newValue)
    },
    count(newValue){
      if(!newValue) // this prevent null or empty string errors
        this.count = 0
      localStorage.setItem('count', newValue)
    }
  },

  methods: {
    /**
     * Add one to the main counter
     */
    add() {
      this.count += 1
    },

    /**
     * Substract one to the main counter
     * Negative values are not allowed
     */
    remove() {
      if(this.count > 0)
        this.count -= 1
    },

    /**
     * Show or hide the text, font and icon config menu
     * Closes other menus already opened (e.g. color menu)
     */
    swapConfigMenu(){
      this.showColorPicker = false
      this.showConfig = !this.showConfig
      if(this.showConfig)
        setTimeout(() => { // small delay to focus/move to the menu
          this.$vuetify.goTo('#configuration', {duration: 200, easing: 'easeInOutCubic', offset: 0})
        }, 100)
    },

    /**
     * Show or hide the color config menu
     * Closes other menus already opened (e.g. text, font and icon menu)
     */
    swapColorMenu(){
      this.showConfig = false
      this.showColorPicker = !this.showColorPicker
      if(this.showColorPicker)
        setTimeout(() => { // small delay to focus/move to the menu
          this.$vuetify.goTo('#colors', {duration: 200, easing: 'easeInOutCubic', offset: 0})
        }, 100)
    },

    /**
     * Enable dark or light theme
     */
    // swapTheme(){
    //     this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    //     localStorage.setItem('theme', this.$vuetify.theme.dark)
    // },
  },

};
</script>

<style scoped>
/* Definition for the Arcadepix font */
@font-face {
  font-family: arcadepix;
  src: url('~@/assets/Arcadepix.ttf');
}

/* Definition for the Jumpman font */
@font-face {
  font-family: jumpman;
  src: url('~@/assets/Jumpman.ttf');
}

/* Definition for the SM Maker font */
@font-face {
  font-family: smm;
  src: url('~@/assets/SMM.ttf');
}
</style>