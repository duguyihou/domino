import { HTMLAttributes, CSSProperties } from 'react'

export interface ActionProps extends HTMLAttributes<HTMLButtonElement> {
  active?: {
    fill: string
    background: string
  }
  cursor?: CSSProperties['cursor']
}
