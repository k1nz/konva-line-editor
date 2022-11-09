import { ref } from 'vue'
import { defineStore } from 'pinia'

const useGlobalStore = defineStore('global', () => {
  const darkMode = ref(true)

  return { darkMode }
})

export default useGlobalStore
