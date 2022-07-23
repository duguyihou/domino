import type { UniqueIdentifier } from '@dnd-kit/core'

import { ColumnProps } from '../column'

export type DroppableContainerProps = ColumnProps & {
  disabled?: boolean
  id: string
  items: UniqueIdentifier[]
  style?: React.CSSProperties
}
