<template>
    <div class="field">
        <button @click="reset">Reset</button>
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
    import {mapState, mapMutations, createNamespacedHelpers} from 'vuex';

    const configHelper = createNamespacedHelpers('config');
    const createPos = (height, width) => ({height, width});

    export default {
        name: 'Field',
        components: {
            FieldItem,
        },
        data() {
            return {
                playField: createField(),
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
                //const {height, width} = this.findDeepestField(item);
                const {height, width} = item;
                this.playField[height][width].player = this.currentPlayer;

                // this.changePlayer();
                console.log(this.checkCombo(height, width));
            },
            findDeepestField(item) {
                if (item.height === this.playField.length - 1) return item;
                const nextField = this.playField[item.height + 1][item.width];
                if (nextField.player !== 0) return item;

                return this.findDeepestField(nextField);
            },
            reset() {
                this.playField = createField(this.fieldHeight, this.fieldWidth);
            },
            checkCombo(height, width) {
                const comboCount = {
                    down:  this.countField(height, width, (h, w) => createPos(h + 1, w)),
                    up: this.countField(height, width, (h, w) => createPos(h - 1, w)),

                    right: this.countField(height, width, (h,w) => createPos(h, w+1)),
                    left: this.countField(height, width, (h,w) => createPos(h, w-1)),

                    lefUp: this.countField(height, width, (h,w) => createPos(h-1, w-1)),
                    rightDown: this.countField(height, width, (h,w) => createPos(h+1, w+1)),

                    leftDown: this.countField(height, width, (h,w) => createPos(h+1, w-1)),
                    rightUp: this.countField(height, width, (h,w) => createPos(h-1, w+1)),
                };

                return comboCount;
            },
            countField(height, width, block) {
                const newPos = block(height, width);
                console.log(newPos);
                 if (newPos.height < 0 || newPos.height >= this.fieldHeight) return 0;
                 if (newPos.width < 0  || newPos.width >= this.fieldWidth) return 0;

                 const field = this.playField[newPos.height][newPos.width];

                 if(field.player !== this.currentPlayer) return 0;
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
