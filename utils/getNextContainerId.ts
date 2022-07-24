import { Cards } from '../types/board'

export const getNextContainerId = (items: Cards) => {
  const containeIds = Object.keys(items)
  const lastContaineId = containeIds[containeIds.length - 1]

  return String.fromCharCode(lastContaineId.charCodeAt(0) + 1)
}
