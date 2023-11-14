
import { useDispatch } from 'react-redux'
import './UpdateSpot.css'
import { useSpots } from '../../store/spots'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

export default function UpdateSpot() {
  const dispatch = useDispatch()
  const spotInfo = useSpots()
  const { spotId } = useParams()

  useEffect(() => {

  }, [dispatch])

  console.log(spotInfo)
  return <h3>UpdateSpot</h3>
}
