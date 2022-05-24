import React from 'react'

export default function MTextView({ content, selected }) {
  return (
    <div
      className={
        !selected
          ? 'flex text-sm font-normal text-gray-500'
          : 'flex rounded bg-slate-500 px-1 text-sm font-normal text-gray-100 transition duration-150 ease-in-out'
      }
    >
      {content}
    </div>
  )
}
