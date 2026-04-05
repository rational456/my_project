<template>
  <div id="ArticlePage" class="back">
    <div class="articleBox">
      <div class="headBox">
        <div class="backBtn" @click="$router.back()"><img src="/backArticle.png" alt="返回按钮"></div>
        <div class="title">{{ article.title }}</div>
        <div class="auther">{{ article.authorName}} {{ article.publishTime.split(' ')[0] }}</div>
      </div>
      <div class="coverPhoto">
        <img src="/Rectangle 51.png" alt="封面图">
      </div>
      <div class="contentBox">
        <div class="content"
          v-html="renderedContent">
        </div>
      </div>
    </div>
    <div class="commentBorder">
      <div class="commentBtn">
        <img src="/comment.png" alt="评论按钮" @click="newComment">
      </div>
      <input type="text" class="commentInput" placeholder="写些什么" v-model="myComment">
      <div class="someBtn">
        <img :src="article.isLiked ? '/liked.png' : '/like.png'" alt="点赞按钮" @click="handleLike" style="cursor: pointer;">
        <img src="/dislike.png" alt="点踩按钮">
        <img src="/comment.png" alt="评论按钮">
      </div>
    </div>
    <div class="commentBox">
      <div class="note">评论</div>
      <div class="noteOther" v-show="comments.length==0">暂无评论</div>
      <div class="comment" v-show="isComment" v-for="comment in comments" :key="comment.commentId">
        <div class="commenterAvatar">
          <img :src="comment.userAvatar" alt="头像">
        </div>
        <div class="commentContent">
          <div class="commentName">
            {{ comment.userName }}
          </div>
          <div class="commentAll">
            <div class="commentWord">
              {{ comment.content }}
            </div>
          </div>
          <div class="expand" @click="toComment(comment.commentId)">展开回复</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { GetArticle, GetArticleComment, PostComment, PostLike, SaveReading } from '@/api/article';
