import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAllSpots, useSpots } from '../../store/spots'
import { FilterModal, OpenModalButton, PreviewImage, ScrollContainer } from '../../components'
import filters from '../../images/filter.png'
import './Home.css'

export default function Home() {
  const [isChecked, setIsChecked] = useState(false)
  const dispatch = useDispatch()
  const spots = useSpots()

  const handleToggle = () => {
    setIsChecked(!isChecked)
  }

  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])

  return (
    <>
      <div className="options-container">
        <ScrollContainer />
        <div className="filters">
          <img className="filter-img" src={filters} alt="img" />
          <OpenModalButton
            buttonText="Filters"
            modalComponent={<FilterModal />}
          />
        </div>
        <div className="taxes">
          <p>Display total before taxes</p>
          <div
            className={`switch-toggle ${isChecked ? 'active' : ''}`}
            onClick={handleToggle}
          >
            <div className="switch-slider"></div>
          </div>
        </div>
      </div>
      <div className="spot-grid">
        {spots.map((spot) => (
          <PreviewImage key={spot.id} {...spot} />
        ))}
      </div>
    </>
  )
}
