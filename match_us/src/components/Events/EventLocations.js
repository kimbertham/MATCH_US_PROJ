import React from 'react'
import axios from 'axios'

const proxyurl = 'https://cors-anywhere.herokuapp.com/'
const key = '&key=AIzaSyAn3WW4SI3RHmQ7I_6HFcrUTdNalXkoJ4A'
const baseURL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='

class EventLocations extends React.Component {
  state ={
    data: {
      input: ''
    },
    locations: []
  }

  handleClickOutside = (e) => {
    if (this.l  && !this.l.contains(e.target) ) {
      this.setState({ locations: [] })
    }
  }
  
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }
  
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handlePlaces = async (e) => {
    await this.props.handleChange(e)
    const res = await axios.get(`${proxyurl}${baseURL}${this.props.location}${key}`)
    this.setState({ locations: res.data.predictions })
  }

  render(){
    const { locations  } = this.state
    const { location, handleLocation } = this.props
    return (
      <>
        <div className='form-field'> 
          <label>Location:</label>     
          <input
            className='e-input'
            name='location'
            value={location}
            onChange={ this.handlePlaces}/>
        </div>

        <div ref={r => this.l = r} className='aboslute'>
          {locations.map(l => {
            return <div 
              key={l.id} ref={r => this.l = r} className='pointer' onClick={()=>{
                handleLocation(l.description), this.setState({ locations: [] })
              }}>
              <p > {l.description} </p>
            </div>
        
          })}
        </div>
      </>
    )
  }
}

export default EventLocations