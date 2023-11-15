import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spots";

export default function DeleteModal({ spotId }) {
  const { closeModal } = useModal()
  const dispatch = useDispatch()

  async function handleDelete() {
    await dispatch(deleteSpotThunk(spotId))
    closeModal()
  }

  return (
    <div className="delete-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this spot from the listings?</p>
      <button onClick={handleDelete}>Yes (Delete Spot)</button>
      <button onClick={closeModal}>No (Keep Spot)</button>
    </div>

  )
}
