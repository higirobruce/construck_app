import { ArrowLeftIcon, PlusIcon, RefreshIcon } from '@heroicons/react/outline'
import React, { useContext, useEffect, useState } from 'react'
import { Dropdown, Loader } from 'semantic-ui-react'
import MSubmitButton from '../common/mSubmitButton'
import VendorsTable from '../common/vendorsTable'
import ProjectCard from '../common/projectCard'
import TextInput from '../common/TextIput'
import TextInputV from '../common/TextIputV'
import MTextView from '../common/mTextView'
import { toast, ToastContainer } from 'react-toastify'
import { UserContext } from '../../contexts/UserContext'

export default function Vendors() {
  let url = process.env.NEXT_PUBLIC_BKEND_URL
  let [vendors, setVendors] = useState(null)
  let [loading, setLoading] = useState(false)
  let [viewPort, setViewPort] = useState('list')
  let [search, setSearch] = useState('')
  let [name, setName] = useState('')
  let [submitting, setSubmitting] = useState(false)

  let [phone, setPhone] = useState('')
  let [mobile, setMobile] = useState('')

  let { user, setUser } = useContext(UserContext)

  useEffect(() => {
    fetch(`${url}/vendors/`)
      .then((res) => res.json())
      .then((res) => {
        setVendors(res)
        setLoading(false)
      })
      .catch((err) => toast.error('Error occured!'))
  }, [])

  function refresh() {
    setLoading(true)
    fetch(`${url}/vendors/`)
      .then((res) => res.json())
      .then((res) => {
        setVendors(res)
        setLoading(false)
        setSubmitting(false)
      })
      .catch((err) => {
        toast.error('Error occured!')
        setLoading(false)
        setSubmitting(false)
      })
  }

  function resetPassword(driver) {
    //TODO
    fetch(`${url}/vendors/resetPassword/${driver._id}`, {
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
    setSubmitting(true)
    fetch(`${url}/vendors/`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        name,
        password: 'password',
        phone,
        mobile,
        status: 'active',
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toast.error(res.error)
          setSubmitting(false)
        } else {
          setViewPort('list')
          setSubmitting(false)
          refresh()
        }
      })
      .catch((err) => {
        setSubmitting(false)
      })
  }

  return (
    <div className="my-5 flex flex-col space-y-5 px-10">
      <div className="text-2xl font-semibold">Vendors</div>
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
          {!loading && vendors?.length > 0 && (
            <div className="flex w-full">
              <VendorsTable
                data={vendors}
                handleResetPassword={resetPassword}
              />
            </div>
          )}
          {(loading || !vendors) && (
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
                  <MTextView content="Vendor Name" />
                  {<div className="text-sm text-red-600">*</div>}
                </div>
                <TextInputV
                  placeholder="Vendor name"
                  type="text"
                  setValue={setName}
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
                  <MTextView content="Other phone" />
                </div>
                <TextInputV
                  placeholder="Other phone"
                  type="text"
                  setValue={setMobile}
                />
              </div>
            </div>
            {name.length >= 1 && phone.length === 10 && (
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
      <ToastContainer />
    </div>
  )
}
