import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUserSpotsThunk, useSpots } from '../../store/spots'
import { DeleteSpotModal, PreviewImage } from '../../components'
import { useHistory } from 'react-router-dom'
import OpenModalButton from '../../components/OpenModalButton/OpenModalButton'
import './ManageSpots.css'

export default function ManageSpots() {
  const dispatch = useDispatch()
  const history = useHistory()
  const userSpots = useSpots()

  useEffect(() => {
    dispatch(getUserSpotsThunk())
  }, [dispatch])

  function handleUpdate(spotId) {
    console.log(spotId)
    history.push(`/spots/${spotId}/edit`)
  }

  function handleDelete(spotId) {
    return (

    <>
      {console.log(spotId)}
      {/* <OpenModalButton
        buttonText='Delete'
        modalComponent={<DeleteSpotModal spotId={"4"} />}
      /> */}
    </>
    )
  }

  return (
    <>
      <div className='userSpot-header'>
        <h3>Manage Your Spots</h3>
        <button>Create a New Spot</button>
      </div>
      <div className='spot-grid'>
        {userSpots.map((spot, idx) => (
          <div className='user-container'>
            <PreviewImage key={spot.id} {...spot} />
            <div className='button-container'>
              <button onClick={e => handleUpdate(spot.id)}>Update</button>
              <button onClick={e => handleDelete(spot.id)}>Delete</button>
              {/* <OpenModalButton
                buttonText='Delete'
                modalComponent={<DeleteSpotModal spotId={"4"} />}
              /> */}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
