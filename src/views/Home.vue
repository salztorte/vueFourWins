<template>
    <div class="home">
        <Field :initialPlayField="playField"/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Field from '@/components/Field.vue';
    import {createField} from '../creator/Field';
    import {createNamespacedHelpers} from 'vuex';

    const configHelper = createNamespacedHelpers('config');
    export default {
        name: 'Home',
        components: {
            Field,
        },
        computed: {
            ...configHelper.mapGetters({
                fieldWidth: "getFieldWidth",
                fieldHeight: "getFieldHeight",
            }),
            playField() {
                return createField(this.fieldWidth, this.fieldHeight);
            }
        }

    };
</script>
