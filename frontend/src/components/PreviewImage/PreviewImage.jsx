import './PreviewImage.css'

export default function PreviewImage({ avgRating, city, state, previewImage, price }) {
  // previewImage = require('../../images/sajad-nori-s1puI2BWQzQ-unsplash.jpg')
  return (
    <div className="spot" >
      <img src='https://a0.muscache.com/im/pictures/prohost-api/Hosting-53402672/original/1085a9f4-a962-47ac-994b-7b8b356ace47.jpeg?im_w=720' alt="House" />
      <div className="spot-footer">
        <span>{city}, {state} <i class="fa-sharp fa-solid fa-star"></i>{avgRating}</span>
        <span>{price}</span>
      </div>
    </div>
  )
}
