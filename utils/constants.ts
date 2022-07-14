export enum ColumnName {
  ToDo = 'TO DO',
  InProgress = 'In Progress',
  AwaitingReview = 'Awaiting review',
  Done = 'Done',
}

export const tasks = [
  { id: 1, name: 'Item 1', column: ColumnName.ToDo },
  { id: 2, name: 'Item 2', column: ColumnName.ToDo },
  { id: 3, name: 'Item 3', column: ColumnName.ToDo },
  { id: 4, name: 'Item 4', column: ColumnName.ToDo },
]
