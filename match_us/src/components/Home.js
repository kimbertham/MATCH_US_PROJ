import React from 'react' 
import axios from 'axios'
import { getUserId } from '../Lib/auth'
import Menu from './Menu/Menu'

const user = getUserId()

class Home extends React.Component {
  state ={
    user: {}
  }

  async componentDidMount() {
    const res = await axios.get(`/api/profile/${user}/`)
    this.setState({ user: res.data })
  }

  render(){

    const { user } = this.state

    return (
      
      <Menu user={user}/>

    )
  }
}
export default Home