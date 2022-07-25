import React from 'react'

import { DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { Card } from '../components/card'
import { Column } from '../components/column'
import { useBoard } from '../hooks'
import styles from '../styles/board.module.scss'
import { BoardProps } from '../types/board'

const Board = (boardProps: BoardProps) => {
  const { initialCards, strategy = verticalListSortingStrategy } = boardProps

  const { dndContextConfig, columns, items, handleRemove } =
    useBoard(initialCards)

  const Columns = () => {
    return (
      <>
        {columns.map((columnId) => (
          <Column
            key={columnId}
            label={`Column ${columnId}`}
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
        <SortableContext items={columns} strategy={strategy}>
          <Columns />
        </SortableContext>
      </div>
    </DndContext>
  )
}

export default Board
