<template>
    <div class="card-food">
        <a>
            <img
            @click="$emit('clickCard')"
            :src="image" alt="image">
        </a>
        <div class="details-card">
            <i class="fab fa-elementor"> <a href="#"><b>{{ title }}</b></a></i>
            <i class="fas fa-dollar-sign"> <a href="#" style="font-size: 15px; font-weight: 400;">Rp. {{ harga }}</a></i>
         </div>
    </div>
</template>

<script>
export default {
  props: ['image', 'title', 'harga'],
  name: 'CardFood'
}
</script>

<style scoped>
.card-food{
    width: 250px;
    height: 270px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 20px 2px rgba(0,0,0,.2);
    margin: 10px;
  }
  .card-food a img{
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  .details-card{
    width: 100%;
    height: 70px;
    /* background-color: red; */
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .details-card i{
    color: #cacaca;
    margin-left: 5px;
    font-size: 15px;
  }
  .details-card i a{
    color: #333;
    text-decoration: none;
    font-family: Arial, Helvetica, sans-serif;
    margin-left: 10px;
  }
</style>
