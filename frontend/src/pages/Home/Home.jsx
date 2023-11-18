import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAllSpots, useSpots } from '../../store/spots'
import { Choices, PreviewImage } from '../../components'
import './Home.css'

export default function Home() {
  const dispatch = useDispatch()
  const spots = useSpots()

  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])

  console.log('SPOTS', spots);

  return (
    <>
      <Choices />
      <div className="spot-grid">
        {spots.map(spot => (
          <PreviewImage key={spot.id} {...spot} />
        ))}
      </div>
    </>
  )
}
