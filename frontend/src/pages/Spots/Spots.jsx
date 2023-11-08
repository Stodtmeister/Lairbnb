import { useDispatch } from 'react-redux'
import './Spots.css'
import { useEffect } from 'react'
import { getAllSpots, useSpots } from '../../store/spots'
import { PreviewImage } from '../../components'

export default function Spots() {
  const dispatch = useDispatch()
  const spots = useSpots()

  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])


  return (
    <>
      <h1>spots</h1>
      <div className="spot-grid">
        {spots.map(spot => (
          <PreviewImage key={spot.id} {...spot} />
        ))}
      </div>
    </>
  )
}
