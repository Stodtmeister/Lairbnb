
import { useDispatch } from 'react-redux'
import { editSpotThunk, getSpotById, useSpots } from '../../store/spots'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import NewSpotForm from '../NewSpotForm/NewSpotForm'

export default function UpdateSpot() {
  const dispatch = useDispatch()
  const { spotId } = useParams()
  let spotInfo = useSpots()
  console.log('spot', spotInfo)
  console.log('info', spotInfo[spotId])
  // spotInfo = spotInfo[0]
  // console.log('id', spotId)
  const history = useHistory()
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    country: spotInfo?.country,
    address: spotInfo?.address,
    city: spotInfo?.city,
    state: spotInfo?.state,
    lat: spotInfo?.lat,
    lng: spotInfo?.lng,
    description: spotInfo?.description,
    price: spotInfo?.price,
    name: spotInfo?.name
  });

  useEffect(() => {
    dispatch(getSpotById(spotId))
  }, [dispatch, spotId])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  useEffect(() => {
    const validationErrors = {}
    if (!formData?.country) validationErrors.country = 'Country is required'
    if (!formData?.address) validationErrors.address = 'Address is required'
    if (!formData?.city) validationErrors.city = 'City is required'
    if (!formData?.state) validationErrors.state = 'state is required'
    if (!formData?.lng) validationErrors.lng = 'Longitude is required'
    if (!formData?.lat) validationErrors.lat = 'Latitude is required'
    if (!formData?.name) validationErrors.name = 'Name is required'
    if (formData?.price < 1 || !formData?.price) validationErrors.price = 'Price is required'
    setErrors(validationErrors)
  }, [formData.country, formData.state, formData.address, formData.city, formData.lng, formData.lat, formData.name, formData.price])

  async function handleSubmit(e) {
    e.preventDefault()

    if (!Object.keys(errors).length) {
      const newSpot = {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        lat: formData.lat,
        lng: formData.lng,
        name: formData.name,
        description: formData.description,
        price: formData.price
      }

      const data = await dispatch(editSpotThunk(spotId, newSpot))

      if (data?.id) {
        history.push(`/spots/${data.id}`)
      } else {
        setErrors(data)
      }
    } else {
      alert('errors')
    }
  }

  return (
    <form id='spot-form' onSubmit={handleSubmit}>
      <h3>Update your Spot</h3>
      <h4>Where is your place located?</h4>
      <p>Guests will only get your exact address once they booked a reservation.</p>
      <hr />
      <div className="address-container">
        <div className={`form-group2 country ${errors?.country ? "error" : ""}`}>
          <label className='label' htmlFor='country'>
            Country *
            <input
              className='input'
              type="text"
              id='country'
              value={formData.country}
              onChange={handleInputChange}
            />
            {errors?.country && (
              <div className="msg">{errors?.country}</div>
            )}
          </label>
        </div>
        <div className={`form-group2 street ${errors?.address ? "error" : ""}`}>
          <label className='label' htmlFor='street'>
            Street Address *
            <input
              className='input'
              type="text"
              name='address'
              value={formData.address}
              onChange={handleInputChange}
            />
            {errors?.address && (
              <div className="msg">{errors?.address}</div>
            )}
          </label>
        </div>
        <div className={`form-group2 city ${errors?.city ? "error" : ""}`}>
          <label className='label' htmlFor='city'>
            City *
            <input
              className='input'
              type="text"
              name='city'
              value={formData.city}
              onChange={handleInputChange}
            />
            {errors?.city && (
              <div className="msg">{errors?.city}</div>
            )}
          </label>
        </div>
        <div className={`form-group2 state ${errors?.state ? "error" : ""}`}>
          <label className='label' htmlFor='state'>
            State *
            <input
              className='input'
              type="text"
              name='state'
              value={formData.state}
              onChange={handleInputChange}
            />
            {errors?.state && (
              <div className="msg">{errors?.state}</div>
            )}
          </label>
        </div>
        <div className={`form-group2 lat ${errors?.lat ? "error" : ""}`}>
          <label className='label' htmlFor='latitude'>
            Latitude *
            <input
              className='input'
              type="text"
              name='latitude'
              value={formData.lat}
              onChange={handleInputChange}
            />
            {errors?.lat && (
              <div className="msg">{errors?.lat}</div>
            )}
          </label>
        </div>
        <div className={`form-group2 lng ${errors?.lng ? "error" : ""}`}>
          <label className='label' htmlFor="longitude">
            Longitude *
            <input
              className='input'
              type="text"
              name='longitude'
              value={formData.lng}
              onChange={handleInputChange}
            />
            {errors?.lng && (
              <div className="msg">{errors?.lng}</div>
            )}
          </label>
        </div>
      </div>
      <hr />
        <h4>Describe your place to guests *</h4>
        <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
        <div className={`form-group2 ${errors?.description ? "error" : ""}`}>
          <textarea
            className='text'
            name='description'
            cols="60"
            rows="10"
            value={formData.description}
            onChange={handleInputChange}
          />
          {errors?.description && (
            <div className="msg">{errors?.description}</div>
          )}
        </div>
      <hr />
        <h4>Create a title for your spot *</h4>
        <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
        <div className={`form-group2 ${errors?.name ? "error" : ""}`}>
          <input
            className='input'
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors?.name && (
            <div className="msg">{errors?.name}</div>
          )}
        </div>
      <hr />
        <h4>Set a base price for your spot *</h4>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <div className={`form-group2 ${errors?.price ? "error" : ""}`}>
          <label htmlFor="price">
            $
            <input
              className='input'
              type="text"
              name='price'
              value={formData.price}
              onChange={handleInputChange}
            />
          </label>
          {errors?.price && (
            <div className="msg">{errors?.price}</div>
          )}
        </div>
      <hr />
        <button className='btn' type="submit">Update Spot</button>
    </form>
  )
}
