
import React from 'react'
import axios from 'axios'
import { geoURL } from '../../../Lib/common'
import Loader from 'react-loader-spinner'

class  FoodSearch extends React.Component {
state = {
  data: {
    rankby: '',
    keyword: '',
    address: ''
  },
  errors: false,
  loader: false
}

handleChange = (e) => {
  const data = { ...this.state.data, [e.target.name]: e.target.value }
  this.setState({ data })
}

setLocation =  async () => {
  if (Object.values(this.state.data).some(o => o === '')) {
    this.setState({ errors: true })
    setTimeout(() => this.setState({ errors: false }), 1000)
  } else {
    this.setState({ loader: true }, async () => {
      const coOrd = (await axios.get(`${geoURL}${this.state.data.address}`)).data.results[0].geometry.location
      const location = { ...this.state.data, location: `${coOrd.lat},${coOrd.lng}` }
      this.setState({ data: location  }, async () => {
        await this.props.getResults(this.state.data)   
        this.setState({ loader: false }) 
      })
    }) 
  }
}

render() {
  const { data, errors, loader } = this.state

  return (

    <>
      {loader  ?
        <Loader
          type='ThreeDots'
          color="#f20cd766"
          height={30}
          width={50}/> 
        :
        <>
          <form  onSubmit={e => {
            e.preventDefault(), this.setLocation()
          }}>

            <div className='flex'>
              <h3 className> Filter: &nbsp;  </h3>
              <div>
                <input 
                  onChange={this.handleChange}
                  name='keyword' 
                  value={data.keyword}
                  placeholder='Search...'/>
              </div>

              <div>
                <input 
                  onChange={this.handleChange}
                  name='address' 
                  value={data.address}
                  placeholder='Location...'/>
              </div>
          
              <div>
                <select 
                  onChange={this.handleChange}
                  name='rankby'
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
          <p className={errors ?  'shake-text right' : 'display-none'}> *All fields are required</p>
        </>
      }

    </>
  )
}
}

export default FoodSearch