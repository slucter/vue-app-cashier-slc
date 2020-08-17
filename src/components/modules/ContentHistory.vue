<template>
     <div class="history-container">
        <div class="recent-income">
            <div class="box-income">
                <h4>Today Income</h4>
                <h2>Rp. 20.0000</h2>
                <h4>+20% Yesterday</h4>
            </div>
            <div class="box-income box-blue">
                <h4>Orders</h4>
                <h2>200</h2>
                <h4>+10% Yesterday</h4>
            </div>
            <div class="box-income box-purple">
                <h4>This year Income</h4>
                <h2>Rp. 200.0000</h2>
                <h4>+20% Yesterday</h4>
            </div>
        </div>

        <div class="recent-orders">
            <div class="title-orbox">
                <h3>Recent Order</h3>
                <select name="orders" id="1">
                    <option value="1">Januari</option>
                </select>
            </div>

            <div class="thead">
                <div class="tborder">
                    <h3>INVOICE</h3>
                </div>
                <div class="tborder">
                    <h3>CASHIER</h3>
                </div>
                <div class="tborder">
                    <h3>DATE</h3>
                </div>
                <div class="tborder">
                    <h3>ORDERS</h3>
                </div>
                <div class="tborder">
                    <h3>AMOUNT</h3>
                </div>
            </div>

            <div
            v-for="dt in data"
            :key="dt.id_orders"
            class="thead theadhover">
                <div class="tborder tbl">
                    <h3>{{ dt.invoice_code }}</h3>
                </div>
                <div class="tborder tbl">
                    <h3>{{ dt.name_user }}</h3>
                </div>
                <div class="tborder tbl">
                    <h3>{{ dt.date_order }}</h3>
                </div>
                <div class="tborder tbl">
                    <h3>{{ dt.order_menu }}</h3>
                </div>
                <div class="tborder tbl">
                    <h3>Rp. {{ dt.amount }}</h3>
                </div>
            </div>

            <!-- <div class="foot-tbl">
                <div class="pg-tbl">
                    <h3>Prev</h3>
                    <h3>1</h3>
                    <h3>2</h3>
                    <h3>3</h3>
                    <h3>4</h3>
                    <h3>5</h3>
                    <h3>6</h3>
                    <h3>Next</h3>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
  name: 'ContentHIstory',
  data () {
    return {
      data: null
    }
  },
  mounted () {
    this.$store.dispatch('getAllOrder').then((result) => {
      this.data = result.data.order
    })
  }
}
</script>

<style scoped>
.history-container{
      width: 88vw;
      margin: 100px auto;
      display: flex;
      flex-direction: column;
      /* background-color: aqua; */
  }
  .recent-income{
      width: 100%;
      height: 230px;
      display: flex;
      /* background-color: bisque; */
      align-items: center;
      justify-content: space-between;
  }
  .box-income{
      width: 24%;
      height: 95%;
      display: flex;
      flex-direction: column;
      border-radius: 20px;
      align-items: flex-start;
      justify-content: center;
      padding-left: 40px;
      background: linear-gradient(278.29deg, #FBB2B4 30.05%, rgba(255, 143, 178, 0) 133.19%);
      box-shadow: 0 0 40px 0px rgba(238, 149, 149, 0.5);
  }
  .box-income h4{
      font-family: Arial, Helvetica, sans-serif;
      font-size: 18px;
      font-weight: 400;
      color: rgb(47, 47, 47);
  }
  .box-income h2{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 30px;
    margin: 8px 0 8px 0;
    color: rgb(47, 47, 47);
  }
  .box-blue{
    background: linear-gradient(278.29deg, #29DFFF 30.05%, rgba(41, 223, 255, 0) 133.19%)!important;
    box-shadow: 0 0 40px 0px rgba(59, 183, 255, 0.5)!important;
  }
  .box-purple{
    background: linear-gradient(278.29deg, #AB84C8 30.05%, rgba(241, 201, 236, 0) 133.19%)!important;
    box-shadow: 0 0 40px 0px rgba(148, 95, 153, 0.5)!important;
  }
  /* RECENT ORDERS */

  .recent-orders{
      width: 100%;
      /* height: 300px; */
      background-color: rgb(255, 255, 255);
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      margin-top: 20px;
  }
  .title-orbox{
      width: 100%;
      height: 60px;
      /* background-color: rgb(255, 255, 255); */
      display: flex;
      justify-content: space-between;
      /* padding: 10px; */
      align-items: flex-end;
  }
  .title-orbox h3{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: bold;
    color: rgb(37, 37, 37);
    margin: 10px;
  }
  .title-orbox select{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;
    font-weight: bold;
    color: #fff;
    width: 90px;
    height: 40px;
    border-radius: 10px;
    background-color: rgb(187, 187, 187);
    padding: 5px;
    border: none;
    outline: none;
    margin: 10px;
  }
  .title-orbox select option{
      width: 200px;
      padding: 10px;
      border: none!important;
      outline: none;
  }

  .thead{
      width: 100%;
      /* background-color: rgba(255, 255, 255,1); */
      display: flex;
  }
  .tborder{
      flex: 1;
      height: 50px;
      border-bottom: 2px solid rgb(223, 223, 223);
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .theadhover:hover{
    background-color: rgb(211, 211, 211)!important;
  }
  .tborder h3{
      font-family: Arial, Helvetica, sans-serif;
      font-size: 17px;
      color: rgb(44, 44, 44);
  }

  .tbl{
      border: none!important;
      height: unset!important;
      padding: 20px;
  }
  .tbl h3{
      font-size: 14px;
      color: rgb(59, 59, 59);
  }

  .foot-tbl{
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
  }
  .pg-tbl{
      height: 80%;
      display: flex;
      margin-left: 10px;
      box-shadow: 0 0 30px 5px rgba(0,0,0,.1);
      border-radius: 10px;
      align-items: center;
      /* padding: 20px; */
  }
  .pg-tbl h3{
      font-family: Arial, Helvetica, sans-serif;
      font-size: 15px;
      color: rgb(34, 34, 34);
      padding: 5px;
      cursor: pointer;
}
</style>
