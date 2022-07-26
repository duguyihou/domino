import type { UniqueIdentifier } from '@dnd-kit/core'
import type { SortingStrategy } from '@dnd-kit/sortable'

export type Card = {
  id: UniqueIdentifier
  title: string
  description: string
  label: string
  priority: string
}
export type Columns = Record<UniqueIdentifier, Card[]>
export type BoardProps = {
  initialColumns: Columns
  strategy?: SortingStrategy
}
