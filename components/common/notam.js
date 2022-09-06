import { EllipsisHorizontalIcon, PlusIcon } from '@heroicons/react/outline'
import React from 'react'
import MSubmitButton from './mSubmitButton'

export default function Notam({ title, date, description, intent }) {
  function getClassFromIntent(intent) {
    if (intent === 'normal') {
      return 'bg-white rounded shadow-md flex flex-col space-y-3 p-3'
    } else {
      return 'bg-yellow-50 rounded shadow-md flex flex-col space-y-3 p-3'
    }
  }
  return (
    <div className={getClassFromIntent(intent)}>
      {/* Title */}
      <div className="flex items-center justify-between space-x-1">
        <div className="text-lg font-semibold text-gray-600">{title}</div>
        <div className="text-xs font-medium text-gray-400">{date}</div>
      </div>
      <div className="font-base text-sm text-gray-500">{description}</div>

      <button className="w-10 rounded bg-blue-400 py-1 text-white shadow-md">
        <div className="flex flex-row items-center justify-around">
          <EllipsisHorizontalIcon className="h-4 w-4" />
        </div>
      </button>
    </div>
  )
}
