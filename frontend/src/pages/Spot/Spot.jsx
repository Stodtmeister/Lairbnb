
import { useParams } from 'react-router'
import './Spot.css'

export default function Spot() {
  const { spotId } = useParams()

  return <h1>Spot</h1>
}
