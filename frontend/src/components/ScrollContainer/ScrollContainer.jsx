import React, { useEffect, useState } from 'react'
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
import './ScrollContainer.css'

export default function ScrollContainer() {
  const iconArray = [
    { icon: houseIcon, title: 'Cabin' },
    { icon: spaceshipIcon, title: 'OMG!' },
    { icon: viewIcon, title: 'Amazing views' },
    { icon: tropicalIcon, title: 'Tropical' },
    { icon: mansionIcon, title: 'Mansion' },
    { icon: treehouseIcon, title: 'Treehouses' },
    { icon: beachIcon, title: 'Beachfront' },
    { icon: offGridIcon, title: 'Off-the-grid' },
    { icon: historicalIcon, title: 'Historical homes' },
    { icon: countryIcon, title: 'Countryside' },
  ]
  let [scrolled, setScrolled] = useState(0)

  // useEffect(() => {
  //   console.log('scroll', scrolled);
  // }, [scrolled])

  const scrollLeft = () => {
    setScrolled(scrolled--)
    document.getElementById('scroll').scrollRight -= 250
  }

  const scrollRight = () => {
    setScrolled(scrolled++)
    document.getElementById('scroll').scrollLeft += 250
  };

  console.log('2', scrolled);
  return (
    <div className="scroll-container" id='scroll'>
      <div className="scroll-bar2" id="scroll-bar">
        <button className="scroll-button" onClick={scrollLeft}>
        <i class="fa-solid fa-less-than fa-sm"></i>
        </button>
      </div>
      <div className="content">
        {iconArray.map((icon, idx) => (
          <Choice key={idx} icon={icon} />
        ))}
      </div>
      <div className="scroll-bar" id="scroll-bar">
        <button className="scroll-button" onClick={scrollRight}>
        <i class="fa-solid fa-greater-than fa-sm"></i>
        </button>
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
