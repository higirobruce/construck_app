import { ArrowLeftIcon, PlusIcon, RefreshIcon } from '@heroicons/react/outline'
import React, { useContext, useEffect, useState } from 'react'
import { Dropdown, Loader } from 'semantic-ui-react'
import MSubmitButton from '../common/mSubmitButton'
import UsersTable from '../common/usersTable'
import ProjectCard from '../common/projectCard'
import TextInput from '../common/TextIput'
import TextInputV from '../common/TextIputV'
import MTextView from '../common/mTextView'
import { toast, ToastContainer } from 'react-toastify'
import { UserContext } from '../../contexts/UserContext'

export default function Users() {
  let url = process.env.NEXT_PUBLIC_BKEND_URL
  let [users, setUsers] = useState(null)
  let [loading, setLoading] = useState(false)
  let [viewPort, setViewPort] = useState('list')
  let [search, setSearch] = useState('')
  let [firstName, setFirstName] = useState('')
  let [lastName, setLastName] = useState('')
  let [phone, setPhone] = useState('')
  let [email, setEmail] = useState('')
  let [role, setRole] = useState('display')

  let { user, setUser } = useContext(UserContext)
  let myRole = user?.userType
  let isCustomer =
    myRole === 'customer-admin' || myRole === 'customer-project-manager'
  var rolesOptions = [
    { key: '1', value: 'display', text: 'Display only' },
    { key: '2', value: 'admin', text: 'Administrator' },
    { key: '3', value: 'revenue', text: 'Revenue officer' },
    { key: '4', value: 'dispatch', text: 'Dispatch officer' },
    { key: '5', value: 'dispatch-view', text: 'Display Dispatch' },
    { key: '5', value: 'customer-admin', text: 'Customer' },
  ]

  useEffect(() => {
    fetch(`${url}/users/`)
      .then((res) => res.json())
      .then((res) => {
        isCustomer
          ? setUsers(
              res.filter((r) => {
                return r.company === user?.company?._id
              })
            )
          : setUsers(res)
        setLoading(false)
      })
  }, [])

  function refresh() {
    setLoading(true)
    fetch(`${url}/users/`)
      .then((res) => res.json())
      .then((res) => {
        isCustomer
          ? setUsers(
              res.filter((r) => {
                return r.company === user?.company?._id
              })
            )
          : setUsers(res)
        setLoading(false)
      })
  }

  function submit() {
    fetch(`${url}/users/`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        username: firstName.toLowerCase(),
        password: 'password',
        email,
        phone,
        userType: role,
        company: null,
        status: 'active',
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toast.error(res.error)
        } else {
          setViewPort('list')
          refresh()
        }
      })
      .catch((err) => {})
  }
  return (
    <div className="my-5 flex flex-col space-y-5 px-10">
      <div className="text-2xl font-semibold">Users</div>
      <div className="flex w-full flex-row items-center justify-between space-x-4">
        {viewPort === 'list' && (
          <MSubmitButton
            submit={() => setViewPort('new')}
            intent="primary"
            icon={<PlusIcon className="h-5 w-5 text-zinc-800" />}
            label="New"
          />
        )}

        {viewPort === 'list' && (
          <div className="mx-auto flex flex-grow flex-col px-40">
            <TextInput placeholder="Search..." setValue={setSearch} />
          </div>
        )}

        {viewPort === 'list' && (
          <MSubmitButton
            submit={refresh}
            intent="neutral"
            icon={<RefreshIcon className="h-5 w-5 text-zinc-800" />}
            label="Refresh"
          />
        )}

        {viewPort === 'new' && (
          <MSubmitButton
            submit={() => {
              setViewPort('list')
              refresh()
            }}
            intent="primary"
            icon={<ArrowLeftIcon className="h-5 w-5 text-zinc-800" />}
            label="Back"
          />
        )}
      </div>

      {viewPort === 'list' && (
        <>
          {!loading && users?.length > 0 && (
            <div className="flex justify-center">
              <UsersTable data={users} />
            </div>
          )}
          {(loading || !users) && (
            <div className="h-fu mx-auto">
              <Loader active />
            </div>
          )}
        </>
      )}
      {viewPort === 'new' && (
        <>
          <div className="flex flex-col space-y-5">
            <div className="mt-5 flex flex-row items-center space-x-2">
              <div className="flex flex-col">
                <div className="flex flex-row items-center">
                  <MTextView content="First Name" />
                  {<div className="text-sm text-red-600">*</div>}
                </div>
                <TextInputV
                  placeholder="First name"
                  type="text"
                  setValue={setFirstName}
                />
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row items-center">
                  <MTextView content="Last Name" />
                  {<div className="text-sm text-red-600">*</div>}
                </div>
                <TextInputV
                  placeholder="Last name"
                  type="text"
                  setValue={setLastName}
                />
              </div>

              <div className="flex flex-col">
                <div className="flex flex-row items-center">
                  <MTextView content="Phone" />
                  {<div className="text-sm text-red-600">*</div>}
                </div>
                <TextInputV
                  placeholder="Phone"
                  type="text"
                  setValue={setPhone}
                />
              </div>

              <div className="flex flex-col">
                <div className="flex flex-row items-center">
                  <MTextView content="Email" />
                  {<div className="text-sm text-red-600">*</div>}
                </div>
                <TextInputV
                  placeholder="email"
                  type="email"
                  setValue={setEmail}
                />
              </div>

              <div className="flex flex-col">
                <div className="flex flex-row items-center">
                  <MTextView content="User Role" />
                  {<div className="text-sm text-red-600">*</div>}
                </div>
                <div className="">
                  <Dropdown
                    options={rolesOptions}
                    placeholder="Role"
                    fluid
                    search
                    selection
                    onChange={(e, data) => {
                      setRole(data.value)
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="">
              <MSubmitButton submit={submit} />
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  )
}
