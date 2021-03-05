import React from 'react'
import axios from 'axios'

class EventLocations extends React.Component {
  state ={
    location: '',
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
    const res = await axios.post('/api/locations/', { location: this.props.location })
    this.setState({ locations: res.data })
  }

  render(){
    const { locations  } = this.state
    const { location, handleLocation } = this.props
    return (
      <>
        <div> 
          <label>Location:</label> 
          <input
            name='location'
            value={location}
            onChange={ this.handlePlaces}/>
        </div>

        <div className='events-location'>
          <div ref={r => this.l = r}>
            {locations.map(l => {
              return <div 
                key={l.id} ref={r => this.l = r} className='pointer' onClick={()=>{
                  handleLocation(l.description), this.setState({ locations: [] })
                }}>
                <p > {l.description} </p>
              </div>
            })}
          </div>
        </div>
      </>
    )
  }
}

export default EventLocations