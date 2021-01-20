import React from 'react'
import { typeList } from '../../Lib/com'
import { Link } from 'react-router-dom'

const ActivitiesList = ({ connection }) =>{


  return (
    <>
      <div className='a-type'>
        <p>All activities</p>
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
    </>
  )
}
export default ActivitiesList