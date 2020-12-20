/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'

import FoodSearch from './FoodSearch'
import FoodMatches from './FoodMatches'
import Match from '../Common/Match'
import FoodDetails from './FoodDetails'
import FoodSwipe from './FoodSwipe'
import MatchButtons from './MatchButtons'

import { proxyurl, fURL, noPlaces, GImages } from '../../Lib/common'
import { headers } from '../../Lib/auth'

class Food extends React.Component {
state = {
  food: [],
  list: [],
  matches: [],
  selected: null,
  match: false,
  search: false,
  f: null,
  i: 0
}

async componentDidMount() {
  const r = ( await axios.get(`/api/food/${this.props.connection.id}/`, headers())).data
  this.getMatches()
  this.setState({ list: r }, ()=> {
    navigator.geolocation.getCurrentPosition(p => {
      const l = `${p.coords.latitude}, ${p.coords.longitude}`
      this.submitGoogle({ location: l, rankby: 'distance', keyword: 'restaurant' })
    })
  })
}

submitGoogle = async (d) => {
  const r = (await axios.get(`${proxyurl}${fURL}`, { params: d })).data.results
  const food = r.filter(f => !this.state.list.includes(f.place_id))
  food.length <= 0 ? food.push(noPlaces) : null
  this.setState({ food, f: food[this.state.i] })
}

nextSwipe = () => {
  const { i, food } = this.state
  i === food.length - 1 ? this.setState({ f: noPlaces }) :
    this.setState({ i: i + 1, f: this.state.food[i + 1] })
}

getMatches = async () => {
  const { id, partner } = this.props.connection
  const r  = (await axios.get(`/api/food/${id}/${partner.id}/`, headers())).data
  this.setState({ matches: r })
}

checkMatch = async (i) => {
  const { id, partner } = this.props.connection
  const r = (await axios.post(`/api/food/${id}/${partner.id}/`, { id: i })).data
  r ? this.setState({ match: this.state.f }, () => {
    this.getMatches()
  }) : this.nextSwipe()
}
deleteMatches = async () => {
  await axios.delete(`/api/food/${this.props.connection.id}/`, headers())
  this.setState({ f: this.state.food[0] })
  this.getMatches()
}

getDetail = (e) => {
  this.setState({ selected: this.state.selected ?  null : e.target.id })
}

showSearch = () => {
  this.setState({ search: !this.state.search })
}

clearMatch = () => {
  this.setState({ match: false })
  this.nextSwipe()
}

render(){
  const { f, selected, matches, search, match } = this.state
  const { connection } = this.props

  return (
    <>

      {search ?
        <FoodSearch
          showSearch={this.showSearch}
          submit={this.submitGoogle}/>
        : null}

      <div className='sw fh flex'>
        <FoodMatches 
          matches = {matches}
          deleteMatches= {this.deleteMatches}
          getDetail={this.getDetail}/>

        <div className='flex-grow relative center'>
          {selected ?
            <FoodDetails 
              selected={selected}
              getDetail={this.getDetail}/> 
            : null}

          {match ? 
            <Match buttons={
              <MatchButtons    
                getDetail={this.getDetail}
                id={ f.place_id }/>}
            match={match}
            connection={connection}
            clear={this.clearMatch}
            img={ `${GImages}${f.photos[0].photo_reference}`}/> 
            : null}

          <FoodSwipe f={f}
            connection={connection}
            showSearch={this.showSearch}
            checkMatch={this.checkMatch}
            nextSwipe={this.nextSwipe}
            getDetail={this.getDetail}
            deleteMatches={this.deleteMatches}/>
        </div>

      </div>
    </>
  )
}
} export default Food



