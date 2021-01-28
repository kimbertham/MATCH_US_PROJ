import React from 'react'
import axios from 'axios'

import { noPlaces } from '../../Lib/common'
import { headers } from '../../Lib/auth'

import Match from '../MatchView/Match'
import ToggleView from '../Common/ToggleView'
import List from '../ListView/List'

class getMovies extends React.Component {
  state = {
    results: [],
    MatchView: true
  }

  async componentDidMount() {
    this.currentLocation()
  }

getResults = async (d) => {
  if (d) {
    const r = ( await axios.post(`/api/food/${this.props.connection.id}/`, d , headers())).data
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

  changeView = () => {
    this.setState({ MatchView: !this.state.MatchView })
  }

  render() {
    const { connection } = this.props
    const { MatchView, results } = this.state
    return (
      <>

        <ToggleView 
          changeView={this.changeView}/>

        {MatchView ? 
      
          <Match section='food'
            connection={connection}
            swipeData={this.swipeData}
            results={results}
            getResults={this.getResults}
            nextSwipe={this.nextSwipe}/>
          : 
          <List section='food'
            results={results}
            swipeData={this.swipeData}/>

        }
      </>
    )
  }
}
export default getMovies