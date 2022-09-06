import {
  ReceiptRefundIcon,
  EnvelopeOpenIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import React from 'react'

export default function CustomerCard({ intent, data, icon, updateMe }) {
  function getClassFromIntent(intent) {
    if (intent == 'primary') {
      return 'flex flex-col space-y-10 p-2 rounded bg-blue-200  w-full'
    } else if (intent == 'secondary') {
      return 'flex flex-col space-y-10 p-2 rounded bg-yellow-200  w-full'
    } else if (intent == 'warning') {
      return 'flex flex-col space-y-10 p-2 rounded bg-red-200  w-full'
    } else if (intent == 'danger') {
      return 'flex flex-col space-y-10 p-2 rounded bg-red-400  w-full'
    } else if (intent == 'normal') {
      return 'flex flex-col space-y-10 p-2 rounded bg-green-200  w-full'
    } else {
      return 'flex flex-col space-y-10 p-2 rounded bg-grey-400 shadow-lg ring-1 ring-zinc-200 w-full'
    }
  }
  return (
    <div className={getClassFromIntent(intent)}>
      <div className="flex flex-row items-center justify-between">
        <div
          className="cursor-pointer text-lg font-semibold text-gray-700"
          onClick={() => updateMe(data)}
        >
          {data.name + '  (' + data.nProjects + ')'}
        </div>
        {/* <div className="flex flex-row space-x-3">
          <PencilSquareIcon className="h-5 w-5 cursor-pointer text-yellow-600" />
          <FolderOpenIcon className="h-5 w-5 cursor-pointer text-blue-500" />
        </div> */}
      </div>

      <div className="flex flex-col space-y-1">
        <div className="flex flex-row items-center justify-between text-base font-normal text-gray-500">
          <div>
            <PhoneIcon className="h-5 w-5 text-gray-800" />
          </div>
          <div>{data.phone}</div>
        </div>
        <div className="flex flex-row items-center justify-between text-base font-normal text-gray-500">
          <div>
            <EnvelopeOpenIcon className="h-5 w-5 text-gray-800" />
          </div>
          <div>{data.email}</div>
        </div>

        <div className="flex flex-row items-center justify-between text-base font-normal text-gray-500">
          <div>
            <ReceiptRefundIcon className="h-5 w-5 text-gray-800" />
          </div>
          <div>{data.tinNumber}</div>
        </div>
      </div>
    </div>
  )
}
