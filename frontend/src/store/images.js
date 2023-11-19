import { csrfFetch } from "./csrf"

const ADD_SPOT_IMG = 'ADD_SPOT_IMG'

export const addSpotImgThunk = (spotId, img) => async (dispatch) => {
  console.log('img', img);
  const res = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    body: JSON.stringify(img)
  })

  if (res.ok) {
    const newImg = await res.json()
    return newImg
  }
}
