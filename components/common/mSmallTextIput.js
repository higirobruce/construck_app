import React from 'react'
import MLable from './mLabel'
import MTextView from './mTextView'

export default function SmallTextInput({
  label,
  setValue,
  placeholder,
  value,
  isRequired,
  index,
}) {
  return (
    <>
      <div className="flex flex-row items-center">
        <MTextView content={label} />
        {isRequired && <div className="text-red-600">*</div>}
      </div>
      <input
        className="w-56 rounded-sm border-b-2 border-gray-300 px-3 text-sm font-medium shadow-none transition duration-200 ease-in-out focus:outline-none focus:ring-gray-400"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        autoFocus
        placeholder={placeholder}
      />
    </>
  )
}
