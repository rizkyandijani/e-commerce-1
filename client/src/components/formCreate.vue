<template>
  <v-form v-if="check">
    <v-text-field
      v-model="name"
      :counter="30"
      :rules="[v => !!v || 'name is required']"
      label="Name"
      solo
      required
    ></v-text-field>

    <v-text-field
      v-model="description"
      :counter="300"
      :rules="[v => !!v || 'description is required']"
      label="Decription"
      solo
      required
    ></v-text-field>

    <v-text-field
      v-model="price"
      label="Price"
      type = "number"
      :rules="[v => !!v || 'price is required']"
      solo
      required
    ></v-text-field>

    <v-text-field
      v-model="stock"
      label="Stock"
      type = "number"
      :rules="[v => !!v || 'stock is required']"
      min = '1'
      solo
      required
    ></v-text-field>

    <v-select
      v-model="category"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Category"
      required
    ></v-select>

    <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file' @click:clear='cleargambar' clearable></v-text-field>
    <input
        type="file"
        style="display: none"
        ref="image"
        accept="image/*"
        @change="onFilePicked"
    >
    <v-layout row justify-center>
            <img :src="imageUrl" alt="" srcset="" width="300px;"><br>
    </v-layout>
    <v-btn
    v-if="!onEdit"
    color = 'success'
    @click="submit"
    >
    Submit
    </v-btn>
    <v-btn
    v-if="onEdit"
    color = 'success'
    @click="edit"
    >
    Edit
    </v-btn>
    <v-btn
      color="error"
      @click="clear"
    >
      Reset Form
    </v-btn>
  </v-form>
</template>

<style>

#my-strictly-unique-vue-upload-multiple-image {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

</style>


<script>
import mapState from 'vuex'

  export default {
    props : ['product'],
    components : {

    },
    data: () => ({
        name: '',
        description : "",
        price : 0,
        stock : 0,
        category : '',
        items : ['Top', 'Bottom'],
        imageName: '',
        imageUrl: '',
        imageFile: '',
        onEdit : false
        }),
    methods: {
        submit () {
          if(this.name && this.description && this.stock && this.price && this.category && this.imageFile ){
            console.log(this.name, this.description, this.stock, this.price, this.imageFile);
            let createData = {
              name : this.name,
              description : this.description,
              price : this.price,
              stock : this.stock,
              category : this.category,
              file : this.imageFile
            }
            this.$store.dispatch('create',createData)
            this.$swal('successfully added product', '' , 'success')
            this.clear()
            this.$router.push('/productPage')
          }else{
            this.$swal(`form can't be empty`, '', 'error')
          }
        },
        edit(){
          console.log('masuk edit di form create');
          
          if(this.name && this.description && this.stock && this.price && this.category ){
            if(this.imageFile){
              let editData = {
                id : this.product._id,
                name : this.name,
                description : this.description,
                price : this.price,
                stock : this.stock,
                category : this.category,
                file : this.imageFile
              }
              this.$store.dispatch('editProduct', editData)
              this.$swal('successfully added product', '' , 'success')
              this.clear()
            }else{
              let editData = {
                id : this.product._id,
                name : this.name,
                description : this.description,
                price : this.price,
                stock : this.stock,
                category : this.category,
                file : ''
              }
              this.$store.dispatch('editProduct', editData)
              this.$swal('successfully added product', '' , 'success')
              this.clear()
              this.$router.push('/productPage')
            }
          }else{
            this.$swal(`form can't be empty`, '', 'error')
          }
        },
        clear () {
            this.name = ''
            this.description = ''
            this.price = 0
            this.stock = 0
            this.category = null
            this.imageName= '',
            this.imageUrl='',
            this.imageFile = ''
        },
        cleargambar(){
            this.imageName= '',
            this.imageUrl='',
            this.imageFile = ''
        },
        onFileChange(e){
            console.log('masuk onchange');
            
            const file = e.target.files[0]
            console.log(file);
        },
        pickFile () {
            this.$refs.image.click ()
            },
        onFilePicked (e) {
            const files = e.target.files
            // console.log('masuk file handler',files);
            
            if(files[0] !== undefined) {
                this.imageName = files[0].name
                if(this.imageName.lastIndexOf('.') <= 0) {
                    return
                }
                const fr = new FileReader ()
                fr.readAsDataURL(files[0])
                fr.addEventListener('load', () => {
                    this.imageUrl = fr.result
                    this.imageFile = files[0] // this is an image file that can be sent to server...
                    // console.log('checkkk',this.imageUrl);
                    
                })
            } else {
                this.imageName = ''
                this.imageFile = ''
                this.imageUrl = ''
            }
        }
    },
    created(){
      console.log('created',this.product);
      this.check
    },
    mounted(){
      console.log('mounted',this.product);
    },
    computed: {
      check(){
        if (this.product !== undefined){
          console.log('computed product ada isi');
            this.onEdit = true
            this.name = this.product.name
            this.description = this.product.description
            this.price = this.product.price
            this.stock = this.product.stock
            this.category = this.product.category
            this.imageUrl = this.product.image

            return true
        }else{
          return true
        }
      }
    }
  }
</script>
