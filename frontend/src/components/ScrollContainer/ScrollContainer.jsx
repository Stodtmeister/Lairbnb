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

  return (
    <div class="scroll-container">
      <div class="content">
        {iconArray.map((icon, idx) => (
          <Choice key={idx} icon={icon} />
        ))}
      </div>
      <div class="scroll-bar" id="scroll-bar"></div>
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
