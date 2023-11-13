// import OpenModalButton from '../OpenModalButton/OpenModalButton'
import { useEffect, useState } from 'react'
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import './ReviewModal.css'

export default function ReviewModal() {
  const { closeModal } = useModal()
  const dispatch = useDispatch()
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('')
  const [errors, setErrors] = useState({})
  let disabled = true

  if (review && !Object.keys(errors).length) disabled = false;

  useEffect(() => {
    const validation = {}
    if (review && review.length < 10) {
      validation.review = 'Review must be at least 10 characters'
    }
    setErrors(validation)
  }, [review])

  function handleStarClick(clickedRating) {
    setRating(clickedRating);
  }

  function handleStarHover(hoveredRating) {
    setHoveredRating(hoveredRating);
  }

  function handleMouseLeave() {
    setHoveredRating(0);
  }

  function handleSubmit() {

  }

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= (hoveredRating || rating) ? 'filled' : ''}`}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
        >
          &#9733;
        </span>
      )
    }

    return stars;
  };

  return (
    <>
      <form id="review-form" onSubmit={handleSubmit}>
        <h3>How was your stay?</h3>
        <textarea
          id="review-text"
          cols="30"
          rows="10"
          placeholder="Leave your review here..."
          value={review}
          onChange={e => setReview(e.target.value)}
        />
      <div className="star-rating" onMouseLeave={handleMouseLeave}>
        {renderStars()}
        <p>Stars</p>
      </div>
      <button disabled={disabled} type="submit">Submit Your Review</button>
    </form>

    </>
  );
}
