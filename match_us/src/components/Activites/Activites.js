/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { headers } from '../../Lib/auth'
import { noPlaces } from '../../Lib/common'

import Match from '../MatchView/Match'
import ToggleView from '../Common/ToggleView'
import List from '../ListView/List'

class Activities extends React.Component{
state = {
  results: [],
  MatchView: true
}

async componentDidMount() {
  this.currentLocation()
}

currentLocation = () => {
  navigator.geolocation.getCurrentPosition(p => {
    const location = `${p.coords.latitude}, ${p.coords.longitude}`
    const activity = this.props.match.params.activity.toLowerCase().replace('_', ' ')
    this.getResults({ location: location, rankby: 'distance', keyword: activity })
  })
}

  getResults = async (d) => {
    if (d) {
      let r = await axios.post(`/api/activities/${this.props.connection.id}/`, d, headers())
      r.data.length <= 0 ? r = [noPlaces] : null
      this.setState({ results: r.data })
    } else {
      this.currentLocation()
    }
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


  changeView = () => {
    this.setState({ MatchView: !this.state.MatchView })
  }


  render() {
    const { results,MatchView } = this.state
    return (
      <>
        <ToggleView 
          changeView={this.changeView}/>
        {MatchView ? 
          <Match section='activities'
            results={results}
            swipeData={this.swipeData}
            connection={this.props.connection}
            nextSwipe={this.nextSwipe}
            getResults={this.getResults}/>
          :
          <List section='activities'
            results={results}
            swipeData={this.swipeData}/>
        }
      </>
    )
  }
}

export default withRouter(Activities)