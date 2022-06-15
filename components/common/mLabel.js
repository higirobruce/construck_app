import React from 'react'

export default function MLable({ content }) {
  return (
    <div className="ml-5 flex cursor-pointer items-center justify-center overflow-hidden text-ellipsis rounded-md bg-gray-700 px-1 text-xs font-semibold text-white shadow-md">
      {content}
    </div>
  )
}
