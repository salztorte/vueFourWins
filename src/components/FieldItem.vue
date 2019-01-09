<template>
    <div class="fieldItem"
         :class="{ 'player-one': item.player === 1 }"
         @click="$emit('click', item)"
    >
    </div>
</template>

<script>
    import FieldMixin from '@/mixins/Field';

    export default {
        name: 'FieldItem',
        mixins: [FieldMixin],
        props: {
            'fieldItem': Object,
        },
        data() {
            return {
                "item": this.fieldItem,
            };
        },
        methods: {
        },
    };
</script>

<style scoped lang="stylus">
    .fieldItem {
        width 50px
        height 50px
        box-sizing border-box
        border 1px gray solid
    }

    .player-one {
        background-color red
    }


</style>
