import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'
import Login from '../../pages/login'
import Main from './main'
import MenuBar from './menubar'
import 'semantic-ui-css/semantic.min.css'
import { ScreenContext } from '../../contexts/ScreenContext'

export default function Layout() {
  let { user, setUser } = useContext(UserContext)
  let { screen, setScreen } = useContext(ScreenContext)

  useEffect(() => {
    let _user = localStorage.getItem('user')
    setUser(JSON.parse(_user))
    setScreen('workData')
  }, [])

  useEffect(() => {
    setScreen('workData')
  }, [user])

  return (
    <div className="flex flex-col">
      {user?.loggedIn && (
        <div className="flex flex-row">
          <MenuBar />
          <Main />
        </div>
      )}
      {!user?.loggedIn && <Login />}
    </div>
  )
}
