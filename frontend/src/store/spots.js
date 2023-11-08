import { useSelector } from "react-redux"

const LOAD_SPOTS = 'LOAD_SPOTS'

const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots
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


//* ========================== reducer ====================================

const spotReducer = (state = {}, payload) => {
  switch (payload.type) {
    case LOAD_SPOTS:
      const spotState = {}
      payload.spots.forEach(spot => {
        spotState[spot.id] = spot
      })
      return spotState
    default:
      return state
  }
}

export default spotReducer
