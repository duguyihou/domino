import { ReactNode, CSSProperties, HTMLAttributes } from 'react'

export type ColumnProps = {
  children: ReactNode
  label?: string
  style?: CSSProperties
  hover?: boolean
  handleProps?: HTMLAttributes<HTMLButtonElement>
  onRemove?(): void
}
