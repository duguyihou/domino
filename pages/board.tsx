import React from 'react'

import { DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { Card } from '../components/card'
import { Column } from '../components/column'
import { useBoard } from '../hooks'
import styles from '../styles/board.module.scss'
import { BoardProps } from '../types/board'

const Board = (boardProps: BoardProps) => {
  const {
    initialColumns = {
      Todo: ['A1', 'A2', 'A3'],
      Doing: ['B1', 'B2', 'B3'],
      Done: ['C1', 'C2', 'C3'],
    },
    strategy = verticalListSortingStrategy,
  } = boardProps

  const { dndContextConfig, columnNames, items, handleRemove } =
    useBoard(initialColumns)

  const Columns = () => {
    return (
      <>
        {columnNames.map((columnId) => (
          <Column
            key={columnId}
            label={columnId}
            onRemove={() => handleRemove(columnId)}
            droppableProps={{ id: columnId, items: items[columnId] }}
          >
            <SortableContext items={items[columnId]} strategy={strategy}>
              {items[columnId].map((value, index) => (
                <Card key={value} value={value} index={index} />
              ))}
            </SortableContext>
          </Column>
        ))}
      </>
    )
  }
  return (
    <DndContext {...dndContextConfig}>
      <div className={styles.container}>
        <SortableContext items={columnNames} strategy={strategy}>
          <Columns />
        </SortableContext>
      </div>
    </DndContext>
  )
}

export default Board
