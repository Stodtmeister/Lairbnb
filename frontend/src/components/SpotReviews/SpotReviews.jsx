import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReviewsBySpotIdThunk, useReviews } from '../../store/reviews'
import ReviewModal from '../ReviewModal/ReviewModal'
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import ReviewContainer from '../ReviewContainer/ReviewContainer'
import './SpotReviews.css'

export default function SpotReviews({ spotId, rating, owner, name }) {
  const dispatch = useDispatch()
  const reviews = useReviews()
  const user = useSelector(state => state.session.user)
  let browsing = 'browsing'
  let firstToReview = 'notFirst'
  let reviewedPreviously = 'no-reviews'
  let loggedIn = user?.id ? 'logged-in' : 'logged-out'
  const rev = reviews.length === 1 ? 'review' : 'reviews'

  useEffect(() => {
    dispatch(getReviewsBySpotIdThunk(spotId))
  }, [dispatch, spotId])

  if (user?.id === owner?.id) {
    browsing = 'owner'
  } else {
    if (!reviews.length) {
      firstToReview = 'first'
    }
    reviews.forEach(rev => {
      if (rev.userId === user?.id) reviewedPreviously = 'already-reviewed'
    })
  }

  return (
    <div className='spot-review'>
      <div>
        <span className='star-icon'>&#9733;</span>
        <span className={reviews.length > 0 ? 'hide' : 'show'}>New</span>
        <div className={`${firstToReview} ${browsing}`}>
          <p>Be the first to post a review!</p>
        </div>
        <span className={reviews.length > 0 ? 'show' : 'hide'}>
          <span className='bold'>{rating?.toPrecision(2)} </span>
          <span className='review-dot'>&#183;</span>
          <span className='bold'>{reviews.length} {rev}</span>
        </span>
      </div>
      <div className={`${reviewedPreviously} ${browsing} ${loggedIn}`}>
        <OpenModalButton
          buttonText='Post Your Review'
          modalComponent={<ReviewModal spotId={spotId} />}
        />
      </div>
      {reviews.reverse().map(rev => (
        <ReviewContainer key={rev.id} user={user} rev={rev} spotId={spotId} name={name} />
      ))}
    </div>
  )
}
