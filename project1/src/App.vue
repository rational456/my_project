<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import BasicLayout from './Layouts/BasicLayout.vue';
// onMounted(() => {
//   scalePage();
//   window.addEventListener('resize', scalePage);
// });
// const scalePage = () => {
//   const app = document.getElementById('app');
//   if (!app) return;
//   const windowWidth = window.innerWidth;
//   const scaleX = windowWidth / 1440;
//   const scale = Math.min(scaleX);
//   app.style.transform = `scale(${scale})`;
//   console.log('缩放比例:', scale);
// };
// onUnmounted(() => {
//   window.removeEventListener('resize', scalePage);
// });

</script>
<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>
<style scoped>

</style>
