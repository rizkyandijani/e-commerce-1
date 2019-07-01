<template>
  <v-app>
    <!-- <navbar/> -->
    <v-content style="padding : 0">
      <router-view></router-view>
      <v-footer class="pa-3 " style="background-color : #460000; color : white; font-size : 18px">
        <div style="text-decoration : none; color : white">
          <a style="color: white" href="https://github.com/rizkyandijani?tab=repositories" class="ml-2">
            <i class="fab fa-github fa-lg"></i>
          </a>
          <a style="color: white" href="https://id.linkedin.com/in/rizky-andijani-7629ba121/" class="ml-3">
            <i class="fab fa-linkedin fa-lg"></i>
          </a>
        </div>
        <v-spacer></v-spacer>
        <div class="mr-3">Copyright : Rizky Andi Jani</div>
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
    let productId = this.$route.params.productId
    // console.log('ada product id', this.$route.params);
      if(productId){
        this.$store.dispatch('getDetail',productId)
      }
    if(localStorage.token){
      console.log('triggered created app');
      
      this.$store.dispatch('cekIsLogin')
      this.$store.dispatch('getProducts')
      ax.defaults.headers.common['token'] = localStorage.token;
      this.$store.dispatch('getUserTransaction', localStorage.userId)
      this.$store.dispatch('getAllTransaction', localStorage.userId)

    }
  }
}
</script>
