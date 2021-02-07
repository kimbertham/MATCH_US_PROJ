/* eslint-disable no-unused-vars */
import React from 'react'
import MovieDetails from '../Movies/MovieDetails'
import FoodDetails from '../FoodMatch/FoodDetails'
import NewEvent from '../Events/NewEvent'

class Details extends React.Component {
state= {
  data: false
}

setData = (e) => {
  this.setState({ data: e })
}

render(){
  const { data } = this.state
  const { getDetail, section, r, connection } = this.props
  return (

    <>
      {data ? <NewEvent data={data} connection={connection}/> : null}

      <div onClick={getDetail} className='details modal column'>
        {section === 'movies' ?
          <MovieDetails r={r} setData={this.setData}/>
          : 
          <FoodDetails r={r} setData={this.setData}/>}

      </div>
    </>
  )
}
}
export default Details