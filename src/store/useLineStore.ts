import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { DEFAULT_LINE_CONFIG } from '../shapes/line/constants'
import type { Line } from '@src/shapes/line/types'

const useLineStore = defineStore('line', () => {
  const data: Line[] = reactive([])
  const props = reactive({ ...DEFAULT_LINE_CONFIG })

  const drawLine = () => {}
  const deleteLine = () => {}

  return { data, props, drawLine, deleteLine }
})

export default useLineStore
