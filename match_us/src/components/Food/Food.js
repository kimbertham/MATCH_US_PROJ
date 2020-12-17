/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'

import FoodSearch from './FoodSearch'
import FoodMatches from './FoodMatches'
import FoodDetails from './FoodDetails'
import FoodSwipe from './FoodSwipe'

import { proxyurl, fURL, noPlaces } from '../../Lib/common'
import { headers } from '../../Lib/auth'

class Food extends React.Component {
state = {
  food: [],
  list: [],
  matches: [],
  selected: null,
  match: false,
  f: null,
  i: 0
}

async componentDidMount() {
  this.getMatches()
  const r = ( await axios.get('/api/food/', headers())).data
  this.setState({ list: r }, ()=> {
    navigator.geolocation.getCurrentPosition(
      position => {
        const l = `${position.coords.latitude}, ${position.coords.longitude}`
        console.log(l)
        this.submitGoogle({ location: l, rankby: 'distance', keyword: 'restaurant' })
      })
  })
}

submitGoogle = async (d) => {
  const r = (await axios.get(`${proxyurl}${fURL}`, { params: d })).data.results
  console.log(d)
  const food = r.filter(f => !this.state.list.includes(f.place_id))
  food.length <= 0 ? food.push(noPlaces) : null
  this.setState({ food, f: food[this.state.i] })
}

nextSwipe = () => {
  const { i, food } = this.state
  if (i === food.length - 1) {
    this.setState({ f: noPlaces })
  } else {
    this.setState({ i: i + 1, f: this.state.food[i + 1] })
  }
}

getMatches = async () => {
  const { id, partner } = this.props.connection
  const r  = (await axios.get(`/api/food/${id}/${partner.id}/`, headers())).data
  this.setState({ matches: r })
}

checkMatch = async (i) => {
  const { id, partner } = this.props.connection
  const r = (await axios.post(`/api/food/${id}/${partner.id}/`, { id: i })).data
  if (r) {
    this.setState({ match: true })
    this.getMatches() 
  }
}

selectMatch = (e) => {
  console.log(e.target.id)
  this.setState({ selected: this.state.selected ?  null : e.target.id })
}

deleteMatches = async () => {
  await axios.delete(`/api/food/${this.props.connection.id}/${0}/`, headers())
  this.getMatches()
}


render(){
  const { f, selected, matches } = this.state
  const { connection } = this.props

  return (
    <div className='relative f-cont'>

      {selected ?
        <FoodDetails 
          selected={selected}
          selectMatch={this.selectMatch}/> 
        : null}

      <FoodSearch
        submit={this.submitGoogle}/>

      <div className='sw sh flex'>
        <FoodMatches 
          matches = {matches}
          deleteMatches= {this.deleteMatches}
          selectMatch={this.selectMatch}/>

        <FoodSwipe f={f}
          connection={connection}
          checkMatch={this.checkMatch}
          nextSwipe={this.nextSwipe}
          selectMatch={this.selectMatch}/>
      </div>
    </div>
  )
}
}
export default Food