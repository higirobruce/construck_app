import {
  CashIcon,
  ClockIcon,
  SwitchVerticalIcon,
  TrendingUpIcon,
  TruckIcon,
} from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import StatisticCard from '../common/statisticCard'
import 'antd/dist/antd.css'

import { DatePicker, Space } from 'antd'
import TextInputV from '../common/TextIputV'
import { Dropdown, Loader } from 'semantic-ui-react'
import MSubmitButton from '../common/mSubmitButton'
import { MapIcon } from '@heroicons/react/solid'
import 'datejs'

const { RangePicker } = DatePicker

export default function Dashboard() {
  let [startDate, setStartDate] = useState(
    Date.today().clearTime().moveToFirstDayOfMonth()
  )
  let [endDate, setEndDate] = useState(
    Date.today().clearTime().moveToLastDayOfMonth().addHours(23).addMinutes(59)
  )
  let [customer, setCustomer] = useState()
  let [project, setProject] = useState()
  let [equipment, setEquipment] = useState()
  let [owner, setOwner] = useState('')

  let [finalRevenues, setFinalRevenues] = useState(0)
  let [provisionalRevenues, setProvisionalRevenues] = useState(0)
  let [totalDays, setTotalDays] = useState(0)
  let [assetUtilization, setAssetUtilization] = useState(0)
  let [assetAvailability, setAssetAvailability] = useState(0)

  let [loadingFinalRev, setLoadingFinalRev] = useState(true)
  let [loadingProvisionalRev, setLoadingProvisionalRev] = useState(true)
  let [loadingTotalDays, setLoadingTotalDays] = useState(true)
  let [loadingAvailability, setLoadingAvailability] = useState(true)
  let [nAvailable, setNAvailable] = useState(0)
  let [nAssigned, setNAssigned] = useState(0)
  let [nInWorkshop, setNInWorkshop] = useState(0)
  let [nDispatched, setNDispatched] = useState(0)
  let [nRecords, setNRecords] = useState(-1)

  useEffect(() => {
    fetch('https://construck-backend.herokuapp.com/works/getAnalytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: startDate,
        endDate: endDate,
        status: 'final',
        customer,
        project,
        equipment,
        owner,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setFinalRevenues(res.totalRevenue)
        setLoadingFinalRev(false)
        setTotalDays(res.totalDays)
        setLoadingTotalDays(false)
      })
      .catch((err) => {})

    fetch('https://construck-backend.herokuapp.com/works/getAnalytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: startDate,
        endDate: endDate,
        status: 'projected',
        customer,
        project,
        equipment,
        owner,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setProvisionalRevenues(res.projectedRevenue)
        setLoadingProvisionalRev(false)
      })
      .catch((err) => {})

    fetch('https://construck-backend.herokuapp.com/equipments/')
      .then((res) => res.json())
      .then((res) => {
        let eqs = res?.equipments
        let nEqs = res.nrecords
        setNRecords(nEqs)

        let availableEq = eqs.filter((e) => e.eqStatus === 'available')
        let assignedEq = eqs.filter((e) => e.eqStatus === 'assigned to job')
        let dispatchedEq = eqs.filter((e) => e.eqStatus === 'dispatched')
        let inWorkshopEq = eqs.filter((e) => e.eqStatus === 'workshop')

        setNAssigned(assignedEq.length)
        setNAvailable(availableEq.length)
        setNDispatched(dispatchedEq.length)
        setNInWorkshop(inWorkshopEq.length)
        setLoadingAvailability(false)
      })
      .catch((err) => {})
  }, [])

  useEffect(() => {
    setLoadingFinalRev(true)
    setLoadingProvisionalRev(true)
    setLoadingTotalDays(true)
    setLoadingAvailability(true)

    fetch('https://construck-backend.herokuapp.com/works/getAnalytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: startDate
          ? Date.parse(startDate)
          : Date.today().clearTime().moveToFirstDayOfMonth(),
        endDate: endDate
          ? Date.parse(endDate).addHours(23).addMinutes(59)
          : Date.today().clearTime().moveToLastDayOfMonth(),
        status: 'final',
        customer,
        project,
        equipment,
        owner,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setFinalRevenues(res.totalRevenue)
        setLoadingFinalRev(false)
        setTotalDays(res.totalDays)
        setLoadingTotalDays(false)
      })
      .catch((err) => {})

    fetch('https://construck-backend.herokuapp.com/works/getAnalytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: startDate
          ? Date.parse(startDate)
          : Date.today().clearTime().moveToFirstDayOfMonth(),
        endDate: endDate
          ? Date.parse(endDate).addHours(23).addMinutes(59)
          : Date.today().clearTime().moveToLastDayOfMonth(),
        status: 'projected',
        customer,
        project,
        equipment,
        owner,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setProvisionalRevenues(res.projectedRevenue)
        setLoadingProvisionalRev(false)
        setTotalDays(res.totalDays)
      })
      .catch((err) => {})

    fetch('https://construck-backend.herokuapp.com/equipments/')
      .then((res) => res.json())
      .then((res) => {
        let eqs = res?.equipments
        let nEqs = res.nrecords
        setNRecords(nEqs)

        let availableEq = eqs.filter((e) => e.eqStatus === 'available')
        let assignedEq = eqs.filter((e) => e.eqStatus === 'assigned to job')
        let dispatchedEq = eqs.filter((e) => e.eqStatus === 'dispatched')
        let inWorkshopEq = eqs.filter((e) => e.eqStatus === 'workshop')

        setNAssigned(assignedEq.length)
        setNAvailable(availableEq.length)
        setNDispatched(dispatchedEq.length)
        setNInWorkshop(inWorkshopEq.length)
        setLoadingAvailability(false)
      })
      .catch((err) => {})
  }, [startDate, endDate, customer, project, equipment, owner])

  function go() {
    fetch('https://construck-backend.herokuapp.com/works/getAnalytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: startDate,
        endDate: endDate,
        status: 'final',
        customer,
        project,
        equipment,
        owner,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setFinalRevenues(res.totalRevenue)
        setTotalDays(res.totalDays)
      })
      .catch((err) => {})

    fetch('https://construck-backend.herokuapp.com/works/getAnalytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: startDate,
        endDate: endDate,
        status: 'projected',
        customer,
        project,
        equipment,
        owner,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setProvisionalRevenues(res.projectedRevenue)
        setTotalDays(res.totalDays)
      })
      .catch((err) => {})
  }

  return (
    <div className="my-5 flex flex-col space-y-5 px-10">
      <div className="text-2xl font-semibold">Dashboard</div>
      <div className="mb-5 flex flex-row space-x-5 py-5">
        <TextInputV placeholder="Customer Name" setValue={setCustomer} />
        <TextInputV placeholder="Project" setValue={setProject} />
        <TextInputV placeholder="Equipment" setValue={setEquipment} />
        <div className="w-1/5">
          <Dropdown
            options={[
              {
                key: '0',
                value: 'All',
                text: 'All equipment',
              },
              {
                key: '1',
                value: 'Hired',
                text: 'Hired equipment',
              },
              {
                key: '2',
                value: 'Construck',
                text: 'Construck equipment',
              },
            ]}
            placeholder="Select equipment owner"
            fluid
            search
            selection
            onChange={(e, data) => {
              setOwner(data.value)
            }}
          />
        </div>

        <RangePicker
          onChange={(values, dateStrings) => {
            setStartDate(dateStrings[0])
            setEndDate(dateStrings[1])
          }}
        />
        <div className="">
          <MSubmitButton label="Go" submit={() => go()} />
        </div>
      </div>

      <div className="mt-5 sm:mr-5">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
          <StatisticCard
            data={{
              title: 'Projected Revenues',
              content: loadingProvisionalRev ? (
                <Loader active size="mini" inline />
              ) : (
                provisionalRevenues?.toLocaleString() + ' RWF'
              ),
            }}
            icon={<CashIcon className="h-5 w-5 text-yellow-600" />}
          />
          <StatisticCard
            data={{
              title: 'Actual Revenues',
              content: loadingFinalRev ? (
                <Loader active size="mini" inline />
              ) : (
                finalRevenues?.toLocaleString() + ' RWF'
              ),
            }}
            icon={<CashIcon className="h-5 w-5 text-blue-600" />}
          />
          <StatisticCard
            data={{
              title: 'Asset utilization',
              content: loadingTotalDays ? (
                <Loader active inline size="mini" />
              ) : (
                totalDays + '%'
              ),
            }}
            icon={<TrendingUpIcon className="h-5 w-5 text-green-600" />}
          />
          {/* TODO */}
          <StatisticCard
            data={{
              title: 'Asset availability',
              content: loadingAvailability ? (
                <Loader active inline size="mini" />
              ) : (
                Math.round((nAvailable / nRecords) * 100) + '%'
              ),
            }}
            icon={<TruckIcon className="h-5 w-5 text-orange-500" />}
          />
        </div>
      </div>
    </div>
  )
}
