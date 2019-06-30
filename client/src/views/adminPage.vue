<template>
    <div class="adminPage" style="background-color : black; height : 100% ">
        <navbar/>
        <v-container fluid style="background-color : rgba(250, 0, 0, 0.2); height : 100%">
            <v-layout row justify-center style="margin-top : 50px; text-align : center">
                <v-flex lg6 md6 xs10 style="height : 100%; background-color : white">
                    <h1>ALL TRANSACTION HISTORY</h1>
                    <v-card v-for="transaction in allTransaction" v-bind:key="transaction._id" style="">
                    <a href="" @click.prevent="toDetail(`${transaction._id}`)" style="text-decoration : none; font-size : 20px; color : green">{{transaction.created_at.substring(0,10)}}</a>
                    <span> -- status : {{transaction.status}}</span><br>
                    <v-btn v-if="transaction.status === 'processed'" color="success">on Delivery</v-btn>
                    <v-btn v-if="transaction.status === 'closed'" color="success" disabled>package arrived</v-btn>
                    </v-card>
                </v-flex>
                <v-flex>
                    <router-view v-bind:transaction="transactionDetail"></router-view>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import navbar from '@/components/navbar'
import { mapState } from 'vuex'


export default {
    data(){
        return{

        }
    },
    methods : {
        toDetail(id){
            console.log(id);
            this.$store.dispatch('getDetailTransaction',id)
            this.$router.push(`/adminPage/detailTrans/${id}`)
        }
    },
    components : {
        navbar
    },
    computed : {
        ...mapState(['allTransaction','transactionDetail'])
    }
    ,
    created(){
      this.$store.dispatch('getAllTransaction')
      this.$router.push('/adminPage')
    }
}
</script>
