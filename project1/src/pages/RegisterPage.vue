<template>
  <div id="ChangePasswordPage" class="back">
    <div class="overall">
      <div class="box">
        <div class="headPhoto">
        <img src="/register.jpg" alt="注册图片">
        </div>
      </div>
    <form @submit.prevent="handleSubmit">
      <div class="register">
        <div class="registerWord">
          <div class="welcomeWord">
            注册账号
          </div>
          <div class="websiteWord">远山客</div>
        </div>
        <div class="bord">
          <label>
            <span>用户名：</span>
            <input type="text"
            id="username"
            v-model="form.username"
            required
            class="inCome">
          </label>
        </div>
        <div class="bord">
          <label>
            <span>密码：</span>
            <input type="Password"
            id="password"
            v-model="form.password"
            required
            class="inCome">
          </label>
        </div>
        <div class="bord">
          <label>
            <span>确认密码：</span>
            <input type="Password"
            id="confirmPassword"
            v-model="form.confirmPassword"
            required class="inCome">
          </label>
        </div>
        <button type="submit" :disabled="registering" class="registerBtn">
          {{registering?'注册中...':'注册'}}
        </button>
      </div>
    </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import {  Register } from '@/api/user';
import {ref} from 'vue';
import { reactive } from 'vue';
import {  useRouter } from 'vue-router';

const router=useRouter();
const form=reactive({
  username:'',
  password:'',
  confirmPassword:''
})
const registering=ref(false);
const error=ref('');
const handleSubmit = async () =>{
  registering.value=true;
  error.value='';
  const result = await Register(form);
  console.log(result.data)
  if(result.data.code==200){
    router.push('/Login');
  }else{
    error.value=result.data.error
  }
  registering.value=false;
}
</script>
<style scoped>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  color: #000;
}
.back {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #fff9f0;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  /* padding-top: 10%; */
  align-content: flex-start;
}
.overall{
  display: flex;
  width: 1120px;
  height: 600px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.box{
  width: 378px;
  height: 600px;
  padding: 50px 0;
}
.headPhoto{
  width: 315px;
  height: 500px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
}
.headPhoto img{
  width: 315px;
  height: 500px;
  border-radius: 16px;
}
.handleSymbol{
  font-size: 64px;
  color:rgba(255,255,255,0.5);
}
/* .back input{
  margin: 0 100px;
} */
.register{
  width: 742px;
  height: 600px;
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  font-family: STFangsong;
  padding: 66px 0;
}
.registerWord{
  width: 739px;
  height: 100px;
  font-family: STFangsong;
  text-align: center;
  display: flex;
  align-items: center;
}
.welcomeWord{
  width: 256px;
  height: 64px;
  font-size: 64px;
  line-height: 40px;
  margin-right: 26px;
}
.websiteWord{
  width: 108px;
  height: 40px;
  font-size: 36px;
  line-height: 40px;
}
.bord{
  width: 739px;
  height: 64px;
  background-color: #DDEFFF;
  font-size: 20px;
  line-height: 28px;
  display: flex;
  align-items: center;
  justify-items: flex-start;
  flex-wrap: nowrap;
  border-radius: 25px;
  padding: 18px 16px;
  margin: 16px 0 16px 3px;
}
.inCome{
  width: 600px;
  height: 64px;
  background-color: #DDEFFF;
  font-size: 24px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  border: none;
  outline: none;
}
.registerBtn{
  width: 739px;
  height:64px;
  color: white;
  background-color: #514532;
  border-radius: 16px;
  border: none;
  outline: none;
  text-align: center;
  font-size: 32px;
  line-height: 40px;
  font-family: STFangsong;
  margin-top: 16px;
  cursor: pointer;
}
.scaled-element {
  transform: scale(0.8);
}
</style>
