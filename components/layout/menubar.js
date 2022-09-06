import {
  ArrowLeftOnRectangleIcon,
  ArrowPathIcon,
  BellIcon,
  ChartBarIcon,
  CogIcon,
  DocumentDuplicateIcon,
  IdentificationIcon,
  TruckIcon,
  UserCircleIcon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
  QueueListIcon,
} from '@heroicons/react/24/outline'
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
    role === 'vendor' ||
    role === 'customer-admin' ||
    role === 'customer-project-manager' ||
    role === 'customer-site-manager'
  let canSeeUsers =
    role === 'admin' ||
    role === 'customer-admin' ||
    role === 'customer-project-manager'
  let canSeeSettings = role === 'admin'
  let canSeeDrivers = role === 'admin'
  let canSeeVendors = role === 'admin'
  let canReverseTransactions = role === 'admin'
  let isVendor = role === 'vendor'
  let isCustomer =
    role === 'customer-admin' ||
    role === 'customer-project-manager' ||
    role === 'customer-site-manager'

  function logout() {
    localStorage.removeItem('user')
    setUser({})
  }
  return (
    <div className="flex min-h-screen w-20 flex-col items-center justify-between overflow-y-auto bg-slate-200 md:w-60">
      {/* Menu items */}

      <div className="flex w-full flex-col items-center">
        <div className="mt-5 mb-10 hidden text-2xl font-bold text-zinc-800 md:block">
          Shabika App.
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

        {!isVendor && !isCustomer && (
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
              <QueueListIcon className="h-5 w-5" />
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
          <>
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
          </>
        )}

        {canSeeDrivers && (
          <div
            className={
              screen === 'drivers'
                ? 'flex w-full cursor-pointer flex-row items-center justify-center space-x-3 bg-slate-50 py-5 text-sky-700'
                : 'flex w-full cursor-pointer flex-row items-center justify-center space-x-3 py-5 text-black'
            }
            onClick={() => setScreen('drivers')}
          >
            <IdentificationIcon className="h-5 w-5" />
            <div className="hidden w-1/2 font-semibold md:block">Drivers</div>
          </div>
        )}

        {canSeeVendors && (
          <div
            className={
              screen === 'vendors'
                ? 'flex w-full cursor-pointer flex-row items-center justify-center space-x-3 bg-slate-50 py-5 text-sky-700'
                : 'flex w-full cursor-pointer flex-row items-center justify-center space-x-3 py-5 text-black'
            }
            onClick={() => setScreen('vendors')}
          >
            <UserGroupIcon className="h-5 w-5" />
            <div className="hidden w-1/2 font-semibold md:block">Vendors</div>
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

        {canReverseTransactions && (
          <div
            className={
              screen === 'reversals'
                ? 'flex w-full cursor-pointer flex-row items-center justify-center space-x-3 bg-slate-50 py-5 text-red-700'
                : 'flex w-full cursor-pointer flex-row items-center justify-center space-x-3 py-5 text-red-700'
            }
            onClick={() => setScreen('reversals')}
          >
            <ArrowPathIcon className="h-5 w-5" />
            <div className="hidden w-1/2 font-semibold md:block">Reversals</div>
          </div>
        )}
      </div>

      <div className="flex w-full flex-col items-center px-5">
        <div className="mb-5 flex w-full flex-col justify-evenly md:flex-row">
          <ArrowLeftOnRectangleIcon
            className="mb-1 h-7 w-7 cursor-pointer text-red-400"
            onClick={() => logout()}
          />
          <BellIcon className="h-7 w-7 text-yellow-600" />
        </div>
        <div className="mb-5 hidden w-full flex-row justify-between text-sm text-zinc-800 md:flex">
          <div>
            <UserCircleIcon className="h-5 w-5" />
          </div>
          <div>{user.firstName + ' ' + user.lastName}</div>
        </div>
      </div>
    </div>
  )
}
