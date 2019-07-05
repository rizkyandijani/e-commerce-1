<template>
<div class="productPage" style="background-color : black; height :100%">
    <navbar/>
    
        <v-container fluid style="background-color : rgba(250, 0, 0, 0.2); width : 100%;height : 100%; margin : 0;padding : 0;">
            <v-layout>
                <v-carousel hide-delimiters style="margin-top : 65px; height ; 700;">
                    <v-carousel-item
                    v-for="(item,i) in items"
                    :key="i"
                    :src="item.src"
                    ></v-carousel-item>
                </v-carousel>
            </v-layout>
            <v-container fluid class="category-container">
                <v-layout row>
                    <v-flex lg12 row class="d-flex text-center" style="text-decoration : none;">
                        <a @click.prevent="products = allProducts" class="category" href="">all product</a>
                        <a @click.prevent="products = tops" class="category" href="">Top</a>
                        <a @click.prevent="products = bottoms" class="category" href="">Bottom</a>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex id="productDetail">
                         <transition
                            name="fade"
                            mode="out-in"
                            >
                        <router-view class="mt-3" v-on:removeCard="removeFromList"/>
                         </transition>
                    </v-flex>
                </v-layout>
            </v-container>
        <v-layout wrap justify-center style="background-color : rgba(146, 119, 119, 0.58); margin : 10px; height : auto;" >
            <v-flex lg2 xs2 v-for="product in products" :key="product._id" >
                <productCard v-bind:product="product" />
                <!-- {{products}} -->
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex>

            </v-flex>
            <v-flex>

            </v-flex>
        </v-layout>
        </v-container>
</div>
</template>

<style>
a.category{
    text-align: center;
    text-decoration: none;
    color: white;
    font-size: 20px;
    font-weight: lighter
}

a.category:hover{
    background-color: white;
    color : black
}

div.container.category-container{
    justify-content: center;
    margin : 5px 0;
    padding: 5px;;
    width: 100%;
    background-color: rgba(34, 33, 48, 0.5)
}




</style>


<script>
import navbar from '../components/navbar'
import productCard from '@/components/productCard'
import { mapState } from 'vuex'
export default {
    data(){
        return {
            items : [
                {src : 'https://images.unsplash.com/photo-1503431194692-82dd03d18093?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80' },
                {src : 'https://images.unsplash.com/photo-1527594220959-062b8e6ed69d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'},
                {src : 'https://images.unsplash.com/photo-1556807457-9c4f0a528934?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'},
                {src : 'https://images.unsplash.com/photo-1552270504-2c5b1c513cf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80'},
                {src : 'https://images.unsplash.com/photo-1559924542-af829296ad33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'}

            ],
            products : []
        }
    },
    components : {
        navbar,
        productCard
    },
    methods : {
        removeFromList(id){
            console.log('remove from list trigerred',id);
            let temp = []
            this.products.forEach(el =>{
                if(el._id !== id){
                    temp.push(el)
                }
            })
            this.products = temp
        }
    },
    mounted(){
        this.products = this.allProducts
        
    },
    created(){
        this.$store.dispatch('getProducts')
            .then((data)=>{
                this.products = data
            })
            .catch(err =>{
                console.log(err);
            })
        
        
    },
    computed : {
        ...mapState(['isLogin','tops', 'bottoms', 'allProducts','access']),
    }
}
</script>

cli