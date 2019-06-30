<template>
  <v-app>
    <!-- <navbar/> -->
    <v-content style="padding : 0">
      <router-view></router-view>
      <v-footer class="pa-3 " style="background-color : #460000; color : white; font-size : 18px">
        <v-spacer></v-spacer>
        <div>&copy; {{ new Date().getFullYear() }}</div>
      </v-footer>
    </v-content>
  </v-app>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>


<script>
import navbar from './components/navbar'
import ax from './api'
export default {
  name: 'App',
  components: {
    // navbar
  },
  data () {
    return {
      
    }
  },
  created(){
    if(localStorage.token){
      console.log('triggered created app');
      
      this.$store.dispatch('cekIsLogin')
      this.$store.dispatch('getProducts')
      let productId = this.$route.params.productId
      console.log('ada product id', productId);
      if(productId){
        this.$store.dispatch('getDetail',productId)
      }
      ax.defaults.headers.common['token'] = localStorage.token;
      this.$store.dispatch('getUserTransaction', localStorage.userId)
      this.$store.dispatch('getAllTransaction', localStorage.userId)

    }
  }
}
</script>