import { useStoreHelper } from '@/components/useStoreHelper';
import { marked } from 'marked';
import { computed, onUnmounted, ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DOMPurify from 'dompurify'

const route = useRoute()
const router = useRouter()
const articleId = Number(route.params.articleId)
const{data}=useStoreHelper()
const comments=ref([{
  commentId:0,
  userId:1,
  userName:'',
  userAvatar:'',
  content:'',
  childComment:[]
}])
const isComment=ref(false)
const article=ref({
  articleId: 1,
  title: "SpringBoot从入门到精通",
  content: "# SpringBoot从入门到精通\n## 1. 核心特性\n- 自动配置\n- 起步依赖",
  authorId: 1,
  authorName: "zhangsan",
  authorAvatar: "https://img-blog.csdnimg.cn/20240105112023799.png",
  clickNum: 8961,
  likeNum: 520,
  commentNum: 68,
  publishTime: "2026-01-10 09:30:00",
  isLiked: true
})

const getAllArticle = async () =>{
  if(data.value.isLoading==false)
{
  alert('请先登录！');
  router.push('/Login')
}
  const result= await GetArticle(articleId,data.value.token)
  if(result.data.code==200)
  {
    article.value=result.data.data;
    const getcomment= await GetArticleComment(articleId)
    comments.value=getcomment.data.data
    isComment.value=true
    if(comments.value.length==0)
    {
      isComment.value=false;
    }
    console.log(getcomment.data.data)
    console.log(comments.value)
    SaveReading({articleId:articleId,readPercent:0,readPosition:0},data.value.token)
  }
  else{
    alert('文章打开失败！');
    router.push('/home')
  }
}
const handleLike = () => {
  article.value.isLiked=!article.value.isLiked;
  console.log('点赞状态更新')
}
const myComment=ref('')
const newComment= async () => {
  const result = await PostComment({
    articleId:article.value.articleId,
    content:myComment.value
  },data.value.token)
  if(result.data.code==200)
    {
      isComment.value=true
      comments.value.unshift({
      commentId:result.data.data.commentId,
      userId:data.value.userId,
      userName:data.value.username,
      userAvatar:data.value.avatar,
      content:myComment.value,
      childComment:[]
    })
    }
}
const toComment=(commentId:number)=> {
    router.push({
    name:'comment',
    params:{
      articleId:article.value.articleId,
      commentId:commentId
    }
  })
}
//Markdown解析
const renderedContent = computed(() => {
  const dirtyHTML = marked.parse(article.value.content) as string
  return DOMPurify.sanitize(dirtyHTML)
})
onMounted(() => {
  getAllArticle();
  console.log(comments.value)
})
import { onBeforeUnmount } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

const saveLikeStatus = () => {
  const currentArticle = {
    articleId: article.value?.articleId,
    isLike: article.value?.isLiked
  }

  if (currentArticle.articleId && data.value?.token) {
    PostLike(currentArticle, data.value.token)
    console.log('点赞状态已更新')
  }
}

// 组件卸载前保存
onBeforeUnmount(() => {
  saveLikeStatus()
})
// 路由离开前保存
onBeforeRouteLeave((to, from, next) => {
  saveLikeStatus()
  next()
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
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.articleBox{
  width: 1120px;
  height: auto;
}
.headBox{
  width: 1076px;
  height: 67px;
  display: flex;
  flex-wrap: wrap;
}
.backBtn{
  width: 21px;
  height: 21px;
  margin-top: 11px;
  cursor: pointer;
}
.title{
  width: 416px;
  height: 40px;
  font-size: 32px;
  line-height: 40px;
  font-family: STFangsong;
  text-align: center;
  margin:0 auto;
}
.auther{
  min-width: 144px;
  height: 27px;
  font-size: 20px;
  line-height: 28px;
  font-family: STFangsong;
  margin-left: 760px;
}
.coverPhoto{
  width: 1120px;
  height: 180px;
  margin-top: 16px;
  margin-bottom: 35px;
}
.coverPhoto img{
  width: 1120px;
  height: 180px;
  border-radius: 16px;
}
.contentBox{
  width: 1120px;
  min-height: 0;
  padding: 50px;
}
.content{
  font-size: 16px;
  line-height: 1.5;
  text-align: left;
  text-indent: 2em;
  /* overflow: auto; */
}
.commentBorder{
  width: 1119px;
  height: 72px;
  margin: 46px 0;
  border-radius: 16px;
  background-color: #DDEFFF;
  display: flex;
  flex-wrap: nowrap;
}
.commentBtn{
  width: 36px;
  height: 36px;
  margin: 18px 36px 18px 24px;
  cursor: pointer;
}
.commentInput{
  width: 734px;
  height: 44px;
  border-radius: 100px;
  margin: 14px 85px 14px 0;
  padding: 4px 20px;
  border: none;
  outline: none;
  font-size: 16px;
  font-family: STFangsong;
  line-height: 24px;
  text-align:justify;
}
.someBtn{
  width: 172px;
  height: 36px;
  margin: 18px 32px 18px 0;
  display: flex;
  gap: 32px;
}
.someBtn img{
  width: 36px;
  height: 36px;
}
.commentBox{
  width: 1120px;
  min-height: 216px;
}
.note{
  width: 100px;
  height: 60px;
  font-size: 40px;
  line-height: 40px;
  font-family: STFangsong;
  text-align: center;
}
.noteOther{
  font-size: 40px;
  line-height: 40px;
  font-family: STFangsong;
  text-align: center;
}
.comment{
  width: 1120px;
  min-height: 216px;
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.commenterAvatar{
  width: 64px;
  height: 64px;
  margin: 76px 24px 76px 20px;
}
.commenterAvatar img{
  width: 64px;
  height: 64px;
  border-radius: 16px;
}
.commentContent{
  width: 991px;
  height: 176px;
  margin: 20px 21px 20px 0;
}
.commentName{
  width: 991px;
  height: 44px;
  font-size: 16px;
  line-height: 24px;
  font-family: STFangsong;
  padding: 10px;
}
.commentAll{
  width: 991px;
  height: 88px;
  font-size: 16px;
  line-height: 24px;
  font-family: STFangsong;
  padding: 0 0 10px 10px;
}
.commentWord{
  margin: auto 0;
}
.expand{
  width: 917px;
  height: 44px;
  padding: 10px;
  margin-left: 74px;
  font-size: 16px;
  line-height: 24px;
  font-family: STFangsong;
  cursor: pointer;
}
</style>
