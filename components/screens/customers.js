import { ArrowLeftIcon, PlusIcon, RefreshIcon } from '@heroicons/react/outline'
import React, { useContext, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { Loader } from 'semantic-ui-react'
import { UserContext } from '../../contexts/UserContext'
import CustomerCard from '../common/customerCard'
import MSubmitButton from '../common/mSubmitButton'
import TextInput from '../common/TextIput'
import TextInputLogin from '../common/TextIputLogin'

export default function Customers() {
  let { user, setUser } = useContext(UserContext)
  //AUTORIZATION
  let canCreateData = user.userType === 'admin'

  let [customers, setCustomers] = useState([])
  let [ogCustomerList, setOgCustomerList] = useState([])
  let [viewPort, setViewPort] = useState('list')
  let [search, setSearch] = useState('')

  let [name, setName] = useState('')
  let [phone, setPhone] = useState('')
  let [email, setEmail] = useState('')
  let [tinNumber, setTinNumber] = useState('')
  let [submitting, setSubmitting] = useState(false)

  let [loadingCustomers, setLoadingCustomers] = useState(true)
  let url = process.env.NEXT_PUBLIC_BKEND_URL

  useEffect(() => {
    loadCustomers()
  }, [])

  function loadCustomers() {
    setLoadingCustomers(true)
    setSubmitting(false)
    setPhone('')
    setName('')
    setEmail('')
    setTinNumber('')
    fetch(`${url}/customers/`)
      .then((res) => res.json())
      .then((resp) => {
        setCustomers(resp)
        setOgCustomerList(resp)
        setLoadingCustomers(false)
      })
  }

  function createCustomer() {
    setSubmitting(true)
    fetch(`${url}/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        phone,
        tinNumber,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toast.error(res.error)
          setSubmitting(false)
        } else {
          setSubmitting(false)
          setViewPort('list')
          loadCustomers()
        }
      })
      .catch((err) => {})
  }

  useEffect(() => {
    if (search.length >= 3) {
      setLoadingCustomers(true)
      let _customerList = ogCustomerList.filter((w) => {
        let _search = search?.toLocaleLowerCase()
        let custName = w?.name?.toLocaleLowerCase()

        return custName.includes(_search)
      })
      setCustomers(_customerList)
      setLoadingCustomers(false)
    }

    if (search.length < 3) {
      setCustomers(ogCustomerList)
      setLoadingCustomers(false)
    }
  }, [search])

  return (
    <div className="my-5 flex flex-col space-y-5 px-10">
      <div className="text-2xl font-semibold">Customers</div>
      <div className="flex w-full flex-row items-center justify-between space-x-4">
        {viewPort === 'list' && canCreateData && (
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

        {viewPort === 'new' && (
          <MSubmitButton
            submit={() => {
              setViewPort('list')
              loadCustomers()
            }}
            intent="primary"
            icon={<ArrowLeftIcon className="h-5 w-5 text-zinc-800" />}
            label="Back"
          />
        )}

        {viewPort === 'list' && (
          <MSubmitButton
            submit={loadCustomers}
            intent="neutral"
            icon={<RefreshIcon className="h-5 w-5 text-zinc-800" />}
            label="Refresh"
          />
        )}
      </div>
      {viewPort === 'list' &&
        (!loadingCustomers && customers.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
            {customers.map((c) => {
              return (
                <CustomerCard
                  data={{
                    name: c.name,
                    email: c.email,
                    phone: c.phone,
                    tinNumber: c.tinNumber,
                    nProjects: c.projects?.length,
                  }}
                />
              )
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
            <Loader active />
          </div>
        ))}

      {viewPort === 'new' && (
        <div className="flex items-start">
          <div className="flex flex-col space-y-5">
            <TextInputLogin
              label="Name"
              type="text"
              placeholder="Names"
              isRequired
              setValue={setName}
            />

            <TextInputLogin
              label="Contact number"
              type="text"
              placeholder="phone"
              isRequired
              setValue={setPhone}
            />

            <TextInputLogin
              label="Email"
              type="email"
              placeholder="email@example.com"
              setValue={setEmail}
            />
            <TextInputLogin
              label="TIN"
              type="number"
              placeholder="999999999"
              setValue={setTinNumber}
            />

            {name.length > 1 && phone.length > 1 && (
              <div>
                {submitting ? (
                  <Loader inline size="small" active />
                ) : (
                  <MSubmitButton submit={createCustomer} />
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  )
}
