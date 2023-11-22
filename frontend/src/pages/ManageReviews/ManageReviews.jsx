import { useDispatch, useSelector } from 'react-redux'
import { getUserReviewsThunk, useReviews } from '../../store/reviews'
import { useEffect } from 'react'
import { ReviewContainer } from '../../components'
import './ManageReviews.css'

export default function ManageReviews() {
  const dispatch = useDispatch()
  const userReviews = useReviews()
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(getUserReviewsThunk())
  }, [dispatch])

  console.log('UR', userReviews);
  return (
    <>
      <h2 className='MR'>Manage Reviews</h2>
      <div className='spot-review'>
        {userReviews.map(rev => (
          <div key={rev.id}>
            <h4>{rev.Spot?.name}</h4>
            <ReviewContainer rev={rev} user={user} />
            <hr />
          </div>
          ))}
      </div>
    </>
  )
}
