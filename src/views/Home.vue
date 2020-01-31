<template>
    <div class="home">
        <FieldView :initialPlayField="playField"/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import FieldView from '@/components/Field.vue';
    import {Field} from '../creator/Field';
    import {createNamespacedHelpers} from 'vuex';

    const configHelper = createNamespacedHelpers('config');
    export default {
        name: 'Home',
        components: {
            FieldView,
        },
        computed: {
            ...configHelper.mapGetters(["fieldWidth", "fieldHeight"]),
            playField() {
                console.log(this.fieldHeight, this.fieldWidth);
                return new Field(this.fieldWidth, this.fieldHeight);
            }
        }

    };
</script>
