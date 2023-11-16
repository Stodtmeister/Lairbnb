import { useDispatch } from 'react-redux'
import { useRef, useState } from 'react'
import { createSpotThunk } from '../../store/spots'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import './NewSpotForm.css'

export default function NewSpotForm() {
  const history = useHistory()
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
  const img2Ref = useRef()
  const img3Ref = useRef()
  const img4Ref = useRef()
  const img5Ref = useRef()
  const [errors, setErrors] = useState({})

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

    // if (previewImgRef.current.value.length) {
    //   const ending = previewImgRef.current.value.split('.')
    //   if (!['png', 'jpg', 'jpeg'].includes(ending[1])) {
    //     validationErrors.previewEnd = 'Image URL must end in .png, .jpg, or .jpeg'
    //   }
    // }
    // if (img2Ref.current.value.length) {
    //   const ending = img2Ref.current.value.split('.')
    //   if (!['png', 'jpg', 'jpeg'].includes(ending[1])) {
    //     validationErrors.ending2 = 'Image URL must end in .png, .jpg, or .jpeg'
    //   }
    // }
    // if (img3Ref.current.value.length) {
    //   const ending = img3Ref.current.value.split('.')
    //   if (!['png', 'jpg', 'jpeg'].includes(ending[1])) {
    //     validationErrors.ending3 = 'Image URL must end in .png, .jpg, or .jpeg'
    //   }
    // }
    // if (img4Ref.current.value.length) {
    //   const ending = img4Ref.current.value.split('.')
    //   if (!['png', 'jpg', 'jpeg'].includes(ending[1])) {
    //     validationErrors.ending4 = 'Image URL must end in .png, .jpg, or .jpeg'
    //   }
    // }
    // if (img5Ref.current.value.length) {
    //   const ending = img5Ref.current.value.split('.')
    //   if (!['png', 'jpg', 'jpeg'].includes(ending[1])) {
    //     validationErrors.ending5 = 'Image URL must end in .png, .jpg, or .jpeg'
    //   }
    // }

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

      console.log(typeof priceRef.current.value)
      const data = await dispatch(createSpotThunk(newSpot))

      if (data?.id) {
        history.push(`/spots/${data.id}`)
      } else {
        setErrors(data)
      }
    } else {
      setErrors(validationErrors)
    }
  }

  return (
    <form id='spot-form' onSubmit={handleSubmit}>
      <div className='newSpot-header'>
        <h3>Create a new Spot</h3>
        <div className='description'>
          <h4>Where is your place located?</h4>
          <p>Guests will only get your exact address once they booked a reservation.</p>
        </div>
      </div>
      <hr />
      <div className="address-container">
        <div className={`form-group2 country ${errors?.country ? "error" : ""}`}>
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
        <div className={`form-group2 street ${errors?.address ? "error" : ""}`}>
          <label className='label' htmlFor='street'>
            Street Address *
            <input
              className='input'
              type="text"
              id='street'
              placeholder='Address'
              ref={addressRef}
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
              id='city'
              placeholder='City'
              ref={cityRef}
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
              id='state'
              placeholder='State'
              ref={stateRef}
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
              id='latitude'
              placeholder='Latitude'
              ref={latitudeRef}
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
        <h4>Describe your place to guests *</h4>
        <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
        <div className={`form-group2 ${errors?.description ? "error" : ""}`}>
          <textarea
            name='description'
            cols="60"
            rows="10"
            placeholder='Please write at least 30 characters'
            ref={descriptionRef}
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
        <div className={`form-group2 price ${errors?.price ? "error" : ""}`}>
          <label className='price' htmlFor="price">
            $
            <input
              className='input'
              type="text"
              id='price'
              placeholder='Price per night (USD)'
              ref={priceRef}
              />
          </label>
        </div>
        {errors?.price && (
          <div className="msg form-group2 error">{errors?.price}</div>
        )}
      <hr />
        <h4>Liven up your spot with photos *</h4>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <div className="spot-images">
          <div className={`form-group2 ${errors?.preview ? "error" : ""} ${errors?.previewEnd ? 'error' : ""}`}>
            <input
              className='input img'
              type="text"
              placeholder='Preview Image URL'
              ref={previewImgRef}
            />
            {errors?.preview && (
              <div className="msg">{errors?.preview}</div>
            )}
            {errors?.previewEnd && (
              <div className="msg">{errors?.previewEnd}</div>
            )}
          </div>
          <div className={`form-group2 ${errors?.ending2 ? "error" : ""}`}>
            <input
              className='input img'
              type="text"
              placeholder='Image URL'
              ref={img2Ref}
            />
            {errors?.ending2 && (
              <div className="msg">{errors?.ending2}</div>
            )}
          </div>
          <div className={`form-group2 ${errors?.ending3 ? "error" : ""}`}>
            <input
              className='input img'
              type="text"
              placeholder='Image URL'
              ref={img3Ref}
            />
            {errors?.ending3 && (
              <div className="msg">{errors?.ending3}</div>
            )}
          </div>
          <div className={`form-group2 ${errors?.ending4 ? "error" : ""}`}>
            <input
              className='input img'
              type="text"
              placeholder='Image URL'
              ref={img4Ref}
            />
            {errors?.ending4 && (
              <div className="msg">{errors?.ending4}</div>
            )}
          </div>
          <div className={`form-group2 ${errors?.ending5 ? "error" : ""}`}>
            <input
              className='input '
              type="text"
              placeholder='Image URL'
              ref={img5Ref}
            />
            {errors?.ending5 && (
              <div className="msg">{errors?.ending5}</div>
            )}
          </div>
        </div>
      <hr />
        <button className='btn' type="submit">Create Spot</button>
    </form>
  )
}
