<template>
    <div class="productCard">
        <v-hover>
            <v-card 
            wrap
            slot-scope="{ hover }"
            style="margin : 10px;" >
                <v-img
                class="black--text"
                height="300px"
                :src="product.image"
                >
                <v-expand-transition>
                    <div v-if="hover" class="d-flex transition-fast-in-fast-out red darken-4 v-card--reveal display-1 white--text"
                    style="height: 100%"
                    >
                    <v-flex style="text-align : center">
                        <span><b>{{product.name}}</b></span><br>
                        <!-- <span>Yohji Letters Baseball Shirt</span> -->
                        <span>{{product.price | currency}}</span>
                    </v-flex>
                    </div>
                </v-expand-transition>
                </v-img>
                <v-card-actions>
                <v-layout row justify-center>
                    <v-btn v-if="isLogin" @click="addToCart" flat color="red">Add to cart</v-btn>                    
                    <v-btn v-if="!isLogin" flat color="red" disabled>Add to cart</v-btn>
                    <router-link :to="`/productPage/detail/${product._id}`">
                        <v-btn @click="detailing" flat color="red">Detail</v-btn>
                    </router-link>
                </v-layout>
                </v-card-actions>
            </v-card>
        </v-hover>
    </div>
</template>

<style>
    .v-card--reveal {
        align-items: center;
        bottom: 0;
        justify-content: center;
        opacity: .5;
        position: absolute;
        width: 100%;
        font-size: 10px;
        }

</style>


<script>
import { mapState } from 'vuex'

export default {
    props : ['product'],
    data(){
        return {
            // isLogin : this.$store.state.isLogin
        }
    },
    methods : {
        detailing(){
            console.log('dispatch detail');
            this.$store.dispatch('getDetail',this.product._id)
            window.scrollTo(100, 100)
        },
        addToCart(){
            this.$store.dispatch('addToCart', this.product._id)
        }
    },
    computed : {
        ...mapState(['isLogin'])
    }
}
</script>
