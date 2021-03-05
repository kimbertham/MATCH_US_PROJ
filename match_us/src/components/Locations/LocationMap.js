import React from 'react'
import { Map,  Marker } from 'google-maps-react'
import { styles } from '../../Lib/mapStyles'

const LocationMap = ({ google, center, selected, setSelect ,locations }) => {
  return (
    <>
      <Map google={google}
        className='map'
        zoom={11}
        initialCenter={{ lat: 51.509865,lng: -0.118092 }}
        center={center}
        styles={styles}>

        {locations.length > 0 ? 
          locations.map((l, i) => {
            return <Marker key={i} label={`${i + 1}`}
              position={{ lat: l.lat, lng: l.lng }}
              onClick={()=>{
                setSelect(i)
              }} 
              icon={selected === i ?
                { url: 'https://bit.ly/3qavbJY',
                  scaledSize: new google.maps.Size(40, 35) } :
                { url: 'https://bit.ly/3jxtH9Y',
                  scaledSize: new google.maps.Size(40, 35) }}/>
          }) : null}
      </Map>
    </>
  )
}

export default LocationMap