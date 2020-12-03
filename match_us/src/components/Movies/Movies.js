import React from 'react'

class Movies extends React.Component {
state = {

}

render(){
  const { connection } = this.props
  return (
    
    <h1> {connection.user.first_name} & {connection.partner.first_name} &apos;s Movies</h1>

  )
}
}
export default Movies