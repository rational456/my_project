<template>
  <div id="MinePage" class="back">
    <div class="overall ">
      <div class="accountBackground ">
        <div class="accountBox">
          <img :src="avatar" alt="用户头像"><br>
          <div class="account">
            <div class="username">{{username}}</div>
            <div class="accountNumber">账号：{{account}}</div>
          </div>
          <div class="skip" @click="ChangeInfo">编辑资料</div>
        </div>
      </div>
      <div class="note">文章</div>
      <div class="articleBox">
        <div class="article"
        v-for="PublishArticle in PublishArticles"
        :key="PublishArticle.articleId"
        @click="toArticle(PublishArticle.articleId)">
          <div class="articlePhoto">
            <img src="/Rounded rectangle.png" alt="封面图">
          </div>
          <div class="articleIntroduce">
            <div class="title">
              {{PublishArticle.title}}
            </div>
            <div class="author">
              <div class="authorName">
                <img :src="PublishArticle.authorAvatar" alt="头像">
                <div class="name">{{PublishArticle.authorName}}</div>
              </div>
              <div class="like">
                <img src="/Icon.png" alt="点赞">
                <div class="likeNumber">{{PublishArticle.likeNum}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="expand"><img src="/Chevrons down.png" alt="展开"></div>
      <div class="note">赞过</div>
            <div class="articleBox">
        <div class="article"
        v-for="LikeArticle in LikeArticles"
        :key="LikeArticle.articleId"
        @click="toArticle(LikeArticle.articleId)">
          <div class="articlePhoto">
            <img src="/Rounded rectangle.png" alt="封面图">
          </div>
          <div class="articleIntroduce">
            <div class="title">
              {{LikeArticle.title}}
            </div>
            <div class="author">
              <div class="authorName">
                <img :src="LikeArticle.authorAvatar" alt="头像">
                <div class="name">{{LikeArticle.authorName}}</div>
              </div>
              <div class="like">
                <img src="/Icon.png" alt="点赞">
                <div class="likeNumber">{{LikeArticle.likeNum}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="expand"><img src="/Chevrons down.png" alt="展开"></div>
      <div class="end">关于我们</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { GetUserLike, GetUserPublish } from '@/api/user';
import { useStoreHelper } from '@/components/useStoreHelper';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
// 实时获取用户信息
const{data,onFieldChange}=useStoreHelper()
const username = ref('')
const avatar = ref('')
const account = ref('')
username.value=data.value.username;
avatar.value=data.value.avatar;
account.value=data.value.account;
onFieldChange('username',(newVal, oldVal)=>{
  username.value=data.value.username;
})
onFieldChange('avatar',(newVal, oldVal)=>{
  avatar.value=data.value.avatar;
})
onFieldChange('account',(newVal, oldVal)=>{
  account.value=data.value.account;
})

const router = useRouter()
const ChangeInfo= () => {
  router.push('/ChangePassword')
}
const form=reactive({
  pageNum:1,
  pageSize:8
})
//获取个人主页信息
//用户已发表文章
const PublishArticles=ref([{
  articleId:1,
  coverPhoto:'',
  title:'',
  authorAvatar:'',
  authorName:'',
  likeNum:0,
}])
//用户点赞文章
const LikeArticles=ref([{
  articleId:1,
  coverPhoto:'',
  title:'',
  authorAvatar:'',
  authorName:'',
  likeNum:0,
}])
const toArticle=(articleId:number)=>{
  router.push({
    name:'article',
    params:{
      articleId:articleId
    }
  })
}
const fetchUserPublish = async () => {
  const result = await GetUserPublish(form,data.value.token);
  console.log(result.data)
  const newArticles = result.data.data
  if(result.data.code==200)
  {
    PublishArticles.value = newArticles.list
  }
}
const fetchUserLike = async () => {
  const result = await GetUserLike(form,data.value.token);
  const newArticles = result.data.data
  if(result.data.code==200)
  {
    LikeArticles.value = newArticles.list
  }
}
onMounted(() => {
  fetchUserPublish();
  fetchUserLike()
  const router=useRouter()
  if(data.value.isLoading==false)
  {
    alert('请先登录！');
    router.push('/Login')
  }
})
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
  background-color: #fff9f0;
  display: flex;
  /* justify-content: center; */
  align-items: flex-start;
  align-content: flex-start;
}
.overall{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
}
.accountBackground{
  width: 88%;
  height: 463px;
  background-color: #8B9900;
  border-radius: 16px;
  display: flex;
  justify-content: center;
}
.accountBox{
  width: 224px;
  height: 323px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.accountBox img{
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 100%;
  margin-top: 47px;
  margin-left: 12px;
  margin-right: 12px;
}
.account{
  width: 224px;
  height: 78px;
  margin: 8px 0;
}
.username{
  font-size: 32px;
  line-height: 40px;
  font-family: STFangsong;
  text-align: center;
  margin-bottom: 8px;
}
.accountNumber{
  font-size: 16px;
  line-height: 24px;
  font-family: STFangsong;
  text-align: center;
  color: #000;
  margin-top: 8px;
}
.skip{
  width: 224px;
  height: 24px;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  font-family: STFangsong;
  color: #FFFFFF;
  cursor: pointer;
}
.note{
  width: 100%;
  height: 45px;
  font-size: 32px;
  line-height: 40px;
  font-family: STFangsong;
  text-align: center;
  color: #000000;
  margin: 17px 0;
}
.articleBox{
  width: 1120px;
  min-height: 456px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 32px;
  flex-wrap: wrap;
  overflow: auto;
}
.article{
  width: 256px;
  height: 440px;
}
.articlePhoto{
  width: 256px;
  height: 300px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}
.articleIntroduce{
  width: 256px;
  height: 140px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  background-color: #DDEFFF;
}
.title{
  font-size: 20px;
  line-height: 28px;
  font-family: STFangsong;
  margin-bottom: 16px;
}
.author{
  margin-top: 16px;
  width: 256px;
  height: 52px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
.authorName{
  width: 166px;
  height: 36px;
  padding: 0 8px;
  font-size: 16px;
  line-height: 24px;
  font-family: STFangsong;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 16px;
}
.authorName img{
  width: 36px;
  height: 36px;
  border-radius: 100%;
}
.like{
  width: 64px;
  height: 36px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 8px;
}
.like img{
  width: 19.68px;
  height: 20px;
  margin: 0 8px;
}
.likeNumber{
  font-size: 14px;
  line-height: 22px;
  font-family: STFangsong;
  color: #000;
}
.expand{
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
}
.expand img{
  width: 48px;
  height: 48px;
}
.end{
  width: 100%;
  height: 100px;
  background-color: #8B9900;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  text-align: center;
  font-size: 16px;
  line-height: 24px;
  font-family: STFangsong;
  padding-top: 51px;
  padding-bottom: 25px;
}
</style>
