import type { UniqueIdentifier } from '@dnd-kit/core'

import { ColumnsDTO } from '../components/column'

export const findContainer = (id: UniqueIdentifier, items: ColumnsDTO) => {
  if (id in items) return id
  return Object.keys(items).find((key) =>
    items[key].map(({ id }) => id).includes(id as string)
  )
}
