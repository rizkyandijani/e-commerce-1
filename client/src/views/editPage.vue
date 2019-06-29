<template>
    <div style="height : 100%; background-color : black" class="addProduct">
        <v-container fluid style="background-color : rgba(250, 0, 0, 0.2); width : 100%; margin : 0;padding : 0; height : 100%">
            <v-layout row justify-center style="text-align : center">
                <v-flex class="white--text mt-2">
                    <h1>Edit product</h1>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex>
                    <v-card style="height : auto; margin : 30px; padding : 30px;">
                        <formCreate :product="detailData" />
                        <v-btn @click.prevent="check">check</v-btn>
                    </v-card>
                    <v-btn @click="toHome" btn-primary class="ml-5" >back to homepage</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import formCreate from '@/components/formCreate'
import { mapState } from 'vuex'

export default {
    data(){
        return {

        }
    },
    components : {
        formCreate
    },
    methods : {
        toHome(){
            this.$router.push('/')
        },
        check(){
            console.log('detail data ajaa',this.detailData);
            
        }
    },
    computed : {
        ...mapState(['detailData'])
    },
    mounted(){
        console.log(this.detailData);
        
    }
}
</script>
