import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {rpc} from "../rpc/rpc";

export default function Login({setIsLoggedIn}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const login = () => {
    rpc("auth", "login", {
      userType: "teacher", //TODO: home page
      username: username,
      password: password
    })
    .then((user) => {
      if (user) {
        setIsLoggedIn(true)
        navigate('/teacher') //TODO: redirect to desired destination
      } else {
        alert('Wrong email or password')
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
      </div>
      <br/>
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(event) => setPassword(event.target.value)}
          className={'inputBox'}
        />
      </div>
      <br/>
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={login} value={'Log in'}/>
      </div>
    </div>
  )
}
