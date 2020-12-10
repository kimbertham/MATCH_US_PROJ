
import React from 'react'
import axios from 'axios'
import { geoURL } from '../../Lib/common'

class  FoodSearch extends React.Component {
state = {
  data: {
    location: '',
    radius: 1500,
    keyword: '',
    address: ''
  }
}

handleChange = (e) => {
  const data = { ...this.state.data, [e.target.name]: e.target.value }
  this.setState({ data })
}

setLocation = async (e) => {
  e.preventDefault()
  const { data } = this.state
  const coOrd = (await axios.get(`${geoURL}${data.address}`)).data.results[0].geometry.location
  const location = { ...data, location: `${coOrd.lat},${coOrd.lng.toString().slice(1)}` }
  this.setState({ data: location }, () => {
    this.props.submit(data)
  }) 
}

// clearSwipes = () => {
//   axios.
// }

render() {
  const { data } = this.state
  return (

    <section className='f-search'>
      <form  onSubmit={this.setLocation} className='f-form'>
        <div className='flex'>

          <div className='keyword-field'>
            <input 
              onChange={this.handleChange}
              name='keyword' 
              value={data.keyword}
              className='form-input' 
              placeholder='Search...'/>
          </div>

          <div className='address-field'>
            <input 
              onChange={this.handleChange}
              name='address' 
              value={data.address}
              className='form-input' 
              placeholder='Location'/>
          </div>
          
          <div className='radius-field'>
            <select 
              onChange={this.handleChange}
              name='radius'
              value={data.radius}>
              <option defaultValue value='10'> Distance </option>  
              <option value='1' >1m</option>
              <option value='5' >5m</option>
              <option value='10' >10m</option>
              <option value='20' >15m</option>
              <option value='25' >25m</option>
              <option value='30' >30m</option>
            </select>
          </div>

          <div className='search-button'>
            <button type='submit'>Search</button>
          </div>
        </div>  
      </form>
      {/* <button onClick={this.clearSwipes}> Clear Swipes </button> */}
    </section>
  )
}
}

export default FoodSearch