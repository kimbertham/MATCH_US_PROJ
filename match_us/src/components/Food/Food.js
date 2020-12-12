/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'

import FoodSearch from './FoodSearch'
import FoodMatches from './FoodMatches'
import FoodDetails from './FoodDetails'
import FoodSwipe from './FoodSwipe'

import { proxyurl, fURL } from '../../Lib/common'
import { headers } from '../../Lib/auth'

class Food extends React.Component {
state = {
  food: [],
  location: '',
  f: null,
  i: 0,
  selected: null
}

async componentDidMount() {
  const r = ( await axios.get('/api/food/', headers())).data
  this.setState({ list: r }, () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const l = `${position.coords.latitude}, ${position.coords.longitude.toString().slice(1)}`
        const r = this.submitGoogle({ location: l, radius: 10000 })
      })
  })
}

submitGoogle = async (d) => {
  const r = (await axios.get(`${proxyurl}${fURL}`, { params: d })).data.results
  const food = r.filter(f => !this.state.list.includes(f.place_id))
  this.setState({ food, f: food[this.state.i] })
}

nextSwipe = () => {
  const { i, food } = this.state
  if (i === food.length - 1) {
    console.log('no more places')
  } else {
    this.setState({ i: i + 1, f: this.state.food[i + 1] })
  }
}

selectMatch = (e) => {
  this.setState({ selected: e.target.id })
}

render(){
  const { f, selected } = this.state
  const { connection } = this.props
  return (
    <div className='relative f-cont'>

      {selected ?
        <FoodDetails selected={selected}/> 
        : null}

      <FoodSearch
        submit={this.submitGoogle}/>

      <div className='sw sh flex'>
        <FoodMatches 
          connection={connection}
          selectMatch={this.selectMatch}/>

        <FoodSwipe f={f}
          connection={connection}
          nextSwipe={this.nextSwipe}
          selectMatch={this.selectMatch}/>
      </div>
    </div>
  )
}
}
export default Food