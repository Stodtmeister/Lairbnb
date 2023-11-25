import './FilterModal.css'
import line from '../../images/minus-horizontal-straight-line.png'
import { useState } from 'react'
import { useModal } from '../../context/Modal'

export default function FilterModal() {
  const { closeModal } = useModal()
  const [inputValue, setInputValue] = useState('0')
  const [clicked1, setClicked1] = useState('clicked')
  const [clicked2, setClicked2] = useState('')
  const [clicked3, setClicked3] = useState('')
  const number = ~~(Math.random() * 200)

  function handleInputChange(e) {
    const newValue = e.target.value
    setInputValue(newValue)
  }

  function handleClick(e) {
    if (e.target.value === '1') {
      setClicked1('clicked')
      setClicked2('')
      setClicked3('')
    } else if (e.target.value === '2') {
      setClicked1('')
      setClicked2('clicked')
      setClicked3('')
    } else if (e.target.value === '3') {
      setClicked1('')
      setClicked2('')
      setClicked3('clicked')
    }
  }

  function handleSubmit() {
    alert('feature coming soon')
  }

  return (
    <>
      <div className="filter-header">
        <div onClick={closeModal}>X</div>
        <h4>Filters</h4>
      </div>
      <hr />
      <div className="filter-type">
        <h3>Type of place</h3>
        <p>Search rooms, entire homes, or any type of place.</p>
        <div className="filter-buttons">
          <button value='1' onClick={handleClick} className={`btn-1 ${clicked1}`}>Any type</button>
          <button value='2' onClick={handleClick} className={`btn-2 ${clicked2}`}>Room</button>
          <button value='3' onClick={handleClick} className={`btn-3 ${clicked3}`}>Entire home</button>
        </div>
      </div>
      <hr />
      <div className="filter-price">
        <h4>Price Range</h4>
        <p>Nightly prices before fees and taxes</p>
        <div>
          <label htmlFor="price"></label>
          <input
            type="range"
            id="price"
            name="price"
            min="0"
            max="600"
            value={inputValue}
            onChange={handleInputChange}
            list='values'
            step='10'
          />
          <datalist id="values">
            <option value="0" label="0"></option>
            <option value="100" label="100"></option>
            <option value="200" label="200"></option>
            <option value="300" label="300"></option>
            <option value="400" label="400"></option>
            <option value="500" label="500"></option>
            <option value="600" label="600"></option>
          </datalist>
        </div>
      </div>
      <div className="priceRange-btn">
        <div className='min-container'>
          <label htmlFor="min-price">Minimum</label>
          <input type="text" name="" id="min-price" defaultValue="$0" />
        </div>
        <div>
          <img className="line" src={line} alt="line" />
        </div>
        <div className="max-container">
          <label htmlFor="max-price">Maximum</label>
          <input
            type="text"
            value={'$' + inputValue}
            id="max-price"
            defaultValue={`$`}
          />
        </div>
      </div>
      <hr />
      <h4 className='rb'>Rooms and beds</h4>
      <hr />
      <div className="filter-footer">
        <button onClick={handleSubmit} className='clear'>Clear all</button>
        <button onClick={handleSubmit} className='find'>{`Show ${number} places`}</button>
      </div>
    </>
  )
}
