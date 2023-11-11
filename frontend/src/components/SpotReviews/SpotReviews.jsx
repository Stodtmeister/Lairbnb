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
  // if (!reviews[0]) return
  // const { User, review, stars, createdAt } = reviews[0]["0"]


  const rev = reviews.length > 1 ? 'reviews' : 'review'

  return (
    <div className='spot-review'>
      <div>
        <i className="fa-sharp fa-solid fa-star"></i>
        <span>{rating}</span>
        <span>{reviews.length} {rev}</span>
      </div>
      {reviews[0]?.map(rev => (
        <>
          <div key={rev.id}>
            <div>
              <i className="fa-sharp fa-solid fa-star"></i>
              <span>{rev.stars}</span>
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
