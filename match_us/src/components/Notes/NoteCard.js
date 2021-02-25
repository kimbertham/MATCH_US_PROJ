import React from 'react' 

const NoteCard = ({  n, connection, deleteNote }) => {
  
  return (
    <>

      <div key={n.id} className=' relative center note' style={{ backgroundColor: n.color }}>
        <p className='note-date'>{n.created_at.slice(0,10)}</p>
        <h2>{n.notes.length > 100  ? n.notes.substr(0, 100) + '...' : n.notes }</h2>

        {!connection ? null : n.reciever === connection.user.id ?
          <button className='button'
            onClick={()=>{
              deleteNote(n.id)
            }}>Delete</button> : null}
      </div>  

      {!n.read ? <div className='envelope absolute'>
        <div className='triangle-top'></div>
        <div className='triangle-up2'></div>
        <div className='triangle-up'></div>
        <div className='triangle-right'></div>
        <div className='triangle-left'></div>
      </div>
        : null}
    </>

  )
}
export default NoteCard