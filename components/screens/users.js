import {
  ArrowLeftIcon,
  ArrowDownTrayIcon,
  PlusIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'
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

import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

import moment from 'moment'

export default function Users() {
  let url = process.env.NEXT_PUBLIC_BKEND_URL
  let [users, setUsers] = useState(null)
  let [ogUsersList, setOgUsersList] = useState(null)
  let [loading, setLoading] = useState(false)
  let [viewPort, setViewPort] = useState('list')
  let [search, setSearch] = useState('')
  let [firstName, setFirstName] = useState('')
  let [lastName, setLastName] = useState('')
  let [phone, setPhone] = useState('')
  let [email, setEmail] = useState('')
  let [role, setRole] = useState('display')
  let [userCompany, setUserCompany] = useState(null)
  let [loadingProjects, setLoadingProjects] = useState(false)
  let [projectList, setProjectList] = useState([])
  let [projects, setProjects] = useState([])
  let [projectAssigned, setProjectAssigned] = useState(null)
  let [submitting, setSubmitting] = useState(false)

  let [downloadingData, setDownloadingData] = useState(false)

  let [idToUpdate, setIdToUpdate] = useState('')

  let { user, setUser } = useContext(UserContext)
  let myRole = user?.userType
  let isCustomer =
    myRole === 'customer-admin' || myRole === 'customer-project-manager'

  var rolesOptions = isCustomer
    ? [
        { key: '1', value: 'customer-display', text: 'Display only' },
        { key: '2', value: 'customer-site-manager', text: 'Site Manager' },
      ]
    : [
        { key: '7', value: 'workshop-admin', text: 'Admin Workshop' },
        { key: '4', value: 'revenue-admin', text: 'Admin Revenue' },
        { key: '2', value: 'admin', text: 'Administrator' },
        { key: '1', value: 'display', text: 'Display' },
        { key: '3', value: 'revenue', text: 'Revenue officer' },
        { key: '5', value: 'dispatch', text: 'Dispatch officer' },
        { key: '6', value: 'dispatch-view', text: 'Display Dispatch' },
        { key: '8', value: 'customer-admin', text: 'Customer Admin' },
        {
          key: '9',
          value: 'customer-project-manager',
          text: 'Project Manager',
        },
      ]

  useEffect(() => {
    setLoadingProjects(true)
    fetch(`${url}/users/`)
      .then((res) => res.json())
      .then((res) => {
        if (isCustomer) {
          setUsers(
            res.filter((r) => {
              return r?.company?._id === user?.company?._id
            })
          )
          setOgUsersList(
            res.filter((r) => {
              return r?.company?._id === user?.company?._id
            })
          )
        } else {
          setUsers(res)
          setOgUsersList(res)
        }
        setLoading(false)
      })
      .catch((err) => toast.error('Error occured!'))

    fetch(`${url}/projects/v2`)
      .then((resp) => resp.json())
      .then((resp) => {
        let list = resp
        let projectOptions = list.map((p) => {
          return {
            key: p._id,
            value: p._id,
            text: p.prjDescription,
            customer: p.customer,
          }
        })
        setProjectList(projectOptions)
        setProjects(list)
      })
      .catch((err) => {
        toast.error(err)
        setLoadingProjects(false)
      })
  }, [])

  useEffect(() => {
    if (search.length >= 3) {
      setLoading(true)
      let _usersList = ogUsersList.filter((w) => {
        let _search = search?.toLocaleLowerCase()
        let userFirstName = w?.firstName?.toLocaleLowerCase()
        let userLastName = w?.lastName?.toLocaleLowerCase()

        return userFirstName.includes(_search) || userLastName.includes(_search)
      })
      setUsers(_usersList)
      setLoading(false)
    }

    if (search.length < 3) {
      setUsers(ogUsersList)
      setLoading(false)
    }
  }, [search])

  function refresh() {
    setLoading(true)
    fetch(`${url}/users/`)
      .then((res) => res.json())
      .then((res) => {
        isCustomer
          ? setUsers(
              res.filter((r) => {
                return r?.company?._id === user?.company?._id
              })
            )
          : setUsers(res)
        setLoading(false)
      })
      .catch((err) => toast.error('Error occured!'))
  }

  function resetPassword(user) {
    //TODO
    fetch(`${url}/users/resetPassword/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(apiUsername + ':' + apiPassword),
      },
    })
      .then((res) => res.json)
      .then((res) => {
        toast.success('Password reset successfully!')
        refresh()
      })
      .catch((err) => toast.error('Error occured!'))
  }

  function submit() {
    setSubmitting(true)
    fetch(`${url}/users/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(apiUsername + ':' + apiPassword),
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
        company: userCompany ? userCompany : user?.company?._id,
        assignedProject: projectAssigned
          ? projectAssigned
          : user.assignedProject,
        status: 'active',
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toast.error(res.error)
        } else {
          setViewPort('list')
          setSubmitting(false)
          refresh()
        }
      })
      .catch((err) => toast.error('Error occured!'))
  }

  function _setUserToUpdate(data) {
    //ToDO

    setViewPort('change')
    setIdToUpdate(data._id)
    setFirstName(data.firstName)
    setLastName(data.lastName)
    setPhone(data.phone)
    setEmail(data.email)
    setRole(data.userType)
  }

  function updateUser() {
    //TODO
    setSubmitting(true)
    fetch(`${url}/users/${idToUpdate}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(apiUsername + ':' + apiPassword),
      },
      method: 'PUT',
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        userType: role,
        company: userCompany ? userCompany : user?.company?._id,
        assignedProject: projectAssigned
          ? projectAssigned
          : user.assignedProject,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toast.error(res.error)
        } else {
          setViewPort('list')
          setSubmitting(false)
          refresh()
        }
      })
      .catch((err) => {
        setSubmitting(false)
        toast.error(err)
      })
  }

  function download() {
    setDownloadingData(true)

    fetch(`${url}/users/`)
      .then((res) => res.json())
      .then((res) => {
        let data = res.map((w) => {
          {
            return {
              'First Name': w.firstName,
              'Last Name': w.lastName,
              Email: w.email,
              Phone: w.phone,
              Role: w.userType,
            }
          }
        })

        exportToCSV(
          data,
          `Users List ${moment().format('DD-MMM-YYYY HH:mm:ss')}`
        )

        setDownloadingData(false)
      })
      .catch((err) => {
        setLoading(false)
      })

    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const exportToCSV = (apiData, fileName) => {
      const ws = XLSX.utils.json_to_sheet(apiData)
      const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
      const data = new Blob([excelBuffer], { type: fileType })
      FileSaver.saveAs(data, fileName + fileExtension)
    }

    // exportToCSV(
    //   _siteWorkDetails,
    //   `Detailed Site works ${moment().format('DD-MMM-YYYY HH-mm-ss')}`
    // )
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
          <>
            {downloadingData ? (
              <div>
                <Loader active size="tiny" inline className="ml-5" />
              </div>
            ) : (
              <ArrowDownTrayIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => download()}
              />
            )}
            <MSubmitButton
              submit={refresh}
              intent="neutral"
              icon={<ArrowPathIcon className="h-5 w-5 text-zinc-800" />}
              label="Refresh"
            />
          </>
        )}

        {(viewPort === 'new' || viewPort === 'change') && (
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
            <div className="flex w-full">
              <UsersTable
                data={users}
                handleResetPassword={resetPassword}
                handleChange={_setUserToUpdate}
              />
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

              {role == 'customer-project-manager' && (
                <div className="flex flex-col">
                  <div className="flex flex-row items-center">
                    <MTextView content="Assign to Project" />
                    {<div className="text-sm text-red-600">*</div>}
                  </div>
                  <div>
                    <Dropdown
                      options={projectList}
                      placeholder="Assigned to Project...."
                      fluid
                      search
                      selection
                      onChange={(e, data) => {
                        setProjectAssigned(
                          projects.filter((p) => p._id === data.value)[0]
                        )
                        setUserCompany(projectAssigned?.customerId)
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            {firstName.length >= 1 &&
              phone.length === 10 &&
              email.length > 0 && (
                <div>
                  {submitting ? (
                    <Loader inline size="small" active />
                  ) : (
                    <MSubmitButton submit={submit} />
                  )}
                </div>
              )}
          </div>
        </>
      )}

      {viewPort === 'change' && (
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
                  value={firstName}
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
                  value={lastName}
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
                  value={phone}
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
                  value={email}
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
                    value={role}
                    onChange={(e, data) => {
                      setRole(data.value)
                    }}
                  />
                </div>
              </div>

              {role == 'customer-project-manager' && (
                <div className="flex flex-col">
                  <div className="flex flex-row items-center">
                    <MTextView content="Assign to Project" />
                    {<div className="text-sm text-red-600">*</div>}
                  </div>
                  <div>
                    <Dropdown
                      options={projectList}
                      placeholder="Assigned to Project...."
                      fluid
                      search
                      selection
                      onChange={(e, data) => {
                        setProjectAssigned(
                          projects.filter((p) => p._id === data.value)[0]
                        )
                        setUserCompany(projectAssigned?.customerId)
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            {firstName.length >= 1 &&
              phone.length === 10 &&
              email.length > 0 && (
                <div>
                  {submitting ? (
                    <Loader inline size="small" active />
                  ) : (
                    <MSubmitButton submit={updateUser} />
                  )}
                </div>
              )}
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  )
}
