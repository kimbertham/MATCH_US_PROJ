/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { aURL, proxyurl } from '../../Lib/common'

import ActivityCard from './ActivityCard'

class Activities extends React.Component{
state = {
  location: '',
  activity: '',
  activities: []
}

async componentDidMount() {
  await navigator.geolocation.getCurrentPosition(p =>
    this.setState({ 
      location: `${p.coords.latitude}, ${p.coords.longitude}`,
      activity: this.props.match.params.activity }, () => {
      this.getData()
    }))

}

  getData = async () => {
    const { location, activity } = this.state
    const r = await axios.get(`${proxyurl}${aURL}&type=${activity.toLowerCase()}&location=${location}`)
    this.setState({ activities: r.data.results }, () => {
      console.log('set')
    })
  }


  render() {
    const { activity, activities } = this.state
    console.log(activities)
    return (
      <>
        <h2> {activity.replace('_', ' ')} </h2>

        {activities.map(a => <ActivityCard key={a.place_id} a={a} />)}
      </>
  
    )
  }
}

export default withRouter(Activities)