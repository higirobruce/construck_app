import React, { useContext } from 'react'
import { ScreenContext } from '../../contexts/ScreenContext'
import WorkData from '../screens/workdata'
import Settings from '../screens/settings'
import Dashboard from '../screens/dashboard'
import Customers from '../screens/customers'
import Equipments from '../screens/equipments'
import Projects from '../screens/projects'

export default function Main() {
  let { screen, setScreen } = useContext(ScreenContext)

  return (
    <div className="flex h-screen flex-1 flex-col overflow-auto bg-slate-50">
      {screen === 'workData' && <WorkData />}
      {screen === 'settings' && <Settings />}
      {screen === 'dashboard' && <Dashboard />}
      {screen === 'customers' && <Customers />}
      {screen === 'equipments' && <Equipments />}
      {screen === 'projects' && <Projects />}
    </div>
  )
}
