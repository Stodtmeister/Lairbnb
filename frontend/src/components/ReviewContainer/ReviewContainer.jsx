import OpenModalButton from '../OpenModalButton/OpenModalButton'
import DeleteModal from '../DeleteModal/DeleteModal'
import ReviewModal from '../ReviewModal/ReviewModal';

export default function ReviewContainer({ user, rev, spotId, name }) {
  function formatDate(date) {
    const originalDate = new Date(date);
    const options = { year: 'numeric', month: 'short' };
    return originalDate.toLocaleDateString('en-US', options);
  }

  function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  return (
    <div className="review-container">
      <div className="review-info">
        <div className="user-review">
          <div className="profile">
            <i style={{ color: randomColor() }} className="fas fa-user-circle fa-2xl" />
          </div>
          <div>
            <p className="first-name">{rev.User.firstName}</p>
            <p>{formatDate(rev.createdAt)}</p>
          </div>
        </div>
        <p>{rev.review}</p>
        <div></div>
      </div>
      {user?.id === rev.userId && (
        <>
          <OpenModalButton
            id='update-review'
            buttonText='Update'
            modalComponent={<ReviewModal spotId={spotId} updating={true} name1={name} name2={rev.Spot?.name} reviewId={rev.id} />}
          />
          <OpenModalButton
            id="delete-review"
            buttonText="Delete"
            modalComponent={<DeleteModal reviewId={rev.id} id={spotId} />}
          />
        </>
      )}
    </div>
  )
}
