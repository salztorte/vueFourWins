export default {
    methods: {
        createFieldItem(width = 0, height = 0){
            return {
                width,
                height,
                player: 0,
            }
        },
        createField(width = 7, height = 7) {
            return new Array(height).fill().map((_, h) => new Array(width).fill().map((_, w) => this.createFieldItem(w, h)));
        },
    }
};
