<template>
  <div id="LoginPage" class="back">
    <div class="enter ">
      <div class="formIncome">
        <div class="welcomeWord">
          <div class="word1">欢迎登录</div>
          <div class="word2">远山客</div>
        </div>
        <form @submit.prevent="handleSubmit">
      <div class="bord">
        <label>
          <sapn>账号：</sapn>
          <input type="text"
          id="account"
          v-model="form.username"
          required
          class="inCome">
        </label>
      </div>
      <div class="bord" style="margin-bottom: 0;">
        <label>
          <sapn>密码：</sapn>
          <input type="password"
          id="password"
          v-model="form.password"
          required
          class="inCome">
        </label>
      </div>
      <div class="forget">忘记密码？</div>
      <button
      type="submit"
      :disabled="loading"
      class="bord-btn">{{loading?'登录中...':'登录'  }}</button>
      </form>
      </div>
      <div class="photo">
        <img src="/Rectangle 50.png" alt="登录图片">
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Login } from '@/api/user';
import { useStoreHelper } from '@/components/useStoreHelper';
import { ref } from 'vue';
import { reactive } from 'vue';
import {  useRouter } from 'vue-router';

const router=useRouter();
const form=reactive({
  username:'',
  password:''
})
const loading=ref(false);
const error=ref('');
const {updateMultiple} = useStoreHelper()
const handleSubmit = async () =>{
  loading.value=true;
  error.value='';
  const result = await Login(form);
  console.log(result.data)
  if(result.data.code==200){
    updateMultiple({
      username:result.data.data.username,
      token:result.data.data.token,
      userId:result.data.data.userId,
      avatar:result.data.data.avatar,
      password:form.password,
      isLoading:true
    })
    localStorage.setItem('UserInfo',JSON.stringify({
      username:result.data.data.username,
      token:result.data.data.token,
      userId:result.data.data.userId,
      avatar:result.data.data.avatar,
      isLoading:true
    }))
    router.push('/home');
  }
  else{
    error.value=result.data.msg
  }
  loading.value=false;
}
// import { ref, reactive } from 'vue'
// import { useRouter } from 'vue-router'
// import { useAuthStore } from '@/stores/auther'

// const router = useRouter()
// const authStore = useAuthStore()

// const form = reactive({
//   username: '',
//   password: ''
// })

// const loading = ref(false)
// const error = ref('')

// const handleSubmit = async () => {
//   loading.value = true
//   error.value = ''

//   const result = await authStore.login(form)

//   if (result.success) {
//     router.push('/dashboard')
//   } else {
//     error.value = result.error
//   }

//   loading.value = false
// }
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #000;
}

.back {
  width: 100%;
  height: 100%;
  /* min-height: 900px; */
  margin: 0;
  /* padding-top: 10%; */
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.enter {
  width: 1120px;
  height: 459px;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
}
.formIncome{
  width: 768px;
  height: 459px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  padding: 49.5px 0;
}
.photo{
  width: 352px;
  height: 459px;
  border-radius: 16px;
}
.welcomeWord{
  width: 736px;
  height: 40px;
  font-family: STFangsong;
  text-align: center;
  color: #514532;
  display:flex;
  margin-bottom: 40px;
}
.word1{
  width: 256px;
  height: 40px;
  font-size: 64px;
  line-height: 40px;
  margin-right: 17px;
}
.word2{
  width: 108px;
  height: 40px;
  font-size: 36px;
  line-height: 40px;
}
.bord{
  width: 736px;
  height: 60px;
  background-color: #DDEFFF;
  font-size: 32px;
  line-height: 40px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  border-radius: 16px;
  padding: 10px 16px;
  margin-bottom: 32px;
}
.inCome{
  width: 600px;
  height: 60px;
  background-color: #DDEFFF;
  font-size: 36px;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  border: none;
  outline: none;
}
.bord-btn{
  width: 736px;
  height: 60px;
  color: white;
  background-color: #514532;
  font-size: 32px;
  font-family: STFangsong;
  text-align: center;
  border-radius: 16px;
  border: none;
  outline: none;
  cursor: pointer;
}
.forget{
  width: 736px;
  height: 28px;
  background-color: #fff9f0;
  text-align: right;
  font-size: 20px;
  font-family: STFangsong;
  line-height: 28px;
  color: #757575;
  margin: 20px 0;
}
.scaled-element {
  transform: scale(calc(702 / 1440));
}
</style>
