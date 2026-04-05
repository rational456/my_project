<template>
  <div id="HomePage" class="back">
    <div class="all">
      <div class="searchBorder">
        <form action="#" class="searchBorder">
          <img src="/Search.png" alt="搜索图标" class="imgSize">
          <div><input type="text" placeholder="搜索" class="search"></div>
        </form>
      </div>
      <div class="photoAction">
        <div class="photo" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
          <div v-for="(image, index) in images" :key="index" class="carouselSlide">
            <img :src="image.url" :alt="image.alt" class="imgAction">
          </div>
        </div>
      </div>
      <div class="rankingList">
        <div class="titleList">文章排行榜</div>
        <div class="listContent">
          <div class="listStrip"
          v-for="(RankingListArticle,index) in RankingListArticles"
          :key="RankingListArticle.articleId"
          @click="toArticle(RankingListArticle.articleId)">
          {{index + 1}}.{{ RankingListArticle.title }}
          </div>
        </div>
        <div></div>
      </div>
      <div class="latestPagePhoto" @click="toArticle(LatestArticle.articleId)">
        <img src="/Rectangle 2.png" alt="最新文章的封面图">
      </div>
      <div class="latestPage" @click="toArticle(LatestArticle.articleId)">
        <div class="titleLatest">最新文章</div>
        <div class="contentLatest" v-html="renderedContent"></div>
      </div>
      <div class="lastTimePhoto" @click="toArticle(LastTimeArticle.articleId)">
        <img src="/Rectangle 3.png" alt="上次看到的封面图">
      </div>
      <div class="lastTimePage" @click="toArticle(LastTimeArticle.articleId)">
        <div class="titleLastTime">上次看到</div>
        <div class="contentLastTime">{{ LastTimeArticle.title }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { GetArticleRanking, GetLastTimeArticle, GetLatestArticle } from '@/api/article'
import { useStoreHelper } from '@/components/useStoreHelper'
import { da } from 'element-plus/es/locales.mjs'
import { marked } from 'marked'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import DOMPurify from 'dompurify'

// 图片数据 - 三张图片
const images = ref([
  {
    url: '/Frame 110.png',
    alt: '图片1'
  },
  {
    url: '/Frame 111.png',
    alt: '图片2'
  },
  {
    url: '/Frame 112.png',
    alt: '图片3'
  }
])

const currentIndex = ref(0)
let timer: number | null = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length
}

const startAutoPlay = () => {
  timer = setInterval(() => {
    nextSlide()
  }, 10000)
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})
const RankingForm=ref({
  pageNum:1,
  pageSize:8,
})
const RankingListArticles=ref([{
  articleId:1,
  title:''
}])
const LatestArticle=ref({
  articleId:1,
  title:'',
  content:''
})
const LastTimeArticle=ref({
  articleId:1,
  title:'',
})
const{data,onFieldChange}=useStoreHelper()
const getRankingList = async () =>{
  const result = await GetArticleRanking(RankingForm);
  if(result.data.code==200)
  {
    RankingListArticles.value=result.data.data.list
  }
}
const getLatest = async () =>{
  const result = await GetLatestArticle({pageNum:1,pageSize:1});
  if(result.data.code==200)
  {
    LatestArticle.value=result.data.data.list[0]
  }
}
const getLastTime = async () =>{
  const result = await GetLastTimeArticle(data.value.token);
  if(result.data.code==200)
  {
    LastTimeArticle.value=result.data.data
    console.log(LastTimeArticle.value)
  }
}
const renderedContent = computed(() => {
  const dirtyHTML = marked.parse(LatestArticle.value.content) as string
  return DOMPurify.sanitize(dirtyHTML)
})
onMounted(() => {
  getRankingList();
  getLatest();
  getLastTime()
})
const router=useRouter()
const toArticle=(articleId:number)=>{
  router.push({
    name:'article',
    params:{
      articleId:articleId
    }
  })
}
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
  justify-content: center;
  align-items: flex-start;
}
.all{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 1119px;
  height: 684px;
  margin-bottom: 5%;
}
.subject{
  width: 1119px;
  height: 3000px;
}
.searchBorder{
  width: 1119px;
  height: 52px;
  background-color: #514532;
  border-radius: 16px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
.imgSize{
  width: 36px;
  height: 36px;
  margin: 8px 17px 8px 16px;
}
.search{
  width: 1048px;
  height: 26px;
  line-height: 24px;
  background-color: #514532;
  border: none;
  outline: none;
  font-size: 16px;
  font-family: STFangsong;
  color: #fff;
}
.photoAction{
  width: 544px;
  height: 344px;
  position: relative;
  overflow: hidden;
  margin: 26px 27px 0 0;
}
.photo{
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.8s ease-in-out;
}
.carouselSlide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
}
.imgAction{
  width: 544px;
  height: 344px;
  border-radius: 16px;
  object-fit: cover;
}
.rankingList{
  width: 545px;
  height: 328px;
  margin-top: 26px;
}
.titleList{
  width: 545px;
  height: 40px;
  font-size: 32px;
  font-family: STFangsong;
  color: #000;
  margin-bottom: 8px;
}
.listContent{
  width: 545px;
  height: 282px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  overflow: auto;
}
.listStrip{
  width: 545px;
  height: 28px;
  font-size: 20px;
  line-height: 28px;
  font-family: STFangsong;
  color: #000;
  cursor: pointer;
}
.latestPagePhoto{
  width: 256px;
  height: 233px;
  border-radius: 16px;
  margin-top: 29px;
  margin-right: 32px;
  cursor: pointer;
}
.latestPage{
  width: 256px;
  height: 216px;
  margin-top: 37px;
  margin-right: 30px;
  cursor: pointer;
}
.titleLatest{
  font-size: 32px;
  line-height: 40px;
  font-family: STFangsong;
  color: #514532;
  margin-bottom: 32px;
}
.contentLatest{
  width: 256px;
  height: 144px;
  font-size: 16px;
  line-height: 1.5;
  font-family: STFangsong;
  color: #000;
}
.lastTimePhoto{
  width: 256px;
  height: 233px;
  border-radius: 16px;
  margin-top: 43px;
  margin-right: 32px;
  cursor: pointer;
}
.lastTimePage{
  width: 256px;
  height: 216px;
  margin-top: 51px;
  cursor: pointer;
}
.titleLastTime{
  font-size: 32px;
  line-height: 40px;
  font-family: STFangsong;
  color: #8B9900;
  margin-bottom: 16px;
}
.contentLastTime{
  width: 256px;
  height: 164px;
  font-size: 16px;
  line-height: 24px;
  font-family: STFangsong;
  color: #000;
}
.scaled-element {
  transform: scale(0.8);
}
</style>
