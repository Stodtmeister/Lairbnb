import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserSpotsThunk, useSpots } from '../../store/spots'
import { DeleteModal, PreviewImage } from '../../components'
import { useHistory, NavLink } from 'react-router-dom'
import OpenModalButton from '../../components/OpenModalButton/OpenModalButton'
import './ManageSpots.css'

export default function ManageSpots() {
  const dispatch = useDispatch()
  const history = useHistory()
  const userSpots = useSpots()
  const user = useSelector(state => state.session)
  // console.log('user', user);

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
        {userSpots.map((spot, idx) => (
          <div className='manage-spot'>
            <PreviewImage key={spot.id} {...spot} />
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
