import { useDispatch, useSelector } from 'react-redux'
import './CreateNewSpot.css'
import { useEffect, useRef, useState } from 'react'
import { createSpotThunk } from '../../store/spots'

export default function CreateNewSpot() {
  const dispatch = useDispatch()
  const countryRef = useRef()
  const stateRef = useRef()
  const addressRef = useRef()
  const cityRef = useRef()
  const longitudeRef = useRef()
  const latitudeRef = useRef()
  const descriptionRef = useRef()
  const nameRef = useRef()
  const priceRef = useRef()
  const previewImgRef = useRef()
  const imgRef = useRef()
  const [errors, setErrors] = useState({})

  // const session = useSelector(state => state.session)
  // console.log(session)

  async function handleSubmit(e) {
    e.preventDefault()

    const validationErrors = {}
    if (!countryRef.current.value.length) validationErrors.country = 'Country is required'
    if (!addressRef.current.value.length) validationErrors.address = 'Address is required'
    if (!cityRef.current.value.length) validationErrors.city = 'City is required'
    if (!stateRef.current.value.length) validationErrors.state = 'state is required'
    if (!longitudeRef.current.value.length) validationErrors.lng = 'Longitude is required'
    if (!latitudeRef.current.value.length) validationErrors.lat = 'Latitude is required'
    if (descriptionRef.current.value.length < 30) validationErrors.description = 'Description needs a minimum of 30 characters'
    if (!nameRef.current.value.length) validationErrors.name = 'Name is required'
    if (priceRef.current.value < 1 || !priceRef.current.value.length) validationErrors.price = 'Price is required'
    if (!previewImgRef.current.value.length) validationErrors.preview = 'Preview image is required'
    // if (!imgRef.current.value.length) validationErrors.ending = 'Image URL must end in .png, .jpg, or .jpeg'

    if (!Object.keys(validationErrors).length) {
      const newSpot = {
        address: addressRef.current.value,
        city: cityRef.current.value,
        state: stateRef.current.value,
        country: countryRef.current.value,
        lat: latitudeRef.current.value,
        lng: longitudeRef.current.value,
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        price: priceRef.current.value
      }

      console.log(newSpot)

      const data = await dispatch(createSpotThunk(newSpot))

      if (data.id) {
        console.log(data)
      } else {
        setErrors(data)
      }
    } else {
      setErrors(validationErrors)
    }
  }

  return (
    <form id='spot-form' onSubmit={handleSubmit}>
      <h3>Create a new Spot</h3>
      <h4>Where is your place located?</h4>
      <p>Guests will only get your exact address once they booked a reservation.</p>
      <hr />
      <div className="address-container">
        <div className={`form-group country ${errors?.country ? "error" : ""}`}>
          <label className='label' htmlFor='country'>
            Country *
            <input
              className='input'
              type="text"
              id='country'
              placeholder='Country'
              ref={countryRef}
            />
            {errors?.country && (
              <div className="msg">{errors?.country}</div>
            )}
          </label>
        </div>
        <div className={`form-group address ${errors?.address ? "error" : ""}`}>
          <label className='label' htmlFor='address'>
            Street Address *
            <input
              className='input'
              type="text"
              id='address'
              placeholder='Address'
              ref={addressRef}
            />
            {errors?.address && (
              <div className="msg">{errors?.address}</div>
            )}
          </label>
        </div>
        <div className={`form-group city ${errors?.city ? "error" : ""}`}>
          <label className='label' htmlFor='city'>
            City *
            <input
              className='input'
              type="text"
              id='city'
              placeholder='City'
              ref={cityRef}
              />
            {errors?.city && (
              <div className="msg">{errors?.city}</div>
            )}
          </label>
        </div>
        <div className={`form-group state ${errors?.state ? "error" : ""}`}>
          <label className='label' htmlFor='state'>
            State *
            <input
              className='input'
              type="text"
              id='state'
              placeholder='State'
              ref={stateRef}
            />
            {errors?.state && (
              <div className="msg">{errors?.state}</div>
            )}
          </label>
        </div>
        <div className={`form-group lat ${errors?.lat ? "error" : ""}`}>
          <label className='label' htmlFor='latitude'>
            Latitude *
            <input
              className='input'
              type="text"
              id='latitude'
              placeholder='Latitude'
              ref={latitudeRef}
            />
            {errors?.lat && (
              <div className="msg">{errors?.lat}</div>
            )}
          </label>
        </div>
        <div className={`form-group lng ${errors?.lng ? "error" : ""}`}>
          <label className='label' htmlFor="longitude">
            Longitude *
            <input
              className='input'
              type="text"
              name='longitude'
              placeholder='Longitude'
              ref={longitudeRef}
            />
            {errors?.lng && (
              <div className="msg">{errors?.lng}</div>
            )}
          </label>
        </div>
      </div>
      <hr />
        <h4>Describe your place to guests</h4>
        <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
        <div className={`form-group ${errors?.description ? "error" : ""}`}>
          <textarea
            name='description'
            cols="60"
            rows="10"
            placeholder='Description' ref={descriptionRef}
          />
          {errors?.description && (
            <div className="msg">{errors?.description}</div>
          )}
        </div>
      <hr />
        <h4>Create a title for your spot *</h4>
        <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
        <div className={`form-group ${errors?.name ? "error" : ""}`}>
          <input
            className='input'
            type="text"
            id="name"
            placeholder='Name of your spot'
            ref={nameRef}
          />
          {errors?.name && (
            <div className="msg">{errors?.name}</div>
          )}
        </div>
      <hr />
        <h4>Set a base price for your spot *</h4>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <div className={`form-group ${errors?.price ? "error" : ""}`}>
          <label htmlFor="price">
            $
            <input
              className='input'
              type="text"
              id='price'
              placeholder='Price per night (USD)'
              ref={priceRef}
            />
          </label>
          {errors?.price && (
            <div className="msg">{errors?.price}</div>
          )}
        </div>
      <hr />
        <h4>Liven up your spot with photos</h4>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <div className="spot-images">
          <div className={`form-group ${errors?.preview ? "error" : ""}`}>
            <input
              className='input'
              type="text"
              id='photo'
              placeholder='Preview Image URL *'
              ref={previewImgRef}
            />
            {errors?.preview && (
              <div className="msg">{errors?.preview}</div>
            )}
          </div>
          {/* <div className={`form-group ${errors.ending ? "error" : ""}`}>
            {arr.map(ele => (
              <>
                <input className='input' type="text" placeholder='Image URL' ref={imgRef} key={ele}/>
                {errors.ending && (
                  <div className="msg">{errors.ending}</div>
                )}
              </>
            ))}
          </div> */}
        </div>
      <hr />
        <button className='btn' type="submit">Create Spot</button>
    </form>
  )
}
