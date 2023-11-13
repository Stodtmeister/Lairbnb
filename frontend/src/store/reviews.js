import { useSelector } from "react-redux"
import { csrfFetch } from "./csrf"

const GET_REVIEWS = 'GET_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'

const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews
})

const addReview = (review) => ({
  type: ADD_REVIEW,
  review
})

export const useReviews = () => {
  return useSelector(state => Object.values(state.reviews))
}

export const getReviewsBySpotIdThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

  if (res.ok) {
    let reviews = await res.json()
    dispatch(getReviews(reviews.Reviews))
  }
}

export const addReviewThunk = (spotId, rev) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rev)
  })
}

const reviewReducer = (state = {}, payload) => {
  let newReviewState = {}
  switch (payload.type) {
    case GET_REVIEWS:
      payload.reviews.forEach(review => {
        newReviewState[review.id] = review
      })
      return newReviewState
    case ADD_REVIEW:
      return { ...state, [payload.review.id]: payload.review }
    default:
      return state
  }
}

export default reviewReducer
