import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { DEMO_LINES, DEFAULT_LINE_CONFIG } from '../shapes/line/constants'
import type { Line } from '@src/shapes/line/types'
import { InflectionPoint, MiddleInflectionPoint } from '@src/shapes/line/types'

const useLineStore = defineStore('line', () => {
  const data = ref<Line[]>([...DEMO_LINES])

  /* selected line */
  const infPoints = ref<InflectionPoint[]>([])
  const midInfPoints = computed(() => {
    return (
      infPoints.value.map((infPoint, idx) => {
        if (idx === 0) return

        const prevInfPoint = infPoints.value[idx - 1]
        const x = (prevInfPoint.x + infPoint.x) / 2
        const y = (prevInfPoint.y + infPoint.y) / 2
        const prev = prevInfPoint
        const next = infPoint
        return { x, y, prev, next }
      }) as MiddleInflectionPoint[]
    ).slice(1)
  })
  const selectedLine = computed(() => infPoints.value.map((infPoint) => [infPoint.x, infPoint.y]).flat())
  const props = ref<Partial<Line>>({ ...DEFAULT_LINE_CONFIG })

  const drawLine = () => {}
  const deleteLine = () => {}

  return { data, infPoints, midInfPoints, props, selectedLine, drawLine, deleteLine }
})

export default useLineStore
