import { Dispatch, SetStateAction } from 'react'

import { Issue } from '../../types'

export type CardProps = {
  card: {
    title: string
    assignTo: string
    hasDescription: boolean
    newComments: number
  }
  index: number
  currentColumnName: string
  moveCardHandler: (dragIndex: number, hoverIndex: number) => void
  setItems: Dispatch<SetStateAction<Issue[]>>
}

export type DropResult = {
  dropEffect: string
  name: string
}

export type HoverItem = {
  index: number
  card: {
    title: string
    assignTo: string
    hasDescription: boolean
    newComments: number
  }
  currentColumnName: string
}
