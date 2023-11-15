import { useParams } from 'react-router'
import { getSpotById, useSpots } from '../../store/spots'
import { useDispatch  } from 'react-redux'
import { useEffect } from 'react'
import { SpotReviews } from '../../components'
import './Spot.css'

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

  const { Owner, name, city, state, country, price, avgStarRating, numReviews, description } = spot[0]
  const rev = numReviews > 1 ? 'reviews' : 'review'

  return (
    <div className='spot-page'>
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
          <h3 className='host'>Hosted by {Owner?.firstName} {Owner?.lastName}</h3>
          <p>{description}</p>
        </div>
        <div className='reserve-spot'>
          <div className='rating'>
            <div>
              <p><strong>${price}</strong> night</p>
            </div>
            <div>
              <span>&#9733;</span>
              <span className={numReviews > 0 ? 'hide' : 'show'}>
                New
              </span>
              <span className={numReviews > 0 ? 'show' : 'hide'}>
                <span className='bold'>{avgStarRating?.toPrecision(2)}</span>
                <span className='dot'>&#183;</span>
                <span className='bold'>{numReviews} {rev}</span>
              </span>
            </div>
          </div>
          <button className='reserve' onClick={handleClick}>Reserve</button>
        </div>
      </section>
      <SpotReviews spotId={spotId} rating={avgStarRating} owner={Owner}/>
    </div>
  )
}
