import {
  ArrowDownTrayIcon,
  ReceiptRefundIcon,
  ListBulletIcon,
  CheckIcon,
  ChatBubbleBottomCenterTextIcon,
  NoSymbolIcon,
} from '@heroicons/react/24/outline'
import React from 'react'

export default function StatisticCard({
  intent,
  data,
  icon,
  canBeApproved,
  handleRelease,
}) {
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
          {canBeApproved && (
            <CheckIcon
              className="h-4 w-4 cursor-pointer text-green-500"
              onClick={() => handleRelease(data.month, data.year)}
            />
          )}

          {canBeApproved && (
            <ChatBubbleBottomCenterTextIcon className="h-4 w-4 cursor-pointer text-zinc-500" />
          )}

          {canBeApproved && (
            <NoSymbolIcon className="h-4 w-4 cursor-pointer text-red-500" />
          )}
          {/* <ListBulletIcon className="h-4 w-4 cursor-pointer text-blue-300" /> */}
          {/* <ArrowDownTrayIcon className="h-4 w-4 cursor-pointer text-blue-300" /> */}
          {data.title === 'Final Revenues' && (
            <ReceiptRefundIcon className="h-4 w-4 cursor-pointer text-green-500" />
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
