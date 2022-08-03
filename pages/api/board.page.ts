// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { ColumnsDTO } from '../../components/column'
import { initialColumns } from '../../mock'

type Data = {
  initialColumns: ColumnsDTO
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  sleep(2000)
  res.status(200).json({ initialColumns })
}
