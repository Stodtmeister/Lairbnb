import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, NavLink } from 'react-router-dom'
import { getUserSpotsThunk, useSpots } from '../../store/spots'
import { DeleteModal, PreviewImage } from '../../components'
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
        <h3>Manage Spots</h3>
        <NavLink className='create-spot' to='/spots/new'>Create a New Spot</NavLink>
      </div>
      <div className='spot-grid'>
        {userSpots.map(spot => (
          <div key={spot.id} className='manage-spot'>
            <PreviewImage {...spot} />
            <button onClick={e => handleUpdate(spot.id)}>Update</button>
            <OpenModalButton
              buttonText='Delete'
              modalComponent={<DeleteModal spotId={spot.id} />}
            />
          </div>
        ))}
      </div>
    </>
  )
}
