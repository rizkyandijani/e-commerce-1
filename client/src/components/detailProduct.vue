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
                <router-link v-show="this.access === 'root'" :to="`/editPage/${detailData._id}`">
                    <v-btn @click="onEdit">Edit</v-btn>
                </router-link>
                <v-btn v-show="this.access === 'root'" @click="deleteItem">delete</v-btn>
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
        onEdit(){
            console.log('edit trigerred');
            
            this.$store.dispatch('onEdit')
        },
        deleteItem(){
            console.log('awaaaaaaaaaaaaaaal',this.finishDelete, this.productUpdated);
            
            this.$swal({
                title: 'Are you sure want to delete products?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                })
                .then((result) => {
                if (result.value) {
                    this.dialog = true
                    this.$store.dispatch('deleteProduct',this.detailData._id)
                        console.log('akhiiiiiiiir', this.finishDelete, this.productUpdated);
                        this.dialog = false
                        this.$swal(
                        'Deleted!',
                        'Your Product has been deleted.',
                        'success'
                        )
                        this.$emit('removeCard',this.detailData._id)
                        this.$router.push('/productPage')
                }
            })
        }
    },
    computed : {
        ...mapState(['detailData', 'finishDelete', 'productUpdated', 'access'])
    }
}
</script>
