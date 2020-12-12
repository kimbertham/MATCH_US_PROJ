import React from 'react'
import axios from 'axios'


import { headers } from '../../Lib/auth'
import { sDetails, proxyurl, GImages, fDefault } from '../../Lib/common'

class FoodMatches extends React.Component {
  state ={
    matches: [],
    selected: null
  }

  async componentDidMount(){
    this.getMatches()
  }

  getMatches = async () => {
    const { connection } = this.props
    const matches = []
    const r  = (await axios.get(`/api/food/${connection.id}/${connection.partner.id}/`, headers())).data
    r.map(async m => matches.push((await axios.get(`${proxyurl}${sDetails}${m}`)).data.result))
    this.setState({ matches })
  }

  deleteMatches = async () => {
    await axios.delete(`/api/food/${this.props.connection.id}/${0}/`, headers())
    this.getMatches()
  }

  render(){
    const { matches } = this.state
    const { selectMatch } = this.props
    return (
      <>
        <div onClick={this.deleteMatches}>Delete</div>
        <div className='f-match'>
          {matches.map(m => {
            return <div key={m.place_id} className='relative center column f-match-cont'> 
              <div className='cover' id={m.place_id} onClick={selectMatch}/>
              <div className='f-match-icon' value={m.place_id}
                style={{ backgroundImage: m.photos ? `url(${GImages}${m.photos[0].photo_reference})` :
                  fDefault }}/>
              <p> {m.name}</p>
            </div>
          })}
        </div>
      </>
    )
  }
}
export default FoodMatches