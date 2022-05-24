import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout/index'
import 'semantic-ui-css/semantic.min.css'
import { ScreenContext } from '../contexts/ScreenContext'
import { UserContext } from '../contexts/UserContext'
import { LanguageContext } from '../contexts/languageContext'
import { useState } from 'react'

const Home = () => {
  const [screen, setScreen] = useState('workData')
  const [language, setLanguage] = useState('en')
  const [user, setUser] = useState({})
  return (
    <div className="flex min-h-screen flex-col">
      <ScreenContext.Provider value={{ screen, setScreen }}>
        <UserContext.Provider value={{ user, setUser }}>
          <LanguageContext.Provider value={{ language, setLanguage }}>
            <Layout />
          </LanguageContext.Provider>
        </UserContext.Provider>
      </ScreenContext.Provider>
    </div>
  )
}

export default Home
