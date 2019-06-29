<template>
  <v-app>
    <!-- <navbar/> -->
    <v-content style="padding : 0">
      <router-view></router-view>
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
      ax.defaults.headers.common['token'] = localStorage.token;
    }
  }
}
</script>
