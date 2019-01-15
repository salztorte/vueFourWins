<template>
    <div class="fieldItem"
         :style="{backgroundColor: backgroundColor}"
         @click="click"
    >
        {{item.player}}
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    const configHelper = createNamespacedHelpers('config');

    export default {
        name: 'FieldItem',
        props: {
            'fieldItem': Object,
        },
        computed: {
            item() {
                return this.fieldItem
            },
            ...configHelper.mapGetters(['getPlayerColor']),
            backgroundColor(){
                return this.getPlayerColor(this.item.player);
             },
        },
        methods: {
            click(event) {
                event.preventDefault();
                if (this.item.player !== 0) return;
                this.$emit('click', this.item)
            },
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
</style>
