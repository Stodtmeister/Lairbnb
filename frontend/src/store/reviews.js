import { useSelector } from "react-redux"
import { csrfFetch } from "./csrf"

const GET_REVIEWS = 'GET_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'
const DELETE_REVIEW = 'DELETE_REVIEW'
// const GET_USER_REVIEWS = 'GET_USER_REVIEWS'

const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews
})

const addReview = (review) => ({
  type: ADD_REVIEW,
  review
})

const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId
})

// const getUserReviews = (reviews) => ({
//   type: GET_USER_REVIEWS,
//   reviews
// })

export const useReviews = () => {
  return useSelector(state => Object.values(state.reviews))
}

export const getReviewsBySpotIdThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

  if (res.ok) {
    let reviews = await res.json()
    reviews = await dispatch(getReviews(reviews.Reviews))
    return reviews
  }
}

export const addReviewThunk = (spotId, rev) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rev)
  })

  if (res.ok) {
    const newReview = await res.json()
    dispatch(addReview(newReview))
    return newReview
  } else {
    const errors = await res.json()
    return errors
  }
}

export const getUserReviewsThunk = () => async (dispatch) => {
  const res = await csrfFetch('/api/reviews/current')

  if (res.ok) {
    let userReviews = await res.json()
    userReviews = await dispatch(getReviews(userReviews.Reviews))
    return userReviews
  }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, { method: 'DELETE' })

  if (res.ok) {
    const reviewToDelete = await res.json()
    dispatch(deleteReview(reviewToDelete))
    return reviewToDelete
  }
}

const reviewReducer = (state = {}, payload) => {
  let newReviewState = { ...state }
  switch (payload.type) {
    case GET_REVIEWS:
      payload.reviews.forEach(review => {
        newReviewState[review.id] = review
      })
      return newReviewState
    case ADD_REVIEW:
      return { ...state, [payload.review.id]: payload.review }
    case DELETE_REVIEW:
      const deleteState = { ...state }
      delete deleteState[payload.reviewId]
      return deleteState
    default:
      return state
  }
}

export default reviewReducer
