import { useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import Image from 'next/image'

import { GET_LOCATIONS } from '../graphql/GET_LOCATIONS'

type Location = {
  id: string
  name: string
  description: string
  photo: string
}
const Home: NextPage = () => {
  const { loading, error, data } = useQuery(GET_LOCATIONS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  const { locations } = data
  return locations.map(({ id, name, description, photo }: Location) => (
    <div key={id}>
      <h3>{name}</h3>
      <Image width="400" height="250" alt="location-reference" src={photo} />
      <br />
      <b>About this location:</b>
      <p>{description}</p>
      <br />
    </div>
  ))
}

export default Home
