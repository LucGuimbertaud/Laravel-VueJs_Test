<template>
    <div class="d-flex">
        <i
            class="fas fa-star"
            v-for="star in fullStars"
            :key="'full' + star"
            @click="$emit('rating:changed', star)"
        ></i>
        <i
            class="fas fa-star-half-alt"
            v-if="halfStar"
        ></i>
        <i
            class="far fa-star"
            v-for="star in emptyStars"
            :key="'empty' + star"
            @click="$emit('rating:changed', fullStars + star)"
        ></i>
    </div>
</template>

<script>
export default {
    props: {
        rating: null
    },

    computed: {
        halfStar() {
            const fraction = Math.round((this.rating - Math.floor(this.rating)) * 100);

            return fraction > 0 && fraction < 50;
        },
        fullStars(){
            return Math.round(this.rating);
        },
        emptyStars(){
            return 5 - Math.ceil(this.rating);
        }
    },

    // created(){
    //     const numbers = [4.0, 4.4, 4.5, 4.6, 4.9];

    //     numbers.forEach(n => {
    //         console.log(`round for ${n} is ${Math.round(n)}`);
    //         console.log(`floor for ${n} is ${Math.floor(n)}`);
    //         console.log(`ceil for ${n} is ${Math.ceil(n)}`);
    //         console.log('============================================');
    //     });
    // }
}

</script>
