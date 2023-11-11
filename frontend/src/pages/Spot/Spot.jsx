
import { useParams } from 'react-router'
import './Spot.css'
import { getSpotById, useSpots } from '../../store/spots'
import { useDispatch  } from 'react-redux'
import { useEffect, useState } from 'react'
import { SpotInfo, SpotReviews } from '../../components'

export default function Spot() {
  const dispatch = useDispatch()
  const { spotId } = useParams()

  function handleClick() {
    alert('Feature Coming Soon...')
  }

  useEffect(() => {
    dispatch(getSpotById(spotId))
  }, [dispatch, spotId])

  const spot = useSpots()
  if (!spot[0]) return <div></div>
  console.log('spot', spot)
  const { Owner, name, city, state, country, price, avgStarRating, numReviews } = spot[0]

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
      <section className='spot-info'>
        <div className='spot-description' >
          <h3>Hosted by {Owner?.firstName} {Owner?.lastName}</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi unde, consectetur eos ratione minus numquam iure repellendus itaque mollitia, a aperiam deserunt voluptas magnam assumenda quos, aspernatur nesciunt quam consequatur.</p>
        </div>
        <div className='reserve-spot'>
          <div className='rating'>
            <span>${price} night</span>
            <i className="fa-sharp fa-solid fa-star"></i>
            <span>{avgStarRating}</span>
            <span>{numReviews} Reviews</span>
          </div>
          <button className='reserve' onClick={handleClick}>Reserve</button>
        </div>
      </section>
      <SpotReviews />
    </>
  )
}
