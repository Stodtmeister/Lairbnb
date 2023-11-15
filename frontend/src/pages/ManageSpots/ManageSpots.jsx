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

  console.log('userspots', userSpots)
  useEffect(() => {
    dispatch(getUserSpotsThunk())
  }, [dispatch])

  function handleUpdate(spotId) {
    console.log(spotId)
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
          <div className='user-container' key={idx}>
            <PreviewImage key={spot.id} {...spot} />
            <div className='button-container'>
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
