/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { proxyurl, fDetails, GImages } from '../../Lib/common'

class FoodDetails extends React.Component {
  state ={
    f: null
  }

  componentDidMount() {
    this.getFullDetails()
  }

getFullDetails = async () => {
  const id = this.props.selected
  const f = (await axios.get(`${proxyurl}${fDetails}${id}`)).data.result
  this.setState({ f })
}

render() {
  const { f } = this.state
  const { getDetail } = this.props
  if (!f) return null
  return (

    <div onClick={getDetail} className='modal f-details column'>
      <h1>{f.name}</h1>
      <p> {f.website}</p>
      <p> {f.formatted_address}</p>
      <p> {f.formatted_phone_number}</p>
      <p> {f.opening_hours ? 
        <>
          <p>{f.opening_hours.open_now} </p>
          {f.opening_hours.weekday_text.map((w,i) => <p key={i}> {w}</p>)}
        </> : null}</p>

      <p>{f.price_level}</p>
      <p>{f.rating}</p>
      {f.photos ? f.photos.slice(0,3).map(p => <div key={p.photo_reference} className='f-detail-img'
        style={{ backgroundImage: `url(${GImages}${p.photo_reference})` }}/>) : null}
      {f.reviews ? <p>{f.reviews[0].author_name} {f.reviews[0].rating} {f.reviews[0].text} </p> : null}
    </div>

  )
}
}
export default FoodDetails