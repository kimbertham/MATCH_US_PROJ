/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'

import { noPlaces } from '../../Lib/common'
import { headers } from '../../Lib/auth'
import { getCoordinates } from '../../Lib/com'
import Match from '../MatchView/Match'

class getMovies extends React.Component {
state = {
  results: []
}

async componentDidMount() {
  this.getResults()
}

getResults = async (d) => {
  let data
  try {
    const p = await getCoordinates() 
    console.log(p)
    data = d ? d : { location: `${p.coords.latitude}, ${p.coords.longitude}` , rankby: 'distance', keyword: 'food' }
  } catch (err) {
    data = { location: '51.509865, -0.118092', rankby: 'distance', keyword: 'food' }
  }
  const r = ( await axios.post(`/api/food/${this.props.connection.id}/`, data , headers())).data
  r.length <= 1 ?  r.push(noPlaces)  : null

  this.setState({ results: r })
}

swipeData = (d, i) => {
  return { 
    f_id: this.state.results[i].place_id, 
    name: this.state.results[i].name, 
    direction: d, 
    connection: this.props.connection.id }
}

nextSwipe = () => {
  this.state.results.length < 1 ? this.setState({ f: noPlaces })  :
    this.setState({ results: this.state.results.slice(1) })
}

render() {
  const { connection } = this.props
  const { results } = this.state
  return (
    <>
      <Match section='food'
        connection={connection}
        swipeData={this.swipeData}
        results={results}
        getResults={this.getResults}
        nextSwipe={this.nextSwipe}/>
    </>
  )
}
}
export default getMovies