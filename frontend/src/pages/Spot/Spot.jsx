
import { useParams } from 'react-router'
import './Spot.css'
import { getSpotById, useSpots } from '../../store/spots'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function Spot() {
  const dispatch = useDispatch()
  const { spotId } = useParams()

  useEffect(() => {
    dispatch(getSpotById(spotId))
  }, [dispatch, spotId])

  const spot = useSpots()

  const { Owner, name, city, state, country, price, avgStarRating } = spot[0]


  return (
    <>
      <div className='address'>
        <h3>{name}</h3>
        <p>{city}, {state}, {country}</p>
      </div>
      <div className="grid-container">
        <img className='wide tall' src="https://source.unsplash.com/cssvEZacHvQ" alt='hi' />
        <img src="https://source.unsplash.com/oR0uERTVyD0" alt='hi' />
        <img src="https://source.unsplash.com/01_igFr7hd4" alt='hi' />
        <img src="https://source.unsplash.com/O-8Fmpx7HqQ" alt='hi' />
        <img src="https://source.unsplash.com/cfQEO_1S0Rs" alt='hi' />
      </div>
      <section className='spot-description'>
        <h3>Hosted by {Owner?.firstName} {Owner?.lastName}</h3>

      </section>
    </>
  )
}
