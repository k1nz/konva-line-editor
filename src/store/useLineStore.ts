import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { DEFAULT_LINE_CONFIG } from '../components/line/constants'
import type { LineData } from '@src/types/shapes'

const useLineStore = defineStore('line', () => {
  const data: LineData[] = reactive([])
  const properties = reactive({ ...DEFAULT_LINE_CONFIG })

  const drawLine = () => {}
  const deleteLine = () => {}

  return { data, drawLine, deleteLine }
})

export default useLineStore
