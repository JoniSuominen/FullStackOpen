import React from 'react'

const LoginForm = ({username, password, loginHandler, onFieldChange}) => (
  <div>
    <h2>Log in</h2>
    <form onSubmit={loginHandler}>
    <div>
    username:
    <input
      type="text"
      name="username"
      value={username}
      onChange={onFieldChange}   
    />
    </div>
    <div>
      password
      <input
        type="password"
        name="password"
        value={password}
        onChange={onFieldChange}
      
      />
    </div>
    <button type="submit">log in</button>
    </form>
  </div>
)

export default LoginForm