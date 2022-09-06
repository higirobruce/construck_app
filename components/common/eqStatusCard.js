import {
  ReceiptRefundIcon,
  DocumentArrowDownTrayIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline'
import { DocumentReportIcon } from '@heroicons/react/24/solid'
import React from 'react'

export default function EqStatusCard({ intent, data, icon, onClick }) {
  function getClassFromIntent(intent) {
    if (intent == 'available') {
      return 'flex flex-col space-y-1 py-1 px-3 rounded shadow-lg ring-1 ring-green-300 text-zinc-600 w-36 cursor-pointer'
    } else if (intent == 'dispatched') {
      return 'flex flex-col space-y-1 py-1 px-3 rounded shadow-lg ring-1 ring-zinc-300 text-zinc-600 w-36 cursor-pointer'
    } else if (intent == 'standby') {
      return 'flex flex-col space-y-1 py-1 px-3 rounded shadow-lg ring-1 ring-sky-300 text-zinc-600 w-36 cursor-pointer'
    } else if (intent == 'workshop') {
      return 'flex flex-col space-y-1 py-1 px-3 rounded shadow-lg ring-1 ring-red-300 text-zinc-600 w-36 cursor-pointer'
    } else if (intent == 'disposed') {
      return 'flex flex-col space-y-1 py-1 px-3 rounded shadow-lg ring-1 ring-red-300 text-zinc-600 w-36 cursor-pointer'
    } else if (intent == 'technicalInsp') {
      return 'flex flex-col space-y-1 py-1 px-3 rounded shadow-lg ring-1 ring-yellow-300 text-zinc-600 w-36 cursor-pointer'
    } else {
      return 'flex flex-col space-y-1 py-1 px-3 rounded ring-zinc-200 text-zinc-300 w-36 cursor-pointer'
    }
  }
  return (
    <div className={getClassFromIntent(intent)} onClick={onClick}>
      <div className="flex flex-row justify-between">
        <div className="text-lg font-medium">{data.title}</div>
      </div>
      <div className="flex flex-row items-center justify-between text-base">
        <div>{icon}</div>
        <div>{data.content}</div>
      </div>
    </div>
  )
}
