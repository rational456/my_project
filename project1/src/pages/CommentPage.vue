<template>
  <div id="ArticlePage" class="back">
    <div class="titleBox">
      <div class="backBtn" @click="$router.back()">
        <img src="/backArticle.png" alt="返回按钮">
      </div>
      <div class="title">
        评论回复
      </div>
    </div>
    <div class="comment">
      <div class="commenterAvatar">
        <img :src="thisComment.userAvatar" alt="头像">
      </div>
      <div class="commentContent">
        <div class="commentName">
          {{ thisComment.userName }}
        </div>
        <div class="commentAll">
          <div class="commentWord">
            {{ thisComment.content }}
          </div>
        </div>
      </div>
    </div>
        <div class="commentBorder">
      <div class="commentBtn">
        <img src="/comment.png" alt="评论按钮" @click="newComment">
      </div>
      <input type="text" class="commentInput" placeholder="写些什么" v-model="myComment">
    </div>
    <div class="note">回复</div>
    <div class="noteOther" v-show="thisComment.childComment == null">暂无回复</div>
    <div class="commentBox">
      <div class="comment" v-for="comment in thisComment.childComment">
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
      </div>
    </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { GetArticle, GetArticleComment, PostComment, PostLike, SaveReading } from '@/api/article';
import { useStoreHelper } from '@/components/useStoreHelper';
import { computed, onUnmounted, ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const articleId = Number(route.params.articleId)
const commentId = Number(route.params.commentId)
const{data}=useStoreHelper()
const comments=ref([{
  commentId:0,
  userId:1,
  userName:'',
  userAvatar:'',
  content:'',
  childComment:[]
}])
const thisComment=ref({
  commentId:0,
  userId:1,
  userName:'',
  userAvatar:'',
  content:'',
  childComment:[{
  commentId:0,
  userId:1,
  userName:'',
  userAvatar:'',
  content:'',

  }]
})
const article=ref({
  "articleId": 1,
  "title": "SpringBoot从入门到精通",
  "content": "# SpringBoot从入门到精通\n## 1. 核心特性\n- 自动配置\n- 起步依赖",
  "authorId": 1,
  "authorName": "zhangsan",
  "authorAvatar": "https://img-blog.csdnimg.cn/20240105112023799.png",
  "clickNum": 8961,
  "likeNum": 520,
  "commentNum": 68,
  "publishTime": "2026-01-10 09:30:00",
  "isLiked": true
})
const getAllArticle = async () =>{
  const result= await GetArticle(articleId,data.value.token)
  if(result.data.code==200)
  {
    article.value=result.data.data;
    const getcomment= await GetArticleComment(articleId)
    comments.value=getcomment.data.data
    thisComment.value=comments.value.find(item => item.commentId === commentId)|| {
      commentId:0,
      userId:1,
      userName:'',
      userAvatar:'',
      content:'',
      childComment:[]
    }
    SaveReading(articleId,data.value.token)
  }
  else{
    alert('文章打开失败！');
  }
}
const myComment=ref('')
const newComment= async () => {
  const result = await PostComment({
    articleId:article.value.articleId,
    parentCommentId:commentId,
    content:myComment.value
  },data.value.token)
  if(result.data.code==200)
    {
      thisComment.value.childComment.unshift({
      commentId:result.data.data.commentId,
      userId:data.value.userId,
      userName:data.value.username,
      userAvatar:data.value.avatar,
      content:myComment.value,
    })
    }
}
onMounted(() => {
  getAllArticle();
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
.titleBox{
  width: 1120px;
  height: 60px;
  font-size: 36px;
  line-height: 40px;
  font-family: STFangsong;
  display: flex;
}
.backBtn{
  width: 36px;
  height: 36px;
  margin: 12px 0;
  padding: 7.5px;
  cursor: pointer;
}
.title{
  width: 164px;
  height: 40px;
  margin: 0 478px 0 442px;
  text-align: center;
}
.commentBox{
  width: 1120px;
  min-height: 216px;
}
.note{
  width: 1120px;
  height: 60px;
  font-size: 32px;
  line-height: 40px;
  font-family: STFangsong;
  text-align: left;
  padding: 10px;
}
.noteOther{
  font-size: 40px;
  line-height: 40px;
  font-family: STFangsong;
  text-align: center;
}
.comment{
  width: 1120px;
  height: 216px;
  border-radius: 20px;
  display: flex;
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
  text-align: left;
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
.expand{
  width: 917px;
  height: 44px;
  padding: 10px;
  margin-left: 74px;
  font-size: 16px;
  line-height: 24px;
  font-family: STFangsong;
}
</style>
