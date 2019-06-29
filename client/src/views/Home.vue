<template>
<div class="home" style="height: 100%; background-image: url(https://images.unsplash.com/photo-1501529301789-b48c1975542a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80); background-size : cover">
    <!-- <img src="" width="100%" height="100%" alt="" style="z-index: -1;"> -->
    <navbar/>
    <v-container class="white--text">
      <v-layout row style="background-color : rgba(255, 255, 255, 0.1); margin-top : 80px; height : 150px">
        <v-flex lg12 mt-2 style="text-align : center; font-size : 24px;">
          OUR COLLABORATING BRAND : 
          <v-flex>
            <img class="mr-2" src="https://png2.kisspng.com/sh/859e808e9935b0d6b332b94c93419b18/L0KzQYm4UsAyN6V7R91yc4Pzfri0lL10cJp3jJ9BbHBxdX7zjBdwNaR6iORubXWwRbS3UsU3OGZpUKQDZkKxRIWBWcc0OGg2TaY8NkW5SYe8WMg2PF91htk=/kisspng-t-shirt-vlone-logo-supreme-5c025605d828f2.4489730715436569658854.png" width="80px" height="80px" alt="">
            <img class="mr-2" src="https://png2.kisspng.com/sh/8d80d1d4ac889ecb1367077e0f9163ac/L0KzQYm3VcEzN6pmj5H0aYP2gLBuTfxwb5Cyi9twbj34frXshvVifJZpReY2c3jsgsW0VfFnP5M8e9UCOES2QYS1VscxQWU6TKs6NUK5QYm6WMg1PGo3TpD5bne=/kisspng-logo-sign-undefeated-t-shirt-5af7b7cc784313.6709454915261838844926.png" width="80px" height="80px" alt="">
            <img class="mr-2" src="https://png2.kisspng.com/sh/98912597c1661ecc611e56c97fbb854c/L0KzQYm3V8I5N5dxgZH0aYP2gLBuTgVvcZR0itC2aHB1fn7zjBdwNZDrfp9CaHn3dX7zjBdwNWZnTdUCMHO4dbfrVvI1NmM9SqoEMEa4QYa6Usc5PGk4T6sDMkSxgLBu/kisspng-unicorn-horn-logo-off-white-logo-5b5c70c5efd6b4.2828906515327848379824.png" width="120px" height="80px" alt="">
            <img class="mr-2" src="https://png2.kisspng.com/sh/f2520a12b26ccc7281d4de977f5772db/L0KzQYm3U8MxN5RrfZH0aYP2gLBuTgN4d5D4gJ93aXvoPb32hB8ua51uiJ9qcoSwfrryhb02aZNqSdUANUa1SbO8WL42P2c5UaoBMUG4QoO7UMg2O2Q5SKUELoDxd1==/kisspng-swoosh-nike-logo-clip-art-nike-5abe1c55629b58.5764986115224085334039.png" width="80px" height="80px" alt="">
            <img class="mr-2" src="https://png2.kisspng.com/sh/72df689f7cbd957a2ca9a6c1f1f9278f/L0KzQYm3VMAyN6l1fZH0aYP2gLBuTfp2daFyedC2dD32eLr5lL1icaMygtH7ZHHxPb32hB8udppwfZ92aXPrcbbzTfpwepVmhp8AYXOzcobqUMlkPGc8UZC8N0K1Q4O6WcE2OmM6T6oDOEC5RIG4TwBvbz==/kisspng-jumpman-t-shirt-air-jordan-logo-nike-michael-jordan-5ac0b5c09c4679.3722323915225788806401.png" width="80px" height="80px" alt="">
            <img class="mr-2" src="https://png2.kisspng.com/sh/a1ae1742edb48113083ebfac5e16917a/L0KzQYm3VMI1N5h2fZH0aYP2gLBuTfFlcZVmi594cnnqebBojQMue5l0fZ9vb3B3Pb32gBtmel5ohNH9aHnxd37ohPllaaQyhNHwbz24cbXtgBU3bJRqe9YAMz61Q4e8VMcyP2I6SqYBMUa7QYSBVMcyNqFzf3==/kisspng-adidas-originals-shoe-foot-locker-clothing-adidas-logo-5adfce6dcecd53.2365471715246168138471.png" width="80px" height="80px" alt="">
            <img class="mr-2" src="https://png2.kisspng.com/sh/760ae8f653518f0c5f88418ce80558cd/L0KzQYm3VsI2N5tse5H0aYP2gLBuTfEuapJ5gNt3Zz3kgLa0kCVxepZyfZ9vYYPrebF1TgQue5luiuY2c4T1dbb7lBViel46eqU6OEa5R7W8hMg0QF87UaU6N0e5RoK8Usk6P2M4SqkDN0W8PsH1h5==/kisspng-a-bathing-ape-supreme-fashion-t-shirt-streetwear-5b318667d5d838.6931776615299723278759.png" width="80px" height="80px" alt="">
          </v-flex>
        </v-flex>

      </v-layout>
      <v-layout justify-center row style="margin-top :350px">
        <v-flex lg3 md3 xs3 style="background-color : rgba(34, 33, 48, 0.3); text-align: center">
          <v-btn @click.prevent="toProductPage()" flat color="white"><i class="fas fa-dollar-sign mr-2" fa-lg></i>FIND YOUR HOLYDRIPS</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
</div>
</template>

<script>
import navbar from '../components/navbar'
import { mapState } from 'vuex'
  export default {
    components: {
      navbar
    },
    methods : {
      toProductPage(){
        this.$router.push('/productPage')
        
      }
    },
    created(){
        this.$store.dispatch('getProducts')
    },
    computed : {
      ...mapState(['isLogin'])
    }
  }
</script>
