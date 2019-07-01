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
        onEdit : false,
        userTransaction : [],
        transactionDetail : {},
        allTransaction : [],
        access : 'customer'
    },
    mutations : {
        
        setIsLogin(state, data){
            state.isLogin = data
        },

        setAccess(state,data){
            state.access = data
        },

        setOnEdit(state,data){
            state.onEdit = true
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
        },

        setDetail(state,data){
            state.detailData = data
        },

        setCart(state,data){
            state.cart = data
        },

        setTotalItem(state,data){
            state.totalItem = data
        },

        setUserTransaction(state,data){
            state.userTransaction = data
        },

        setDetailTransaction(state,data){
            state.transactionDetail = data
        },
        
        setAllTransaction(state,data){
            state.allTransaction = data
        },

        setAccess(state,data){
            state.access = data
        }

    },
    actions : {

        cekIsLogin(context,data){
            context.commit('setIsLogin', true)
            if(localStorage.email === 'master@holygrail.com'){
                context.commit('setAccess', 'root')
            }
        },

        onEdit(context,data){
            context.commit('setOnEdit',true)
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
            ax.get(`/products/${data}`)
            .then(({data})=>{
                context.commit('setDetail', data)
            })
            .catch(err =>{
                console.log(err);
            })
        },

        login(context,data){
            let dataLogin = {
                email : data.email,
                password : data.password
            }
            ax.post('/login',dataLogin)
            .then(({data})=>{
                ax.defaults.headers.common['token'] = data.token;
                localStorage.setItem('token', data.token)
                localStorage.setItem('userId', data._id)
                localStorage.setItem('name', `${data.firstName} ${data.lastName}`)
                localStorage.setItem('email', data.email)
                context.commit('setIsLogin', true)
                this.dispatch('createCart')
                if(data.email === 'master@holygrail.com'){
                    context.commit('setAccess','root')
                }
            })
            .catch(err =>{
                console.log(err);
            })
        },

        register(context,data){
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
            let formData = new FormData()
            formData.append('name', data.name)
            formData.append('description', data.description)
            formData.append('price', data.price)
            formData.append('stock', data.stock)
            formData.append('category', data.category)
            formData.append('image', data.file)
            ax.post('/products', formData)
            .then(({data}) =>{
                this.dispatch('getProducts')
            })
            .catch(err =>{
                console.log(err);
            })
        },

        editProduct(context,data){
            let formData = new FormData()
            formData.append('name', data.name)
            formData.append('description', data.description)
            formData.append('price', data.price)
            formData.append('stock', data.stock)
            formData.append('category', data.category)
            formData.append('image', data.file)

            ax.patch(`/products/${data.id}`, formData)
            .then(({data}) =>{
                this.dispatch('getProducts')
            })
            .catch(err =>{
                console.log(err);
            })
        },

        deleteProduct(context,data){
            ax.delete(`/products/${data}`)
            .then(({data})=>{
                this.dispatch('getProducts')
                this.dispatch('getCart')
            })
            .catch(err =>{
                console.log(err);
            })
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
            ax.get(`/cartItems/${localStorage.cartId}/getByCart`)
            .then(({data})=>{
                context.commit('setCart',data)
                let total = 0
                data.forEach(el =>{
                    total += el.quantity
                })
                context.commit('setTotalItem',total)
            })
        },

        getUserTransaction(context,data){
            console.log('masuk get user transaction');
            ax.get(`/carts/getUserCart/${data}/getAll`)
            .then(({data})=>{
                context.commit('setUserTransaction', data)
            })
            .catch(err =>{
                console.log(err);
            })
        },

        checkout(context,data){
            console.log('data checkout',data);
            this.dispatch('closeCartItem', data.list)
            this.dispatch('updateStock', data.list)
            ax.patch(`/carts/${localStorage.cartId}/checkout`,{
                totalPrice : data.totalPrice,
                cartItemList : data.list, 
                receiver : data.receiver,
                address : data.address,
                phoneNumber : data.phoneNumber
            })
            .then(({data})=>{
                console.log(data);
                this.dispatch('createCart')
            })
            .catch(err =>{
                console.log(err);
            })
        },

        closeCartItem(context,data){
            console.log('data close cart item',data);
            let arrOfPromises =[]
            data.forEach(el =>{
                arrOfPromises.push(ax.patch(`/cartItems/${el._id}/updateStatus`))
            })
            Promise.all(arrOfPromises)
            .then(values =>{
                values.forEach(el =>{
                    console.log('data', el.data);      
                })
            })
            .catch(err =>{
                console.log(err);
                
            })
        },

        updateStock(context,data){
            console.log('mau update stock', data);
            let arrOfPromises = []
            data.forEach(el =>{
                arrOfPromises.push(ax.patch(`/products/${el.productId._id}/updateQuantity`,{quantity : el.quantity }))
            })
            Promise.all(arrOfPromises)
            .then(values =>{
                values.forEach(el =>{
                    console.log('ini data quantity updated', el.data);
                })
            })
            .catch(err =>{
                console.log(err);
            })
        },

        getDetailTransaction(context,data){
            ax.get(`/carts/${data}`)
            .then(({data})=>{
                context.commit('setDetailTransaction', data)
            })
            .catch(err =>{
                console.log(err);
            })
        },

        updateTransactionClose(context,data){
            ax.patch(`/carts/${data}/closeTransaction`)
            .then(({data})=>{
                this.dispatch('getUserTransaction', localStorage.userId)
            })
            .catch(err =>{
                console.log(err);
            })
        },

        getAllTransaction(context,data){
            ax.get('/carts/')
            .then(({data})=>{
                let arr = []
                data.forEach(el =>{
                    if(el.status !== 'open'){
                        arr.push(el)
                    }
                })
                context.commit('setAllTransaction',arr)
            })
            .catch(err =>{
                console.log(err);
            })
        },

        signout(context,data){
            context.commit('setIsLogin', false)
            context.commit('setAccess', 'customer')

            context.commit('setTotalItem', 0)
        }
        
    }
})
