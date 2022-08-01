import {
  CashIcon,
  DocumentDownloadIcon,
  DownloadIcon,
  EyeIcon,
  ViewListIcon,
} from '@heroicons/react/outline'
import { DocumentReportIcon } from '@heroicons/react/solid'
import React from 'react'

export default function StatisticCard({ intent, data, icon }) {
  function getClassFromIntent(intent) {
    if (intent == 'primary') {
      return 'flex flex-col space-y-10 p-2 rounded bg-blue-200  w-full'
    } else if (intent == 'secondary') {
      return 'flex flex-col space-y-10 p-2 rounded bg-yellow-200  w-full'
    } else if (intent == 'warning') {
      return 'flex flex-col space-y-10 p-2 rounded bg-red-200  w-full'
    } else if (intent == 'danger') {
      return 'flex flex-col space-y-10 p-2 rounded bg-red-100 shadow-lg w-full'
    } else if (intent == 'normal') {
      return 'flex flex-col space-y-10 p-2 rounded bg-green-200  w-full'
    } else {
      return 'flex flex-col space-y-10 p-2 rounded bg-grey-400 shadow-lg ring-1 ring-zinc-200 w-full'
    }
  }
  return (
    <div className={getClassFromIntent(intent)}>
      <div className="flex flex-row justify-between">
        <div className="text-lg font-semibold text-gray-700">{data.title}</div>
        <div className="flex flex-row space-x-3">
          <ViewListIcon className="h-4 w-4 cursor-pointer text-blue-300" />
          <DownloadIcon className="h-4 w-4 cursor-pointer text-blue-300" />
          {data.title === 'Final Revenues' && (
            <CashIcon className="h-4 w-4 cursor-pointer text-green-500" />
          )}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between text-base font-semibold text-gray-700">
        <div>{icon}</div>
        <div>{data.content}</div>
      </div>
    </div>
  )
}
