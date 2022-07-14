import { ColumnName } from '../../../utils/constants'

export type MovableCardProps = {
  name: string
  index: number
  currentColumnName: keyof typeof ColumnName
  moveCardHandler: () => void
  setItems: () => void
}
