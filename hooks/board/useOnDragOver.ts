import { Dispatch, MutableRefObject, SetStateAction } from 'react'

import type { DragOverEvent } from '@dnd-kit/core'

import { Cards } from '../../types/board'
import { findContainer } from '../../utils/findContainer'

type OnDragOverArgs = {
  onDragOverArgs: {
    items: Cards
    setItems: Dispatch<SetStateAction<Cards>>
    recentlyMovedToNewContainer: MutableRefObject<boolean>
  }
}
export const useOnDragOver = ({ onDragOverArgs }: OnDragOverArgs) => {
  const { items, setItems, recentlyMovedToNewContainer } = onDragOverArgs
  const onDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id
    if (!overId || active.id in items) return

    const overContainer = findContainer(overId, items)
    const activeContainer = findContainer(active.id, items)

    if (!overContainer || !activeContainer) return

    if (activeContainer !== overContainer) {
      setItems((items) => {
        const activeItems = items[activeContainer]
        const overItems = items[overContainer]
        const overIndex = overItems.indexOf(overId as string)
        const activeIndex = activeItems.indexOf(active.id as string)

        let newIndex: number

        if (overId in items) {
          newIndex = overItems.length + 1
        } else {
          const isBelowOverItem =
            over &&
            active.rect.current.translated &&
            active.rect.current.translated.top >
              over.rect.top + over.rect.height
          const modifier = isBelowOverItem ? 1 : 0

          newIndex =
            overIndex >= 0 ? overIndex + modifier : overItems.length + 1
        }

        recentlyMovedToNewContainer.current = true

        return {
          ...items,
          [activeContainer]: items[activeContainer].filter(
            (item) => item !== active.id
          ),
          [overContainer]: [
            ...items[overContainer].slice(0, newIndex),
            items[activeContainer][activeIndex],
            ...items[overContainer].slice(
              newIndex,
              items[overContainer].length
            ),
          ],
        }
      })
    }
  }
  return onDragOver
}
