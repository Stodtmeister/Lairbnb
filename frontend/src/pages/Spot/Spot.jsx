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

  const { Owner, SpotImages, name, city, state, country, price, avgStarRating, numReviews, description } = spot[0]
  const rev = numReviews > 1 ? 'reviews' : 'review'

  console.log('SI', SpotImages);

  return (
    <div className='spot-page'>
      <div className='address'>
        <h3>{name}</h3>
        <p>{city}, {state}, {country}</p>
      </div>
      <div className="grid-container">
        {SpotImages.map((img, idx) => (
          <img className={`spot-img ${idx === 0 ? 'tall' : 'square'}`} src={img.url} alt='hi' />
        ))}
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
              <span className='star-icon'>&#9733;</span>
              <span className={numReviews > 0 ? 'hide' : 'show'}>
                New
              </span>
              <span className={numReviews > 0 ? 'show' : 'hide'}>
                <span className='bold'>{avgStarRating?.toPrecision(2)}</span>
                <span className='dot bold'>&#183;</span>
                <span className='bold normal'>{numReviews} {rev}</span>
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
