<template>
  <div id="NewPage" class="back">
    <div class="new">
      <div class="buttonPace">
          <div class="btnSpace">
            <button @click="clean"  class="btnStyle">
            <img src="/back.png" alt="back">取消
            </button>
            <button @click="publish" class="btnStyle">
            发布<img src="/publish.png" alt="publish">
          </button>
        </div>
      </div>
      <div class="headPace">
        <input
        v-model="title"
        placeholder="文章标题"
        class="titleInput"
        />
      </div>
      <div class="editorSpace">
        <div class="editPanl">
          <textarea v-model="content" @input="handleInput" placeholder="文本内容"
          class="markdownTextarea"
        ></textarea>
        </div>
        <div class="previewPanl">
          <div class="previewContent" v-html="renderedContent"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { marked } from 'marked';
import { ref, computed, onMounted } from 'vue';
// import hljs from 'highlight.js'
import '/node_modules/highlight.js/styles/github-dark.css'
import { PushArticle } from '@/api/user';
import { useStoreHelper } from '@/components/useStoreHelper';
import { useRouter } from 'vue-router';
import DOMPurify from 'dompurify'

const title=ref('');
const content=ref('');
const {data}=useStoreHelper();
marked.setOptions({
  gfm: true,
  breaks: true,
  // highlight: (code, lang) => {
  //   if (lang && hljs.getLanguage(lang)) {
  //     return hljs.highlight(code, { language: lang }).value
  //   }
  //   return hljs.highlightAuto(code).value
  // }
})

const renderedContent = computed(() => {
  console.log(21654)
  if (!content.value) return '<p class="empty-state">✨ 开始编写...</p>'
  const processedContent = content.value.replace(/^( +)/gm, (match) => {
    return '&nbsp;'.repeat(match.length);
  });
  const dirtyHTML = marked.parse(processedContent) as string
  return DOMPurify.sanitize(dirtyHTML)
})

// const wordCount = computed(() =>{
//   return content.value.length || 0
// })

const handleInput = () =>{
  console.log('内容更新');
}

const publish = async ()=>{
  if(!title.value){
    alert('请输入标题')
    return
  }
  const article = {
    title: title.value,
    content: content.value,
    html: renderedContent.value,
    timestamp: new Date().toString()
  }
  const result = await PushArticle(article,data.value.token)
  if(result.data.code==200)
  {
    console.log('发布文章:', article)
    router.push('/home')
    alert(`文章《${title.value}》已发布！`)
  }
  else{
    alert(`错误!《${result.data.img}》`)
  }
}

const clean= ()=>{
  title.value='';
  content.value='';
  return
}
const router=useRouter()
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
  /* min-width: 1280px;
  min-height: 807px; */
  justify-content: center;
  align-items: flex-start;
}
.new{
  width: 1120px;
  height: 760px;
  border-radius: 16px;
  background-color: #ffffff;
  margin-bottom: 47px;
}
.buttonPace{
  width: 1120px;
  height: 56px;
  display: flex;
  justify-content: flex-end;
}
.headPace{
  width: 1120px;
  height: 64px;
  display: flex;
  margin-top: 4px;
  margin-bottom: 33px;
}
.titleInput{
  width: 658.4px;
  height: 64px;
  border: none;
  outline: none;
  font-size: 32px;
  line-height: 40px;
  font-family: STFangsong;
}
.btnSpace{
  width: 297px;
  height: 56px;
  padding: 7px;
  display: flex;
  flex-wrap: nowrap;
  gap: 27px;
}
.btnSpace img{
  width: 24px;
  height: 24px;
  color: #ffffff;
}
.btnStyle{
  width: 128px;
  height: 42px;
  border-radius: 100px;
  background-color: #514532;
  opacity: 70%;
  border: none;
  padding: 9px 25px;
  color: #ffffff;
  font-size: 20px;
  line-height: 28px;
  font-family: STFangsong;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}
.editorSpace{
  width: 1120px;
  height: 563px;
  display: flex;
  flex-wrap: nowrap;
}
.editPanl{
  width: 550px;
  height: 563px;
  margin-right: 20px;
}
.markdownTextarea{
  width: 550px;
  height: 563px;
  border: none;
  outline: none;
  font-size: 20px;
  line-height: 28px;
  font-family: STFangsong;
  resize: none;
}
.previewPanl{
  width: 550px;
  height: 563px;
}
.previewContent{
  width: 550px;
  height: 563px;
  border: none;
  outline: none;
  font-size: 20px;
  line-height: 1.5;
  font-family: STFangsong;
  color: #000;
  overflow-y: auto;
  overflow-x: hidden;
  word-break: break-all;
  padding-right: 10px;
}
</style>
