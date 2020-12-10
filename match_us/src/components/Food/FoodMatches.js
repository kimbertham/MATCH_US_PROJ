import React from 'react'
import axios from 'axios'

import { headers } from '../../Lib/auth'
import { sDetails, proxyurl, GImages, fDefault } from '../../Lib/common'

class FoodMatches extends React.Component {
  state ={
    matches: []
  }

  async componentDidMount(){
    this.getMatches()
  }

  getDetails = async () => {

  }

  getMatches = async () => {
    const matches = []
    const id = this.props.connection.partner.id
    const r  = (await axios.get(`/api/food/${id}/`, headers())).data
    console.log(r)
    r.map(async m => matches.push((await axios.get(`${proxyurl}${sDetails}${m}`)).data.result))
    this.setState({ matches })
  }


  render(){
    const { matches } = this.state
    console.log(matches)
    return (
      <>
        <div className='flex'>
          {matches.map(m => {
            return <div key={m.f_id} className='center column f-match-cont'> 
              <div className='f-match-icon' 
                style={{ backgroundImage: m.photos ? `url(${GImages}${m.photos[0].photo_reference})` :
                  fDefault }}/>
              <p className='f-match-name'> {m.name}</p>
            </div>
          })}
        </div>
      </>
    )
  }
}
export default FoodMatches