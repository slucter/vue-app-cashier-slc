<template>
    <div>
        <Navbar
        @ClickBurger="methodBurgerClick"
        @ClickCart="methodCartClick"/>
        <SidebarFood
        @addClick="clickAdd"
        @logOut="logOut"
        />
        <SidebarCart
        @showModalReceipt="showModalReceipt"
        />
        <ModalReceipt
        :invoice="invoice"
        :cart="cartMenu"
        @closeModalReceipt="closeModalReceipt"
        @printModalReceipt="printModalReceipt"
         />
        <ModalAdd />
        <router-view></router-view>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import swal from 'sweetalert2'
import Navbar from '../components/modules/NavBar.vue'
import SidebarFood from '../components/modules/SidebarFood.vue'
import SidebarCart from '../components/modules/SIdebarCart.vue'
import ModalReceipt from '../components/small/ModalReceipt.vue'
import ModalAdd from '../components/small/ModalAdd.vue'

export default {
  name: 'HomeDashboard',
  components: {
    Navbar,
    SidebarFood,
    SidebarCart,
    ModalReceipt,
    ModalAdd
  },
  data () {
    return {
      total: 0,
      invoice: ''
    }
  },
  computed: {
    ...mapState(['cartMenu'])
  },
  methods: {
    methodBurgerClick () {
      console.log('Burger Click Success')
      document.querySelector('.sidebar-food').classList.toggle('sidebar-food-toggle')
      document.querySelector('.burger-food').classList.toggle('burger-wd')
    },
    methodCartClick () {
      console.log('Cart Clicked')
      document.querySelector('.sidebar-cart').classList.toggle('sidebar-togle')
    },
    closeModalReceipt () {
      document.querySelector('.modal-receipt').classList.remove('modal-open')
    },
    showModalReceipt () {
      document.querySelector('.modal-receipt').classList.add('modal-open')
      let rand = ''
      const myChar = '1234567890'
      const myCharLength = myChar.length
      for (let i = 0; i < 4; i++) {
        rand += myChar.charAt(Math.floor(Math.random() * myCharLength))
      }
      this.invoice = `#SLC${rand}`
    },
    printModalReceipt () {
      swal.fire('Coming soon', 'Under Maintenance', 'warning')
    },
    clickAdd () {
      document.querySelector('.container-modal-add').classList.add('displayShow')
    },
    logOut () {
      swal.fire({
        title: 'Are you sure?',
        text: 'You will Logout',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Log-out',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.value) {
          localStorage.removeItem('isToken')
          this.$router.push('/auth')
        }
      })
    }
  },
  mounted () {
    if (!localStorage.isToken) {
      this.$router.push('/auth')
    }
  }
}
</script>

<style scoped>
/* NAVBAR */
/* SIDEBAR FOOD */
/* SIDEBAR CART */
/* MoDAL RECEIPT */
/* MODAL ADD */
</style>
