import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUserSpotsThunk, useSpots } from '../../store/spots'
import { DeleteModal, PreviewImage } from '../../components'
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
    history.push(`/spots/${spotId}/edit`)
  }

  return (
    <>
      <div className='userSpot-header'>
        <h3>Manage Your Spots</h3>
        <button>Create a New Spot</button>
      </div>
      <div className='spot-grid'>
        {userSpots.map((spot, idx) => (
          <div className='manage-container' key={idx}>
            <div className='manage-spot'>
              <PreviewImage key={spot.id} {...spot} />
              <button onClick={e => handleUpdate(spot.id)}>Update</button>
              <OpenModalButton
                buttonText='Delete'
                modalComponent={<DeleteModal spotId={spot.id} />}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
