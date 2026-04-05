<template>
  <div id="ChangePasswordPage" class="back">
    <div class="overall">
       <div class="box">
        <div class="headPhoto"
        :style="{ backgroundImage: `url(${avatar})` }"
         @click="triggerUpload">
          <div class="handleSymbol">+</div>
          <input
          ref="fileInput"
          type="file"
          accept="image/*"
          @change="handleFileChange"
          hidden>
        </div>
      </div>
    <form @submit.prevent="handleSubmit">
      <div class="change">
        <div class="bord">
          <label>
            <span>账号名称：</span>
            <input type="text" id="username" v-model="form.newUsername" required class="inCome">
          </label>
        </div>
        <div class="bord" v-show="false">
          <label>
            <span>账号：</span>
            <input type="text" id="account" v-model="form.newUsername" class="inCome">
          </label>
        </div>
        <div class="bord">
          <label>
            <span>原密码：</span>
            <input type="Password" id="lastPassword" v-model="changePasswordForm.oldPwd" class="inCome">
          </label>
        </div>
        <div class="bord">
          <label>
            <span>新密码：</span>
            <input type="Password" id="newPassword" v-model="changePasswordForm.newPwd" class="inCome">
          </label>
        </div>
        <button type="submit" :disabled="changing" class="changeBtn">
          {{changing?'正在修改...':'确认修改'}}
        </button>
      </div>
    </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ChangeAvatarInfo,ChangePasswordInfo,ChangeUsernameInfo, Login } from '@/api/user';
import { useStoreHelper } from '@/components/useStoreHelper';
import { onMounted, ref,watch} from 'vue';
import { reactive } from 'vue';
import {  useRouter } from 'vue-router';

const fileInput = ref<HTMLInputElement | null>(null)

const triggerUpload = () => {
  fileInput.value?.click()
}

const handleFileChange = async (e:any) => {
  const file = e.target.files[0]
  if (!file) return
  const formData = new FormData()
  formData.append('file', file)
  // 预览
  avatar.value = URL.createObjectURL(file)

  // 上传
  try {
    const res = await ChangeAvatarInfo(formData, data.value.token)
    console.log(res.data)
    updateField('avatar',res.data.data.avatarUrl)
    console.log('上传成功', res)
  } catch (error) {
    console.error('上传失败', error)
  }
  avatar.value = data.value.avatar
}

const{data,updateField,onFieldChange}=useStoreHelper()
const username = ref('')
const avatar = ref('')
username.value=data.value.username;
avatar.value=data.value.avatar;
onFieldChange('username',(newVal, oldVal)=>{
  username.value=data.value.username;
})
onFieldChange('avatar',(newVal, oldVal)=>{
avatar.value=data.value.avatar;
})

const router=useRouter();
const form=reactive({
  newUsername: data.value.username,
})
const changePasswordForm=reactive({
  oldPwd:'',
  newPwd:''
})
const changing=ref(false);
const error=ref('');
const handleSubmit = async () =>{
  changing.value=true;
  error.value='';
  if(form.newUsername!=data.value.username){
    const usernameResult = await ChangeUsernameInfo(form,data.value.token);
    if(usernameResult.data.code==200){
      updateField('username',form.newUsername);
    }else{
      error.value=usernameResult.data.error
    }
  }
  if(changePasswordForm.newPwd!=''&&changePasswordForm.oldPwd!=''){
    const passwordResult = await ChangePasswordInfo(changePasswordForm,data.value.token);
    console.log(passwordResult.data)
    if(passwordResult.data.code==200){
      updateField('password',changePasswordForm.newPwd);
    }else{
      error.value=passwordResult.data.error
    }
  }
  changing.value=false;
}
onMounted(()=>{
  if(data.value.isLoading==false)
  {
    alert('请先登录！');
    router.push('/Login')
  }
})
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
  padding-top: 10%;
  background-color: #fff9f0;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  align-content: center;
}
.overall{
  display: flex;
  width: 1072px;
  height: 328px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.change {
  width: 739px;
  height: 328px;
  display: flex;
  align-items: center;
  align-content: flex-start;
  flex-wrap: wrap;
  font-family: STFangsong;
  gap: 64px;
}
.box{
  width: 333px;
  height: 328px;
  padding: 36px 77px 36px 0;
}
.headPhoto{
  width: 256px;
  height: 256px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
}
.handleSymbol{
  font-size: 64px;
  color:rgba(255,255,255,0.5);
}
/* .back input{
  margin: 0 100px;
} */
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
.changeBtn{
  width: 276px;
  height:72px;
  color: white;
  background-color: #514532;
  border-radius: 16px;
  border: none;
  outline: none;
  text-align: center;
  font-size: 32px;
  line-height: 40px;
  font-family: STFangsong;
  margin-top: 82px;
  cursor: pointer;
}
.scaled-element {
  transform: scale(0.8);
}
</style>
