import { reactive } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import useLineStore from '@src/store/useLineStore'
import type { StageData, SelectedShape, ShapesDataUnion } from '@src/types/shapes'

const useStageStore = defineStore('stage', () => {
  const lineStore = useLineStore()
  const { data: line } = storeToRefs(lineStore)

  const data = reactive({
    line,
    circle: [],
    ellipse: [],
    wedge: [],
    sprite: [],
    image: [],
    text: [],
    star: [],
    ring: [],
    path: [],
    regularPolygon: [],
    arrow: [],
    custom: [],
  } as unknown as StageData)

  const selectedShape: SelectedShape = reactive({
    type: null,
    data: null,
  })

  const select = (type: NonNullable<SelectedShape['type']>, shapeIndex: number) => {
    if (data[type] === null) return

    const select = data[type].splice(shapeIndex, 1)
    Object.assign(selectedShape, { type, data: select })
  }
  const unselect = (newData: ShapesDataUnion) => {
    const { type: selectedType, data: selectedData } = selectedShape
    if (selectedType === null || selectedData === null) return
    data[selectedType]?.push(newData ?? selectedData)
    Object.assign(selectedShape, { type: null, data: null })
  }

  return { data, selectedShape, select, unselect }
})

export default useStageStore
