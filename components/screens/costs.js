import { BanknotesIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import StatisticCard from '../common/statisticCard'

export default function Costs() {
  let url = process.env.NEXT_PUBLIC_BKEND_URL
  let apiUsername = process.env.NEXT_PUBLIC_API_USERNAME
  let apiPassword = process.env.NEXT_PUBLIC_API_PASSWORD

  let { user, setUser } = useContext(UserContext)
  let [monthlyCosts, setMonthlyCosts] = useState([])

  useEffect(() => {
    refresh()
  }, [])

  function refresh() {
    let projectName = user?.assignedProjects[0]?.prjDescription
    fetch(
      `${url}/works/monthlyRevenuePerProject/${projectName}?status=validated`,
      {
        method: 'GET',
        headers: {
          Authorization:
            'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setMonthlyCosts(res)
      })
  }

  function releaseMonth(month, year) {
    let projectName = user?.assignedProjects[0]?.prjDescription
    fetch(
      `${url}/works/releaseValidated/${projectName}?month=${month}&year=${year}`,
      {
        method: 'PUT',
        headers: {
          Authorization:
            'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        refresh()
      })
  }

  return (
    <div className="my-5 flex flex-col space-y-5 px-10">
      <div className="text-2xl font-semibold">Monthly Costs</div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-5">
        {monthlyCosts.map(($) => {
          return (
            <StatisticCard
              data={{
                title: $._id.month + '-' + $._id.year,
                content: $.validatedValue.toLocaleString() + ' RWF',
                month: $._id.month,
                year: $._id.year,
              }}
              icon={<BanknotesIcon className="h-5 w-5 text-yellow-600" />}
              canBeApproved
              handleRelease={releaseMonth}
            />
          )
        })}
      </div>
    </div>
  )
}
