import { Line } from '@src/shapes/line/types'

export type ShapeName =
  | 'Rect'
  | 'Circle'
  | 'Ellipse'
  | 'Wedge'
  | 'Line'
  | 'Sprite'
  | 'Image'
  | 'Text'
  | 'Star'
  | 'Ring'
  | 'Path'
  | 'RegularPolygon'
  | 'Arrow'
  | 'Custom'

export type ShapesDataUnion = Line

export type StageData = Partial<Record<Uncapitalize<ShapeName>, ShapesDataUnion[]>>

// TODO
export interface SelectedShape {
  type: ShapeName | null
  data?: ShapesDataUnion
}
