import './SpotInfo.css'

export default function SpotInfo(Owner) {

  console.log('test', Owner)
  return (
    <section className='spot-info'>
      <div className='spot-description' >
        <h3>Hosted by {Owner?.firstName} {Owner?.lastName}</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi unde, consectetur eos ratione minus numquam iure repellendus itaque mollitia, a aperiam deserunt voluptas magnam assumenda quos, aspernatur nesciunt quam consequatur.</p>
      </div>
      <div className='reserve'>

      </div>
    </section>
  )
}
