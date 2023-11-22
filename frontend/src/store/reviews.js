import { useSelector } from "react-redux"
import { csrfFetch } from "./csrf"

const GET_REVIEWS = 'GET_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'
const DELETE_REVIEW = 'DELETE_REVIEW'
const EDIT_REVIEW = 'EDIT_REVIEW'
const GET_SPOT_REV = 'GET_SPOT_REV'

const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews
})

const getSpotReviews = (spotReviews) => ({
  type: GET_SPOT_REV,
  spotReviews
})

const addReview = (review) => ({
  type: ADD_REVIEW,
  review
})

const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId
})

const editReview = (review) => ({
  type: EDIT_REVIEW,
  review
})

export const useReviews = () => {
  return useSelector(state => Object.values(state.reviews))
}

export const getReviewsBySpotIdThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

  if (res.ok) {
    let reviews = await res.json()
    dispatch(getSpotReviews(reviews.Reviews))
    return reviews.Reviews
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

export const editReviewThunk = (reviewId, body) => async (dispatch) => {
  const res = await csrfFetch(`api/reviews/${reviewId}`, {
    method: 'PUT',
    body: JSON.stringify(body)
  })

  if (res.ok) {
    const editedReview = await res.json()
    dispatch(editReview(editedReview))
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
  } else {
    let errors = await res.json()
    return errors
  }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, { method: 'DELETE' })

  if (res.ok) {
    const reviewToDelete = await res.json()
    await dispatch(deleteReview(reviewId))
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
    case GET_SPOT_REV:
      const spotState = {}
      payload.spotReviews.forEach(review => {
        spotState[review.id] = review
      })
      return spotState
    case ADD_REVIEW:
      return { ...state, [payload.review.id]: payload.review }
    case DELETE_REVIEW:
      const deleteState = { ...state }
      delete deleteState[payload.reviewId]
      return deleteState
    case EDIT_REVIEW:
      newReviewState[payload.review.id] = payload.review.review
      return newReviewState
    default:
      return state
  }
}

export default reviewReducer
