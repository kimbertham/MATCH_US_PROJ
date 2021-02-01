import React from 'react'
import axios from 'axios'
import { headers } from '../../Lib/auth'
import { withRouter } from 'react-router-dom'

class MatchHome extends React.Component { 
  state = {

  } 

  componentDidMount() {
    this.getMatches()
  }

  getMatches = async () => {
    const { connection } = this.props
    const section = this.props.match.params.section
    const r  = await axios.get(`/api/match/${section}/${connection.id}/${connection.partner.id}/`,headers())
    this.setState({ matches: r.data })
  } 
  
  render() {
    const section = this.props.match.params.section
    const { partner, user } = this.props.connection
    const { matches } = this.state

    if (!matches) return null
    return (
      <>

        <h1>{partner.first_name} and {user.first_name}&apos;s {section} matches</h1> 
        <div className='flex'>
          {matches.map(m => {
            return <div key={m.id}>
              <img src={m.image}/>
              <h1>{m.name}</h1>
            </div>
          })}
        </div>
      </>
    )
  }
}
export default withRouter(MatchHome)