import { useSelector } from "react-redux"
import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'LOAD_SPOTS'
const GET_SPOT_BY_ID = 'GET_SPOT_BY_ID'
const CREATE_SPOT = 'CREATE_SPOT'
const DELETE_SPOT = 'DELETE_SPOT'

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

const deleteSpot = (spotId) => ({
  type: DELETE_SPOT,
  spotId
})




//* ========================== getter ====================================

export const useSpots = () => {
  return useSelector(state => Object.values(state.spots))
}


//* ========================== thunks ====================================

export const getAllSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots')

  if (res.ok) {
    let spots = await res.json()
    spots = Object.values(spots)[0]
    dispatch(loadSpots(spots))
  }
}

export const getSpotById = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`)

  if (res.ok) {
    let spot = await res.json()
    dispatch(getSpotInfo(spot))
    return spot
  }
}

export const getUserSpotsThunk = () => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/current`)

  if (res.ok) {
    const userSpots = await res.json()
    dispatch(loadSpots(userSpots.Spots))
    return userSpots
  }
}

export const createSpotThunk = (data) => async (dispatch) => {
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  if (res.ok) {
    const newSpot = await res.json()
    dispatch(createSpot(newSpot))
    return newSpot
  } else {
    const errors = await res.json()
    return errors
  }
}

export const editSpotThunk = (spotId, spot) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    body: JSON.stringify(spot)
  })

  if (res.ok) {
    const editedSpot = await res.json()
    dispatch(createSpot(editedSpot))
    return editedSpot
  }
}

export const deleteSpotThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots${spotId}`, { method: 'DELETE'})

  if (res.ok) {
    const deletedSpot = await res.json();
    console.log(deletedSpot)
    dispatch(deleteSpot(deletedSpot));
    return deleteSpot;
  } else {
    const error = await res.json();
    return error;
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
    case DELETE_SPOT:
      const deleteSpotState = { ...state }
      delete deleteSpotState[payload.spotId]
      return deleteSpotState
    default:
      return state
  }
}

export default spotReducer
