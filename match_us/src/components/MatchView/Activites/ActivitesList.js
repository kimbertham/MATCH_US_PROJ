import React from 'react'
import { typeList } from '../../../Lib/com'
import { Link } from 'react-router-dom'

const ActivitiesList = ({ connection }) =>{

  return (
    <div className='full scroll center'>

      <div>
        <h1 className='a-item'>Activities</h1>
      </div>

      <div className='a-list'>
        {typeList.map(t => {
          return <Link key={t} to={`/connection/${connection.id}/activity/${t}`}>
            <div id={t} className='a-item'>
              <p className='n-line'>{t.replace('_', ' ')}</p>
            </div>
          </Link>
        })}
      </div>
    </div>
  )
}
export default ActivitiesList