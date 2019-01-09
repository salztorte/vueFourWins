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
    import FieldMixin from '@/mixins/Field';

    export default {
        name: 'Field',
        components: {
            FieldItem,
        },
        mixins: [FieldMixin],
        data() {
            return {
                playField: this.createField(),
            };
        },
        methods: {
            selectField(item){
                const deepField = this.findDeepestField(item);
                this.playField[deepField.height][deepField.width].player = 1
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
