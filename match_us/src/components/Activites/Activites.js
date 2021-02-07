import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { headers } from '../../Lib/auth'
import { noPlaces } from '../../Lib/common'
import { getCoordinates } from '../../Lib/com'

import Match from '../MatchView/Match'

class Activities extends React.Component{
state = {
  results: []
}

async componentDidMount() {
  this.getResults()
}

getResults = async () => {
  let data
  const activity = this.props.match.params.activity.toLowerCase().replace('_', ' ')
  try {
    const p = await getCoordinates() 
    data = { location: `${p.coords.latitude}, ${p.coords.longitude}`, rankby: 'distance', keyword: activity }
  } catch (err) {
    data = { location: '51.509865, -0.118092', rankby: 'distance', keyword: activity }
  }
  let r = await axios.post(`/api/activities/${this.props.connection.id}/`, data, headers())
  r.data.length <= 0 ? r = [noPlaces] : null
  this.setState({ results: r.data })
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
    const { results } = this.state
    return (
      <>
        <Match section='activities'
          results={results}
          swipeData={this.swipeData}
          connection={this.props.connection}
          nextSwipe={this.nextSwipe}
          getResults={this.getResults}/>
      </>
    )
  }
}

export default withRouter(Activities)