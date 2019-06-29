<template>
    <div class="detailProduct">
        <v-card style="padding : 30px;" >
            <v-layout row justify-center align-center>
                <!-- {{detailData}} -->
                <v-flex lg3 xs3>
                    <img :src="detailData.image" width="300px" alt="">
                </v-flex>
                <v-flex lg4 xs4>
                    <h1> <b>{{detailData.name}}</b> </h1>
                    <span id="description">
                        {{detailData.description}}
                    </span><br>
                    <span id="price">Price : {{detailData.price | currency}}</span><br>
                    <span> Stock : {{detailData.stock}}</span>
                </v-flex>

            </v-layout>
            <v-layout row justify-center>
                <router-link :to="`/editPage/${detailData._id}`">
                    <v-btn>Edit</v-btn>
                </router-link>
                <router-link to='/productPage'>
                    <v-btn>close</v-btn>
                </router-link>
            </v-layout>
        </v-card>
    </div>
</template>

<style>
    span{
        font-size: 20px
    }
</style>


<script>
import { mapState } from 'vuex'

export default {
    data(){
        return{

        }
    },
    created(){
        
    },
    methods : {
        editProduct(){
            console.log('edit trigerred');
            
            this.$store.dispatch('getDetail', this.product._id)
        }
    },
    computed : {
        ...mapState(['detailData'])
    }
}
</script>
