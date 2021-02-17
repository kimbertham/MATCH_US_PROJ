import React from 'react' 

const NoteCard = ({ n, connection, deleteNote }) => {

  return (
    <div key={n.id} className=' center note' style={{ backgroundColor: n.color }}>
      <p>{n.created_at.slice(0,10)}</p>
      <h2>{n.notes}</h2>
      {n.sender === connection.user.id ? <button onClick={()=>{
        deleteNote(n.id)
      }}>Delete</button> : null}
    </div>   )
}
export default NoteCard