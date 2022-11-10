import { InflectionPoint } from '@src/shapes/line/types'

export const Flat2Coor = (FlatCoorArray: number[]) => {
  const res: InflectionPoint[] = []
  for (let i = 0; i < FlatCoorArray.length; i += 2) {
    res.push({ x: FlatCoorArray[i], y: FlatCoorArray[i + 1] })
  }
  return res
}
