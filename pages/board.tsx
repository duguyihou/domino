import React, { useState } from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Card } from '../components/card'
import { Column } from '../components/column'
import styles from '../styles/board.module.scss'
import { Issue } from '../types'
import { issues } from '../utils/constants'

const columns = ['ToDo', 'InProgress', 'AwaitingReview', 'Done']

const Board = () => {
  const [items, setItems] = useState<Issue[]>(issues)
  const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
    setItems((prevState) => {
      const dragItem = items[dragIndex]
      const coppiedStateArray = [...prevState]
      const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem)
      coppiedStateArray.splice(dragIndex, 1, prevItem[0])
      return coppiedStateArray
    })
  }

  const renderItemsForColumn = (columnName: string) => {
    const itemsForColumn = items.filter((item) => item.column === columnName)
    return itemsForColumn.map((item, index) => (
      <Card
        key={item.id}
        name={item.name}
        currentColumnName={item.column}
        setItems={setItems}
        index={index}
        moveCardHandler={moveCardHandler}
      />
    ))
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        {columns.map((column) => (
          <Column key={column} title={column}>
            {renderItemsForColumn(column)}
          </Column>
        ))}
      </div>
    </DndProvider>
  )
}

export default Board
