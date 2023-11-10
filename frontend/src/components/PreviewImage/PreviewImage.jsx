import { useHistory } from 'react-router-dom'
import './PreviewImage.css'

export default function PreviewImage({ id, name, avgRating, city, state, previewImage, price }) {
  const history = useHistory()

  function handleClick() {
    history.push(`/spot/${id}`)
  }
  // previewImage = require('../../images/sajad-nori-s1puI2BWQzQ-unsplash.jpg')
  return (
    <div className="spot tooltip" onClick={handleClick}>
      <span className='tooltiptext'>{name}</span>
      <img src='https://a0.muscache.com/im/pictures/prohost-api/Hosting-53402672/original/1085a9f4-a962-47ac-994b-7b8b356ace47.jpeg?im_w=720' alt="House" />
      <div className="spot-footer">
        <span class='bold'>{city}, {state} <i class="fa-sharp fa-solid fa-star"></i>{avgRating?.toPrecision(2)}</span>
        <span class='bold'>${price}<span className='not-bold'>night</span></span>
      </div>
    </div>
  )
}
