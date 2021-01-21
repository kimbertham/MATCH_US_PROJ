import React from 'react'
import axios from 'axios'

import { baseURL }  from '../../Lib/common'
// import { headers } from '../../Lib/auth'

import Match from '../MatchView/Match'

class Movies extends React.Component {
  state ={
    results: [],
    mySwipes: [],
    p: 1
  }

  async componentDidMount(){
    this.getResults()
  }

  getResults = async () => {
    let m
    do {
      const r = ( await axios.get(`${baseURL}${this.state.p}`)).data.results
      console.log(r)
      m = r.filter(m => !this.state.mySwipes.includes(m.id))
      m.length <= 0 ? this.setState({ p: this.state.p + 1 }) : null
    } while (m.length <= 0)
    this.setState({ results: m })
  }

nextSwipe = () => {
  this.state.results.length <= 1 ? this.setState({ p: this.state.p + 1 }, () => {
    this.getResults()
  }) : this.setState({ results: this.state.results.slice(1) })

}

swipeData = (d) => {
  return { 
    f_id: this.state.results[0].id, 
    name: this.state.results[0].title, 
    connection: this.props.connection.id,
    direction: d }
}

render() {
  if (!this.state.results) return null

  return (
    <Match section='movies'
      swipeData={this.swipeData}
      connection={this.props.connection}
      results={this.state.results}
      nextSwipe={this.nextSwipe}
      getMySwipes={this.getMySwipes}
      getResults={this.getResults}/>
  )
}
}
export default Movies