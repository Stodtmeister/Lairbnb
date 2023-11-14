import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReviewsBySpotIdThunk, useReviews } from '../../store/reviews'
import ReviewModal from '../ReviewModal/ReviewModal'
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import './SpotReviews.css'

export default function SpotReviews({ spotId, rating, owner }) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const reviews = useReviews()
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
    if (!reviews?.length) {
      firstToReview = 'first'
    }
    reviews.forEach(rev => {
      if (rev.userId === user?.id) reviewedPreviously = 'already-reviewed'
    })
  }

  return (
    <div className='spot-review'>
      <div>
        <i className="fa-sharp fa-solid fa-star"></i>
        <span className={reviews?.length > 0 ? 'hide' : 'show'}>New</span>
        <div className={`${firstToReview} ${browsing}`}>
          <p>Be the first to post a review!</p>
        </div>
        <span className={reviews?.length > 0 ? 'show' : 'hide'}>
          <span>{rating?.toPrecision(2)} <i class="fa-regular fa-asterisk fa-2xs"></i></span>
          <span>{reviews.length} {rev}</span>
        </span>
      </div>
      <div className={`${reviewedPreviously} ${browsing}`}>
        <OpenModalButton
          buttonText='Post Your Review'
          modalComponent={<ReviewModal spotId={spotId} />}
        />
      </div>
      {reviews?.map(rev => (
        <div key={rev.id}>
          <div>
            <div>
              <p className='first-name'>{rev.User.firstName}</p>
            </div>
            <p>{new Date(Date.parse(rev.createdAt)).toDateString().slice(3)}</p>
          </div>
          <p>{rev.review}</p>
        </div>
      ))}
    </div>
  )
}
