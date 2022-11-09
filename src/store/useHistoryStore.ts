import { reactive, Ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useRefHistory } from '@vueuse/core'
import useStageStore from '@src/store/useStageStore'
import { StageData } from '@src/types/shapes'

const useHistoryStore = defineStore('history', () => {
  const stageStore = useStageStore()
  const { data }: { data: Ref<StageData> } = storeToRefs(stageStore)

  const { undo, redo, history } = useRefHistory(data, {
    capacity: 100,
  })

  const snapshots: StageData[] = reactive([])

  const saveSnapshot = () => {
    const snapshot = history.value.at(-1)
    if (snapshot) snapshots.push(snapshot.snapshot)
  }
  const applySnapshot = (index: number) => {
    data.value = snapshots[index]
  }

  return { snapshots, history, undo, redo, saveSnapshot, applySnapshot }
})

export default useHistoryStore
