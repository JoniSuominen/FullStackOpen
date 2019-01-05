import React from 'react'

const Login = ({loginHandler, username, password, handleFieldChange}) => (
  <div>
  <h2>Kirjaudu</h2>
  <form onSubmit={loginHandler}>
    <div>
      käyttäjätunnus
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleFieldChange}
      />
    </div>
    <div>
      salasana
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleFieldChange}
      />
    </div>
    <button type="submit">kirjaudu</button>
  </form>
</div>
)

export default Login