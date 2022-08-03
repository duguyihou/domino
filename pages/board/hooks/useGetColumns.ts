import { useQuery } from '@apollo/client'

import { ColumnsDTO } from '../../../components/column'
import { GET_COLUMNS } from '../../../graphql/GET_LOCATIONS'

export const useGetColumns = () => {
  const { loading, error, data } = useQuery<ColumnsDTO>(GET_COLUMNS)
  return { loading, error, data }
}
