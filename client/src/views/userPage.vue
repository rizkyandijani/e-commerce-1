<template>
    <div class="userPage" style="background-color : black; height : 100% ">
        <navbar/>
        <v-container fluid style="background-color : rgba(250, 0, 0, 0.2); height : 100%">
            <v-layout row justify-center style="margin-top : 50px; text-align : center">
                <v-flex lg6 md6 xs10 style="height : 100%; background-color : white">
                    <h1>YOUR TRANSACTION HISTORY</h1>
                    <v-card v-for="transaction in userTransaction" v-bind:key="transaction._id" style="">
                    <a href="" @click.prevent="toDetail(`${transaction._id}`)" style="text-decoration : none; font-size : 20px; color : green">{{transaction.created_at.substring(0,10)}}</a>
                    <span> -- status : {{transaction.status}}</span><br>
                    <v-btn v-if="transaction.status === 'processed'" @click.prevent="transactionClose(`${transaction._id}`)" color="success">confirm package arrival</v-btn>
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
        return {
            
        }
    },
    methods : {
        toDetail(id){
            console.log(id);
            this.$store.dispatch('getDetailTransaction',id)
            this.$router.push(`/userPage/${localStorage.userId}/detailTrans/${id}`)
        },
        transactionClose(id){
            console.log(id);
            this.$store.dispatch('updateTransactionClose', id)
            
        }
    },
    components : {
        navbar
    },
    computed : {
        ...mapState(['userTransaction','transactionDetail'])
    },
    created(){
      this.$store.dispatch('getUserTransaction', localStorage.userId)
      this.$router.push(`/userPage/${this.$route.params.userId}`)
    }
}
</script>
