import React from 'react'

import { DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { Card } from '../../components/card'
import { Column } from '../../components/column'
import { initialColumns } from '../../mock'
import styles from './board.module.scss'
import { useBoard } from './hooks'

const Board = () => {
  const { dndContextConfig, columnNames, columns } = useBoard(initialColumns)
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
              {columns[columnName].map((value, index) => (
                <Card key={value.id} value={value} index={index} />
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
