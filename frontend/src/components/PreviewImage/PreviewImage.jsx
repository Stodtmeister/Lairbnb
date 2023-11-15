import { useHistory } from 'react-router-dom'
import './PreviewImage.css'
import { useSpots } from '../../store/spots'

export default function PreviewImage({ id, name, avgRating, city, state, previewImage, price }) {
  const history = useHistory()

  function handleClick() {
    history.push(`/spots/${id}`)
  }
  previewImage = require('../../images/sajad-nori-s1puI2BWQzQ-unsplash.jpg')
  return (
    <div className="spot tooltip" onClick={handleClick}>
      <span className='tooltiptext'>{name}</span>
      <img className='preview' src='https://a0.muscache.com/im/pictures/prohost-api/Hosting-53402672/original/1085a9f4-a962-47ac-994b-7b8b356ace47.jpeg?im_w=720' alt="House" />
      <div className="spot-footer">
        <div className='destination'>
          <p className='bold'>{city}, {state}</p>
          <p className='bold'><span className='star-icon'>&#9733;</span> {avgRating?.toPrecision(2)} {avgRating ? '' : 'New'} </p>
        </div>
        <span className='bold'>${price}<span className='not-bold'>night</span></span>
      </div>
    </div>
  )
}

//https://a0.muscache.com/im/pictures/prohost-api/Hosting-53402672/original/1085a9f4-a962-47ac-994b-7b8b356ace47.jpeg?im_w=720'
