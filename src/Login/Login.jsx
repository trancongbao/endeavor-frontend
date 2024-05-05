import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Login(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const login = () => {
    fetch('http://localhost:3000/auth', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        method: "login",
        params: {
          userType: "teacher",
          username: "teacher1",
          password: "password1"
        }
      }),
    })
    .then((response) => response.json())
    .then((response) => {
      if ('success' === response.message) {
        // localStorage.setItem('user', JSON.stringify({username, token: response.token}))
        // props.setLoggedIn(true)
        // props.setUsername(username)
        navigate('teacher')
      } else {
        window.alert('Wrong email or password')
      }
    })
  }

  return (
    <div className={'mainContainer'}>
      <div className={'inputContainer'}>
        <input
          value={username}
          placeholder="Enter your username here"
          onChange={(event) => setUsername(event.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br/>
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br/>
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={login} value={'Log in'}/>
      </div>
    </div>
  )
}
