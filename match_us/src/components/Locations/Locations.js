import React from 'react'
import { Map, GoogleApiWrapper,  Marker } from 'google-maps-react'
import axios from 'axios'

const key = 'AIzaSyAn3WW4SI3RHmQ7I_6HFcrUTdNalXkoJ4A'

class MapContainer extends React.Component {
state = {
  locations: [],
  center: ''
}

async componentDidMount(){
  this.getLocations()
}

getLocations = async () => {
  const r = await axios.get(`/api/locations/${this.props.connection.id}/`)
  this.setState({ locations: r.data, center: r.data[0] })
}


render() {
  const { connection, google } = this.props
  const { locations,center } = this.state


  return (
    <>
      <h1> {connection.partner.first_name} & {connection.user.first_name}&apos;s Date Locations</h1>
      <div className='flex locations'>

        <div className='l-list'>
          <h1> Date Locations</h1>
          {locations.map((l,i) => {
            return <div className='l-item' key={l.name}>
              <p>{i} {l.address}</p>
              <p> {l.title}</p>
            </div>
          })}
        </div>
        
        <div className='map-cont'>
          <Map
            className='map'
            google={this.props.google}
            zoom={11}
            initialCenter={{ lat: 51.509865,lng: -0.118092 }}
            center={center}>

            {locations.map((l, i) => {
              return <Marker key={i} id={i}  label={`${i + 1}`}
                icon={ { url: 'https://bit.ly/3jxtH9Y',
                  scaledSize: new google.maps.Size(40, 35) }}
                position={{ lat: l.lat, lng: l.lng }} />
            })}
          </Map>
        </div>
  


      </div>
    </>
  )
}
}

export default GoogleApiWrapper({ apiKey: key })(MapContainer)