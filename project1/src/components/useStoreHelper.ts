import { useAutherStore } from '@/stores/auther'
import { storeToRefs } from 'pinia'
import {  watch } from 'vue'

export function useStoreHelper() {
  const store = useAutherStore()
  const { LoginAuther } = storeToRefs(store)

  // 1. 通用更新函数
  const updateField = <K extends keyof typeof LoginAuther.value>(
    field: K,
    value: typeof LoginAuther.value[K]
  ) => {
    store.setField(field, value)
  }

  // 2. 批量更新
  const updateMultiple = (data: Partial<typeof LoginAuther.value>) => {
    store.updateProfile(data)
  }

  // 3. 获取单个字段
  const getField = <K extends keyof typeof LoginAuther.value>(field: K) => {
    return LoginAuther.value[field]
  }

  // 4. 获取所有数据
  const getAll = () => {
    return LoginAuther.value
  }

  // 5. 监听字段变化
  const onFieldChange = <K extends keyof typeof LoginAuther.value>(
    field: K,
    callback: (newVal: typeof LoginAuther.value[K], oldVal: typeof LoginAuther.value[K]) => void
  ) => {
    watch(() => LoginAuther.value[field], callback)
  }

  // 6. 便捷的计数器操作
  const incrementArticle = () => {
    store.incrementArticleCount()
  }

  const incrementLike = () => {
    store.incrementLikeCount()
  }

  // 7. 重置所有
  const resetAll = () => {
    store.resetProfile()
  }

  return {
    // 响应式数据
    data: LoginAuther,

    // 更新方法
    updateField,
    updateMultiple,
    incrementArticle,
    incrementLike,
    resetAll,

    // 获取方法
    getField,
    getAll,

    // 监听方法
    onFieldChange,

    store
  }
}
