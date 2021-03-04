import React from 'react' 
const NoteCard = ({  n, connection, deleteNote }) => {

  return (
    <>
      <div key={n.id} className='note' style={{ backgroundColor: n.color }}>

        <small className='note-date'>
          {n.connection.participants.map(x => 
            x.id !== n.reciever ? `From ${x.first_name}` : null
          )}
          <br/>
          {n.created_at.slice(0,10)}
        </small>

        <h2>{n.notes.length > 100  ? n.notes.substr(0, 100) + '...' : n.notes }</h2>

        {!connection ? null : n.reciever !== connection.user.id ?
          <button className='n-delete button'
            onClick={()=>{
              deleteNote(n.id)
            }}> X </button> : null}
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