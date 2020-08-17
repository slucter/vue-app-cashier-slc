<template>
    <div>
        <div class="navbar-food">
            <div class="burger-food">
                <span @click="$emit('ClickBurger')"></span>
            </div>
            <div class="title-nav">
                <h2>Food Menu</h2>
            </div>
            <div class="cart-food">
                <div @click="$emit('ClickCart')" class="wrap-cart-icon">
                    <div class="fill-icon-left">
                        <i class="fas fa-cart-plus"></i>
                    </div>
                    <div class="fill-icon-right">
                        <h3>{{ cartMenu.length }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NavbarFood',
  computed: {
    ...mapState(['cartMenu'])
  }
}
</script>

<style scoped>
.navbar-food{
    width: 100vw;
    height: 8vh;
    position: fixed;
    top:0;
    right: 0;
    display: flex;
    background-color: rgb(255, 255, 255);
    box-shadow: 1px 0px 30px 20px rgba(0,0,0,.15);
    /* z-index: 1; */
}

.burger-food{
    width: 100px;
    height: 100%;
    /* background-color: bisque; */
    display: flex;
    justify-content: center;
    align-items: center;
}
.burger-food span{
    position: relative;
    width: 50px;
    height: 5px;
    background-color: black;
    cursor: pointer;
}
.burger-food span::before{
    content: '';
    width: 100%;
    height: 100%;
    background-color: black;
    position: absolute;
    top: -10px;
    transition: .5s;
}
.burger-food span::after{
    content: '';
    width: 100%;
    height: 100%;
    background-color: black;
    position: absolute;
    top: 10px;
    transition: .5s;
}
.burger-wd span::after{
    content: '';
    width: 40%!important;
    transition: .5s;
}
.burger-wd span::before{
    content: '';
    width: 40%!important;
    transition: .5s;
}
.title-nav{
    flex: 3;
    height: 100%;
    /* background-color: rgb(128, 92, 52); */
    display: flex;
    justify-content: center;
    align-items: center;
}
.title-nav h2{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 30px;
    font-weight: bold;
}
.cart-food{
    flex: 1;
    height: 100%;
    /* background-color: rgb(161, 139, 112); */
    display: flex;
    justify-content: center;
    align-items: center;
}
.wrap-cart-icon{
    width: 25%;
    height: 60%;
    border: 2px solid #57CAD5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}

.fill-icon-left{
    width: 50%;
    height: 100%;
    background-color: #57CAD5;
    display: flex;
    justify-content: center;
    align-items: center;
}
.fill-icon-left i{
    font-size: 25px;
    color: #000;;
}
.fill-icon-right{
    width: 50%;
    height: 100%;
    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    align-items: center;
}
.fill-icon-right h3{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 25px;
    font-weight: bold;
    color: #57CAD5;
}
</style>
