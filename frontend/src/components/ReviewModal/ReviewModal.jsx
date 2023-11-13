// import OpenModalButton from '../OpenModalButton/OpenModalButton'
import { useModal } from '../../context/Modal'
import './ReviewModal.css'

export default function ReviewModal() {
  const closeModal = useModal()
  
  return (
    <h5>ReviewModal</h5>
  )
  // return (
  //   <OpenModalButton
  //     buttonText='hello'
  //     modalComponent={<h2>Hello World</h2>}
  //     onButtonClick={() => console.log("Greeting initiated")}
  //   />
  // )
}
