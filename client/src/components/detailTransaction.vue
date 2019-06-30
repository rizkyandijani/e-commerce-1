<template>
    <div class="detailTransaction">
        <v-card>
            <v-layout>
                <v-flex>
                    <h1>Detail of Transaction</h1>
                    <div v-for="item in transaction.cartItemList" v-bind:key="item._id">
                        <img :src="item.productId.image" width="200px" alt="item.productId.name"><br>
                        <span>Product Name : {{item.productId.name}}</span><br>
                        <span>Order Quantity : {{item.quantity}}</span>
                        <!-- <h1>{{transaction}}</h1> -->
                    </div>
                    <div style="background-color : lightgrey">
                        <span>Total Price : {{transaction.totalPrice | currency}}</span><br>
                        <span>package receiver :  {{transaction.receiver}}</span><br>
                        <span>delivery address :  {{transaction.address}}</span><br>
                        <span>contact number :  {{transaction.phoneNumber}}</span><br>
                    </div>
                    <router-link :to="'/userPage/'+ userId">
                        <v-btn color="success">close</v-btn>
                    </router-link>
                </v-flex>
            </v-layout>
        </v-card>
    </div>
</template>

<script>
export default {
    data(){
        return{
            userId : localStorage.userId
        }
    },
    props : ['transaction'],

}
</script>
