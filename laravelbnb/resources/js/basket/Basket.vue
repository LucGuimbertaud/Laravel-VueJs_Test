<template>
    <div>
        <div class="row">
            <div class="col-md-8" v-if="itemsInBasket">
                <div class="row">
                    <div class="col-md-6">
                        <label for="first_names">First names</label>
                        <input
                            type="text"
                            class="form-control"
                            name="first_names"
                            v-model="customer.first_names"
                        />
                    </div>
                    <div class="col-md-6">
                        <label for="last_names">Last names</label>
                        <input
                            type="text"
                            class="form-control"
                            name="last_names"
                            v-model="customer.last_names"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <label for="email">Email</label>
                        <input
                            type="text"
                            class="form-control"
                            name="email"
                            v-model="customer.email"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <label for="street">Street</label>
                        <input
                            type="text"
                            class="form-control"
                            name="street"
                            v-model="customer.street"
                        />
                    </div>
                    <div class="col-md-6">
                        <label for="city">City</label>
                        <input
                            type="text"
                            class="form-control"
                            name="city"
                            v-model="customer.city"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <label for="country">Country</label>
                        <input
                            type="text"
                            class="form-control"
                            name="country"
                            v-model="customer.country"
                        />
                    </div>
                    <div class="col-md-4">
                        <label for="state">State</label>
                        <input
                            type="text"
                            class="form-control"
                            name="state"
                            v-model="customer.state"
                        />
                    </div>
                    <div class="col-md-2">
                        <label for="zip">Zip</label>
                        <input
                            type="text"
                            class="form-control"
                            name="zip"
                            v-model="customer.zip"
                        />
                    </div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-md-12 form-group">
                        <button
                            type="submit"
                            class="btn btn-lg btn-primary btn-block"
                            @click.prevent="book"
                        >
                            Book Now !
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-md-8" v-else>
                <div class="jumbotron jumbotron-fluid text-center">
                    <h1>Empty</h1>
                </div>
            </div>
            <div class="col-md-4">
                <div class="d-flex justify-content-between">
                    <h6
                        class="text-uppercase text-secondary font-weight-bolder"
                    >
                        Your cart
                    </h6>
                    <h6 class="badge badge-secondary text-uppercase">
                        <span v-if="itemsInBasket"
                            >Item {{ itemsInBasket }}</span
                        >
                        <span v-else>Empty</span>
                    </h6>
                </div>

                <transition-group name="fade" tag="div">
                    <div v-for="item in basket" :key="item.bookable.id">
                        <div
                            class="pt-2 pb-2 border-top d-flex justify-content-between"
                        >
                            <span>
                                <router-link
                                    :to="{
                                        name: 'bookable',
                                        params: { id: item.bookable.id }
                                    }"
                                >
                                    {{ item.bookable.title }}
                                </router-link>
                            </span>
                            <span class="font-weight-bold">
                                ${{ item.price.total }}
                            </span>
                        </div>

                        <div class="pt-2 pb-2 d-flex justify-content-between">
                            <span> From {{ item.dates.from }} </span>
                            <span class="font-weight-bold">
                                To {{ item.dates.to }}
                            </span>
                        </div>

                        <div class="pt-2 pb-2 text-right">
                            <button
                                class="btn btn-sm btn-outline-secondary"
                                @click="
                                    $store.dispatch(
                                        'removeFromBasket',
                                        item.bookable.id
                                    )
                                "
                            >
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import validationErrors from "./../shared/mixins/validationErrors";

export default {
    mixins: [validationErrors],
    data() {
        return {
            lading: false,
            customer: {
                first_names: null,
                last_names: null,
                email: null,
                street: null,
                city: null,
                country: null,
                state: null,
                zip: null
            }
        };
    },
    computed: {
        ...mapGetters(["itemsInBasket"]),
        ...mapState({
            basket: state => state.basket.items
        })
    },
    methods: {
        async book() {
            this.loading = true;

            try{
                await axios.post(`/api/checkout`, {
                    customer: this.customer,
                    bookings: this.basket.map(basketItem => ({
                        bookable_id: basketItem.bookable.id,
                        from: basketItem.dates.from,
                        to: basketItem.dates.to
                    }))
                });
                this.$store.dispatch("clearBasket");
            }catch (err){

            }

            this.loading = false;
        }
    }
};
</script>

<style scoped>
h6.badge {
    font-size: 100%;
}

a {
    color: black;
}
</style>
