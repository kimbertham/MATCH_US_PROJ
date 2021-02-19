/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { headers } from '../../Lib/auth'
import Search from './Search'
import Matches from './Matches'
import Match from '../Common/Match'
import Details from './Details'
import Swipe from './Swipe'
import List from '../ListView/List'
import Loader from '../Common/Loader'

class MatchView extends React.Component {
state = {
  matches: null,
  detail: null,
  match: false,
  search: false, 
  view: true
}

async componentDidMount() {
  this.getMatches()
}

getMatches = async () => {
  const { connection, section } = this.props
  const r  = await axios.get(`/api/match/${section}/${connection.id}/${connection.partner.id}/short/`,headers())
  this.setState({ matches: r.data })
} 

swipe = async (d) => {
  const data = this.props.swipeData(d, 0)
  const r = (await  axios.post(`/api/${this.props.section}/`, data, headers())).data
  await d === 'True' ? this.checkMatch(r.f_id) : this.props.nextSwipe()
}

checkMatch = async (i) => {
  const { connection, section } = this.props
  const r = (await axios.post(`/api/match/${section}/${connection.id}/${connection.partner.id}/all/`, { id: i })).data
  if (r) {
    this.setState({ match: true })
    this.getMatches()
  } else {
    this.props.nextSwipe()
  }
} 

getDetail = async (e) => {
  if (this.state.detail) {
    this.setState({ detail: null })
  } else {
    const r = (await axios.get(`/api/${this.props.section}/${e.target.id}/`)).data
    this.setState({ detail: r })
  }
}

deleteMatches = async () => {
  const { connection,section } = this.props
  await axios.delete(`/api/match/${section}/${connection.id}/`, headers())
  this.getMatches()
  this.props.getResults()
}

showSearch = () => {
  this.setState({ search: !this.state.search })
}

clearMatch = () => {
  this.setState({ match: null }, () => {
    this.props.nextSwipe()
  })
}

changeView = () => {
  this.setState({ view: !this.state.view })
}

render(){
  const { detail, matches, search, match, view } = this.state
  const { connection, results, getResults, section, swipeData } = this.props
  const r = results[0]

  if (!view) return <List section={section} results={results} changeView={this.changeView} swipeData={swipeData}/>

  return (
    <div className='sw fh flex'>

      <div className='swipe-matches'>
        <p>Matches</p>
        <Matches matches={matches}
          connection={connection}
          section={section}
          changeView={this.changeView}
          deleteMatches= {this.deleteMatches}
          getDetail={this.getDetail}/>
      </div>
  
      {search ? <Search 
        section={section}
        getResults={getResults}/> : null}

      <div className='swipeview'>
        {r ? 
          <>
            {detail ? <Details r={detail}
              section={section}
              getDetail={this.getDetail}/> : null}

            {match ? <Match r={r}
              section={section} 
              connection={connection}
              clear={this.clearMatch}/> : null}

            <Swipe r={r}
              swipe={this.swipe}
              section={section}
              showSearch={this.showSearch}
              getDetail={this.getDetail}
              deleteMatches={this.deleteMatches}/> 
          </>
          : 
          <Loader/> }
      </div>

    </div>
  )
}
} export default withRouter(MatchView)



