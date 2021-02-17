import React from 'react'
import axios from 'axios'
import { headers } from '../../Lib/auth'
import { withRouter } from 'react-router-dom'
import Details from '../MatchView/Details'

class MatchHome extends React.Component { 
  state = {
    matches: [],
    detail: ''
  } 

  async componentDidMount() {
    const { connection } = this.props
    const r  = await axios.get(`/api/match/${this.props.match.params.section}/${connection.id}/${connection.partner.id}/`, headers())
    this.setState({ matches: r.data })
  }

  getDetail = async (e) => {
    if (this.state.detail) {
      this.setState({ detail: null })
    } else {
      const r = (await axios.get(`/api/${this.props.match.params.section}/${e.currentTarget.id}/`)).data
      this.setState({ detail: r })
    }
  }

  
  render() {
    const { connection } = this.props
    const { matches, detail } = this.state
    const section = this.props.match.params.section

    if (!matches) return null
    return (

      <>
        {detail ? 
          <div className='fh swipeview' >
            <Details r={detail}
              section={section}
              connection={connection}
              getDetail={this.getDetail}/> 
          </div>
          : 
          <>
            <h1 className='title'>{connection.partner.first_name} and {connection.user.first_name}&apos;s {section} matches</h1> 
            <div className='wrap center match-cont'>
              {matches.map(m => {
                return <div className={`${section}-match-item match-item center`} key={m.id} onClick={this.getDetail} id={m.id}>
                  <img className={'match-img'} src={m.image} />
                  <h1 >{m.name.slice(0,28)}</h1>
                </div>
              })}
            </div>
          </>
        }
      </>
    )
  }
}
export default withRouter(MatchHome)