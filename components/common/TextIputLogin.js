import React from 'react'
import MLable from './mLabel'
import MTextView from './mTextView'

export default function TextInputLogin({
  label,
  setValue,
  placeholder,
  value,
  index,
  type,
  isPassword = false,
  isRequired = false,
}) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-1 flex-row items-center">
        <MTextView content={label} />
        {isRequired && <div className="text-sm text-red-600">*</div>}
      </div>
      <input
        required={isRequired}
        className="mt-1 rounded-sm border-gray-100 py-2.5 px-3 text-sm font-medium shadow-none ring-1 ring-gray-200 transition duration-200 ease-in-out hover:ring-1 hover:ring-gray-400 focus:outline-none focus:ring-blue-300"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        type={isPassword ? `password` : type}
        placeholder={placeholder}
      />
    </div>
  )
}
