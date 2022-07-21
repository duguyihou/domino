export type Issue = {
  id: number
  card: {
    title: string
    assignTo: string
    hasDescription: boolean
    newComments: number
  }
  column: string
}
