import React from 'react'
import Events from '../Events/Events'


const ConOverview = ({ connection }) => {

  return (
    <div className='overview fh'>
      <h1>{connection.user.first_name} & {connection.partner.first_name}&apos;s Overview </h1>
      <Events 
        page='c'
        user={connection.user}
        connection={connection}/>
    </div> 

  )
}

export default ConOverview