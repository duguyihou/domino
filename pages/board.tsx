import React from 'react'

import { DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { Column } from '../components/column'
import { SortableCard } from '../components/sortableCard'
import { useBoard } from '../hooks/useBoard'
import styles from '../styles/board.module.scss'
import { BoardProps, Cards } from '../types/board'
import { getIndex } from '../utils/getIndex'

const Board = (boardProps: BoardProps) => {
  const {
    initialCards,
    getItemStyles = () => ({}),
    strategy = verticalListSortingStrategy,
  } = boardProps

  const { dndContextConfig, columns, items, handleRemove } =
    useBoard(initialCards)

  const renderDroppableColumns = () => {
    return columns.map((columnId) => (
      <Column
        key={columnId}
        label={`Column ${columnId}`}
        onRemove={() => handleRemove(columnId)}
        droppableProps={{ id: columnId, items: items[columnId] }}
      >
        <SortableContext items={items[columnId]} strategy={strategy}>
          {items[columnId].map((value, index) => {
            const sortableCardProps = {
              id: value,
              index,
              columnId,
              getIndex,
              style: getItemStyles,
              items: items[columnId] as unknown as Cards,
            }
            return <SortableCard key={value} {...{ sortableCardProps }} />
          })}
        </SortableContext>
      </Column>
    ))
  }
  return (
    <DndContext {...dndContextConfig}>
      <div className={styles.container}>
        <SortableContext items={columns} strategy={strategy}>
          {renderDroppableColumns()}
        </SortableContext>
      </div>
    </DndContext>
  )
}

export default Board
