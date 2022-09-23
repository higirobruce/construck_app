import React from 'react'
import { BadgeCheckIcon } from '@heroicons/react/24/outline'

export default function MSmallSubmitButton({
  submit,
  label = 'Submit',
  icon,
  intent = '',
  disabled = false,
}) {
  function getClassByIntent(intent) {
    if (intent === 'primary') {
      return 'flex items-center justify-center space-x-1 bg-white rounded  ring-1 ring-zinc-300 shadow-sm cursor-pointer px-1 py-1 text-zinc-800'
    } else if (intent === 'warning') {
      return 'flex items-center justify-center space-x-1 bg-yellow-200 rounded  ring-1 ring-zinc-300 shadow-sm cursor-pointer px-1 py-1 text-zinc-800'
    } else if (intent === 'danger') {
      return 'flex items-center justify-center space-x-1 bg-red-200 rounded  ring-1 ring-zinc-300 shadow-sm cursor-pointer px-1 py-1 text-black'
    } else if (intent === 'neutral') {
      return 'flex items-center justify-center space-x-1 bg-gray-50 rounded  ring-1 ring-zinc-300 shadow-sm cursor-pointer px-1 py-1 text-zinc-800'
    } else if (intent === 'success') {
      return 'flex items-center justify-center space-x-1 bg-green-100 rounded  ring-1 ring-zinc-300 shadow-sm cursor-pointer px-1 py-1 text-zinc-800'
    } else if (intent === 'disabled') {
      return 'flex items-center justify-center space-x-1 bg-gray-100 rounded  ring-1 ring-zinc-300 shadow-sm cursor-not-allowed px-1 py-1 w-20 text-zinc-800'
    } else {
      return 'flex items-center justify-center space-x-1 bg-white rounded  ring-1 ring-zinc-300 shadow-sm cursor-pointer px-1 py-1 text-zinc-800'
    }
  }
  return (
    <button
      onClick={() => (disabled ? {} : submit())}
      className={getClassByIntent(intent)}
    >
      {icon}
      <div className="text-xs font-semibold">{label}</div>
    </button>
  )
}
