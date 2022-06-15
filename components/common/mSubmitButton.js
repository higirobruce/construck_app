import React from 'react'
import { BadgeCheckIcon } from '@heroicons/react/outline'

export default function MSubmitButton({
  submit,
  label = 'Submit',
  icon,
  intent = '',
  disabled = false,
}) {
  function getClassByIntent(intent) {
    if (intent === 'primary') {
      return 'flex items-center justify-center space-x-1 bg-white rounded  ring-1 ring-zinc-300 shadow-sm cursor-pointer px-3 py-2  active:scale-95 hover:bg-gray-100 text-zinc-800'
    } else if (intent === 'warning') {
      return 'flex items-center justify-center space-x-1 bg-yellow-200 rounded  ring-1 ring-zinc-300 shadow-sm cursor-pointer px-3 py-2  active:scale-95 hover:bg-gray-100 text-zinc-800'
    } else if (intent === 'danger') {
      return 'flex items-center justify-center space-x-1 bg-red-200 rounded  ring-1 ring-zinc-300 shadow-sm cursor-pointer px-3 py-2  active:scale-95 hover:bg-gray-100 text-zinc-800'
    } else if (intent === 'neutral') {
      return 'flex items-center justify-center space-x-1 bg-gray-50 rounded  ring-1 ring-zinc-300 shadow-sm cursor-pointer px-3 py-2  active:scale-95 hover:bg-gray-100 text-zinc-800'
    } else if (intent === 'success') {
      return 'flex items-center justify-center space-x-1 bg-green-100 rounded  ring-1 ring-zinc-300 shadow-sm cursor-pointer px-3 py-2  active:scale-95 hover:bg-gray-100 text-zinc-800'
    } else if (intent === 'disabled') {
      return 'flex items-center justify-center space-x-1 bg-gray-100 rounded  ring-1 ring-zinc-300 shadow-sm cursor-not-allowed px-3 py-2 w-20 text-zinc-800'
    } else {
      return 'flex items-center justify-center space-x-1 bg-zinc-600 rounded  ring-1 ring-zinc-300 shadow-sm cursor-pointer px-3 py-2  active:scale-95 hover:bg-zinc-500 text-white'
    }
  }
  return (
    <button
      onClick={() => (disabled ? {} : submit())}
      className={getClassByIntent(intent)}
    >
      {icon}
      <div className="font-bold">{label}</div>
    </button>
  )
}
