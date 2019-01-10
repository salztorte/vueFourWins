<template>
    <div class="field">
        <div class="row"
             v-for="(row, rowindex) in playField"
             :key="rowindex"
        >
            <FieldItem v-for="(col, colindex) in row"
                       :key="rowindex-colindex"
                       :fieldItem="col"
                       @click="selectField"
            ></FieldItem>
        </div>

    </div>
</template>

<script>
    import FieldItem from './FieldItem.vue';
    import { mapState, mapMutations  } from 'vuex'


    export default {
        name: 'Field',
        components: {
            FieldItem,
        },
        data() {
            return {}
        },
        computed: {
            ...mapState([
                'currentPlayer',
                'playField',
            ]),

        },
        methods: {
            ...mapMutations(['changePlayer', 'changeFieldValue']),
            selectField(item){
                const {height, width} = this.findDeepestField(item);
                this.changeFieldValue(height, width, this.currentPlayer);
                this.changePlayer();
            },
            findDeepestField(item){
                if(item.height === this.playField.length - 1) return item;
                const nextField = this.playField[item.height + 1][item.width];
                if(nextField.player !== 0) return item;

                return this.findDeepestField(nextField);
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
