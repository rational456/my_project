import { defineStore } from "pinia"
import { ref } from 'vue'


export const useAutherStore = defineStore('Auther', () => {
  const LoginAuther = ref({
    userId: 1,
    username: '老旅游客',
    token:"eyJhbGciOiJIUzI1NiJ9.xxx",
    account: "1234215456",
    password: "2135465341",
    avatar: 'public/head.png',
    intro: "专注Java后端开发，擅长SpringBoot/MyBatisPlus",
    position: "Java开发工程师",
    company: "字节跳动",
    articleCount: 5,
    likeCount: 4,
    isLoading: false,
  })

  // 1. 修改单个字段
  const setField = <K extends keyof typeof LoginAuther.value>(
    field: K,
    value: typeof LoginAuther.value[K]
  ) => {
    LoginAuther.value[field] = value
  }

  // 2. 批量修改多个字段
  const updateProfile = (data: Partial<typeof LoginAuther.value>) => {
    Object.assign(LoginAuther.value, data)
  }

  // 3. 专门修改头像（已有的）
  const setAvatar = (url: string) => {
    LoginAuther.value.avatar = url
  }

  // 4. 修改用户名
  const setUsername = (name: string) => {
    LoginAuther.value.username = name
  }

  // 5. 修改个人简介
  const setIntro = (intro: string) => {
    LoginAuther.value.intro = intro
  }

  // 6. 修改职位/公司信息
  const setJobInfo = (position: string, company: string) => {
    LoginAuther.value.position = position
    LoginAuther.value.company = company
  }

  // 7. 增加文章/点赞计数
  const incrementArticleCount = () => {
    LoginAuther.value.articleCount++
  }

  const incrementLikeCount = () => {
    LoginAuther.value.likeCount++
  }

  // 8. 重置所有数据
  const resetProfile = () => {
    LoginAuther.value = {
      userId: 1,
      username: '老旅游客',
      token:"eyJhbGciOiJIUzI1NiJ9.xxx",
      account: "1234215456",
      password: "2135465341",
      avatar: 'public/head.png',
      intro: "专注Java后端开发，擅长SpringBoot/MyBatisPlus",
      position: "Java开发工程师",
      company: "字节跳动",
      articleCount: 5,
      likeCount: 4,
      isLoading: false,
    }
  }

  // Getter 函数（已有的）
  const getUsername = () => {
    return LoginAuther.value.username
  }

  const getAvatar = () => {
    return LoginAuther.value.avatar
  }

  return {
    LoginAuther,
    setField,           // 通用修改
    updateProfile,      // 批量修改
    setAvatar,          // 修改头像
    setUsername,        // 修改用户名
    setIntro,           // 修改简介
    setJobInfo,         // 修改职位公司
    incrementArticleCount,  // 文章数+1
    incrementLikeCount,     // 点赞数+1
    resetProfile,           // 重置
    getUsername,
    getAvatar
  }
})
