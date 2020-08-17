<template>
    <div>
        <div class="sidebar-food">
            <div class="fork-btn">
                <router-link to="/dashboard">
                <img src="../../assets/img/fork.png" alt="Fork">
                </router-link>
            </div>
            <div class="history-btn">
                <router-link to="/history">
                <img src="../../assets/img/clipboard.png" alt="history">
                </router-link>
            </div>
            <div class="add-btn">
                <img @click="$emit('addClick')" src="../../assets/img/addCross.png" alt="ad">
            </div>
            <div @click="$emit('logOut')" class="logout-btn">
                <i class="fas fa-sign-out-alt"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SidebarFood'
}
</script>

<style scoped>
.sidebar-food-toggle{
    left: -100px!important;
    transition: .5s;
}
.sidebar-food{
    width: 100px;
    height: 92vh;
    position: fixed;
    display: flex;
    flex-direction: column;
    background-color: rgb(255, 255, 255);
    box-shadow: 5px 22px 36px -7px rgba(0,0,0,.2);
    bottom: 0;
    left: 0px;
    transition: .5s;
}

.fork-btn{
    width: 100%;
    height: 120px;
    display: flex;
    background-color: rgb(255, 255, 255);
    justify-content: center;
    align-items: center;
}
.fork-btn img{
    width: 44px;
    height: 40px;
}
.history-btn{
    width: 100%;
    height: 120px;
    display: flex;
    background-color: rgb(255, 255, 255);
    justify-content: center;
    align-items: center;
}
.history-btn a img{
    width: 44px;
    height: 40px;
}
.add-btn{
    width: 100%;
    height: 120px;
    display: flex;
    background-color: rgb(255, 255, 255);
    justify-content: center;
    align-items: center;
}
.add-btn img{
    width: 44px;
    height: 40px;
    cursor: pointer;
}

.logout-btn{
    width: 100%;
    height: 120px;
    display: flex;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 20px;
}
.logout-btn i{
    font-size: 35px;
    color: brown;
    cursor: pointer;
}
</style>
