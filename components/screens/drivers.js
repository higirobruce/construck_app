import {
  ArrowLeftIcon,
  ArrowDownTrayIcon,
  PlusIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'
import React, { useContext, useEffect, useState } from 'react'
import { Dropdown, Loader } from 'semantic-ui-react'
import MSubmitButton from '../common/mSubmitButton'
import DriversTable from '../common/driversTable'
import ProjectCard from '../common/projectCard'
import TextInput from '../common/TextIput'
import TextInputV from '../common/TextIputV'
import MTextView from '../common/mTextView'
import { toast, ToastContainer } from 'react-toastify'
import { UserContext } from '../../contexts/UserContext'

import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

import moment from 'moment'

export default function Drivers() {
  let url = process.env.NEXT_PUBLIC_BKEND_URL
  let apiUsername = process.env.NEXT_PUBLIC_API_USERNAME
  let apiPassword = process.env.NEXT_PUBLIC_API_PASSWORD
  let [drivers, setDrivers] = useState(null)
  let [ogDriversList, setOgDriversList] = useState(null)
  let [loading, setLoading] = useState(false)
  let [viewPort, setViewPort] = useState('list')
  let [search, setSearch] = useState('')
  let [firstName, setFirstName] = useState('')
  let [lastName, setLastName] = useState('')
  let [phone, setPhone] = useState('')
  let [email, setEmail] = useState('')
  let [title, setTitle] = useState('display')
  let [loadingProjects, setLoadingProjects] = useState(false)
  let [submitting, setSubmitting] = useState(false)
  let [projectList, setProjectList] = useState([])
  let [projects, setProjects] = useState([])
  let [projectAssigned, setProjectAssigned] = useState(null)

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
        { key: '1', value: 'display', text: 'Display only' },
        { key: '2', value: 'admin', text: 'Administrator' },
        { key: '3', value: 'revenue', text: 'Revenue officer' },
        { key: '4', value: 'dispatch', text: 'Dispatch officer' },
        { key: '5', value: 'dispatch-view', text: 'Display Dispatch' },
        { key: '5', value: 'customer-admin', text: 'Customer' },
      ]

  var titleOptions = [
    {
      key: '1',
      value: 'CRANE OPERATOR &TRUCK DRIVER',
      text: 'CRANE OPERATOR &TRUCK DRIVER',
    },
    {
      key: '3',
      value: 'DRIVER-BITUMEN SPRAYER TRUCK',
      text: 'DRIVER-BITUMEN SPRAYER TRUCK',
    },
    {
      key: '4',
      value: 'DRIVER-SMALL TRUCK',
      text: 'DRIVER-SMALL TRUCK',
    },
    {
      key: '5',
      value: 'DRIVER-TRAILER TRUCK',
      text: 'DRIVER-TRAILER TRUCK',
    },
    {
      key: '6',
      value: 'MECHANIC& OPERATOR-ASPHALT PAVER',
      text: 'MECHANIC& OPERATOR-ASPHALT PAVER',
    },
    {
      key: '7',
      value: 'OPERATOR-ASPHALT CUTTER',
      text: 'OPERATOR-ASPHALT CUTTER',
    },
    {
      key: '8',
      value: 'OPERATOR-BACHOE LOADER',
      text: 'OPERATOR-BACHOE LOADER',
    },
    {
      key: '9',
      value: 'OPERATOR-BITUMEN SPAYER',
      text: 'OPERATOR-BITUMEN SPAYER',
    },
    {
      key: '10',
      value: 'OPERATOR-BULLDOZER',
      text: 'OPERATOR-BULLDOZER',
    },
    {
      key: '11',
      value: 'OPERATOR-EXCAVATOR',
      text: 'OPERATOR-EXCAVATOR',
    },
    {
      key: '12',
      value: 'OPERATOR-FOLKLIFT',
      text: 'OPERATOR-FOLKLIFT',
    },
    {
      key: '13',
      value: 'OPERATOR-GRADER',
      text: 'OPERATOR-GRADER',
    },
    {
      key: '14',
      value: 'OPERATOR-PAVER MACHINE',
      text: 'OPERATOR-PAVER MACHINE',
    },
    {
      key: '15',
      value: 'OPERATOR-SCREED',
      text: 'OPERATOR-SCREED',
    },
    {
      key: '16',
      value: 'OPERATOR-WHEEL LOADER',
      text: 'OPERATOR-WHEEL LOADER',
    },
    {
      key: '17',
      value: 'OPERATOR-ASPHALT COMPACTOR',
      text: 'OPERATOR-ASPHALT COMPACTOR',
    },
    {
      key: '18',
      value: 'OPERATOR-BULDOZER',
      text: 'OPERATOR-BULDOZER',
    },
    {
      key: '19',
      value: 'OPERATOR-COMPACTOR',
      text: 'OPERATOR-COMPACTOR',
    },
    {
      key: '20',
      value: 'OPERATOR-COMPRESSOR',
      text: 'OPERATOR-COMPRESSOR',
    },
    {
      key: '21',
      value: 'OPERATOR-CONCRETE MIXER',
      text: 'OPERATOR-CONCRETE MIXER',
    },
    {
      key: '22',
      value: 'OPERATOR-DRILLING MACHINE',
      text: 'OPERATOR-DRILLING MACHINE',
    },
    {
      key: '23',
      value: 'OPERATOR-DUMPER',
      text: 'OPERATOR-DUMPER',
    },
    {
      key: '24',
      value: 'OPERATOR-GRADER',
      text: 'OPERATOR-GRADER',
    },
    {
      key: '25',
      value: 'OPERATOR-MILLING MACHINE',
      text: 'OPERATOR-MILLING MACHINE',
    },
    {
      key: '26',
      value: 'OPERATOR-SMALL COMPACTOR',
      text: 'OPERATOR-SMALL COMPACTOR',
    },
    {
      key: '27',
      value: 'OPERATOR-TYRE ROLLER',
      text: 'OPERATOR-TYRE ROLLER',
    },
    {
      key: '29',
      value: 'OPERATOR-WORK BEHIND',
      text: 'OPERATOR-WORK BEHIND',
    },
    {
      key: '30',
      value: 'SCREED & BITUMEN SPRAYER',
      text: 'SCREED & BITUMEN SPRAYER',
    },
    {
      key: '31',
      value: 'TRUCK DRIVER',
      text: 'TRUCK DRIVER',
    },

    {
      key: '32',
      value: 'TURNBOY',
      text: 'TURNBOY',
    },
  ]

  useEffect(() => {
    setLoadingProjects(true)
    fetch(`${url}/employees/`, {
      headers: {
        Authorization: 'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setDrivers(res)
        setOgDriversList(res)
        setLoading(false)
      })
      .catch((err) => toast.error('Error occured!'))

    fetch(`${url}/projects/v2`, {
      headers: {
        Authorization: 'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
      },
    })
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
      let _driversList = ogDriversList.filter((w) => {
        let _search = search?.toLocaleLowerCase()
        let firstName = w?.firstName?.toLocaleLowerCase()
        let lastName = w?.lastName?.toLocaleLowerCase()

        return firstName.includes(_search) || lastName.includes(_search)
      })
      setDrivers(_driversList)
      setLoading(false)
    }

    if (search.length < 3) {
      setDrivers(ogDriversList)
      setLoading(false)
    }
  }, [search])

  function refresh() {
    setLoading(true)
    fetch(`${url}/employees/`, {
      headers: {
        Authorization: 'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setDrivers(res)
        setOgDriversList(res)
        setLoading(false)
      })
      .catch((err) => toast.error('Error occured!'))
  }

  function resetPassword(driver) {
    //TODO
    fetch(`${url}/employees/resetPassword/${driver._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
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
    fetch(`${url}/employees/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
      },
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        username: firstName.toLowerCase(),
        password: 'password',
        email,
        phone,
        userType: title,
        title,
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
      .catch((err) => {})
  }

  function _setDriverToUpdate(row) {
    setViewPort('change')
    setIdToUpdate(row._id)
    setFirstName(row.firstName)
    setLastName(row.lastName)
    setPhone(row.phone)
    setEmail(row.email)
    setTitle(row.title)
  }

  function updateDriver() {
    fetch(`${url}/employees/${idToUpdate}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
      },
      method: 'PUT',
      body: JSON.stringify({
        firstName,
        lastName,
        username: firstName.toLowerCase(),
        email,
        phone,
        userType: title,
        title,
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
      .catch((err) => {})
  }

  function download() {
    setDownloadingData(true)

    fetch(`${url}/employees/`, {
      headers: {
        Authorization: 'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        let data = res.map((w) => {
          {
            return {
              'First Name': w.firstName,
              'Last Name': w.lastName,
              Email: w.email,
              Phone: w.phone,
              Title: w.title,
              'Employment Status': w.employmentStatus,
              Status: w.status,
            }
          }
        })

        exportToCSV(
          data,
          `Drivers List ${moment().format('DD-MMM-YYYY HH:mm:ss')}`
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
      <div className="text-2xl font-semibold">Drivers</div>
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
          {!loading && drivers?.length > 0 && (
            <div className="flex w-full">
              <DriversTable
                data={drivers}
                handleResetPassword={resetPassword}
                handleChange={_setDriverToUpdate}
              />
            </div>
          )}
          {(loading || !drivers) && (
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
                </div>
                <TextInputV
                  placeholder="email"
                  type="email"
                  setValue={setEmail}
                />
              </div>

              <div className="flex flex-col">
                <div className="flex flex-row items-center">
                  <MTextView content="Title" />
                  {<div className="text-sm text-red-600">*</div>}
                </div>
                <div className="">
                  <Dropdown
                    options={titleOptions}
                    placeholder="Select driver's title"
                    fluid
                    search
                    selection
                    onChange={(e, data) => {
                      setTitle(data.value)
                    }}
                  />
                </div>
              </div>

              {isCustomer && (
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
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            {firstName.length >= 1 && phone.length === 10 && (
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
                  <MTextView content="Title" />
                  {<div className="text-sm text-red-600">*</div>}
                </div>
                <div className="">
                  <Dropdown
                    options={titleOptions}
                    placeholder="Select driver's title"
                    fluid
                    search
                    selection
                    value={title}
                    onChange={(e, data) => {
                      setTitle(data.value)
                    }}
                  />
                </div>
              </div>

              {isCustomer && (
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
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            {firstName.length >= 1 && phone.length === 10 && (
              <div>
                {submitting ? (
                  <Loader inline size="small" active />
                ) : (
                  <MSubmitButton submit={updateDriver} />
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
