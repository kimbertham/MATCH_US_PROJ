import React from 'react'
import axios from 'axios'
import { headers } from '../../Lib/auth'

class Movies extends React.Component {
state = {

}

componentDidMount(){
  this.getMovies()
}
getMovies = async() => {
  const m = await axios.get('/api/movies/', headers())
  console.log(m.data)
}

render(){
  const { connection } = this.props
  return (

    <h1> {connection.user.first_name} & {connection.partner.first_name} &apos;s Movies</h1>

  )
}
}
export default Movies