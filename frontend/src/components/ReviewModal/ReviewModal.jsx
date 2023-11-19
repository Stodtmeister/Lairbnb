// import OpenModalButton from '../OpenModalButton/OpenModalButton'
import { useEffect, useState } from 'react'
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import './ReviewModal.css'
import { addReviewThunk } from '../../store/reviews'

export default function ReviewModal({ spotId }) {
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
    if (rating === 0) {
      validation.rating = 'Must select at least one star'
    }
    setErrors(validation)
  }, [review, rating])

  function handleStarClick(clickedRating) {
    setRating(clickedRating);
  }

  function handleStarHover(hoveredRating) {
    setHoveredRating(hoveredRating);
  }

  function handleMouseLeave() {
    setHoveredRating(0);
  }

  async function handleSubmit() {
    await dispatch(addReviewThunk(spotId, { review, stars: rating }))
    closeModal()
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
        <h4>How was your stay?</h4>
        <textarea
          id="review-text"
          cols="30"
          rows="8"
          placeholder="Leave your review here..."
          value={review}
          onChange={e => setReview(e.target.value)}
        />
        <div className="rating-container">
          <div className="star-rating" onMouseLeave={handleMouseLeave}>
            {renderStars()}
          </div>
          <p>Stars</p>
        </div>
        <button disabled={disabled} type="submit">Submit Your Review</button>
      </form>
    </>
  );
}
