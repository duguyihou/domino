import { useRef, useState } from 'react'

import type { DragOverEvent, DragEndEvent } from '@dnd-kit/core'
import {
  MeasuringStrategy,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensors,
  useSensor,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'

import { ColumnsDTO } from '../../../components/column'
import { findContainer } from '../../../utils/findContainer'

export const useBoard = (data: any) => {
  const [columns, setColumns] = useState<ColumnsDTO>(data?.initialColumns)
  const [columnNames, setColumnNames] = useState(Object.keys(columns))
  const recentlyMovedToNewContainer = useRef(false)
  const [clonedColumns, setClonedColumns] = useState<ColumnsDTO | null>(null)

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const measuring = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
  }
  // onDragStart
  const onDragStart = () => setClonedColumns(columns)

  // onDragOver
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
  // onDragEnd
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
    if (!activeContainer) return
    const overId = over?.id
    if (!overId) return
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
  }
  // onDragCancel
  const onDragCancel = () => {
    if (clonedColumns) setColumns(clonedColumns)
    setClonedColumns(null)
  }

  const dndContextConfig = {
    sensors,
    measuring,
    onDragStart,
    onDragOver,
    onDragEnd,
    onDragCancel,
  }
  return {
    dndContextConfig,
    columnNames,
    columns,
  }
}
