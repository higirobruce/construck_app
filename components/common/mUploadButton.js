import React from 'react'
import { BadgeCheckIcon, ArrowUpTrayIcon } from '@heroicons/react/outline'

export default function MUploadButton2({ label }) {
  return (
    <div className="mt-3 flex h-10 w-32 cursor-pointer items-center justify-center space-x-2 rounded-full bg-blue-400 p-2 shadow-md hover:shadow-sm active:scale-95 active:shadow-sm">
      <ArrowUpTrayIcon className="h-5 w-5 text-white" />
      <div className="font-bold text-white">Upload</div>
    </div>
  )
}
