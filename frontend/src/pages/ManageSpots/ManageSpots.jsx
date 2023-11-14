import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUserSpotsThunk, useSpots } from '../../store/spots'
import { PreviewImage } from '../../components'
import { useHistory } from 'react-router-dom'
import './ManageSpots.css'

export default function ManageSpots() {
  const dispatch = useDispatch()
  const history = useHistory()
  const userSpots = useSpots()

  useEffect(() => {
    dispatch(getUserSpotsThunk())
  }, [dispatch])

  function handleDelete() {

  }

  function handleUpdate(spotId) {
    history.push(`/spots/${spotId}/edit`)
  }

  return (
    <>
      <div className='userSpot-header'>
        <h3>Manage Your Spots</h3>
        <button>Create a New Spot</button>
      </div>
      <div className='spot-grid'>
        {userSpots.map(spot => (
          <div className='user-container'>
            <PreviewImage key={spot.id} {...spot} />
            <div className='button-container'>
              <button onClick={e => handleUpdate(spot.id)}>Update</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
