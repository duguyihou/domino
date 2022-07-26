import type { UniqueIdentifier } from '@dnd-kit/core'

import { Columns } from '../types/board'

export const findContainer = (id: UniqueIdentifier, items: Columns) => {
  if (id in items) return id
  return Object.keys(items).find((key) =>
    items[key].map(({ id }) => id).includes(id as string)
  )
}
