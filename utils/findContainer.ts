import type { UniqueIdentifier } from '@dnd-kit/core'

import { Cards } from '../types/board'

export const findContainer = (id: UniqueIdentifier, items: Cards) => {
  if (id in items) return id
  return Object.keys(items).find((key) => items[key].includes(id as string))
}
