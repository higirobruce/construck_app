import React from "react";
import MLable from "./mLabel";
import MTextView from "./mTextView";

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
        className="w-56 focus:outline-none ring-1 hover:ring-1 hover:ring-gray-400 focus:ring-gray-400 ring-gray-200 py-3 px-3 text-sm font-medium shadow-none rounded-sm border-gray-100 mt-1 mb-3 transition duration-200 ease-in-out"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={placeholder}
      />
    </>
  );
}
