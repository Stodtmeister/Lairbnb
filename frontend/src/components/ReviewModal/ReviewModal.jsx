// import OpenModalButton from '../OpenModalButton/OpenModalButton'
import { useModal } from '../../context/Modal'
import './ReviewModal.css'

export default function ReviewModal() {
  const closeModal = useModal()

  function handleSubmit() {

  }

  function handleClick() {

  }

  const emptyStar = <i class="fa-sharp fa-regular fa-star fa-sm"></i>
  const fullStar = <i class="fa-sharp fa-solid fa-star fa-sm"></i>

  return (
    <form id='review-form' onSubmit={handleSubmit}>
      <h3>How was your stay?</h3>
      <textarea id='review-text' cols="30" rows="10" placeholder='Leave your review here...'/>
      <div className='container'>
        <span className='star'>{emptyStar}</span>
        <span>{emptyStar}</span>
        <span>{emptyStar}</span>
        <span>{emptyStar}</span>
        <span>{emptyStar}</span>
        <p>Stars</p>
      </div>
      <button type='submit'>Submit Your Review</button>
    </form>
  )
}
