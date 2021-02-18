/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { headers } from '../../Lib/auth'
import { withRouter } from 'react-router-dom'
import Details from '../MatchView/Details'

class MatchHome extends React.Component { 
  state = {
    matches: [],
    detail: '',
    filter: false
  } 

  async componentDidMount() {
    this.getMatches()
  }

  getDetail = async (e) => {
    if (this.state.detail) {
      this.setState({ detail: null })
    } else {
      const id = e.currentTarget.id
      const r = (await axios.get(`/api/${this.props.match.params.section}/${id}/`)).data
      this.setState({ detail: r, m: id })
    }
  }

  getMatches = async () => {
    const { connection, match } = this.props
    const r  = await axios.get(`/api/match/${match.params.section}/${connection.id}/${connection.partner.id}/`,headers())
    this.setState({ matches: r.data })
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
              getMatches={this.getMatches}
              getDetail={this.getDetail}/> 
          </div>
          : 
          <>
      
            <h1 className='title'>
              {connection.partner.first_name} and {connection.user.first_name}&apos;s {section} matches
            </h1> 
            
            <div className='wrap center match-cont'>
              {matches.map(m => {
                return <div  key={m.id} id={m.id} onClick={this.getDetail}
                  className={`${section}-match-item match-item center`}>
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