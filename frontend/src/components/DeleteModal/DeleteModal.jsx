import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spots";
import { useEffect, useState } from "react";
import { deleteReviewThunk } from "../../store/reviews";
import './DeleteModal.css'

export default function DeleteModal({ spotId, reviewId, id }) {
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const [type, setType] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    setType(spotId ? 'Spot' : 'Review')

    if (type === 'Spot') {
      setMessage('Are you sure you want to remove this spot from the listings?')
    } else {
      setMessage('Are you sure you want to delete this review?')
    }
  }, [spotId, type])

  async function handleDelete() {
    if (type === 'Spot') {
      await dispatch(deleteSpotThunk(spotId))
    } else {
      await dispatch(deleteReviewThunk(reviewId))
    }

    closeModal()
  }

  return (
    <div className="delete-modal">
      <div>
        <h3>Confirm Delete</h3>
        <p>{message}</p>
      </div>
      <div className="button-container">
        <button className="yes" onClick={handleDelete}>{`Yes (Delete ${type})`}</button>
        <button className="no" onClick={closeModal}>{`No (Keep ${type})`}</button>
      </div>
    </div>
  )
}
