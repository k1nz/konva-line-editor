import { reactive } from 'vue'
import { defineStore } from 'pinia'
import useLineStore from '@src/store/useLineStore'
import type { StageData, SelectedShape } from '@src/types/shapes'

const useStageStore = defineStore('stage', () => {
  const { data: line } = useLineStore()

  const data: StageData = reactive({
    line,
  })

  const selectedShape: SelectedShape = {
    type: null,
    data: undefined,
  }

  return { data, selectedShape }
})

export default useStageStore
