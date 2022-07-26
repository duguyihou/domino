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
      Todo: [
        {
          id: 'a1',
          title: 'A1',
          description: 'desc for A1',
          label: 'epic',
          priority: 'low',
        },
        {
          id: 'a2',
          title: 'A2',
          description: 'desc for A2',
          label: 'epic',
          priority: 'low',
        },
        {
          id: 'a3',
          title: 'A3',
          description: 'desc for A3',
          label: 'epic',
          priority: 'low',
        },
        {
          id: 'a4',
          title: 'A4',
          description: 'desc for A4',
          label: 'epic',
          priority: 'low',
        },
      ],
      Doing: [
        {
          id: 'b1',
          title: 'B1',
          description: 'desc for B1',
          label: 'epic',
          priority: 'low',
        },
        {
          id: 'b2',
          title: 'B2',
          description: 'desc for B2',
          label: 'epic',
          priority: 'low',
        },
        {
          id: 'b3',
          title: 'B3',
          description: 'desc for B3',
          label: 'epic',
          priority: 'low',
        },
        {
          id: 'b4',
          title: 'B4',
          description: 'desc for B4',
          label: 'epic',
          priority: 'low',
        },
      ],
      Done: [
        {
          id: 'c1',
          title: 'C1',
          description: 'desc for C1',
          label: 'epic',
          priority: 'low',
        },
        {
          id: 'c2',
          title: 'C2',
          description: 'desc for C2',
          label: 'epic',
          priority: 'low',
        },
        {
          id: 'c3',
          title: 'C3',
          description: 'desc for C3',
          label: 'epic',
          priority: 'low',
        },
        {
          id: 'c4',
          title: 'C4',
          description: 'desc for C4',
          label: 'epic',
          priority: 'low',
        },
      ],
    },
    strategy = verticalListSortingStrategy,
  } = boardProps

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
              strategy={strategy}
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
        <SortableContext items={columnNames} strategy={strategy}>
          <Columns />
        </SortableContext>
      </div>
    </DndContext>
  )
}

export default Board
