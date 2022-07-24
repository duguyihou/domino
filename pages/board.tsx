import React from 'react'

import { DndContext } from '@dnd-kit/core'
import type { UniqueIdentifier } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { DroppableContainer } from '../components/droppableContainer'
import { SortableCard } from '../components/sortableCard'
import { useBoard } from '../hooks/useBoard'
import styles from '../styles/board.module.scss'
import { BoardProps } from '../types/board'
import { getIndex } from '../utils/getIndex'

const PLACEHOLDER_ID = 'placeholder'
const empty: UniqueIdentifier[] = []

const Board = (boardProps: BoardProps) => {
  const {
    initialCards,
    containerStyle,
    getItemStyles = () => ({}),
    renderItem,
    strategy = verticalListSortingStrategy,
  } = boardProps

  const {
    dndContextConfig,
    containers,
    items,
    isSortingContainer,
    handleAddColumn,
    handleRemove,
  } = useBoard(initialCards)

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
            return (
              <SortableCard
                disabled={isSortingContainer}
                key={value}
                id={value}
                index={index}
                style={getItemStyles}
                renderItem={renderItem}
                containerId={containerId}
                getIndex={getIndex}
              />
            )
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
          <DroppableContainer
            id={PLACEHOLDER_ID}
            disabled={isSortingContainer}
            items={empty}
            onClick={handleAddColumn}
            placeholder
          >
            + Add column
          </DroppableContainer>
        </SortableContext>
      </div>
    </DndContext>
  )
}

export default Board
