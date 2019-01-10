<template>
    <div class="home">
        <Field />
    </div>
</template>

<script>
    // @ is an alias to /src
    import Field from '@/components/Field.vue';
    export default {
        name: 'Home',
        components: {
            Field,
        },

    };
</script>
