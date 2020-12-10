/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import FoodSearch from './FoodSearch'
import FoodMatches from './FoodMatches'
import { proxyurl, GImages,fURL } from '../../Lib/common'
import { headers } from '../../Lib/auth'

class Food extends React.Component {
state = {
  list: [],
  food: [],
  location: '',
  f: null,
  i: 0
}

async componentDidMount() {
  const r = ( await axios.get('/api/food/', headers())).data
  this.setState({ list: r }, () => {
    this.currentPos() 
  })
}

currentPos = async () => {
  navigator.geolocation.getCurrentPosition(
    position => {
      const l = `${position.coords.latitude}, ${position.coords.longitude.toString().slice(1)}`
      const r = this.submitGoogle({ location: l, radius: 10000 })
    })
}

submitGoogle = async (d) => {
  const r = (await axios.get(`${proxyurl}${fURL}`, { params: d })).data.results
  const food = r.filter(f => !this.state.list.includes(f.place_id))
  this.setState({ food, f: food[this.state.i] })
}

swipeMovie = async (d) => {
  const data = { f_id: this.state.f.place_id, name: this.state.f.name, 
    direction: d }
  await  axios.post('/api/food/', data, headers())
  this.nextSwipe()
}

nextSwipe = () => {
  const { i, food } = this.state
  if (i === food.length - 1) {
    console.log('no more places')
  } else {
    this.setState({ i: i + 1, f: this.state.food[i + 1] })
  }
}

render(){
  const { f } = this.state
  const { connection } = this.props
  return (
    <div className='fp f-cont'>

      <FoodSearch
        submit={this.submitGoogle}/>

      <FoodMatches 
        connection={connection}/>

      {f ? <div className='flex'>
        <div className='sw fh center column'>
          <div className='m-card-cont' onClick={this.toggleDetails}>
            <img 
              alt='poster' className='m-poster'
              src={`${GImages}${f.photos ? f.photos[0].photo_reference : null}`}/>
            <h1> {f.name}</h1>
            <p>{f.vicinity}</p>
          </div>

          <div className='flex'>
            <button className='accept' onClick={()=>{
              this.swipeMovie('True')
            }}> Yes </button>
            <button className='decline' onClick={()=>{
              this.swipeMovie('False')
            }}> No </button>
          </div>  
        </div>  
      </div> : null }

    
    </div>
  )
}
}
export default Food