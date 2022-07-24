import React from 'react'

import { DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { DroppableContainer } from '../components/droppableContainer'
import { SortableCard } from '../components/sortableCard'
import { useBoard } from '../hooks/useBoard'
import styles from '../styles/board.module.scss'
import { BoardProps, Cards } from '../types/board'
import { getIndex } from '../utils/getIndex'

const PLACEHOLDER_ID = 'placeholder'

const Board = (boardProps: BoardProps) => {
  const {
    initialCards,
    containerStyle,
    getItemStyles = () => ({}),
    strategy = verticalListSortingStrategy,
  } = boardProps

  const { dndContextConfig, containers, items, handleRemove } =
    useBoard(initialCards)

  const renderDroppableContainers = () => {
    return containers.map((containerId) => (
      <DroppableContainer
        key={containerId}
        id={containerId}
        label={`Column ${containerId}`}
        items={items[containerId]}
        style={containerStyle}
        onRemove={() => handleRemove(containerId)}
      >
        <SortableContext items={items[containerId]} strategy={strategy}>
          {items[containerId].map((value, index) => {
            const sortableCardProps = {
              id: value,
              index,
              containerId,
              getIndex,
              style: getItemStyles,
              items: items[containerId] as unknown as Cards,
            }
            return <SortableCard key={value} {...{ sortableCardProps }} />
          })}
        </SortableContext>
      </DroppableContainer>
    ))
  }
  return (
    <DndContext {...dndContextConfig}>
      <div className={styles.container}>
        <SortableContext
          items={[...containers, PLACEHOLDER_ID]}
          strategy={strategy}
        >
          {renderDroppableContainers()}
        </SortableContext>
      </div>
    </DndContext>
  )
}

export default Board
