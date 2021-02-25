import React from 'react'



const  Login = ({ change, submit, form, data }) => {
 
  if (!data) return null
  return (

    <form onSubmit= {submit}>
      <div className='auth-head center'>LOG IN</div>

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
        <label>Password</label>  
        <br/>    
        <input
          className='auth-input'
          type='password'
          name="password"
          onChange={change}
          value={data.password}/>
      </div>  

      <div 
        onClick={form}
        className='auth-link'>
            Not a member?
      </div>   

      <button className='auth-input auth-button'> Log in!</button>   
    </form>

  )
}


export default Login