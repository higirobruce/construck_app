import {
  ReceiptRefundIcon,
  EnvelopeOpenIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import React from 'react'

export default function CustomerCard({
  intent,
  data,
  icon,
  updateMe,
  canCreateData,
}) {
  function getClassFromIntent(intent) {
    if (intent == 'primary') {
      return 'flex flex-col space-y-5 p-5 rounded bg-blue-200  w-full'
    } else if (intent == 'secondary') {
      return 'flex flex-col space-y-5 p-5 rounded bg-yellow-200  w-full'
    } else if (intent == 'warning') {
      return 'flex flex-col space-y-5 p-5 rounded bg-red-200  w-full'
    } else if (intent == 'danger') {
      return 'flex flex-col space-y-5 p-5 rounded bg-red-400  w-full'
    } else if (intent == 'normal') {
      return 'flex flex-col space-y-5 p-5 rounded bg-green-200  w-full'
    } else {
      return 'flex flex-col space-y-5 p-5 rounded bg-grey-400 shadow-lg ring-1 ring-zinc-200 w-full'
    }
  }
  return (
    <div className={getClassFromIntent(intent)}>
      <div className="flex flex-row items-center justify-between">
        {canCreateData && (
          <div
            className="cursor-pointer "
            onClick={() => updateMe(data)}
          >
            <div className='text-md font-semibold text-gray-700'>{data.name}</div> 
            <div className='text-md text-gray-500'>{data.nProjects} Project(s)</div>
          </div>
        )}

        {!canCreateData && (
          <div className="text-md font-semibold text-gray-700">
            {data.name + '  (' + data.nProjects + ')'}
          </div>
        )}
        {/* <div className="flex flex-row space-x-3">
          <PencilSquareIcon className="h-4 w-4 cursor-pointer text-yellow-600" />
          <FolderOpenIcon className="h-4 w-4 cursor-pointer text-blue-500" />
        </div> */}
      </div>

      <div className="flex flex-col space-y-1">
        <div className="flex flex-row items-center justify-start space-x-2 text-base font-normal text-gray-500">
          <div>
            <PhoneIcon className="h-4 w-4 text-blue-400" />
          </div>
          <div className="text-sm ">{data.phone}</div>
        </div>
        <div className="flex flex-row items-center justify-start space-x-2 text-base font-normal text-gray-500">
          <div>
            <EnvelopeOpenIcon className="h-4 w-4 text-blue-400" />
          </div>
          <div className="text-sm ">{data.email}</div>
        </div>

        <div className="flex flex-row items-center justify-start space-x-2 text-base font-normal text-gray-500">
          <div>
            <ReceiptRefundIcon className="h-4 w-4 text-green-400" />
          </div>
          <div className="text-sm ">{data.tinNumber}</div>
        </div>
      </div>
    </div>
  )
}
