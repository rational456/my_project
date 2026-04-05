<script setup lang="ts">
import GlobalHead from '@/components/GlobalHead.vue';
import { onMounted, onUnmounted } from 'vue';
// onMounted(() => {
//   scalePage();
//   window.addEventListener('resize', scalePage);
// });
// const scalePage = () => {
//   const app = document.getElementById('BasicLayout');
//   const wrapper = document.getElementById('header');
//   if (!app||!wrapper) return;
//   const windowWidth = window.innerWidth;
//   const scaleX = windowWidth / 1440;
//   const scale = Math.min(scaleX);
//   app.style.transform = `scale(${scale})`;
//   // wrapper.style.transform = `scale(${scale})`;
//   app.style.transformOrigin = 'top center'
//   console.log('缩放比例:', scale);
// };
// onUnmounted(() => {
//   window.removeEventListener('resize', scalePage);
// });
</script>
<template>
  <div id="BasicLayout">
    <a-layout class="container">
      <a-layout-header id="header"><GlobalHead /></a-layout-header>
      <a-layout-content id="main" class="content"><router-view /></a-layout-content>
    </a-layout>
  </div>
</template>
<style scoped>
*{
  margin: 0;
  padding: 0 ;
  list-style: none;
  text-decoration: none;
}
#BasicLayout .container {
  min-height: 100px;
  display: flex;
  background-color: #fff9f0;
  align-items: center;
  justify-content: center;
}
#BasicLayout .content{
  flex: 1;
  padding-top: 100px;
}
</style>

