<template>
    <div>
        <div class="sidebar-cart">
            <div :class="cartMenu.length > 0 ? 'cartNotEmpty' : 'cart-empty'">
                <img src="../../assets/img/foodresto.png" alt="empty">
                <h3>Your cart is empty</h3>
                <p>Please add some items from the menu</p>
            </div>

            <div :class="cartMenu.length > 0 ? 'wrap-itemss' : 'wrapDisplayNone'">
                <div
                v-for="dta in cartMenu"
                :key="dta.data.id_menu"
                class="wrap-cart-items">
                    <img :src="baseUrl + '/img/' + dta.data.img_menu" alt="product1">
                    <div class="wrap-detail-cart">
                        <div class="title-items-cart">
                            <h3>{{dta.data.name_menu}}</h3>
                        </div>
                        <div class="option-cart">
                            <div class="option-count">
                                <button @click="decItemCart(dta)">-</button>
                                <input type="text" :value="dta.count">
                                <button @click="addItemCart(dta)">+</button>
                            </div>
                            <div class="pricing-items">
                                <h3>Rp. {{ dta.data.price_menu * dta.count }}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div :class="cartMenu.length > 0 ? 'wrap-cart-total' : 'wrapDisplayNone'">
                <div class="price-total-cart">
                    <h2>Total :</h2>
                    <h2>Rp. {{ total }}</h2>
                </div>
                <p>*Belum termasuk ppn</p>
            </div>
            <div :class="cartMenu.length > 0 ? 'wrap-cart-btn' : 'wrapDisplayNone'">
                <button @click="$emit('showModalReceipt')">Check Out</button>
                <button
                @click="clearCart"
                style="background-color: #F24F8A;">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SidebarCart',
  data () {
    return {
      total: 0,
      baseUrl: ''
    }
  },
  computed: {
    ...mapState(['cartMenu'])
  },
  methods: {
    addItemCart (data) {
      this.$store.commit('ADD_COUNT_CART', data)
    },
    decItemCart (data) {
      this.$store.commit('MIN_COUNT_CART', data)
    },
    clearCart () {
      this.$store.commit('CLEAR_CART')
    },
    totalPrice () {
      if (this.cartMenu.length !== 0) {
        const totalPrice = []
        for (let i = 0; i < this.cartMenu.length; i += 1) {
          totalPrice.push(this.cartMenu[i].data.price_menu * this.cartMenu[i].count)
        }
        this.total = totalPrice.reduce((a, b) => a + b)
      } else {
        this.total = 0
      }
    }
  },
  updated () {
    this.totalPrice()
  },
  mounted () {
    this.baseUrl = process.env.VUE_APP_BASE_URL
  }
}
</script>

<style scoped>
.sidebar-togle{
    right: 0!important;
    transition: .5s;
}
.sidebar-cart{
    width: 480px;
    height: 92vh;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 0;
    right: -500px;
    border-left: 2px solid #cacaca;
    transition: .5s;
    z-index: 4;
}

/* CART EMPTY */
.cartNotEmpty{
    display: none!important;
}
.cart-empty{
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    background-color: rgb(255, 255, 255);
    flex-direction: column;
    align-items: center;
}
.cart-empty img{
    width: 200px;
    height: 200px;
}
.cart-empty h3{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 30px;
    color: #000;
}
.cart-empty p{
    margin-top: 10px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    color: #cacaca;
}

/* CART ITEMS */

.wrap-itemss{
    width: 100%;
    height: 70%;
    /* background-color: #bebebe; */
    display: flex;
    overflow-x: hidden;
    flex-direction: column;
}
.wrap-cart-items{
    width: 100%;
    height: 110px;
    /* background-color: cadetblue; */
    display: flex;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
}
.wrap-cart-items img{
    width: 30%;
    height: 100%;
    border-radius: 20px;
    object-fit: cover;
}

.wrap-detail-cart{
    width: 68%;
    height: 85%;
    display: flex;
    /* background-color: chartreuse; */
    flex-direction: column;
}
.title-items-cart{
    width: 100;
    height: 40%;
    /* background-color: chocolate; */
    display: flex;
    align-items: center;
    overflow: hidden;
}
.title-items-cart h3{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
}

