import {
  CashIcon,
  ClockIcon,
  SwitchVerticalIcon,
} from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import StatisticCard from '../common/statisticCard'
import 'antd/dist/antd.css'

import { DatePicker, Space } from 'antd'
import TextInputV from '../common/TextIputV'
import { Dropdown } from 'semantic-ui-react'
import MSubmitButton from '../common/mSubmitButton'
import { MapIcon } from '@heroicons/react/solid'
const { RangePicker } = DatePicker

export default function Dashboard() {
  let [startDate, setStartDate] = useState('2000-01-01')
  let [endDate, setEndDate] = useState('9999-01-01')
  let [customer, setCustomer] = useState()
  let [project, setProject] = useState()
  let [equipment, setEquipment] = useState()
  let [owner, setOwner] = useState('')

  let [finalRevenues, setFinalRevenues] = useState(0)
  let [provisionalRevenues, setProvisionalRevenues] = useState(0)
  let [totalDays, setTotalDays] = useState(0)

  useEffect(() => {
    fetch('https://construck-backend.herokuapp.com/works/getAnalytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: startDate,
        endDate: endDate,
        status: 'approved',
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
        status: 'stopped',
        customer,
        project,
        equipment,
        owner,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setProvisionalRevenues(res.totalRevenue)
        setTotalDays(res.totalDays)
      })
      .catch((err) => {})
  }, [])

  useEffect(() => {
    fetch('https://construck-backend.herokuapp.com/works/getAnalytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: startDate,
        endDate: endDate,
        status: 'approved',
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
        status: 'stopped',
        customer,
        project,
        equipment,
        owner,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setProvisionalRevenues(res.totalRevenue)
        setTotalDays(res.totalDays)
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
        status: 'approved',
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
        status: 'stopped',
        customer,
        project,
        equipment,
        owner,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setProvisionalRevenues(res.totalRevenue)
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
              title: 'Provisional Revenues',
              content: provisionalRevenues?.toLocaleString() + ' RWF',
            }}
            icon={<CashIcon className="h-5 w-5 text-yellow-600" />}
          />
          <StatisticCard
            data={{
              title: 'Final Revenues',
              content: finalRevenues?.toLocaleString() + ' RWF',
            }}
            icon={<CashIcon className="h-5 w-5 text-blue-600" />}
          />
          <StatisticCard
            data={{
              title: 'Billable Days',
              content: totalDays,
            }}
            icon={<ClockIcon className="h-5 w-5 text-green-600" />}
          />
          <StatisticCard
            data={{
              title: 'Dispatched Days',
              content: '334',
            }}
            icon={<SwitchVerticalIcon className="h-5 w-5 text-orange-500" />}
          />
        </div>
      </div>
    </div>
  )
}
