import { Dispatch, SetStateAction } from 'react'

import { Issue } from '../../types'

export type CardProps = {
  name: string
  index: number
  currentColumnName: string
  moveCardHandler: (dragIndex: number, hoverIndex: number) => void
  setItems: Dispatch<SetStateAction<Issue[]>>
}
