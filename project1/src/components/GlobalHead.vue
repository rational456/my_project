<template>
  <div class="nav">
    <div class="navLogo" @click="navigateTo('/')">
      <a>远山客</a>
    </div>
    <ul class="navMenu">
      <li
        v-for="item in menuItems"
        :key="item.path"
        :class="{ 'active': isActive(item.path) }"
        @click="navigateTo(item.path)"
      >
        {{ item.name }}
      </li>
    </ul>
    <div class="navRight">
        <template v-if="!isLoggedIn">
          <!-- <img src="/默认.png" alt="默认头像"> -->
          <router-link to="/login" class="btnLogin">登录</router-link>
          <sapn style="font-size: 32px;">,</sapn>
          <router-link to="/register" class="btnLogin">注册</router-link>
        </template>
        <template v-else>
          <div class="userDropdown">
            <div class="userInfo" >
            <img :src="avatar" alt="我的头像">
            <span class="username">{{ username }}</span>
            <span class="dropdownArrow">{{ '▼' }}</span>
            </div>
            <ul class="dropDownMenu">
              <li @click="navigateTo('/Mine')">个人中心</li>
              <li @click="navigateTo('/ChangePassword')">设置</li>
              <li @click="logout">退出登录</li>
            </ul>
          </div>
        </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref} from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useStoreHelper } from './useStoreHelper';

const isLoggedIn = ref(false)

const route = useRoute()
const router = useRouter()
const menuItems = [
  { path: '/home', name: '首页' },
  { path: '/New', name: '新建' },
  { path: '/Mine', name: '我的' }
]

const isActive =(path: string) =>{
  return route.path==path;
}
const navigateTo = (path:string) => {
  router.push(path)
}
// 实时获取个人信息
const{data,onFieldChange,updateField,updateMultiple}=useStoreHelper()
const username = ref('')
const avatar = ref('')
username.value=data.value.username;
avatar.value=data.value.avatar;
isLoggedIn.value=data.value.isLoading;
onFieldChange('username',(newVal, oldVal)=>{
  username.value=data.value.username;
})
onFieldChange('avatar',(newVal, oldVal)=>{
  avatar.value=data.value.avatar;
})
onFieldChange('isLoading',(newVal, oldVal)=>{
  isLoggedIn.value=data.value.isLoading;
})
const logout = () => {
  updateField('isLoading',false)
  isLoggedIn.value = false
  localStorage.removeItem('UserInfo')
  // router.push('/login')
}
const getLocalInfo = ()=> {
  const userInfoBox = localStorage.getItem('UserInfo')
  if(userInfoBox){
    const userInfo = JSON.parse(userInfoBox)
    updateMultiple(userInfo)
  }
}
onMounted(()=>{
  getLocalInfo()
})

</script>
<style scoped>
  *{
    margin: 0;
    padding: 0 ;
    list-style: none;
    text-decoration: none;
    font-family: "宋体";
  }
  .nav{
    height:100px;
    width: auto;
    position: fixed;
    top: 0;
    left: 0;
    right:0;
    background-color: #fff9f0;
    display: flex;
    justify-content: center;
    z-index: 9999;
    padding: 0 3.3%;
    align-items: center;
  }
  .navLogo{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300.6422119140625px;
    height: 58px;
    background-image: url('../../public/Logo.png');
    cursor: pointer;
  }
  .navLogo a{
    display: none;
  }
  .navMenu{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    /* gap:75px; */
    /* margin-left: 180px; */
    /* margin: 0 auto; */
  }

  .navMenu li{
    white-space: nowrap;
    color: #98A41B;
    line-height: 40px;
    text-align: center;
    font-size: 32px;
    padding: 4px;
    background-color: #fff9f0;
    border-radius: 100px;
    cursor: pointer;
  }
  .navMenu li.active {
    background-color: #8B99004D;
  }

  .navMenu li:hover {
    background-color: #8B99004D;
  }

  .navMenu li.active:hover {
    background-color: #8B99004D;
  }
  /* .navMenu a:hover,
  .navMenu a:active,
  .navMenu a:focus,
  .navMenu a:visited {
    background-color: #fff9f0 !important;
    color: #98A41B !important;
  } */
  .navRight{
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    /* margin-left: auto; */
  }
  .navRight img {
    height: 48px;
    width: 48px;
    border-radius: 16px;
    object-fit: cover;
    /* margin-left: 120px; */
    gap: 10px;
  }
  .btnLogin{
    font-size: 32px;
    line-height: 40px;
    color: #98A41B;
    padding: 4px;
    border-radius: 100px;
  }
  .btnLogin:hover{
    background-color: #8B99004D;
  }
  .username
  {
    font-size: 32px;
    line-height: 40px;
    color: #98A41B;
    margin: 0 10px;
    cursor: pointer;
  }
  .userDropdown {
    position: relative;
  }
  .userDropdown:hover .dropDownMenu {
    display: block;
  }
  .userDropdown li{
    height: 48px;
    width: 150px;
    font-size: 16px;
    color: #98A41B;
    display: flex;
    justify-content: center;
    padding: 8px 16px;
    cursor: pointer;
  }
  .userInfo {
    display: flex;
    align-items: center;
  }
  .dropdownArrow{
    font-size: 18px;
    color: #98A41B;
    margin-right: 10px;
  }
  .dropDownMenu{
    position: absolute;
    top: 100%;
    right: 18px;
    /* min-width: 100px; */
    background-color: #fff9f0;
    margin-top: 10px;
    display: none;
  }
  .dropDownMenu li{
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
  .dropDownMenu li:hover{
    color: #9AA4EB;
  }
  .userDropdown::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: 10px;
  background: transparent;
  }
</style>

