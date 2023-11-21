import { useDispatch, useSelector } from 'react-redux'
import { getUserReviewsThunk, useReviews } from '../../store/reviews'
import { useEffect, useState } from 'react'
import { ReviewContainer } from '../../components'
import './ManageReviews.css'

export default function ManageReviews() {
  const userReviews = useReviews()
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState([])

  // if (!refresh) setRefresh(!refresh)

  useEffect(() => {
    if (refresh) {
      window.location.reload();
    }
  }, [refresh])

  useEffect(() => {
    const fetchData = async () => {
      const uReviews = await dispatch(getUserReviewsThunk())
      setData(uReviews.reviews)
    }
    fetchData()
  }, [dispatch])


  if (!data.length) return <></>

  return (
    <>
      <h2 className='MR'>Manage Reviews</h2>
      <div className='spot-review'>
        {data.map(rev => (
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
