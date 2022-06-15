import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import MTextView from './mTextView'
import TextInput from './TextIput'
import TextInputLogin from './TextIputLogin'
import TextInputV from './TextIputV'

export default function Modal({
  isShown,
  setIsShown,
  title,
  body,
  handleConfirm,
  type,
  handleReasonChange,
  handleSetEndIndex,
  handleSetStartIndex,
  handleSetDuration,
  handleSetTripsDone,
  handleSetComment,
  handleSetReason,
  reasons,
  rowData,
  showReasonField,
}) {
  let [lEndIndex, setLEndIndex] = useState(0)
  let uom = rowData?.equipment?.uom

  return (
    <div>
      <div
        x-show={isShown}
        className="fixed inset-0 mx-auto h-screen overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex min-h-screen items-end justify-center px-4 text-center sm:block sm:p-0 md:items-center">
          <div
            x-cloak
            onClick={() => setIsShown(false)}
            x-show={isShown}
            x-transitionEnter="transition ease-out duration-300 transform"
            x-transitionEnter-start="opacity-0"
            x-transitionEnter-end="opacity-100"
            x-transitionLeave="transition ease-in duration-200 transform"
            x-transitionLeave-start="opacity-100"
            x-transitionLeave-end="opacity-0"
            className="fixed inset-0 bg-gray-500 bg-opacity-40 transition-opacity"
            aria-hidden="true"
          ></div>

          <div
            x-cloak
            x-show={isShown}
            x-transitionEnter="transition ease-out duration-300 transform"
            x-transitionEnter-start="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            x-transitionEnter-end="opacity-100 translate-y-0 sm:scale-100"
            x-transitionLeave="transition ease-in duration-200 transform"
            x-transitionLeave-start="opacity-100 translate-y-0 sm:scale-100"
            x-transitionLeave-end="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            className="my-20 inline-block w-full max-w-xl transform overflow-auto rounded-lg bg-white p-8 text-left shadow-xl transition-all 2xl:max-w-2xl"
          >
            <div className="flex items-center justify-between space-x-4">
              <div className="text-2xl font-semibold">{title}</div>
              <button
                onClick={() => setIsShown(false)}
                className="text-gray-600 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>

            <p className="mt-10 text-sm text-gray-500">{body}</p>

            {type === 'reject' && (
              <div className="mb-3 xl:w-96">
                <label
                  for="exampleFormControlTextarea1"
                  className="form-label mb-2 inline-block text-gray-700"
                >
                  Reason of rejection
                </label>
                <textarea
                  onChange={(e) => handleReasonChange(e.target.value)}
                  className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition
        ease-in-out
        focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Your message"
                ></textarea>
              </div>
            )}

            {type === 'stop' && (
              <div className="grid grid-cols-2 gap-x-2">
                <div className="mb-3 flex flex-col space-y-4">
                  <TextInputLogin
                    label={`End Index [from ${rowData?.startIndex}]`}
                    placeholder="0"
                    setValue={handleSetEndIndex}
                    type="number"
                    isRequired
                  />

                  <TextInputLogin
                    label="Duration (Hrs)"
                    placeholder="0"
                    setValue={handleSetDuration}
                    type="number"
                    isRequired
                  />

                  {parseInt(rowData.dispatch?.targetTrips) > 0 && (
                    <TextInputLogin
                      label={
                        `Trips done out of ` + rowData.dispatch?.targetTrips
                      }
                      placeholder="0"
                      setValue={handleSetTripsDone}
                      type="number"
                    />
                  )}

                  {/* <TextInputLogin
                  label="Comment"
                  placeholder="0"
                  setValue={handleSetComment}
                  type="text"
                /> */}
                </div>

                {showReasonField && (
                  <div className="flex flex-col">
                    <div className="mb-1 flex flex-row items-center">
                      <MTextView content="Reason" />
                    </div>
                    <Dropdown
                      options={reasons}
                      placeholder="Select reason"
                      search
                      compact
                      selection
                      onChange={(e, data) => {
                        handleSetReason(data.value)
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {type === 'start' && (
              <div className="grid grid-cols-2 gap-x-2">
                <div className="mb-3 flex flex-col space-y-4">
                  <TextInputLogin
                    label={`Start Index`}
                    placeholder="0"
                    setValue={handleSetStartIndex}
                    type="number"
                    isRequired
                  />
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-row justify-end space-x-5">
              <button
                onClick={() => {
                  setIsShown(false)
                }}
                type="button"
                className="transform rounded-md bg-white px-3 py-2 text-sm capitalize tracking-wide text-zinc-800 ring-1 ring-gray-200 transition-colors duration-200 hover:bg-gray-50 focus:bg-white focus:outline-none focus:ring focus:ring-zinc-300 focus:ring-opacity-50 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:bg-sky-700"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleConfirm()
                  setIsShown(false)
                }}
                type="button"
                className="transform rounded-md bg-red-400 px-3 py-2 text-sm capitalize tracking-wide text-white transition-colors duration-200 hover:bg-red-600 focus:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:bg-zinc-700"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
