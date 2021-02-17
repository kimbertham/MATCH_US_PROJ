import React from 'react'
import { typeList } from '../../Lib/com'
import { Link } from 'react-router-dom'

const ActivitiesList = ({ connection }) =>{


  return (
    <div className='a-list center section'>
      <div className='a-type'>
        <p>Activities</p>
      </div>

      <div className='flex wrap'>
        <p>Suggestions:</p>
        {typeList.map(t => {
          return <Link key={t} to={`/connection/${connection.id}/activity/${t}`}>
            <div id={t} className='a-type pointer'>
              <p className='n-line'>{t.replace('_', ' ')}</p>
            </div>
          </Link>
        })}
      </div>
    </div>
  )
}
export default ActivitiesList