import React from 'react'
import axios from 'axios'

import { noPlaces } from '../../Lib/common'
import { headers } from '../../Lib/auth'

import Match from '../MatchView/Match'

class getMovies extends React.Component {
  state ={
    results: [],
    mySwipes: []
  }

  async componentDidMount() {
    this.currentLocation()
  }

getResults = async (data) => {
  if (data) {
    const r = ( await axios.post(`/api/food/${this.props.connection.id}/`, data  ,headers())).data
    r.length <= 1 ?  r.push(noPlaces)  : null
    this.setState({ results: r })
  } else {
    this.currentLocation()
  }

}

  currentLocation = () => {
    navigator.geolocation.getCurrentPosition(p => {
      const l = `${p.coords.latitude}, ${p.coords.longitude}`
      this.getResults({ location: l , rankby: 'distance', keyword: 'food' })
    })
  } 

  swipeData = (d) => {
    return { 
      f_id: this.state.results[0].place_id, 
      name: this.state.results[0].name, 
      direction: d, 
      connection: this.props.connection.id }
  }

  nextSwipe = () => {
    this.state.results.length < 1 ? this.setState({ f: noPlaces })  :
      this.setState({ results: this.state.results.slice(1) })
  }


  render() {
    const { connection } = this.props
    return (
      <>
        <h1> HELLOO</h1>
        <Match 
          section='food'
          connection={connection}
          swipeData={this.swipeData}
          results={this.state.results}
          getMySwipes={this.getMySwipes}
          getResults={this.getResults}
          currentLocation={this.currentLocation}
          nextSwipe={this.nextSwipe}/>
      </>
    )
  }
}
export default getMovies