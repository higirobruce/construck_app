import {
  CheckIcon,
  ExclamationCircleIcon,
  PauseIcon,
  PencilAltIcon,
  PlayIcon,
  ReceiptRefundIcon,
  StopIcon,
  CogIcon,
  BanIcon,
} from '@heroicons/react/outline'
import { FolderOpenIcon, ExclamationIcon } from '@heroicons/react/solid'
import React from 'react'
import MTextView from './mTextView'

const MStatusIndicator = ({ status }) => {
  if (status === 'available')
    return (
      <div className="flex flex-row items-center space-x-1">
        <CheckIcon className="h-5 w-5 text-green-500" />
        {/* <MTextView content={status} /> */}
      </div>
    )
  else if (status === 'assigned to job') {
    return (
      <div className="flex flex-row items-center space-x-1">
        <ExclamationIcon className="h-5 w-5 text-zinc-600" />
        {/* <MTextView content={status} /> */}
      </div>
    )
  } else if (status === 'not available') {
    return (
      <div className="flex flex-row items-center space-x-1">
        <BanIcon className="h-5 w-5 text-orange-500" />
        {/* <MTextView content={status} /> */}
      </div>
    )
  } else if (status === 'under maintenance') {
    return (
      <div className="flex flex-row items-center space-x-1">
        <CogIcon className="h-5 w-5 text-blue-500" />
        {/* <MTextView content={status} /> */}
      </div>
    )
  } else if (status === 'created') {
    return (
      <div className="flex flex-row items-center space-x-1">
        <PlayIcon className="h-5 w-5 text-teal-500" />
        {/* <MTextView content={status} /> */}
      </div>
    )
  } else if (status === 'stopped') {
    return (
      <div className="flex flex-row items-center space-x-1">
        <StopIcon className="h-5 w-5 text-red-500" />
        {/* <MTextView content={status} /> */}
      </div>
    )
  } else if (status === 'recalled') {
    return (
      <div className="flex flex-row items-center space-x-1">
        <ReceiptRefundIcon className="h-5 w-5 text-zinc-600" />
        {/* <MTextView content={status} /> */}
      </div>
    )
  } else {
    return (
      <div className="flex flex-row items-center space-x-1">
        <CheckIcon className="h-5 w-5 text-green-500" />
        {/* <MTextView content={status} /> */}
      </div>
    )
  }
}
export default function ProjectCard({ intent, data, icon, handleChange }) {
  function getClassFromStatus(intent) {
    if (intent == 'available') {
      return 'flex flex-col space-y-10 px-3 py-1 rounded shadow-lg ring-1 ring-zinc-200 w-full'
    } else if (intent == 'assigned to job') {
      return 'flex flex-col space-y-10 px-3 py-1 rounded bg-gray-200  w-full'
    } else if (intent == 'warning') {
      return 'flex flex-col space-y-10 px-3 py-1 rounded bg-red-200  w-full'
    } else if (intent == 'danger') {
      return 'flex flex-col space-y-10 px-3 py-1 rounded bg-red-400  w-full'
    } else if (intent == 'normal') {
      return 'flex flex-col space-y-10 px-3 py-1 rounded bg-green-200  w-full'
    } else {
      return 'flex flex-col space-y-10 px-3 py-1 rounded shadow-lg ring-1 ring-zinc-200 w-full'
    }
  }
  return (
    <div className={getClassFromStatus(intent)}>
      <div className="flex flex-row items-start justify-between py-1">
        <div className="flex flex-col">
          <div className="flex flex-row items-center space-x-3">
            <div
              className="cursor-pointer text-lg font-semibold text-gray-700"
              onClick={() => handleChange(data)}
            >
              {data.prjDescription}
            </div>
            {/* <MStatusIndicator status={data.status} /> */}
          </div>

          <div className="text-sm font-semibold text-gray-400">
            {data.customer}
          </div>
          <div className="text-sm font-semibold text-gray-500">
            {data.status}
          </div>
        </div>
        <div className="mt-1 flex flex-row space-x-3">
          <PencilAltIcon
            className={
              intent === 'available'
                ? 'h-5 w-5 cursor-pointer text-yellow-600'
                : 'h-5 w-5 cursor-pointer text-yellow-600'
            }
          />
          <FolderOpenIcon
            className={
              intent === 'available'
                ? 'h-5 w-5 cursor-pointer text-blue-500'
                : 'h-5 w-5 cursor-pointer text-blue-400'
            }
          />
        </div>
      </div>
    </div>
  )
}
