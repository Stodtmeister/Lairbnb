import { useHistory } from 'react-router-dom'
import './PreviewImage.css'

export default function PreviewImage({ id, name, avgRating, city, state, previewImage, price }) {
  const history = useHistory()

  function handleClick() {
    history.push(`/spots/${id}`)
  }

  return (
    <div className="spot tooltip" onClick={handleClick}>
      <i class="fa-solid fa-heart fa-lg favorite"></i>
      <span className='tooltiptext'>{name}</span>
      <img className='preview' src={previewImage} alt="House" />
      <div className="spot-footer">
        <div className='destination'>
          <p className='bold'>{city}, {state}</p>
          <p className='bold'><span className='star-icon'>&#9733;</span> {avgRating?.toPrecision(2)} {avgRating ? '' : 'New'} </p>
        </div>
        <div className='price-holder'>
          <span className='bold'>${price}<span className='not-bold'>night</span></span>
        </div>
      </div>
    </div>
  )
}
