import { useSelector } from "react-redux"
import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'LOAD_SPOTS'
const GET_SPOT_BY_ID = 'GET_SPOT_BY_ID'
const CREATE_SPOT = 'CREATE_SPOT'

const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots
})

const getSpotInfo = (spotInfo) => ({
  type: GET_SPOT_BY_ID,
  spotInfo
})

const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot
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
    return spot
  }
}

export const createSpotThunk = (data) => async (dispatch) => {
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  console.log('res', res)
  if (res.ok) {
    const newSpot = await res.json()
    dispatch(createSpot(newSpot))
    return newSpot
  } else {
    const errors = await res.json()
    return errors
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
    case CREATE_SPOT:
      return { ...state, [payload.spot.id]: payload.spot }
    default:
      return state
  }
}

export default spotReducer
