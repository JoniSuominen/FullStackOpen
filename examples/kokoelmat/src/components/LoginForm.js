import React from 'react'
import PropTypes from 'prop-types'

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

Login.propTypes = {
  loginHandler: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default Login