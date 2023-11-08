import { Redirect } from 'react-router-dom'
import './PreviewImage.css'
import Spot from '../../pages/Spot/Spot'

export default function PreviewImage({ avgRating, id, address, city, state, previewImage, price, name }) {

  return (
    <div className="spot" >
      <img src={previewImage} alt="House" />
      <div className="spot-footer">
        <p>{city}, {state}</p>
        <p>{price}</p>

        {avgRating}
      </div>
    </div>
  )
}
