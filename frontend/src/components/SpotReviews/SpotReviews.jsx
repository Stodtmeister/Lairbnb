import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getReviewsBySpotIdThunk, useReviews } from '../../store/reviews'
import './SpotReviews.css'

export default function SpotReviews({ spotId, rating }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getReviewsBySpotIdThunk(spotId))
  }, [dispatch])

  const reviews = useReviews()

  const rev = reviews.length === 1 ? 'review' : 'reviews'
  console.log('rev', reviews[0].length)

  return (
    <div className='spot-review'>
      <div>
        <i className="fa-sharp fa-solid fa-star"></i>
        <span className={reviews[0].length > 0 ? 'hide' : 'show'}>
          New
        </span>
        <span className={reviews[0].length > 0 ? 'show' : 'hide'}>
          <span>{rating?.toPrecision(2)} <i class="fa-regular fa-asterisk fa-2xs"></i></span>
          <span>{reviews.length} {rev}</span>
        </span>
      </div>
      {reviews[0]?.map(rev => (
        <>
          <div key={rev.id}>
            <div>
              <p>{rev.User.firstName}</p>
            </div>
            <p>{new Date(Date.parse(rev.createdAt)).toDateString().slice(3)}</p>
          </div>
          <p>{rev.review}</p>
        </>
      ))}
    </div>
  )
}
