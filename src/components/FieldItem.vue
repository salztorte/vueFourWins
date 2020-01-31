<template>

    <div class="fieldItem"
         @click="click"
    >
        <div class="fieldItem__coin" :style="{backgroundColor: backgroundColor}"></div>
    </div>
</template>

<script>
    export default {
        name: 'FieldItem',
        props: {
            'fieldItem': Object,
        },
        computed: {
            item() {
                return this.fieldItem
            },
            backgroundColor(){
                return this.item.player.color;
             },
        },
        methods: {
            click(event) {
                event.preventDefault();
                if (!this.item.player.isEmpty) return;
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
        background: gray

        &__coin {
            height 45px
            width 45px
            border-radius: 50%;
        }
    }
</style>
