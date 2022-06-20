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
  DotsHorizontalIcon,
} from '@heroicons/react/outline'
import {
  FolderOpenIcon,
  ExclamationIcon,
  LockClosedIcon,
  SwitchHorizontalIcon,
} from '@heroicons/react/solid'
import React from 'react'
import { Icon } from 'semantic-ui-react'
import MTextView from './mTextView'

const MStatusIndicator = ({ status }) => {
  if (status === 'available')
    return (
      <div className="flex flex-row items-center space-x-1">
        <CheckIcon className="h-5 w-5 text-green-500" />
        {/* <MTextView content={status} /> */}
      </div>
    )
  else if (status === 'dispatched') {
    return (
      <div className="flex flex-row items-center space-x-1">
        <ExclamationIcon className="h-5 w-5 text-zinc-600" />
        {/* <MTextView content={status} /> */}
      </div>
    )
  } else if (status === 'assigned to job') {
    return (
      <div className="flex flex-row items-center space-x-1">
        <LockClosedIcon className="h-5 w-5 text-red-400" />
        {/* <MTextView content={status} /> */}
      </div>
    )
  } else if (status === 'workshop') {
    return (
      <div className="flex flex-row items-center space-x-1">
        <BanIcon className="h-4 w-4 text-red-300" />
        {/* <MTextView content={status} /> */}
      </div>
    )
  } else if (status === 'updating') {
    return (
      <div className="flex flex-row items-center space-x-1">
        <DotsHorizontalIcon className="h-5 w-5 text-gray-500" />
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
export default function EquipmentType({
  intent,
  data,
  icon,
  handleSendToWorkshop,
  handleMakeAvailable,
}) {
  function getClassFromStatus(intent) {
    if (intent == 'available') {
      return 'flex flex-col space-y-10 px-3 py-1 rounded  bg-white shadow-lg ring-1 ring-zinc-200 w-full'
    } else if (intent == 'dispatched') {
      return 'flex flex-col space-y-10 px-3 py-1 rounded bg-gray-200 ring-1 ring-zinc-200 w-full'
    } else if (intent == 'assigned to job') {
      return 'flex flex-col space-y-10 px-3 py-1 rounded bg-orange-50  w-full ring-1 ring-orange-200'
    } else if (intent == 'workshop') {
      return 'flex flex-col space-y-10 px-3 py-1 rounded bg-red-50  w-full ring-1 ring-red-200'
    } else if (intent == 'updating') {
      return 'flex flex-col space-y-10 px-3 py-1 rounded bg-white w-full ring-1 ring-zinc-200'
    } else {
      return 'flex flex-col space-y-10 px-3 py-1 rounded shadow-lg ring-1 ring-zinc-200 w-full'
    }
  }
  return (
    <div className={getClassFromStatus(intent)}>
      <div className="grid grid-cols-3 py-1">
        <div className="col-span-2 flex flex-col">
          <div className="flex flex-row items-center">
            <div className="text-lg font-semibold text-gray-700">
              {data.plateNumber}
            </div>
            {/* <MStatusIndicator status={data.eqStatus} /> */}
          </div>

          <div className="text-sm font-semibold text-gray-400">
            {data.description}
          </div>
          <div className="text-sm font-semibold text-gray-500">
            {data.eqType + ' - ' + data.eqOwner}
          </div>
        </div>
        {data.eqStatus !== 'updating' && (
          <div className="col-start-4 mt-1 flex flex-row space-x-1">
            {/* <PencilAltIcon
            className={
              intent === 'available'
                ? 'h-5 w-5 cursor-pointer self-end text-yellow-600'
                : 'h-5 w-5 text-zinc-300'
            }
          />
          <FolderOpenIcon
            className={
              intent === 'available'
                ? 'h-5 w-5 cursor-pointer text-blue-500'
                : 'h-5 w-5 text-zinc-300'
            }
          /> */}
            {data.eqStatus !== 'workshop' &&
              data.eqStatus !== 'assigned to job' &&
              data.eqStatus !== 'dispatched' &&
              data.eqOwner === 'Construck' && (
                // <CogIcon
                //   onClick={() => {
                //     handleSendToWorkshop(data.id)
                //   }}
                //   className={
                //     intent === 'available'
                //       ? 'h-5 w-5 cursor-pointer text-red-400'
                //       : 'h-5 w-5 text-red-300'
                //   }
                // />

                <Icon
                  name="wrench"
                  className="h-5 w-5 cursor-pointer text-red-400"
                  onClick={() => {
                    handleSendToWorkshop(data.id)
                  }}
                />
              )}

            {data.eqStatus === 'workshop' && (
              <SwitchHorizontalIcon
                onClick={() => {
                  handleMakeAvailable(data.id)
                }}
                className={
                  intent === 'workshop'
                    ? 'h-5 w-5 cursor-pointer text-teal-400'
                    : 'h-5 w-5 text-teal-300'
                }
              />
            )}
          </div>
        )}
        {data.eqStatus === 'updating' && (
          <div className="col-start-4 mt-1 flex flex-row space-x-1">
            <DotsHorizontalIcon className="h-5 w-5 text-gray-300" />
          </div>
        )}
      </div>
    </div>
  )
}
