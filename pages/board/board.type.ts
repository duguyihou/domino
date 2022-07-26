import type { SortingStrategy } from '@dnd-kit/sortable'

import { ColumnsDTO } from '../../components/column'

export type BoardProps = {
  initialColumns: ColumnsDTO
  strategy?: SortingStrategy
}
