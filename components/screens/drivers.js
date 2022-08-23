import { ArrowLeftIcon, PlusIcon, RefreshIcon } from '@heroicons/react/outline'
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

export default function Drivers() {
  let url = process.env.NEXT_PUBLIC_BKEND_URL
  let [drivers, setDrivers] = useState(null)
  let [loading, setLoading] = useState(false)
  let [viewPort, setViewPort] = useState('list')
  let [search, setSearch] = useState('')
  let [firstName, setFirstName] = useState('')
  let [lastName, setLastName] = useState('')
  let [phone, setPhone] = useState('')
  let [email, setEmail] = useState('')
  let [title, setTitle] = useState('display')
  let [loadingProjects, setLoadingProjects] = useState(false)
  let [projectList, setProjectList] = useState([])
  let [projects, setProjects] = useState([])
  let [projectAssigned, setProjectAssigned] = useState(null)

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
    fetch(`${url}/employees/`)
      .then((res) => res.json())
      .then((res) => {
        setDrivers(res)
        setLoading(false)
      })

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

  function refresh() {
    setLoading(true)
    fetch(`${url}/employees/`)
      .then((res) => res.json())
      .then((res) => {
        setDrivers(res)
        setLoading(false)
      })
  }

  function resetPassword(driver) {
    //TODO
    fetch(`${url}/employees/resetPassword/${driver._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json)
      .then((res) => {
        toast.success('Password reset successfully!')
        refresh()
      })
      .catch((err) => toast.error('Error occured!'))
  }

  function submit() {
    fetch(`${url}/employees/`, {
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
        userType: title,
        company: user?.company?._id,
        assignedProject: projectAssigned,
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
          {!loading && drivers?.length > 0 && (
            <div className="flex w-full">
              <DriversTable
                data={drivers}
                handleResetPassword={resetPassword}
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
