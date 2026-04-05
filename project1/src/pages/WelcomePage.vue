<template>
  <div id="WelcomePage" class="back">
    <div class="container" :style="containerWidth">
      <div class="bodyShaping top">
        <img src="/Ellipse 1.png" alt="塑形">
      </div>
      <div class="animation" ref="animationRef">
        <div class="wrapper" :style="{ transform: `translateX(${scrollPosition}px)` }">
          <div
            v-for="(img, index) in extendedImages"
            :key="'original-' + index"
            class="coverPhotoFrame"
          >
            <img :src="img.url" :alt="img.alt">
          </div>
        </div>
        <div class="bodyShaping bottom">
          <img src="/Ellipse 2.png" alt="塑形">
        </div>
        <div class="title">
          <img src="\Mask group.png" alt="远山客">
        </div>
      </div>
    </div>
    <div class="loginBtn" @click="toLogin">
      <div class="word">
        登录
      </div>
      <div class="note">
        <img src="/next.png" alt="进入按钮">
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStoreHelper } from '@/components/useStoreHelper';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const images = ref([
  {
    url:'/Rectangle 39.png',
    alt:'图片1'
  },
  {
    url:'/Rectangle 42.png',
    alt:'图片2'
  },
  {
    url:'/Rectangle 40.png',
    alt:'图片3'
  },
  {
    url:'/Rectangle 41.png',
    alt:'图片4'
  },
  {
    url:'/Rectangle 43.png',
    alt:'图片5'
  },
  {
    url:'/Rectangle 44.png',
    alt:'图片6'
  },
  {
    url:'/Rectangle 45.png',
    alt:'图片7'
  },
  {
    url:'/Rectangle 46.png',
    alt:'图片8'
  },
])
const extendedImages = computed(() => {
  return [...images.value, ...images.value, ...images.value]
})

const animationRef = ref<HTMLElement | null>(null)
const scrollPosition = ref(0)
const speed = 0.1 // 滚动速度（像素/帧）
let animationFrame: number

// 单张图片宽度 + 间距
const itemWidth = 256 + 34 // 290px
const groupWidth = computed(() => images.value.length * itemWidth)

const scroll = () => {
  scrollPosition.value -= speed

  // 当滚动超过一组图片的宽度时，瞬间重置位置
  if (Math.abs(scrollPosition.value) >= groupWidth.value) {
    scrollPosition.value += groupWidth.value
  }

  animationFrame = requestAnimationFrame(scroll)
}
const router= useRouter()
const {data} = useStoreHelper()
const toLogin = () =>{
  if(data.value.isLoading){
    router.push('/Home')
  }
  else{
    router.push('/Login')
  }
}
onMounted(() => {
  scroll()
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
const width = document.documentElement.clientWidth-15
// const width = window.innerWidth
const containerWidth = {
  width: width+'px'
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
  min-height: 800px;
  padding-top: 93px;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}
.container{
  /* max-width: 1440px; */
  width: 100%;
  height: 490px;
  overflow: hidden;
  /* margin-top: 93px; */
  padding-top: 59px;
  position: relative;
}
.bodyShaping{
  width: 100%;
  height: 94px;
}
.top{
  position: absolute;
  top: 12px;
  z-index: 2;
  pointer-events: none;
}
.bottom{
  position: absolute;
  height: 120px;
  bottom: 0;
  z-index: 2;
  pointer-events: none;
}
.animation{
  width: 100%;
  height: 386px;
  overflow: hidden;
}
.wrapper {
  display: flex;
  gap: 34px;
  will-change: transform;
}
.coverPhotoFrame {
  width: 256px;
  height: 386px;
  border-radius: 16px;
}
.title{
  width: 465px;
  height: 431px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  pointer-events: none;
}
.loginBtn{
  width: 160px;
  height: 72px;
  margin: 0 auto 133px auto;
  border-radius: 100px;
  background-color: #514532;
  display: flex;
  cursor: pointer;
}
.word{
  width: 64px;
  height: 40px;
  margin: 16px 24px;
  font-size: 32px;
  line-height: 40px;
  color: #FFFFFF;
}
.note{
  width: 24px;
  height: 24px;
  margin: 24px 24px 24px auto;
}
</style>
