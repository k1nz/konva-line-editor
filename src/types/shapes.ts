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

export interface LineData {
  points: number[]
  line_width: number
  line_color: string
}

export type ShapesDataUnion = LineData

export type StageData = Record<Uncapitalize<ShapeName>, ShapesDataUnion[]>

// TODO
export interface SelectedShape {
  type: ShapeName
  data: ShapesDataUnion
}
