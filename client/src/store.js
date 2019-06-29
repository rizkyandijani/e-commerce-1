import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import ax from './api'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin : false,
        allProducts : [],
        tops : [],
        bottoms : [],
        detailData: {}  ,
        cart : [],
        totalItem : 0,
    },
    mutations : {
        
        setIsLogin(state, data){
            state.isLogin = data
            console.log('check',state.isLogin);
        },
        
        setProducts(state,data){
            let top = []
            let bottom = []
            data.forEach(el =>{
                if(el.category === 'Top'){
                    top.push(el)
                }else if(el.category === 'Bottom'){
                    bottom.push(el)
                }else{
                    console.log(el.category);
                    
                    console.log('category is not defined');
                }
            })

            state.tops = top
            state.bottoms = bottom
            state.allProducts = data
            console.log('store all',state.allProducts);
            
            console.log('products', state.allProducts);
        },

        setDetail(state,data){
            state.detailData = data
        },

        setCart(state,data){
            state.cart = data
        },

        setTotalItem(state,data){
            state.totalItem = data
        }

    },
    actions : {

        cekIsLogin(context,data){
            context.commit('setIsLogin', true)
        },

        getProducts(context,data){
            return ax.get('/products')
            .then(({data})=>{
                context.commit('setProducts', data)
                return data
            })
            .catch(err =>{
                console.log(err);
            })
        },
        
        getDetail(context,data){
            console.log('masuk get detail');
            
            ax.get(`/products/${data}`)
            .then(({data})=>{
                console.log('data detail', data);
                
                context.commit('setDetail', data)
            })
            .catch(err =>{
                console.log(err);
            })
        },

        login(context,data){
            console.log('masuk actions login',data)
            
            
            let dataLogin = {
                email : data.email,
                password : data.password
            }
            ax.post('/login',dataLogin)
            .then(({data})=>{
                ax.defaults.headers.common['token'] = data.token;
                console.log('ini data',data);
                localStorage.setItem('token', data.token)
                localStorage.setItem('userId', data._id)
                localStorage.setItem('name', `${data.firstName} ${data.lastName}`)
                console.log('ini local storage', localStorage.token, localStorage.name);
                context.commit('setIsLogin', true)
                this.dispatch('createCart')
            })
            .catch(err =>{
                console.log('masuk error');
                
                console.log(err);
            })
        },

        register(context,data){
            console.log('masuk actions register', data);
            let dataRegister = {
                firstName : data.firstName,
                lastName : data.lastName,
                email : data.email,
                password : data.password
            }
            ax.post('/register',dataRegister)
            .then(({data})=>{
                console.log('data register',data);
                
            })
            .catch(err =>{
                console.log(err.response.data);
            })
        },

        create(context,data){
            console.log('masuk store create',data);
            let formData = new FormData()
            formData.append('name', data.name)
            formData.append('description', data.description)
            formData.append('price', data.price)
            formData.append('stock', data.stock)
            formData.append('category', data.category)
            formData.append('image', data.file)
            ax.post('/products', formData)
        },

        createCart(context,data){
            console.log('dispatch create');
            ax.post('/carts')
            .then(({data})=>{
                console.log(data);
                localStorage.setItem('cartId', data._id)
                this.dispatch('getCart')
            })
            .catch(err =>{
                console.log(err);
                
            })
        },

        addToCart(context,data){
            console.log('jalan add to cart');
            
            ax.post(`/cartItems/${localStorage.cartId}/${data}`)
            .then(({data})=>{
                console.log(data);
                this.dispatch('getCart')
            })
            .catch(err =>{
                console.log(err);
            })
        },

        increaseQuantity(context,data){
            console.log('masuk increase');
            
            ax.patch(`/cartItems/${data}/increaseQuantity`)
            .then(data =>{
                console.log('increase quantity',data);
                this.dispatch('getCart')
            })
        },

        decreaseQuantity(context,data){
            console.log('masuk decrease');
            
            ax.patch(`/cartItems/${data}/decreaseQuantity`)
            .then(data =>{
                console.log('decrese quantity', data);
                this.dispatch('getCart')                
            })
        },

        deleteCartItem(context,data){
            console.log('masuk delete');
            
            ax.delete(`/cartItems/${data}`)
            .then(data =>{
                console.log(data);
                this.dispatch('getCart')                
            })
            .catch(err =>{
                console.log(err);
            })
        },

        getCart(context,data){
            console.log('get cartItem', localStorage.cartId);
            
            ax.get(`/cartItems/${localStorage.cartId}/getByCard`)
            .then(({data})=>{
                console.log('ini data getCartItem', data);
                
                context.commit('setCart',data)
                let total = 0
                data.forEach(el =>{
                    total += el.quantity
                })
                context.commit('setTotalItem',total)
            })
        },

        signout(context,data){
            context.commit('setIsLogin', false)
            context.commit('setTotalItem', 0)
        }
        
    }
})
