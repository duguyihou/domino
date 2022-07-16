import { Dispatch, SetStateAction } from 'react'

import { Task } from '../../pages/board'
import { ColumnName } from '../../utils/constants'
export type CardProps = {
  name: string
  index: number
  currentColumnName: keyof typeof ColumnName
  moveCardHandler: (dragIndex: number, hoverIndex: number) => void
  setItems: Dispatch<SetStateAction<Task[]>>
}
