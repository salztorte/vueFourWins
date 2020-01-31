<template>
<div>
  <h1>Config</h1>

  <v-row>

    <v-col cols="12" sm="6" md="3">
      <v-text-field label="Height" type="number" v-model="height" :filled="true"></v-text-field>
    </v-col>

    <v-col cols="12" sm="6" md="3">
      <v-text-field label="Width" type="number" v-model="width" :filled="true"></v-text-field>
    </v-col>

    <v-col cols="12" sm="6" md="3">
      <v-text-field label="Winning Combo" type="number" v-model="winningCombo" :filled="true"></v-text-field>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" sm="12" md="6" v-for="(pColor, index) in colors" :key="index">
      <v-color-picker :value="color(index)" @update:color="setColor(index, $event.hex)" ></v-color-picker>
    </v-col>

  </v-row>



</div>
</template>

<script>
import {createNamespacedHelpers} from "vuex";

const configHelper = createNamespacedHelpers('config');

export default {
  name: "Config",
  computed: {
    ...configHelper.mapState(['colors']),
    ...configHelper.mapGetters([
      'fieldWidth',
      'fieldHeight',
      'winCombo',
      'playerColor',
    ]),

    height: {
      get() {
        return this.fieldHeight
      },
      set(value) {
        this.updateFieldHeight(parseInt(value))
      }
    },

    width: {
      get() {
        return this.fieldWidth
      },
      set(value) {
        this.updateFieldWidth(parseInt(value))
      }
    },
    winningCombo: {
      get(){
        return this.winCombo
      },
      set(value) {
        this.updateWinCombo(parseInt(value))
      }
    },
    color() {
      return index => this.playerColor(index)
    },

  },
  methods: {
    ...configHelper.mapMutations([
      'updateFieldHeight',
      'updateFieldWidth',
      'updateWinCombo',
      'updateColor'
    ]),
    setColor(index, color) {
      this.updateColor({index, color});
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
