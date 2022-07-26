import type { UniqueIdentifier } from '@dnd-kit/core'

export type CardDTO = {
  id: UniqueIdentifier
  title: string
  description: string
  label: string
  priority: string
}

export type CardSortableProps = {
  id: string
}

export type CardProps = {
  index: number
  value: CardDTO
}
