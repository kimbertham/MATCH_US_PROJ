import React from 'react'
import {  GoogleApiWrapper } from 'google-maps-react'
import axios from 'axios'

import LocationList from './LocationList'
import Details from '../MatchView/Details'
import LocationMap from './LocationMap'

const apiKey = 'AIzaSyAn3WW4SI3RHmQ7I_6HFcrUTdNalXkoJ4A'

class MapContainer extends React.Component {
state = {
  locations: [],
  center: '',
  selected: 1,
  detail: false
}

listLocations = []

async componentDidMount(){
  const r = await axios.get(`/api/locations/${this.props.connection.id}/`)
  this.setState({ locations: r.data, center: r.data[0] })
}

setSelect = (i) => {
  this.setState({ selected: i, center: this.state.locations[i] })
  this.list.scrollTop = this.listLocations[i].offsetTop - 200 
}

getDetail = async (l, i) => {
  if (this.state.detail) {
    this.setState({ detail: null })
  } else {
    const r = (await axios.get(`/api/food/${l.id}/`)).data
    console.log(l[i])
    this.setState({ detail: r, selected: i, center: this.state.locations[i] })
  }
}

render() {
  const {  connection, google } = this.props
  const { locations,center,selected, detail } = this.state
  return (
    <div className='flex sw fh locations'>

      {detail ? 
        <div className='swipeview'>
          <Details r={detail} getDetail={this.getDetail}/> 
        </div>
        : null}

      <div className='l-list' ref={l => this.list = l}>
        <LocationList 
          connection={connection}
          locations={locations}
          selected={selected}
          getDetail={this.getDetail}
          listLocations={this.listLocations}/>
      </div>

      <LocationMap 
        google={google}
        center={center}
        setSelect={this.setSelect}
        selected={selected}
        locations={locations}/>
  
    </div>
  )
}
}

export default GoogleApiWrapper({ apiKey: apiKey })(MapContainer)