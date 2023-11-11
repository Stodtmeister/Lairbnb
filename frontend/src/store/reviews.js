import { useSelector } from "react-redux"

const GET_REVIEWS = 'GET_REVIEWS'

const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews
})

export const useReviews = () => {
  return useSelector(state => Object.values(state.reviews))
}

export const getReviewsBySpotIdThunk = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}/reviews`)

  if (res.ok) {
    let reviews = await res.json()
    reviews = Object.values(reviews)
    dispatch(getReviews(reviews))
  }
}

const reviewReducer = (state = {}, payload) => {
  switch (payload.type) {
    case GET_REVIEWS:
      return { ...payload.reviews }
    default:
      return state
  }
}

export default reviewReducer
