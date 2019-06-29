<template>
    <div class="cartPage" style="background-color : black; height : 100%">
        <navbar/>
        <v-container fluid style="background-color : rgba(250, 0, 0, 0.2); height : 100%">
            <v-layout row justify-center style="margin-top : 50px">
                <v-flex class="white--text mb-3" style="text-align: center">
                    <h1>Your Shopping Cart summaries</h1>
                </v-flex>
            </v-layout>
            <v-layout row lg8 md8 sm12 style="">
                <v-flex>
                    <v-card style="height : 800px;">
                        <!-- <span>{{cart}}</span> -->
                        <v-card v-for="product in cart" v-bind:key="product._id" style="background-color : lightgrey">
                            <v-container>
                                <v-layout>
                                    <v-flex>
                                        <span>Name : {{product.productId.name}}</span><br>
                                        <span>Quantity : {{product.quantity}}</span><a @click.prevent="increaseQuantity(`${product._id}`)" class="ml-3" href=""><i class="fas fa-plus"></i></a><a @click.prevent="decreaseQuantity(`${product._id}`)" class="ml-3" href=""><i class="fas fa-minus"></i></a><br>
                                        <span>Total Price : {{product.totalPrice | currency}}</span>
                                    </v-flex>

                                </v-layout>
                            </v-container>
                        </v-card>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import navbar from '@/components/navbar'
import { mapState } from 'vuex'
export default {
    components : {
        navbar
    },
    data(){
        return {

        }
    },
    computed : {
        ...mapState(['cart'])
    },
    mounted(){
        // console.log('di mounted',this.cart);
    },
    methods : {
        increaseQuantity(id){
            console.log(id);
            
            this.$store.dispatch('increaseQuantity',id)
        },
        decreaseQuantity(id){
            console.log(id);
            this.$store.dispatch('decreaseQuantity',id)
        }
    }
}
</script>
