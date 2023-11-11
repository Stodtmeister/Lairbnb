import { useDispatch } from 'react-redux'
import './CreateNewSpot.css'
import { useEffect, useRef, useState } from 'react'

export default function CreateNewSpot() {
  const dispatch = useDispatch()
  const countryRef = useRef()
  const stateRef = useRef()
  const addressRef = useRef()
  const cityRef = useRef()
  const longitudeRef = useRef()
  const latitudeRef = useRef()
  const [errors, setErrors] = useState({})



  function handleSubmit(e) {
    e.preventDefault()

    const validationErrors = {}
    if (!countryRef.current.value.length) validationErrors.country = 'Country is required'
    if (!addressRef.current.value.length) validationErrors.address = 'Address is required'
    if (!cityRef.current.value.length) validationErrors.city = 'City is required'
    if (!stateRef.current.value.length) validationErrors.state = 'state is required'
    if (!longitudeRef.current.value.length) validationErrors.lng = 'Longitude is required'
    if (!latitudeRef.current.value.length) validationErrors.lat = 'Latitude is required'

    setErrors(validationErrors)
  }


  return (
    <form id='spot-form' onSubmit={handleSubmit}>
      <h3>Create a new Spot</h3>
      <h4>Where is your place located?</h4>
      <p>Guests will only get your exact address once they booked a reservation.</p>
      <hr />
      <div className="address-container">
        <div className={`form-group country ${errors.country ? "error" : ""}`}>
          <label className='label' htmlFor='country'>
            Country *
            <input
              className='input'
              type="text"
              id='country'
              placeholder='Country'
              ref={countryRef}
            />
            {errors.country && (
              <div className="msg">{errors.country}</div>
            )}
          </label>
        </div>
        <div className={`form-group address ${errors.address ? "error" : ""}`}>
          <label className='label' htmlFor='address'>
            Street Address *
            <input
              className='input'
              type="text"
              id='address'
              placeholder='Address'
              ref={addressRef}
            />
            {errors.address && (
              <div className="msg">{errors.address}</div>
            )}
          </label>
        </div>
        <div className={`form-group city ${errors.city ? "error" : ""}`}>
          <label className='label' htmlFor='city'>
            City *
            <input
              className='input'
              type="text"
              id='city'
              placeholder='City'
              ref={cityRef}
              />
            {errors.city && (
              <div className="msg">{errors.city}</div>
            )}
          </label>
        </div>
        <div className={`form-group state ${errors.state ? "error" : ""}`}>
          <label className='label' htmlFor='state'>
            State *
            <input
              className='input'
              type="text"
              id='state'
              placeholder='State'
              ref={stateRef}
            />
            {errors.state && (
              <div className="msg">{errors.state}</div>
            )}
          </label>
        </div>
        <div className={`form-group lat ${errors.lat ? "error" : ""}`}>
          <label className='label' htmlFor='latitude'>
            Latitude *
            <input
              className='input'
              type="text"
              id='latitude'
              placeholder='Latitude'
              ref={latitudeRef}
            />
            {errors.lat && (
              <div className="msg">{errors.lat}</div>
            )}
          </label>
        </div>
        <div className={`form-group lng ${errors.lng ? "error" : ""}`}>
          <label className='label' htmlFor="longitude">
            Longitude *
            <input
              className='input'
              type="text"
              name='longitude'
              placeholder='Longitude'
              ref={longitudeRef}
            />
            {errors.lng && (
              <div className="msg">{errors.lng}</div>
            )}
          </label>
        </div>
      </div>
      <hr />
        <h4>Describe your place to guests</h4>
        <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
        <textarea name='description' cols="60" rows="10" placeholder='Please write at least 30 characters'></textarea>
      <hr />
        <h4>Create a title for your spot</h4>
        <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
        <input
          type="text"
          name="title"
          placeholder='Name of your spot'
          />
      <hr />
        <h4>Set a base price for your spot</h4>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <label htmlFor="price">
          $ <input type="text" name='price' placeholder='Price per night (USD)' />
        </label>
      <hr />
        <h4>Liven up your spot with photos</h4>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <input type="text" name='photo' placeholder='Preview Image URL' />
        <input type="text" name='photo' placeholder='Image URL'/>
        <input type="text" name='photo' placeholder='Image URL'/>
        <input type="text" name='photo' placeholder='Image URL'/>
        <input type="text" name='photo' placeholder='Image URL'/>
      <hr />
        <button className='btn' type="submit">Create Spot</button>
    </form>
  )
}
