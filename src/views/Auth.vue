<template>
    <div class="container-login">
        <div class="wrap-box">
            <form class="box-input">
                <h1>LOGIN</h1>
                <div class="login-input">
                    <i class="fas fa-user"></i>
                    <input type="text" placeholder="username" v-model="username">
                </div>
                <div class="login-input" style="margin-top: 25px;">
                    <i class="fas fa-lock"></i>
                    <input type="password" placeholder="password" v-model="pwd_user">
                </div>
                <div class="login-input" style="margin-top: 25px;">
                    <input type="submit" value="LOGIN"
                    @click.prevent="submitLogin"
                    style="width: 95%; height: 100%; background: #fff; cursor: pointer;">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import swal from 'sweetalert2'

export default {
  name: 'LoginAuth',
  data () {
    return {
      username: '',
      pwd_user: ''
    }
  },
  methods: {
    submitLogin () {
      const data = {
        username: this.username,
        pwd_user: this.pwd_user
      }
      this.$store.dispatch('loginAction', data).then((result) => {
        if (result.data.status !== 200) {
          swal.fire('Login Error', 'Make sure your login not wrog!', 'error')
        } else {
          swal.fire({
            title: 'Success Login!',
            text: 'You will redirect to dashboard',
            icon: 'success',
            showCancelButton: false,
            showConfirmButton: false
          })
          localStorage.isToken = result.data.datas.token
          setTimeout(() => {
            this.$router.push('/dashboard')
          }, 2000)
        }
      })
    }
  },
  mounted () {
    document.querySelector('.box-input').classList.add('box-ease')
    if (localStorage.isToken) {
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>

.container-login{
    width: 100vw;
    height: 100vh;
    background-color: #57CAD5;
    display: flex;
    flex-direction: column;
}
.wrap-box{
    width: 100%;
    height: 40%;
    background-color: #F24F8A;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: flex-end;
    align-items: center;
}
.wrap-box:after{
    content: '';
    width: 100%;
    height: 30%;
    background: linear-gradient(to top, rgba(0, 0, 0,.3), #F24F8A);
    position: absolute;
    bottom: 0;
}
.box-ease{
    top: 150px!important;
    transition: 1s!important;
}
.box-input{
    width: 20%;
    height: 120%;
    background-color: rgba(63, 63, 63,1);
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 5;
    top: -650px;
    border-radius: 10px;
    align-items: center;
    /* justify-content: center; */
    padding: 20px;
    overflow: hidden;
    transition: 1s!important;
}
.box-input::after{
    content: '';
    width: 120%;
    height: 120%;
    background-color: rgb(255, 255, 255);
    border-radius: 40%;
    position: absolute;
    bottom: -300px;
    animation: goyang 2s ease-in-out infinite alternate;
}

@keyframes goyang{
    0%{
        transform: translateY(100px) rotate(10deg);
    }
    100%{
        transform: translateY(-100px) rotate(-40deg);
    }
}
.box-input h1{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 26px;
    font-weight: bold;
    color: #F24F8A;
    margin-bottom: 30px;
    position: relative;
    z-index: 7;
}
.login-input{
    width: 80%;
    height: 10%;
    /* background-color: thistle; */
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    z-index: 7;
}
.login-input i{
    font-size: 20px;
    padding: 12px 15px;
    background-color: #fff;
    box-shadow: 0px 0px 20px 1px rgba(0, 0, 0,0.15);
    border-radius: 50%;
}
.login-input input{
    font-size: 17px;
    border: none;
    outline: none;
    font-family: Arial, Helvetica, sans-serif;
    /* font-weight: bold; */
    height: 80%;
    width: 70%;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 0px 20px 1px rgba(0, 0, 0,0.15);
}
</style>
