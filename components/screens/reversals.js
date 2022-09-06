import { ArrowRightIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import React, { useContext, useState } from 'react'
import TextInput from '../common/TextIput'
import { DatePicker, Descriptions } from 'antd'
import moment from 'moment'
import MTextView from '../common/mTextView'
import MTitle from '../common/mTitle'
import { UserContext } from '../../contexts/UserContext'
import { Loader } from 'semantic-ui-react'
import Modal from '../common/modal'

const { RangePicker } = DatePicker

export default function Reversals() {
  let [plateNumber, setPlateNumber] = useState('')
  let [startDate, setStartDate] = useState(null)
  let [endDate, setEndDate] = useState(null)
  let [transactions, setTransactions] = useState(null)
  let url = process.env.NEXT_PUBLIC_BKEND_URL
  let [loading, setLoading] = useState(false)
  let [reverseTransaction, setReverseTransaction] = useState(false)
  let [params, setParams] = useState({})

  let { user, setUser } = useContext(UserContext)

  function getTransactions() {
    setLoading(true)
    fetch(
      `${url}/works/v3/toreverse/${plateNumber}?startDate=${startDate}&endDate=${endDate}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          setTransactions(res)
          setLoading(false)
        }
      })
      .catch((err) => setLoading(false))
  }

  function refresh() {
    setLoading(true)
    fetch(
      `${url}/works/v3/toreverse/${plateNumber}?startDate=${startDate}&endDate=${endDate}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          setTransactions(res)
          setLoading(false)
        }
      })
      .catch((err) => setLoading(false))
  }

  function _confirmReverse(
    siteWork,
    id,
    dispatchDate,
    duration = 0,
    totalRevenue = 0,
    totalExpenditure = 0
  ) {
    setParams({
      siteWork,
      id,
      dispatchDate,
      duration,
      totalRevenue,
      totalExpenditure,
    })
    setReverseTransaction(true)
  }

  function reverse() {
    if (params.siteWork) {
      fetch(
        `${url}/works/swreverse/${params.id}?date=${params.dispatchDate}&totalRevenue=${params.totalRevenue}&totalExpenditure=${params.totalExpenditure}&duration=${params.duration}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reversedBy: user._id,
          }),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          refresh()
        })
        .catch((err) => setLoading(false))
    } else {
      fetch(`${url}/works/reverse/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reversedBy: user._id,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          refresh()
        })
        .catch((err) => setLoading(false))
    }
  }

  return (
    <div className="my-5 flex flex-col space-y-5 px-10">
      <div className="text-2xl font-semibold">Reversals</div>

      {/* Platenumber search */}
      <div className="flex w-full flex-row items-center justify-around space-x-5 px-40">
        <TextInput
          placeholder="Search Plate number..."
          setValue={setPlateNumber}
          isRequired
        />

        <div className="">
          <RangePicker
            onChange={(values, dateStrings) => {
              setStartDate(dateStrings[0])
              setEndDate(dateStrings[1])
            }}
          />
        </div>

        {plateNumber.length >= 3 && (
          <div
            onClick={() => getTransactions()}
            className="flex cursor-pointer items-center justify-center rounded-full bg-white p-2 text-red-500 shadow-lg active:shadow-none"
          >
            <ArrowRightIcon className="h-5 w-5" />
          </div>
        )}
      </div>

      {/* List of posted records */}
      <div className="flex flex-col space-y-1">
        {loading ? (
          <div className="mx-auto">
            <Loader active />
          </div>
        ) : (
          transactions && (
            <>
              <div className="grid grid-cols-10 overflow-y-auto px-2">
                {/* Plate NUmber */}
                <MTitle content="Plate Number" />
                <MTitle content="Driver" />
                <MTitle content="Owner" />
                <MTitle content="Dispatch date" />
                <MTitle content="Project" />
                <MTitle content="Customer" />
                <MTitle content="Site Work" />
                <MTitle content="Duration" />
                <MTitle content="Revenue" />
                <MTitle content="Actions" />
              </div>

              {transactions.map((t) => {
                return (
                  <div className="round-sm grid grid-cols-10 items-center bg-white p-2 shadow-sm">
                    {/* Plate NUmber */}
                    <MTextView content={t?.equipment?.plateNumber} />
                    <MTextView content={t?.driverName ? t?.driverName : '-'} />
                    <MTextView content={t?.owner} />
                    <MTextView
                      content={moment(t?.dispatchDate).format('DD-MMM-YYYY')}
                    />
                    <MTextView content={t?.project?.prjDescription} />
                    <MTextView content={t?.project?.customer} />
                    <MTextView content={t?.siteWork ? 'Yes' : 'No'} />
                    <MTextView
                      content={t?.duration + ' ' + t?.equipment?.uom + 's'}
                    />
                    <MTextView
                      content={
                        parseFloat(t?.totalRevenue).toLocaleString() + ' RWF'
                      }
                    />

                    <div
                      onClick={() =>
                        _confirmReverse(
                          t?.siteWork,
                          t?._id,
                          t?.dispatchDate,
                          t?.equipment?.uom === 'day'
                            ? t?.duration
                            : t?.duration * (1000 * 60 * 60),
                          t?.totalRevenue,
                          t?.totalExpenditure
                        )
                      }
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-red-500 p-1 text-white shadow-sm hover:bg-red-600 active:bg-red-500"
                    >
                      <ArrowPathIcon className="h-5 w-5" />
                    </div>
                  </div>
                )
              })}
            </>
          )
        )}
      </div>
      {reverseTransaction && (
        <Modal
          title="Reverse transaction"
          body="Are you sure you want to reverse this transaction? Please note that this is IRREVERSIBLE!"
          isShown={reverseTransaction}
          setIsShown={setReverseTransaction}
          handleConfirm={reverse}
        />
      )}
    </div>
  )
}
