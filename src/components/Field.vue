<template>
<div class="field">
    <button @click="reset">Reset</button>
    <div v-if="gameEnd">Player {{currentPlayer}} wins</div>

    <div class="row"
            v-for="(row, rowindex) in playField"
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
import {createField} from '@/creator/Field';
import {createNamespacedHelpers, mapMutations, mapState} from 'vuex';

const configHelper = createNamespacedHelpers('config');
const createPos = (height, width) => ({height, width});

export default {
    name: 'Field',
    components: {
        FieldItem,
    },
    props: {
        initialPlayField: {
            type: Array,
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

            const {height, width} = item;
            this.playField[height][width].player = this.currentPlayer;

            this.gameEnd = this.playerWin(height, width);
            if(!this.gameEnd) this.changePlayer();
        },
        findDeepestField(item) {
            if (item.height === this.playField.length - 1) return item;
            const nextField = this.playField[item.height + 1][item.width];
            if (nextField.player !== 0) return item;

            return this.findDeepestField(nextField);
        },
        reset() {
            this.playField = createField(this.fieldHeight, this.fieldWidth);
            this.gameEnd = false;
        },
        playerWin(height, width) {
            const down = this.countField(height, width, (h, w) => createPos(h + 1, w));
            const up = this.countField(height, width, (h, w) => createPos(h - 1, w));
            if (this.checkCombo(down, up)) return true;

            const right = this.countField(height, width, (h, w) => createPos(h, w + 1));
            const left = this.countField(height, width, (h, w) => createPos(h, w - 1));
            if (this.checkCombo(right, left)) return true;

            const leftUp = this.countField(height, width, (h, w) => createPos(h - 1, w - 1));
            const rightDown = this.countField(height, width, (h, w) => createPos(h + 1, w + 1));
            if (this.checkCombo(leftUp, rightDown)) return true;

            const leftDown = this.countField(height, width, (h, w) => createPos(h + 1, w - 1));
            const rightUp = this.countField(height, width, (h, w) => createPos(h - 1, w + 1));
            return this.checkCombo(leftDown, rightUp);
        },
        checkCombo(a, b) {
            return a + b + 1 >= this.winCombo
        },
        countField(height, width, block) {
            const newPos = block(height, width);
            console.log(newPos);
            if (newPos.height < 0 || newPos.height >= this.fieldHeight) return 0;
            if (newPos.width < 0 || newPos.width >= this.fieldWidth) return 0;

            const field = this.playField[newPos.height][newPos.width];

            if (field.player !== this.currentPlayer) return 0;
            else return 1 + this.countField(newPos.height, newPos.width, block);
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
