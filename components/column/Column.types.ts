import { ReactNode, CSSProperties, HTMLAttributes } from 'react'

export type ColumnProps = {
  children: ReactNode
  label?: string
  style?: CSSProperties
  horizontal?: boolean
  hover?: boolean
  handleProps?: HTMLAttributes<HTMLDivElement | HTMLButtonElement>
  scrollable?: boolean
  shadow?: boolean
  placeholder?: boolean
  unstyled?: boolean
  onClick?(): void
  onRemove?(): void
}
