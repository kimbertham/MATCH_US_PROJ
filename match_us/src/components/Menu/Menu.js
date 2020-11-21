import React from 'react'
// import axios from 'axios'
// import { getUserId } from '../../Lib/auth'

// const user = getUserId()

class Menu extends React.Component {
  state ={
    user: {}
  }

  // async componentDidMount() {
  //   const res = await axios.get(`/api/profile/${user}/`)
  //   this.setState({ user: res.data })
  // }


  render(){
    const { user } = this.props
    console.log(user)

    return (

      <div className='menu fh'>
        <div className='m-user flex'>
          <div>
            <h1>{user.first_name} {user.last_name}</h1>
            <p>{user.username}</p>
          </div>
          <img src={user.profile_image} 
            className='user-img' alt='profile-img'/>
        </div>
      </div>
    )
  }
}

export default Menu