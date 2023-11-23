import React, { useState } from 'react'
import spaceshipIcon from '../../images/icon1.jpeg'
import houseIcon from '../../images/houseIcon.jpeg'
import beachIcon from '../../images/beachIcon.jpeg'
import countryIcon from '../../images/countryIcon.jpeg'
import historicalIcon from '../../images/historicalIcon.jpeg'
import mansionIcon from '../../images/mansion-icon.jpeg'
import offGridIcon from '../../images/offGrid-icon.jpeg'
import treehouseIcon from '../../images/treehouse-icon.jpeg'
import tropicalIcon from '../../images/tropical-icon.jpeg'
import viewIcon from '../../images/view-icon.jpeg'
import boatsIcon from '../../images/boats-icon.jpeg';
import castlesIcon from '../../images/castles-icon.jpeg';
import lakeIcon from '../../images/lake-icon.jpeg';
import surfingIcon from '../../images/surfing-icon.jpeg';
import trendingIcon from '../../images/trending-icon.jpeg';
import skiingIcon from '../../images/skiing-icon.jpeg';
import './ScrollContainer.css'

export default function ScrollContainer() {
  const iconArray = [
    { icon: houseIcon, title: 'Cabin' },
    { icon: spaceshipIcon, title: 'OMG!' },
    { icon: viewIcon, title: 'Amazing views' },
    { icon: surfingIcon, title: 'Surfing' },
    { icon: trendingIcon, title: 'Trending' },
    { icon: mansionIcon, title: 'Mansion' },
    { icon: treehouseIcon, title: 'Treehouses' },
    { icon: beachIcon, title: 'Beachfront' },
    { icon: offGridIcon, title: 'Off-the-grid' },
    { icon: historicalIcon, title: 'Historical homes' },
    { icon: countryIcon, title: 'Countryside' },
    { icon: skiingIcon, title: 'Skiing' },
    { icon: lakeIcon, title: 'Lake' },
    { icon: castlesIcon, title: 'Castles' },
    { icon: tropicalIcon, title: 'Tropical' },
    { icon: boatsIcon, title: 'Boats' },
  ]

  const [test, setTest] = useState(0)
  const ele = document.getElementById('scroll')

  const scrollLeft = () => {
    ele.scrollLeft -= 50
    setTest(ele.scrollLeft)
  }

  const scrollRight = () => {
    ele.scrollLeft += 50
    setTest(ele.scrollLeft)
  };
  
  return (
    <div className={`scroll-container`} id='scroll'>
      {test > 0 &&
        <div className="scroll-bar2" id="scroll-bar">
          <div className='shadow'>
            <button className="scroll-button" onClick={scrollLeft}>
              <i class="fa-solid fa-less-than fa-sm"></i>
            </button>
          </div>
        </div>
      }
      <div className="content">
        {iconArray.map((icon, idx) => (
          <Choice key={idx} icon={icon} />
        ))}
      </div>
      <div className="scroll-bar" id="scroll-bar">
        <div className="shadow">
          <button className="scroll-button" onClick={scrollRight}>
            <i class="fa-solid fa-greater-than fa-sm"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

function Choice({ icon }) {
  return (
    <div className="choice-container">
      <div className="choice">
        <img src={icon.icon} alt="choice" />
        <span>{icon.title}</span>
      </div>
    </div>
  )
}
