<template>
    <div class="menu-container">
        <form action="" class="form-search-food">
            <input type="text" placeholder="Search Menu" v-model="search" @input="searchMenu(search)">
        </form>
        <div class="heading-menu">
            <h3>Showing All Menus</h3>
            <div @click="clickOption" class="option-sort">
                <h3>Sort by</h3>
                <i class="fas fa-plus"></i>
                <div class="select-wrap">
                    <h3>Food</h3>
                    <h3>Drink</h3>
                </div>
            </div>
        </div>
        <div class="menus">
            <CardFood
            v-for="data in allMenus.result"
            :key="data.id_menu"
            :image="data.img_menu"
            :title="data.name_menu"
            :harga="data.price_menu"
            @clickCard="addToCart(data)"
            />
        </div>
        <div :class="allMenus.result.length > 1 ? 'pg-wrap' : 'displayNone'">
            <h3 @click="clickPrev">Prev</h3>
            <p @click="clickPage(datas)"
            v-for="datas in allMenus.page.totalPage" :key="datas">{{ datas }}</p>
            <h3 @click="clickNext">Next</h3>
        </div>
    </div>
</template>

<script>
import CardFood from '../../components/small/CardFood.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ContentDashboard',
  components: {
    CardFood
  },
  data () {
    return {
      page: 1,
      search: ''
    }
  },
  computed: {
    ...mapState(['allMenus']),
    ...mapActions(['getAllMenus'])
  },
  methods: {
    clickOption () {
      document.querySelector('.select-wrap').classList.toggle('clickSelect')
    },
    clickNext () {
      this.page += 1
      this.getAllMenus({ page: this, search: this.search })
    },
    clickPrev () {
      this.page -= 1
      this.getAllMenus({ page: this, search: this.search })
    },
    clickPage (data) {
      this.page = data
      this.getAllMenus({ page: this, search: this.search })
    },
    searchMenu (data) {
      this.getAllMenus({ page: this, search: this.search })
    },
    addToCart (data) {
      this.$store.commit('ADD_TO_CART', { data, count: 1 })
    }

  },
  mounted () {
    this.$store.dispatch('getAllMenus', { page: this.page, search: this.search })
    this.getAllMenus({ page: this, search: this.search })
  }

}
</script>

<style scoped>
.displayNone{
  display: none!important;
}
.menu-container{
    width: 88vw;
    display: flex;
    margin: 100px auto;
    flex-direction: column;
}
.form-search-food{
    width: 100%;
    height: 70px;
    /* background-color: #cacaca; */
    display: flex;
}
.form-search-food input{
    width: 60%;
    height: 80%;
    border: 1px solid #3333;
    color: #333;
    background: #fff;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    padding-left: 20px;
    outline: none;
    margin-left: 10px;
}

.menus{
    width: 100%;
    /* background-color: rgb(165, 138, 103); */
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}

/*  CARD FOOD */

/* HEADING MENUS*/

.heading-menu{
    width: 95%;
    height: 60px;
    background-color: rgb(255, 255, 255);
    display: flex;
    margin-left: 10px;
    align-items: center;
    justify-content: space-between;
}
.heading-menu h3{
    font-family: 'Arial', Courier, monospace;
    font-size: 27px;
    font-weight: bold;
    margin-left: 5px;
    color: rgba(31, 31, 31, 1);
}

/* SORt */

.option-sort{
    width: 10%;
    height: 80%;
    background-color: rgb(211, 211, 211);
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-right: 5px;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
}
.option-sort h3{
    font-family: 'Arial', Courier, monospace;
    font-size: 18px;
    font-weight: bold;
    color: rgba(31, 31, 31, 1);
}
.option-sort i{
    font-size: 18px;
    color: rgba(31, 31, 31, 1);
}

.select-wrap{
    width: 300px;
    /* background-color: rgb(228, 228, 228); */
    display: flex;
    flex-direction: column;
    position: absolute;
    top:60px;
    right: 0;
    padding: 2px;
    overflow: hidden;
}
.select-wrap h3{
    font-family: 'Arial', Courier, monospace;
    font-size: 20px;
    font-weight: bold;
    color: rgba(31, 31, 31, 1);
    background-color: #F24F8A;
    padding: 10px;
    margin: 5px;
    border-radius: 10px;
    color: #fff;
    margin-top: -100px;
    cursor: pointer;
    transition: .5s;
}
.clickSelect h3{
    margin-top: 0!important;
    transition: .5s;
}
/* Pagination */

.pg-wrap{
    width: 50%;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
}
.pg-wrap h3{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    font-weight: bold;
    margin: 5px;
    cursor:pointer;
}
.pg-wrap p{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    font-weight: normal;
    margin: 5px;
    cursor:pointer;
}
</style>