.option-cart{
    width: 100%;
    height: 60%;
    /* background-color: coral; */
    display: flex;
}
.option-count{
    width: 50%;
    height: 100%;
    display: flex;
    /* background-color: cornflowerblue; */
    align-items: center;
    /* justify-content: space-around; */
}
.option-count button{
    width: 30%;
    height: 70%;
    background-color: rgba(130, 222, 58, 0.2);
    border: 2px solid #82DE3A;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: bold;
    color: #82DE3A;
    cursor: pointer;
}
.option-count input{
    width: 30%;
    height: 70%;
    background-color: rgba(130, 222, 58, 0.2);
    border: 1px solid #82DE3A;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: bold;
    outline: none;
    text-align: center;
    color: #82DE3A;
}

.pricing-items{
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    /* background-color: cornsilk; */
}
.pricing-items h3{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 17px;
    font-weight: bold;
    margin-left: 10px;
}

.wrap-cart-total{
    width: 100%;
    height: 12%;
    /* background-color: rgb(78, 66, 66); */
    display: flex;
    flex-direction: column;
}
.wrap-cart-total p{
    font-size: 18px;
    font-family: Arial, Helvetica, sans-serif;
    color: #333;
    margin: 5px;
}
.price-total-cart{
    width: 100%;
    height: 50%;
    /* background-color: antiquewhite; */
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.price-total-cart h2{
    margin: 5px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 25px;
}
.wrapDisplayNone{
    display: none;
}
.wrap-cart-btn{
    width: 100%;
    height: 17%;
    /* background-color: bisque; */
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.wrap-cart-btn button{
    width: 95%;
    height: 40%;
    background-color: #57CAD5;
    font-family: Arial, Helvetica, sans-serif;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    border: none;
    outline: none;
    border-radius: 10px;
    cursor: pointer;
}
@media (min-width: 1045px){
    .sidebar-cart{
        height: 93vh;
    }
    .cart-empty{
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    background-color: rgb(255, 255, 255);
    flex-direction: column;
    align-items: center;
}
.cart-empty img{
    width: 200px;
    height: 200px;
}
.cart-empty h3{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 30px;
    color: #000;
}
.cart-empty p{
    margin-top: 10px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    color: #cacaca;
}

/* CART ITEMS */

.wrap-itemss{
    width: 100%;
    height: 70%;
    /* background-color: #bebebe; */
    display: flex;
    overflow-x: hidden;
    flex-direction: column;
}
.wrap-cart-items{
    width: 100%;
    height: 110px;
    /* background-color: cadetblue; */
    display: flex;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
}
.wrap-cart-items img{
    width: 26%;
    height: 100%;
    border-radius: 20px;
    object-fit: cover;
}

.wrap-detail-cart{
    width: 68%;
    height: 85%;
    display: flex;
    /* background-color: chartreuse; */
    flex-direction: column;
}
.title-items-cart{
    width: 100;
    height: 40%;
    /* background-color: chocolate; */
    display: flex;
    align-items: center;
    overflow: hidden;
}
.title-items-cart h3{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
}

.option-cart{
    width: 100%;
    height: 60%;
    /* background-color: coral; */
    display: flex;
}
.option-count{
    width: 50%;
    height: 100%;
    display: flex;
    /* background-color: cornflowerblue; */
    align-items: center;
    /* justify-content: space-around; */
}
.option-count button{
    width: 27%;
    height: 67%;
    background-color: rgba(130, 222, 58, 0.2);
    border: 2px solid #82DE3A;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: bold;
    color: #82DE3A;
    cursor: pointer;
}
.option-count input{
    width: 27%;
    height: 67%;
    background-color: rgba(130, 222, 58, 0.2);
    border: 1px solid #82DE3A;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: bold;
    outline: none;
    text-align: center;
    color: #82DE3A;
}

.pricing-items{
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    /* background-color: cornsilk; */
}
.pricing-items h3{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 17px;
    font-weight: bold;
    margin-left: 10px;
}

.wrap-cart-total{
    width: 100%;
    height: 12%;
    /* background-color: rgb(78, 66, 66); */
    display: flex;
    flex-direction: column;
}
.wrap-cart-total p{
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
    color: #333;
    margin: 5px;
}
.price-total-cart{
    width: 100%;
    height: 50%;
    /* background-color: antiquewhite; */
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.price-total-cart h2{
    margin: 5px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 22px;
}
.wrapDisplayNone{
    display: none;
}
.wrap-cart-btn{
    width: 100%;
    height: 17%;
    /* background-color: bisque; */
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.wrap-cart-btn button{
    width: 95%;
    height: 40%;
    background-color: #57CAD5;
    font-family: Arial, Helvetica, sans-serif;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    border: none;
    outline: none;
    border-radius: 10px;
    cursor: pointer;
}
}
</style>
