import { LineData } from '@src/types/shapes'

export const DEFAULT_LINE_CONFIG: LineData = {
  points: [],
  line_width: 8,
  line_color: '#666',
}

export const DEFAULT_LINE: LineData[] = [
  {
    points: [100, 100, 200, 100, 200, 200, 100, 200],
    line_width: 8,
    line_color: '#666',
  },
  {
    points: [300, 100, 400, 100, 400, 200, 300, 200],
    line_width: 8,
    line_color: '#666',
  },
]
