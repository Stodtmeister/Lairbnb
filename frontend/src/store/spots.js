import { useSelector } from "react-redux"

const LOAD_SPOTS = 'LOAD_SPOTS'
const GET_SPOT_BY_ID = 'GET_SPOT_BY_ID'

const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots
})

const getSpotInfo = (spotInfo) => ({
  type: GET_SPOT_BY_ID,
  spotInfo
})

//* ========================== getter ====================================

export const useSpots = () => {
  return useSelector(state => Object.values(state.spots))
}


//* ========================== thunks ====================================

export const getAllSpots = () => async (dispatch) => {
  const res = await fetch('/api/spots')

  if (res.ok) {
    let spots = await res.json()
    spots = Object.values(spots)[0]
    dispatch(loadSpots(spots))
  }
}

export const getSpotById = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}`)

  if (res.ok) {
    let spot = await res.json()
    dispatch(getSpotInfo(spot))
  }
}


//* ========================== reducer ====================================

const spotReducer = (state = {}, payload) => {
  switch (payload.type) {
    case LOAD_SPOTS:
      const spotState = {}
      payload.spots.forEach(spot => {
        spotState[spot.id] = spot
      })
      return spotState
    case GET_SPOT_BY_ID:
      return { ...payload.spotInfo }
    default:
      return state
  }
}

export default spotReducer
