import React, { useState } from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Card } from '../components/Card'
import { Column } from '../components/Column'
import { ColumnName, tasks } from '../utils/constants'

export type Task = {
  id: number
  name: string
  column: string
}
const Board = () => {
  const [items, setItems] = useState<Task[]>(tasks)
  const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
    setItems((prevState) => {
      const dragItem = items[dragIndex]
      const coppiedStateArray = [...prevState]
      const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem)
      coppiedStateArray.splice(dragIndex, 1, prevItem[0])
      return coppiedStateArray
    })
  }

  const itemsForColumn = (columnName) => {
    return items
      .filter((item) => item.column === columnName)
      .map((item, index) => (
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
  const columns = [
    ColumnName.ToDo,
    ColumnName.InProgress,
    ColumnName.AwaitingReview,
    ColumnName.Done,
  ]
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        {columns.map((column) => (
          <Column key={column} title={column}>
            {itemsForColumn(column)}
          </Column>
        ))}
      </DndProvider>
    </div>
  )
}

export default Board
