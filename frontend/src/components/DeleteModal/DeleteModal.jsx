import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spots";
import { useEffect, useState } from "react";
import './DeleteModal.css'
import { deleteReviewThunk } from "../../store/reviews";

export default function DeleteModal({ spotId, reviewId }) {
  const { closeModal } = useModal()
  const dispatch = useDispatch()
  const [type, setType] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    spotId ? setType('Spot') : setType('Review')

    if (type === 'spot') {
      setMessage('Are you sure you want to remove this spot from the listings?')
    } else {
      setMessage('Are you sure you want to delete this review?')
    }
  }, [spotId, type])

  async function handleDelete() {
    if (type === 'Spot') {
      dispatch(deleteSpotThunk(spotId))
    } else {
      dispatch(deleteReviewThunk(reviewId))
    }
    closeModal()
  }

  return (
    <div className="delete-modal">
      <h3>Confirm Delete</h3>
      <p>{message}</p>
      <div className="button-container">
        <button className="yes" onClick={handleDelete}>{`Yes (Delete ${type})`}</button>
        <button className="no" onClick={closeModal}>{`No (Keep ${type})`}</button>
      </div>
    </div>

  )
}
