import { Cards } from '../types/board'
import { findContainer } from './findContainer'

export const getIndex = (id: string, items: Cards) => {
  if (!items) return
  const container = findContainer(id, items)
  if (!container) return -1
  const index = items[container].indexOf(id)
  return index
}
