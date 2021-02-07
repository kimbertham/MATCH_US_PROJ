import React from 'react'
import axios from 'axios'
import { headers } from '../../Lib/auth'

import Match from '../MatchView/Match'


class Movies extends React.Component {
  state = {
    results: [],
    mySwipes: [],
    page: 1
  }

  async componentDidMount(){
    this.getResults()
  }

getResults = async (g) => {
  let r
  do {
    r = ( await axios.post(`/api/movies/${this.props.connection.id}/`, 
      g ? { page: this.state.page, with_genres: g } : { page: this.state.page },
      headers()))
    this.setState({ page: this.state.page + 1 })
  } while (r.data.length <= 0 ) 
  this.setState({ results: r.data })
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

changeView = () => {
  this.setState({ MatchView: !this.state.MatchView })
}

render() {
  const { results } = this.state
  if (!results) return null

  return (
    <>
      <Match section='movies'
        results={results}
        swipeData={this.swipeData}
        connection={this.props.connection}
        nextSwipe={this.nextSwipe}
        getResults={this.getResults}/>

    </>
  )
}
}
export default Movies