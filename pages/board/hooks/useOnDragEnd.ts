import { Dispatch, SetStateAction } from 'react'

import type { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { ColumnsDTO } from '../../../components/column'
import { findContainer } from '../../../utils/findContainer'

type OnDragEndArgs = {
  onDragEndArgs: {
    setActiveId: Dispatch<SetStateAction<UniqueIdentifier | null>>
    setColumnNames: Dispatch<SetStateAction<string[]>>
    setColumns: Dispatch<SetStateAction<ColumnsDTO>>
    columns: ColumnsDTO
  }
}

export const useOnDragEnd = ({ onDragEndArgs }: OnDragEndArgs) => {
  const { setActiveId, setColumnNames, columns, setColumns } = onDragEndArgs

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!columns) return
    if (active.id in columns && over?.id) {
      setColumnNames((containers) => {
        const activeIndex = containers.indexOf(active.id as string)
        const overIndex = containers.indexOf(over.id as string)

        return arrayMove(containers, activeIndex, overIndex)
      })
    }

    const activeContainer = findContainer(active.id, columns)

    if (!activeContainer) {
      setActiveId(null)
      return
    }

    const overId = over?.id

    if (!overId) {
      setActiveId(null)
      return
    }

    const overContainer = findContainer(overId, columns)

    if (overContainer) {
      const activeIndex = columns[activeContainer]
        .map((card) => card.id)
        .indexOf(active.id)
      const overIndex = columns[overContainer]
        .map((card) => card.id)
        .indexOf(overId as string)

      if (activeIndex !== overIndex) {
        setColumns((columns) => ({
          ...columns,
          [overContainer]: arrayMove(
            columns[overContainer],
            activeIndex,
            overIndex
          ),
        }))
      }
    }

    setActiveId(null)
  }
  return onDragEnd
}
