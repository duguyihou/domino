import { Dispatch, MutableRefObject, SetStateAction } from 'react'

import type { DragOverEvent } from '@dnd-kit/core'

import { ColumnsDTO } from '../../components/column'
import { findContainer } from '../../utils/findContainer'

type OnDragOverArgs = {
  onDragOverArgs: {
    columns: ColumnsDTO
    setColumns: Dispatch<SetStateAction<ColumnsDTO>>
    recentlyMovedToNewContainer: MutableRefObject<boolean>
  }
}
export const useOnDragOver = ({ onDragOverArgs }: OnDragOverArgs) => {
  const { columns, setColumns, recentlyMovedToNewContainer } = onDragOverArgs
  const onDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id
    if (!overId || active.id in columns) return

    const overContainer = findContainer(overId, columns)
    const activeContainer = findContainer(active.id, columns)

    if (!overContainer || !activeContainer) return

    if (activeContainer !== overContainer) {
      setColumns((columns) => {
        const activeItems = columns[activeContainer]
        const overItems = columns[overContainer]
        const activeItemIds = activeItems.map(({ id }) => id)
        const overItemIds = overItems.map(({ id }) => id)
        const overIndex = overItemIds.indexOf(overId as string)
        const activeIndex = activeItemIds.indexOf(active.id as string)

        let newIndex: number

        if (overId in columns) {
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
          ...columns,
          [activeContainer]: columns[activeContainer].filter(
            (item) => item.id !== active.id
          ),
          [overContainer]: [
            ...columns[overContainer].slice(0, newIndex),
            columns[activeContainer][activeIndex],
            ...columns[overContainer].slice(
              newIndex,
              columns[overContainer].length
            ),
          ],
        }
      })
    }
  }
  return onDragOver
}
