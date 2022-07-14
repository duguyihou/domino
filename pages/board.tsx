import React, { useState } from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Column } from '../components/Column'
import { MovableCard } from '../components/MovableCard'
import { ColumnName, tasks } from '../utils/constants'

const Board = () => {
  const [items, setItems] = useState(tasks)
  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex]
    if (dragItem) {
      setItems((prevState) => {
        const coppiedStateArray = [...prevState]
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem)
        coppiedStateArray.splice(dragIndex, 1, prevItem[0])
        return coppiedStateArray
      })
    }
  }

  const returnItemsFOrColumn = (columnName) => {
    return items
      .filter((item) => item.column === columnName)
      .map((item, index) => (
        <MovableCard
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
    <div>
      Board
      <DndProvider backend={HTML5Backend}>
        <Column title={ColumnName.ToDo}>
          {returnItemsFOrColumn(ColumnName.ToDo)}
        </Column>
        <Column title={ColumnName.InProgress}>
          {returnItemsFOrColumn(ColumnName.InProgress)}
        </Column>
        <Column title={ColumnName.AwaitingReview}>
          {returnItemsFOrColumn(ColumnName.AwaitingReview)}
        </Column>
        <Column title={ColumnName.Done}>
          {returnItemsFOrColumn(ColumnName.Done)}
        </Column>
      </DndProvider>
    </div>
  )
}

export default Board
