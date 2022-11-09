import { reactive } from 'vue'
import { defineStore } from 'pinia'
import useLineStore from '@src/store/useLineStore'
import type { StageData } from '@src/types/shapes'

const useStageStore = defineStore('stage', () => {
  const { data: line } = useLineStore()

  const data = reactive({
    line,
  } as StageData)

  return { data }
})

export default useStageStore
