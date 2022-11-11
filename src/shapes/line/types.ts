import { Coordinate } from '@src/shapes/types'

export type InflectionPoint = Coordinate
export interface MiddleInflectionPoint extends Coordinate {
  prev?: Coordinate
  next?: Coordinate
}

export interface Line {
  points: number[]
  line_width: number
  line_color: string
}

// TODO
export interface SelectedLine {
  infPoints: InflectionPoint[]

}
export type SelectedLineRecord = SelectedLine[]
