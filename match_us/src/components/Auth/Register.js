import React from 'react'



const  Register = ({ change, submit, form, data })=> {

  if (!data) return null
  return (

    <form onSubmit= {submit}>
      <div className='auth-head center'>REGISTER</div>

      <div className='form-field'>            
        <label>First Name</label>
        <br/>    
        <input
          className='auth-input'
          name="first_name"
          onChange={change}
          value={data.first_name}/>
      </div>

      <div className='form-field'> 
        <label>Last name</label>  
        <br/>    
        <input
          className='auth-input'
          name="last_name"
          onChange={change}
          value={data.last_name}/>
      </div> 

      <div className='form-field'> 
        <label>Username</label>  
        <br/>    
        <input
          className='auth-input'
          name="username"
          onChange={change}
          value={data.username}/>
      </div> 

      <div className='form-field'> 
        <label>email</label>  
        <br/>    
        <input
          className='auth-input'
          name="email"
          onChange={change}
          value={data.email}/>
      </div> 

      <div className='form-field'> 
        <label>Password</label>  
        <br/>    
        <input
          className='auth-input'
          type='password'
          name="password"
          onChange={change}
          value={data.password}/>
      </div>  

      <div className='form-field'> 
        <label>Password Confirmation</label>  
        <br/>    
        <input
          className='auth-input'
          type='password'
          name="password_confirmation"
          onChange={change}
          value={data.password_confirmation}/>
      </div>  
      <div 
        onClick={form}
        className='auth-text'>
            Already a member?
      </div>   

      <button className='auth-input auth-button'> Log in!</button>   
    </form>

  )
}


export default Register