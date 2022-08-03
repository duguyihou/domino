import { useQuery } from '@apollo/client'

import { ColumnsDTO } from '../../../components/column'
import { GET_COLUMNS, GET_LOCATIONS } from '../../../graphql/GET_LOCATIONS'

export const useGetColumns = () => {
  const { loading, error, data } = useQuery<ColumnsDTO>(GET_LOCATIONS)
  return { loading, error, data }
}
