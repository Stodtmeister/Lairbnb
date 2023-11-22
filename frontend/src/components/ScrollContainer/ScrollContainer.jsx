import './ScrollContainer.css'
import myIcon from '../../images/icon1.jpeg'

export default function ScrollContainer() {
  return (
    <div class="scroll-container">
      <div class="content">

        <div className='choice'>
          <img src={myIcon} alt="Icon" />
          <span>OMG!</span>
        </div>
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
        <div class="item">Item 3</div>
      </div>
      <div class="scroll-bar" id="scroll-bar"></div>
    </div>
  )
}
