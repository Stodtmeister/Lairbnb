import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReviewsBySpotIdThunk, getUserReviewsThunk, useReviews } from '../../store/reviews'
import ReviewModal from '../ReviewModal/ReviewModal'
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import './SpotReviews.css'
import DeleteModal from '../DeleteModal/DeleteModal'

export default function SpotReviews({ spotId, rating, owner }) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const reviews = useReviews()
  let browsing = 'browsing'
  let firstToReview = 'notFirst'
  let reviewedPreviously = 'no-reviews'
  let loggedIn = user?.id ? 'logged-in' : 'logged-out'
  const rev = reviews.length === 1 ? 'review' : 'reviews'
  const addDelete = reviewedPreviously === 'already-reviewed' ? true : false

  useEffect(() => {
    dispatch(getReviewsBySpotIdThunk(spotId))
  }, [dispatch, spotId])

  // useEffect(() => {
  //   dispatch(getUserReviewsThunk())
  // }, [dispatch, owner])

  function formatDate(date) {
    const originalDate = new Date(date);
    const options = { year: 'numeric', month: 'short' };
    return originalDate.toLocaleDateString('en-US', options);
  }

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

  console.log(user.id)
  return (
    <div className='spot-review'>
      <div>
        <span>&#9733;</span>
        <span className={reviews?.length > 0 ? 'hide' : 'show'}>New</span>
        <div className={`${firstToReview} ${browsing}`}>
          <p>Be the first to post a review!</p>
        </div>
        <span className={reviews?.length > 0 ? 'show' : 'hide'}>
          <span className='bold'>{rating?.toPrecision(2)} <span className='dot'>&#183;</span></span>
          <span className='bold'>{reviews.length} {rev}</span>
        </span>
      </div>
      <div className={`${reviewedPreviously} ${browsing} ${loggedIn}`}>
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
            <p>{formatDate(rev.createdAt)}</p>
          </div>
          <p>{rev.review}</p>
          {user.id === rev.userId &&
            <OpenModalButton
              buttonText='Delete'
              modalComponent={<DeleteModal reviewId={rev.id} />}
            />
          }
        </div>
      ))}
    </div>
  )
}
