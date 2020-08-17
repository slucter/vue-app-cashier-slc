<template>
        <div @click="$emit('closeModalReceipt')" class="modal-receipt">
          <div class="wrap-modal">
            <div class="co-title">
              <h1>Checkout</h1>
              <h5>Receipt no: {{ invoice }}</h5>
            </div>
            <h3>Cashier : {{ userData.result[0].name_user }}</h3>
            <div class="wrap-detail-payout">

              <div
              v-for="items in cart"
              :key="items.data.id_menu"
              class="food-co-items">
                <h3>{{ items.data.name_menu }} {{ items.count }}x</h3>
                <h3>Rp. {{ items.data.price_menu * items.count }}</h3>
              </div>

            </div>
            <div class="total-pay">
              <h2>Total : Rp. {{ price }}</h2>
            </div>
            <div class="btn-payout">
              <button @click="coModalReceipt">Check Out</button>
              <p>OR</p>
              <button
              @click="$emit('printModalReceipt')"
              style="background-color: #57CAD5;">Print</button>
            </div>
          </div>
        </div>
</template>

<script>
import { mapState } from 'vuex'
import jwt from 'jsonwebtoken'
import swal from 'sweetalert2'

export default {
  name: 'ModalReceipt',
  props: ['invoice', 'cart'],
  data () {
    return {
      price: 0,
      idUser: null,
      name_user: null
    }
  },
  computed: {
    ...mapState(['cartMenu', 'userData'])
  },
  methods: {
    totalPrice () {
      if (this.cartMenu.length !== 0) {
        const total = []
        for (let i = 0; i < this.cartMenu.length; i += 1) {
          total.push(this.cartMenu[i].data.price_menu * this.cartMenu[i].count)
        }
        this.price = total.reduce((a, b) => a + b)
      } else {
        this.price = 1337
      }
    },
    coModalReceipt () {
      let menuName = ''
      for (let o = 0; o < this.cartMenu.length; o++) {
        menuName += this.cartMenu[o].data.name_menu + ', '
      }
      var today = new Date()
      var dd = String(today.getDate()).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0')
      var yyyy = today.getFullYear()
      var day = parseInt(dd) + 7
      today = dd + '/' + mm + '/' + yyyy
      var end = day + '/' + mm + '/' + yyyy

      const data = {
        order_menu: menuName,
        amount: this.price,
        invoice_code: this.invoice,
        id_user: this.idUser,
        date_order: end
      }
      this.$store.dispatch('checkOutOrder', data).then((result) => {
        if (result.data.status !== 200) {
          swal.fire('Ops!', 'Something Error', 'error')
        } else {
          swal.fire('Success Order!', 'Order stored on recent history', 'success').then((result) => {
            if (result.value) {
              this.$store.commit('CLEAR_CART')
              this.$router.go('/dashboard')
            }
          })
        }
      })
    }
  },
  updated () {
    this.totalPrice()
  },
  async mounted () {
    const token = await jwt.verify(localStorage.isToken, 'irhashGans')
    this.idUser = token.id_user
    this.$store.dispatch('getUserById', this.idUser)
  }
}
</script>

<style scoped>
.modal-close{
    display: none!important;
    transition: 1s;
    background-color: rgba(110, 84, 84, 0.0)!important;
}
.modal-open{
    display: flex!important;
}
.modal-receipt{
  width: 100vw;
  height: 100vh;
  display: none;
  position: fixed;
  background-color: rgba(0,0,0,.3);
  top: 0;
  right: 0;
  z-index: 100;
  align-items: center;
  justify-content: center;
}
.wrap-modal{
  width: 35%;
  height: 70%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 30px;
}
.co-title{
  width: 100%;
  height: 3%;
  /* background-color: aquamarine; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.co-title h1{
  font-family: Arial, Helvetica, sans-serif;
  font-size: 25px;
  font-weight: bold;
}
.co-title h5{
  font-family: Arial, Helvetica, sans-serif;
  font-size: 19px;
  font-weight: bold;
}
.wrap-modal h3{
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
}

.wrap-detail-payout{
  width: 100%;
  height: 50%;
  /* background-color: aquamarine; */
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  margin-top: 35px;
}
.food-co-items{
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  /* background-color: rosybrown; */
  align-items: center;
}
.food-co-items h3{
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  font-weight: bold;
}
.total-pay{
  width: 100%;
  height: 5%;
  /* background-color: bisque; */
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.total-pay h2{
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  font-weight: bold;
}
.btn-payout{
  width: 100%;
  height: 30%;
  /* background-color: blueviolet; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
}
.btn-payout button{
  width: 95%;
  height: 35%;
  background-color: #F24F8A;
  color: #fff;
  border: none;
  outline: none;
  border-radius: 10px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}
.btn-payout p{
  font-family: Arial, Helvetica, sans-serif;
  font-size: 17px;
  font-weight: bold;
  margin: 10px;
}
</style>
