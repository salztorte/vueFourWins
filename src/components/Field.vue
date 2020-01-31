<template>
<div class="field">
    <button @click="reset">Reset</button>
    <div v-if="gameEnd">Player {{currentPlayer}} wins</div>

    <div class="row"
            v-for="(row, rowindex) in playField._field"
            :key="rowindex"
    >
        <FieldItem v-for="(col, colindex) in row"
                   :key="rowindex-colindex"
                   :fieldItem="col"
                   @click="selectField"
        />
    </div>
</div>
</template>

<script>
import FieldItem from './FieldItem.vue';
import {createNamespacedHelpers, mapMutations, mapState} from 'vuex';

const configHelper = createNamespacedHelpers('config');

export default {
    name: 'Field',
    components: {
        FieldItem,
    },
    props: {
        initialPlayField: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            playField: this.initialPlayField,
            gameEnd: false,
        };
    },
    computed: {
        ...mapState([
            'currentPlayer',
        ]),
        ...configHelper.mapState(['winCombo', 'fieldHeight', 'fieldWidth']),
    },
    methods: {
        ...mapMutations(['changePlayer', 'changeFieldValue']),
        selectField(item) {
            if(this.gameEnd) return;
            const deepestCell = this.playField.findDeepestCell(item);
            deepestCell.player = this.currentPlayer;

            this.gameEnd = this.playerWin(deepestCell);
            if(!this.gameEnd) this.changePlayer();
        },
        reset() {
            this.playField.reset();
            this.gameEnd = false;
        },
        playerWin(cell) {
            if(this.playField.horizontalStreak(cell, this.currentPlayer) >= this.winCombo) return true;
            if(this.playField.verticalStreak(cell, this.currentPlayer) >= this.winCombo) return true;
            if(this.playField.diagonalRightUpStreak(cell, this.currentPlayer) >= this.winCombo) return true;
            if(this.playField.diagonalLeftUpStreak(cell, this.currentPlayer) >= this.winCombo) return true;
            return false;
        },
        checkCombo(a, b) {
            return a + b + 1 >= this.winCombo
        },
    }
};
</script>

<style lang="stylus" scoped>
    .row {
        display flex
        flex-direction row

    }
</style>
