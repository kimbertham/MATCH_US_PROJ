
import React from 'react'
import axios from 'axios'
import { geoURL } from '../../Lib/common'

class  FoodSearch extends React.Component {
state = {
  data: {
    rankby: '',
    keyword: '',
    address: ''
  },
  errors: false,
  genre: ''
}

handleChange = (e) => {
  const data = { ...this.state.data, [e.target.name]: e.target.value }
  this.setState({ data })
}

setLocation = async (e) => {
  e.preventDefault()
  
  if (Object.values(this.state.data).some(o => o === '')) {
    this.setState({ errors: true })
  } else {
    const coOrd = (await axios.get(`${geoURL}${this.state.data.address}`)).data.results[0].geometry.location
    const location = { ...this.state.data, location: `${coOrd.lat},${coOrd.lng}` }
    this.setState({ data: location }, () => {
      this.props.getResults(this.state.data)
    }) 
  }
}

render() {
  const { data, errors } = this.state
  const errorC = errors ?  'red' : '' 
  return (

          
    <form  onSubmit={this.setLocation}>
      <div className='flex'>

        <div>
          <input 
            onChange={this.handleChange}
            name='keyword' 
            value={data.keyword}
            className={errorC}
            placeholder='Search...'/>
        </div>

        <div>
          <input 
            onChange={this.handleChange}
            name='address' 
            value={data.address}
            className={errorC}
            placeholder='Location'/>
        </div>
          
        <div>
          <select 
            onChange={this.handleChange}
            name='rankby'
            className={errorC}
            value={data.radius}>
            <option defaultValue value='10'> Sort by </option>  
            <option value='distance' >Distance</option>
            <option value='prominence' >Popularity</option>
          </select>
        </div>

        <div className='search-button'>
          <button type='submit'>Search</button>
        </div>
      </div>  
    </form>

  )
}
}

export default FoodSearch