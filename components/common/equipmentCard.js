import {
  CheckIcon,
  ReceiptRefundIcon,
  StopIcon,
  ArchiveBoxXMarkIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import {
  ExclamationTriangleIcon,
  LockClosedIcon,
  ArrowsRightLeftIcon,
} from '@heroicons/react/24/solid'
import React from 'react'
import { Icon } from 'semantic-ui-react'

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
        <ExclamationTriangleIcon className="h-5 w-5 text-zinc-600" />
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
        <ArchiveBoxXMarkIcon className="h-4 w-4 text-red-300" />
        {/* <MTextView content={status} /> */}
      </div>
    )
  } else if (status === 'updating') {
    return (
      <div className="flex flex-row items-center space-x-1">
        <EllipsisHorizontalIcon className="h-5 w-5 text-gray-500" />
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
  handleDispose,
  canMoveAssets,
  handleChange,
  canCreateData,
}) {
  function getClassFromStatus(intent) {
    if (intent == 'available') {
      return 'flex flex-col space-y-10 px-3 py-1 rounded  bg-white shadow-lg ring-1 ring-zinc-200 w-full'
    } else if (intent == 'dispatched') {
      return 'flex flex-col space-y-10 px-3 py-1 rounded bg-gray-200 ring-1 ring-zinc-200 w-full'
    } else if (intent == 'disposed') {
      return 'flex flex-col space-y-10 px-3 py-1 rounded bg-red-100 ring-1 ring-red-200 w-full'
    } else if (intent == 'assigned to job') {
      return 'flex flex-col space-y-10 px-3 py-1 rounded bg-orange-50  w-full ring-1 ring-orange-200'
    } else if (intent == 'workshop') {
      return 'flex flex-col space-y-10 px-3 py-1 rounded bg-red-50  w-full ring-1 ring-red-200'
    } else if (intent == 'updating') {
      return 'flex flex-col space-y-10 px-3 py-1 rounded bg-white w-full ring-1 ring-zinc-200'
    } else if (intent == 'hired') {
      return 'flex flex-col space-y-10 px-3 py-1 rounded bg-blue-50 w-full ring-1 ring-blue-200'
    } else {
      return 'flex flex-col space-y-10 px-3 py-1 rounded shadow-lg ring-1 ring-zinc-200 w-full'
    }
  }
  return (
    <div className={getClassFromStatus(intent)}>
      <div className="grid grid-cols-3 py-1">
        <div className="col-span-2 flex flex-col">
          <div className="flex flex-row items-center">
            {canCreateData && (
              <div
                className="cursor-pointer text-lg font-semibold text-gray-700"
                onClick={() => handleChange(data)}
              >
                {data.plateNumber}
              </div>
            )}

            {!canCreateData && (
              <div
                className="text-lg font-semibold text-gray-700"
                // onClick={() => handleChange(data)}
              >
                {data.plateNumber}
              </div>
            )}

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
            {/* <PencilSquareIcon
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
              data.eqStatus !== 'disposed' &&
              data.eqStatus !== 'assigned to job' &&
              data.eqStatus !== 'dispatched' &&
              data.eqOwner === 'Construck' &&
              canMoveAssets && (
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

            {data.eqStatus === 'workshop' && canMoveAssets && (
              <div className="flex flex-col justify-between">
                <ArrowsRightLeftIcon
                  onClick={() => {
                    handleMakeAvailable(data.id)
                  }}
                  className={
                    intent === 'workshop'
                      ? 'h-5 w-5 cursor-pointer text-teal-400'
                      : 'h-5 w-5 text-teal-300'
                  }
                />

                <TrashIcon
                  onClick={() => {
                    handleDispose(data.id)
                  }}
                  className={
                    intent === 'workshop'
                      ? 'h-5 w-5 cursor-pointer text-red-400'
                      : 'h-5 w-5 text-red-300'
                  }
                />
              </div>
            )}
          </div>
        )}
        {data.eqStatus === 'updating' && (
          <div className="col-start-4 mt-1 flex flex-row space-x-1">
            <EllipsisHorizontalIcon className="h-5 w-5 text-gray-300" />
          </div>
        )}
      </div>
    </div>
  )
}
