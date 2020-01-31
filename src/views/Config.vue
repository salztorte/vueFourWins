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
    <v-col cols="12" sm="6" md="3" v-for="(player, index) in realPlayer" :key="index">
      <v-text-field label="Playername" type="string" v-model="player.name" :filled="true"></v-text-field>
      <v-color-picker :value="player.color" @update:color="setColor(player.id, $event.hex)" ></v-color-picker>
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
    ...configHelper.mapGetters([
      'player' ,
      'fieldWidth',
      'fieldHeight',
      'winCombo',
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
    realPlayer() {
      return this.player.filter(p => !p.isEmpty)
    }
  },
  methods: {
    ...configHelper.mapMutations([
      'updateFieldHeight',
      'updateFieldWidth',
      'updateWinCombo',
      'updateColor'
    ]),
    setColor(id, color) {
      this.updateColor({id, color});
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
