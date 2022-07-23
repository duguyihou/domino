import { ReactNode, CSSProperties, HTMLAttributes } from 'react'

export type ColumnProps = {
  children: ReactNode
  columns?: number
  label?: string
  style?: CSSProperties
  horizontal?: boolean
  hover?: boolean
  handleProps?: HTMLAttributes<any>
  scrollable?: boolean
  shadow?: boolean
  placeholder?: boolean
  unstyled?: boolean
  onClick?(): void
  onRemove?(): void
}
