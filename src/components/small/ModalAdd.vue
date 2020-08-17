<template>
        <div class="container-modal-add">
          <form class="box-modal-add">
              <div class="head-modal">
                    <h2>Add Item</h2>
                    <i @click="noneModal" class="far fa-times-circle"></i>
              </div>
            <div class="input-modal-add">
              <h3>Name</h3>
              <input type="text" placeholder="input a name" v-model="name">
            </div>
            <div class="input-modal-add">
              <h3>Image</h3>
              <input type="file" ref="gambar" @change="onFileSelect"
              style="display: none" placeholder="input a image">
              <div class="wrap-btn-img">
                <button @click="$refs.gambar.click()">select images</button>
              </div>
            </div>
            <div class="input-modal-add">
              <h3>Price</h3>
              <input type="text" placeholder="input a price" v-model="price">
            </div>
            <div class="input-modal-add">
              <h3>Stock</h3>
              <input type="text" placeholder="input a stock" v-model="stock">
            </div>
            <div class="input-modal-add">
              <h3>Category</h3>
              <select placeholder="Select" v-model="category">
                <option value="1">Food</option>
                <option value="2">Drink</option>
              </select>
            </div>
            <div class="btn-wrap-modal">
              <button type="reset" style="background-color: #F24F8A;">Cancel</button>
              <button @click="addMenu">Add</button>
            </div>
          </form>
        </div>
</template>

<script>
import swal from 'sweetalert2'

export default {
  name: 'ModalAdd',
  data () {
    return {
      image: '',
      name: '',
      price: '',
      category: '',
      stock: ''
    }
  },
  methods: {
    onFileSelect (event) {
      this.image = event.target.files[0]
    },
    addMenu () {
      console.log(this.image)
      const fd = new FormData()
      fd.append('name_menu', this.name)
      fd.append('img_menu', this.image)
      fd.append('price_menu', this.price)
      fd.append('category_menu', this.category)
      fd.append('stock_menu', this.stock)
      this.$store.dispatch('addMenu', fd)
        .then((result) => {
          if (result.data.status === 200) {
            swal.fire('Done!', 'Success add menu!', 'success').then((r) => {
              if (r.value) {
                document.querySelector('.container-modal-add').classList.add('displayShow')
                this.$router.go('/dashboard')
              }
            })
          } else {
            swal.fire('Error!', 'There a something error', 'error')
          }
        })
    },
    noneModal () {
      document.querySelector('.container-modal-add').classList.remove('displayShow')
    }
  }
}
</script>

<style scoped>
.displayShow{
    display: flex!important;
}
.container-modal-add{
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .3);
  display: none;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10;
  top:0;
}
.box-modal-add{
  width: 35%;
  height: 60%;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  position: relative;
  z-index: 100;
}
.head-modal{
    width: 100%;
    margin-bottom: 50px;
    display: flex;
    justify-content: space-between;
}
.head-modal h2{
  font-family: Arial, Helvetica, sans-serif;
  font-size: 27px;
  font-weight: bold;
}
.head-modal i{
  font-size: 25px;
  cursor: pointer;
}
.input-modal-add{
  width: 95%;
  height: 11%;
  /* border: 2px solid #3e3e3e; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.input-modal-add h3{
   font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: bold;
}
.input-modal-add input{
  width: 80%;
  height: 80%;
  border: none;
  box-shadow: 0px 0px 20px 1px rgba(0, 0, 0,0.2);
  outline: none;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 17px;
  padding: 10px;
  border-radius: 10px;
}
.input-modal-add select{
  width: 80%;
  height: 80%;
  border: none;
  box-shadow: 0px 0px 20px 1px rgba(0, 0, 0,0.2);
  outline: none;
  font-family: Arial, Helvetica, sans-serif;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 17px;
  border-radius: 10px;
  background-color: #fff;
}
.wrap-btn-img{
  width: 80%;
  height: 80%;
  border: none;
  box-shadow: 0px 0px 20px 1px rgba(0, 0, 0,0.2);
  outline: none;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 17px;
  padding: 5px;
  border-radius: 10px;
  display: flex;
  align-items: center;
}
.wrap-btn-img button{
  width: 40%;
  height: 95%;
  border: 2px solid #929292;
  outline: none;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 17px;
  border-radius: 10px;
  color: #3e3e3e;
  cursor: pointer;
}
.btn-wrap-modal{
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  /* background-color: rgba(0, 0, 0, .3); */
}
.btn-wrap-modal button{
  width: 25%;
  height: 50%;
  background-color: #57CAD5;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 17px;
  font-weight: bold;
  border-radius: 13px;
  border: none;
  outline: none;
  margin: 10px;
  color: #fff;
  cursor: pointer;
}
</style>
