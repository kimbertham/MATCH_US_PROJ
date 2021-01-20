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

class MatchView extends React.Component {
state = {
  matches: null,
  selected: null,
  match: false,
  search: false
}

async componentDidMount() {
  this.getMatches()
}

getMatches = async () => {
  const { connection, section } = this.props
  const r  = await axios.get(`/api/${section}/${connection.id}/${connection.partner.id}/`,headers())
  this.setState({ matches: r.data })
} 

swipe = async (d) => {
  const data = this.props.swipeData(d)
  const r = (await  axios.post(`/api/${this.props.section}/`, data, headers())).data
  await d === 'True' ? this.checkMatch(r.f_id) : this.props.nextSwipe()
}

checkMatch = async (i) => {
  const { connection, section } = this.props
  const r = (await axios.post(`/api/${section}/${connection.id}/${connection.partner.id}/`, { id: i })).data
  if (r) {
    this.setState({ match: true })
    this.getMatches()
  } else {
    this.props.nextSwipe()
  }
} 

deleteMatches = async () => {
  const { connection,section } = this.props
  await axios.delete(`/api/${section}/${connection.id}/`, headers())
  this.getMatches()
  this.props.getResults()
}

getDetail = (e) => {
  this.setState({ selected: this.state.seleted ? null : e.target.id })
}

showSearch = () => {
  this.setState({ search: !this.state.search })
}

clearMatch = () => {
  this.setState({ match: null }, () => {
    this.props.nextSwipe()
  })
}

render(){
  const { selected, matches, search, match } = this.state
  const { connection, results, getResults, section } = this.props
  const r = results[0]

  return (
    <>

      {search ?
        <Search
          showSearch={this.showSearch}
          getResults={getResults}/>
        : null}

      <div className='sw fh flex'>
        
        <Matches 
          matches = {matches}
          deleteMatches= {this.deleteMatches}
          getDetail={this.getDetail}/>

        <div className='flex-grow relative center'>
          
          {selected ?
            <Details
              section={section} 
              selected={selected}
              getDetail={this.getDetail}/> 
            : null}

          {match ? 
            <Match r={r}
              section={section} 
              connection={connection}
              clear={this.clearMatch}/> 
            : null}

          <Swipe r={r}
            swipe={this.swipe}
            section={section}
            showSearch={this.showSearch}
            getDetail={this.getDetail}
            deleteMatches={this.deleteMatches}/>
        </div>

      </div>
    </>
  )
}
} export default withRouter(MatchView)



