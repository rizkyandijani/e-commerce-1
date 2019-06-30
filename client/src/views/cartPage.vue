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
                    <v-card v-if="cart" style="height : auto;">
                        <!-- <span>{{cart}}</span> -->
                        <v-card  v-for="product in cart" v-bind:key="product._id" style="background-color : lightgrey; margin : 10px;">
                            <v-container>
                                <v-layout>
                                    <v-flex lg3>
                                        <img :src="product.productId.image" width='200px' alt="">
                                    </v-flex>
                                    <v-flex>
                                        <span>Name : {{product.productId.name}}</span><br>
                                        <span>Quantity : {{product.quantity}}</span><a @click.prevent="increaseQuantity(`${product._id}`)" class="ml-3" href=""><i class="fas fa-plus"></i></a><a @click.prevent="decreaseQuantity(`${product._id}`)" class="ml-3" href=""><i class="fas fa-minus"></i></a><br>
                                        <span>Total Price : {{product.totalPrice | currency}}</span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card>
                        <v-layout justify-center v-if="count" row lg12>
                            <h1 v-if="cart.length === 0">No Product Added</h1><br>

                            <v-flex v-if="cart.length > 0" d-flex lg6>
                                <h1>Total Price : {{totalPrice | currency}}</h1>
                                <h1>Total Item : {{totalItem}}</h1>
                            </v-flex>
                            <v-btn v-if="cart.length > 0" @click.prevent="dialog = true" color="success">Checkout</v-btn>
                            <v-btn v-if="cart.length === 0" @click.prevent="dialog = true" color="success" disabled>Checkout</v-btn>

                        </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                    <span class="headline">Delivery Form</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container grid-list-md>
                        <v-layout row wrap>
                            <v-flex xs12 sm12 md12>
                                <v-text-field v-model="receiver" label="receiver" required></v-text-field>
                            </v-flex><br>
                            <v-flex xs12 sm12 md12>
                                <v-text-field v-model="address" label="address" required></v-text-field>
                            </v-flex><br>
                            <v-flex xs12 sm12 md12>
                                <v-text-field v-model="phoneNumber" label="phone number" type="text"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="dialog = false, checkoutCart()">checkout</v-btn>
                    <v-btn color="blue darken-1" flat @click="dialog = false">cancel</v-btn>
                    </v-card-actions>
                    <v-layout row justify-center>
                    </v-layout>
                </v-card>
        </v-dialog>
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
            totalPrice : 0,
            totalItem : 0,
            dialog : false,
            receiver : '',
            address : '',
            phoneNumber :  ''
        }
    },
    computed : {
        count(){
            if(this.cart !== undefined){
                this.totalPrice = 0
                this.totalItem = 0
                console.log('ini cart mounted',this.cart);
                this.cart.forEach(element => {
                    this.totalPrice += element.totalPrice
                    this.totalItem += element.quantity
                });
                return true
            }else{
                return true
            }
        },
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
        },
        checkoutCart(){
            this.$swal({
                title: 'Ready to Check Out?',
                text: "is this already all you need?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, continue to checkout!'
                })
                .then((result) => {
                    if (result.value) {
                            this.dialog = false
                            this.$swal(
                            'Deleted!',
                            'Your order is being processed.',
                            'success'
                            )
                        let data = {
                            list : this.cart,
                            totalPrice : this.totalPrice,
                            receiver : this.receiver,
                            address : this.address,
                            phoneNumber : this.phoneNumber
                            }
                        this.$store.dispatch('checkout',data)
                    }
                })
                .catch(err =>{
                    console.log(err);
                })

        }
    },
    created(){
        
    }
}
</script>
