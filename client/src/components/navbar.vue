<template>
    <nav>
        <v-toolbar
        flat 
        app
        style="background-color: rgba( 255, 0, 0, 0.1)"
        >
            <v-toolbar-side-icon v-show="isLogin" class="white--text" @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="text-uppercase white--text">
            <span>HOLY</span>
            <span class="font-weight-light">GRAIL</span>
            </v-toolbar-title>
            <v-spacer>
            </v-spacer>
            <!-- <v-btn @click.prevent="addQuestion" flat class="white--text"><v-icon>help</v-icon>Add Product</v-btn> -->
            <v-btn @click.prevent="toCartPage()" flat color="white" style="padding: 0;">
                <v-badge color="red" left>
                <template v-slot:badge>
                    <span>{{totalItem}}</span>
                </template>
                <v-icon
                    large
                    color="grey lighten-1"
                >
                    shopping_cart
                </v-icon>
                </v-badge>
            </v-btn>
            <v-btn @click="dialog2 = true" v-show="!isLogin" flat color="white">
                <span>Sign In</span>
                <v-icon>person</v-icon>
            </v-btn>
            <div>
            <v-btn v-show="isLogin" @click="signOut" flat color="white">
                <span>Sign Out</span>
                <v-icon>exit_to_app</v-icon>
            </v-btn>
            </div>
        </v-toolbar>
         <v-navigation-drawer v-model="drawer" app class="red darken-3">
            <v-list>
                <v-list-tile v-for="link in links" :key="link.text" router :to="link.route" style="font-size  : 16px">
                    <v-list-tile-action>
                        <v-icon class="white--text">{{link.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content class="white--text">{{link.text}}</v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-dialog
      v-model="dialog1"
      max-width="290"
    >
            <v-card>
                <v-card-title class="headline">Please Login first</v-card-title>

                <v-card-text>
                before Shopping, you need to Login first.
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="green darken-1"
                    flat="flat"
                    @click="dialog1 = false, dialog2 = true"
                >
                    Login
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialog2" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                    <span class="headline">Login</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container grid-list-md>
                        <v-layout row wrap>
                            <v-flex xs12 sm12 md12>
                                <v-text-field v-model="login.email" label="email" required></v-text-field>
                            </v-flex><br>
                            <v-flex xs12 sm12 md12>
                                <v-text-field v-model="login.password" label="password" type="password" hint="example of helper text only on focus"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="dialog2 = false, clearLogin()">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click="dialog2 = false, toLogin()">Login</v-btn>
                    </v-card-actions>
                    <v-layout row justify-center>
                    <span class="mb-3">or click <a @click.prevent="dialog2 = false, dialog3 = true" href="" style="text-decoration : none; color : teal">here</a> to register a new Account</span>
                    </v-layout>
                </v-card>
        </v-dialog>
        <v-dialog v-model="dialog3" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                    <span class="headline">User Profile</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                        <v-flex xs12 sm8 md6>
                            <v-text-field v-model="register.firstName" label="Legal first name*" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm8 md6>
                            <v-text-field
                            v-model="register.lastName"
                            label="Legal last name*"
                            required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field v-model="register.email" label="Email*" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field v-model="register.password" label="Password*" type="password" required></v-text-field>
                        </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="dialog3 = false, clearRegister()">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click="dialog3 = false, toRegister()" >Register</v-btn>
                    </v-card-actions>
                </v-card>
        </v-dialog>
    </nav>
</template>

<script>
import {mapState} from 'vuex'

export default {
    data(){
        return{
            drawer : false,
            dialog1 : false,
            dialog2 : false,
            dialog3 : false,
            links : [
                    {icon : 'dashboard', text: 'Home', route: '/'},
                    {icon : 'list', text: 'Products', route: '/productPage'},
                    {icon : 'people', text: 'user profile', route: `/userPage/${localStorage.userId}`},
                ],
            login : {
                email : '',
                password : '',
            },
            register : {
                firstName : '',
                lastName : '',
                email : '',
                password : ''
            },
            firstNameRegister : '',

        }
    },
    methods : {
        signOut(){
            console.log('masuk signout');
            this.drawer = false
            this.$swal(`goodbye ${localStorage.name}`,'','success')
            this.$store.dispatch('signout')
            localStorage.clear()
            this.$router.push('/')
            this.links = [
                {icon : 'dashboard', text: 'Home', route: '/'},
                {icon : 'list', text: 'Products', route: '/productPage'},
                {icon : 'people', text: 'user profile', route: `/userPage/${localStorage.userId}`},
            ]
        },
        toCartPage(){
            if(this.isLogin){
                this.$router.push('/cartPage')
                this.$store.dispatch('getCart')
            }else{
                this.dialog1 = true
            }
        },

        toLogin(){
            this.$store.dispatch('login',this.login)
            this.clearLogin()
        },
        toRegister(){
            this.$store.dispatch('register',this.register)
            this.$swal('successfully registerd your account','','success')
            this.clearRegister()
        },
        clearLogin(){
            this.login = {
                email : '',
                password : '',
            }
        },

        clearRegister(){
            this.register = {
                firstName : '',
                lastName : '',
                email : '',
                password : ''
            }
        }

    },
    mounted(){
       
    },
    watch : {
        isLogin(){
            if(this.isLogin){
                this.$swal('Login Success', '', 'success')
                // this.$router.push('/')
            }
        },
        access(){
            if(this.access === 'root'){
                this.links = [
                {icon : 'dashboard', text: 'Home', route: '/'},
                {icon : 'list', text: 'Products', route: '/productPage'},
                {icon : 'library_add', text: 'Add product', route: '/addProduct'},
                {icon : 'people', text: 'Admin Page', route: `/adminPage`}
                ]
            }
        }
    },
    created(){
        // this.isLogin = this.$store.state.isLogin
        // console.log('haleeeew',this.isLogin);
        if(localStorage.token){
            this.$store.dispatch('getCart')
            if(this.access === 'root' || localStorage.email === 'master@holygrail.com'){
                this.links = [
                {icon : 'dashboard', text: 'Home', route: '/'},
                {icon : 'list', text: 'Products', route: '/productPage'},
                {icon : 'library_add', text: 'Add product', route: '/addProduct'},
                {icon : 'people', text: 'Admin Page', route: `/adminPage`}
                ]
            }else{
                this.links = [
                    {icon : 'dashboard', text: 'Home', route: '/'},
                    {icon : 'list', text: 'Products', route: '/productPage'},
                    {icon : 'people', text: 'user profile', route: `/userPage/${localStorage.userId}`},
                ]
            }
            // this.$router.push('/productPage')
        }else{
            this.drawer = false
        }
    },
    computed : {
        ...mapState(['isLogin', 'totalItem','access'])
    }
}
</script>
