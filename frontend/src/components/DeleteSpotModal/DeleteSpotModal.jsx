import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spots";
import { useEffect } from "react";

export default function DeleteSpotModal({ spotId }) {
  const { closeModal } = useModal()
  const dispatch = useDispatch()

  useEffect(() => {
    const res = dispatch(deleteSpotThunk(spotId)).then(res => res.json()).catch(e => {
      console.log('e', e)
    })
    console.log('res', res)
  }, [dispatch])

  function handleDelete() {
  }

  function handleClick() {
    closeModal()
  }

  return (
    <div className="delete-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this spot from the listings?</p>
      <button onClick={handleDelete}>Yes (Delete Spot)</button>
      <button onClick={handleClick}>No (Keep Spot)</button>
    </div>

  )
}
