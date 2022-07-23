export type SortableCardProps = {
  containerId: string
  id: string
  index: number
  handle: boolean
  disabled?: boolean
  style(args: any): React.CSSProperties
  getIndex(id: string): number
  renderItem():
    | (() => React.ReactElement<any, string | React.JSXElementConstructor<any>>)
    | undefined
  wrapperStyle({ index }: { index: number }): React.CSSProperties
}
