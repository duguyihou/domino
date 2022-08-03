import React from 'react'

import { DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { Card } from '../../components/card'
import { Column } from '../../components/column'
import styles from './board.module.scss'
import { useBoard, useGetColumns } from './hooks'

const Board = () => {
  const { loading, error, data } = useGetColumns()

  const { dndContextConfig, columnNames, columns } = useBoard(data)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  const Columns = () => {
    return (
      <>
        {columnNames.map((columnName) => (
          <Column
            key={columnName}
            label={columnName}
            droppableProps={{ id: columnName, cards: columns[columnName] }}
          >
            <SortableContext
              items={columns[columnName].map((e) => e.id)}
              strategy={verticalListSortingStrategy}
            >
              {columns[columnName].map((card) => (
                <Card key={card.id} card={card} />
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
        <SortableContext
          items={columnNames}
          strategy={verticalListSortingStrategy}
        >
          <Columns />
        </SortableContext>
      </div>
    </DndContext>
  )
}

export default Board
