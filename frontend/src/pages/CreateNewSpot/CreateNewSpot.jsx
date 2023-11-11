import './CreateNewSpot.css'

export default function CreateNewSpot() {
  return (
    <form>
      <h3>Create a new Spot</h3>
      <h4>Where is your place located?</h4>
      <p>Guests will only get your exact address once they booked a reservation.</p>
    <hr />
      <label>
        Country <input type="text" name='country' placeholder='Country' />
      </label>
      <label>
        Street Address <input type="text" name='address' placeholder='Address' />
      </label>
      <label>
        City <input type="text" name='city' placeholder='city' />,
        State <input type="text" name='state' placeholder='state' />
      </label>
      <label htmlFor='latitude'>
        Latitude <input type="text" name='latitude' placeholder='Latitude' />
      </label>
      <label htmlFor="longitude">
        Longitude <input type="text" name='longitude' placeholder='Longitude' />
      </label>
    <hr />
      <h4>Describe your place to guests</h4>
      <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
      <textarea name='description' cols="60" rows="10" placeholder='Please write at least 30 characters'></textarea>
    <hr />
      <h4>Create a title for your spot</h4>
      <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
      <input type="text" name="title" placeholder='Name of your spot'/>
    <hr />
      <h4>Set a base price for your spot</h4>
      <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
      <label htmlFor="price">
        $ <input type="text" name='price' placeholder='Price per night (USD)' />
      </label>
    <hr />
      <h4>Liven up your spot with photos</h4>
      <p>Submit a link to at least one photo to publish your spot.</p>
      <input type="text" name='photo' placeholder='Preview Image URL'/>
      <input type="text" name='photo' placeholder='Image URL'/>
      <input type="text" name='photo' placeholder='Image URL'/>
      <input type="text" name='photo' placeholder='Image URL'/>
      <input type="text" name='photo' placeholder='Image URL'/>
    <hr />
      <button type="submit">Create Spot</button>
    </form>
  )
}
