import {
  ChartBarIcon,
  DocumentDuplicateIcon,
  CogIcon,
  InboxIcon,
  TruckIcon,
  UserIcon,
  UsersIcon,
  UserGroupIcon,
  ViewGridAddIcon,
  LogoutIcon,
  BellIcon,
  UserCircleIcon,
} from '@heroicons/react/outline'

import React, { useContext } from 'react'
import { ScreenContext } from '../../contexts/ScreenContext'
import { UserContext } from '../../contexts/UserContext'

export default function MenuBar() {
  let { screen, setScreen } = useContext(ScreenContext)
  let { user, setUser } = useContext(UserContext)

  let role = user?.userType

  let canSeeDashboard = role === 'admin' || role === 'display'
  let canSeeDispatches =
    role === 'admin' ||
    role === 'dispatch' ||
    role === 'revenue' ||
    role === 'vendor'
  let canSeeUsers = role === 'admin'
  let canSeeSettings = role === 'admin'
  let isVendor = role === 'vendor'

  function logout() {
    localStorage.removeItem('user')
    setUser({})
  }
  return (
    <div className="flex min-h-screen w-20 flex-col items-center justify-between overflow-y-auto bg-slate-200 md:w-60">
      {/* Menu items */}

      <div className="flex w-full flex-col items-center">
        <div className="mt-5 mb-10 hidden text-2xl font-bold text-zinc-800 md:block">
          Construck App
        </div>

        {canSeeDashboard && (
          <div
            className={
              screen === 'dashboard'
                ? 'flex w-full cursor-pointer flex-row items-center justify-center space-x-3 bg-slate-50 py-5 text-sky-700'
                : 'flex w-full cursor-pointer flex-row items-center justify-center space-x-3 py-5 text-black'
            }
            onClick={() => setScreen('dashboard')}
          >
            <ChartBarIcon className="h-5 w-5" />
            <div className="hidden w-1/2 font-semibold md:block">Dashboard</div>
          </div>
        )}

        {canSeeDispatches && (
          <div
            className={
              screen === 'workData'
                ? 'flex w-full cursor-pointer flex-row items-center justify-center space-x-3 bg-slate-50 py-5 text-sky-700'
                : 'flex w-full cursor-pointer flex-row items-center justify-center space-x-3 py-5 text-black'
            }
            onClick={() => setScreen('workData')}
          >
            <DocumentDuplicateIcon className="h-5 w-5" />
            <div className="hidden w-1/2 font-semibold md:block">
              Dispatch Forms
            </div>
          </div>
        )}

        {!isVendor && (
          <>
            <div
              className={
                screen === 'customers'
                  ? 'flex w-full cursor-pointer flex-row items-center justify-center space-x-3 bg-slate-50 py-5 text-sky-700'
                  : 'flex w-full cursor-pointer flex-row items-center justify-center space-x-3 py-5 text-black'
              }
              onClick={() => setScreen('customers')}
            >
              <UserGroupIcon className="h-5 w-5" />
              <div className="hidden w-1/2 font-semibold md:block">
                Customers
              </div>
            </div>

            <div
              className={
                screen === 'equipments'
                  ? 'flex w-full cursor-pointer flex-row items-center justify-center space-x-3 bg-slate-50 py-5 text-sky-700'
                  : 'flex w-full cursor-pointer flex-row items-center justify-center space-x-3 py-5 text-black'
              }
              onClick={() => setScreen('equipments')}
            >
              <TruckIcon className="h-5 w-5" />
              <div className="hidden w-1/2 font-semibold md:block">
                Equipments
              </div>
            </div>

            <div
              className={
                screen === 'projects'
                  ? 'flex w-full cursor-pointer flex-row items-center justify-center space-x-3 bg-slate-50 py-5 text-sky-700'
                  : 'flex w-full cursor-pointer flex-row items-center justify-center space-x-3 py-5 text-black'
              }
              onClick={() => setScreen('projects')}
            >
              <ViewGridAddIcon className="h-5 w-5" />
              <div className="hidden w-1/2 font-semibold md:block">
                Projects
              </div>
            </div>

            <div
              className={
                screen === 'profile'
                  ? 'flex w-full cursor-pointer flex-row items-center justify-center space-x-3 bg-slate-50 py-5 text-sky-700'
                  : 'flex w-full cursor-pointer flex-row items-center justify-center space-x-3 py-5 text-black'
              }
              onClick={() => setScreen('profile')}
            >
              <UserIcon className="h-5 w-5" />
              <div className="hidden w-1/2 font-semibold md:block">Profile</div>
            </div>
          </>
        )}

        {canSeeUsers && (
          <div
            className={
              screen === 'users'
                ? 'flex w-full cursor-pointer flex-row items-center justify-center space-x-3 bg-slate-50 py-5 text-sky-700'
                : 'flex w-full cursor-pointer flex-row items-center justify-center space-x-3 py-5 text-black'
            }
            onClick={() => setScreen('users')}
          >
            <UsersIcon className="h-5 w-5" />
            <div className="hidden w-1/2 font-semibold md:block">Users</div>
          </div>
        )}

        {canSeeSettings && (
          <div
            className={
              screen === 'settings'
                ? 'flex w-full cursor-pointer flex-row items-center justify-center space-x-3 bg-slate-50 py-5 text-sky-700'
                : 'flex w-full cursor-pointer flex-row items-center justify-center space-x-3 py-5 text-black'
            }
            onClick={() => setScreen('settings')}
          >
            <CogIcon className="h-5 w-5" />
            <div className="hidden w-1/2 font-semibold md:block">Settings</div>
          </div>
        )}
      </div>

      <div className="">
        <div className="flex flex-col">
          <div className="mt-5 mb-1 flex flex-row items-center text-sm text-zinc-800">
            <UserCircleIcon className="h-5 w-5" />
            {user.firstName + ' ' + user.lastName}
          </div>
          <div className="flex w-full flex-row justify-evenly">
            <LogoutIcon
              className="mb-5 h-7 w-7 cursor-pointer text-red-400"
              onClick={() => logout()}
            />
            <BellIcon className="mb-5 h-7 w-7 text-yellow-600" />
          </div>
        </div>
      </div>
    </div>
  )
}
