import { DatePicker, Tooltip } from 'antd'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { Dropdown, Loader } from 'semantic-ui-react'
import MTextView from './mTextView'
import TextInput from './TextIput'
import TextInputLogin from './TextIputLogin'
import TextInputV from './TextIputV'
import SmallTextInput from './mSmallTextIput'
import * as _ from 'lodash'

import { toast, ToastContainer } from 'react-toastify'
import {
  ArrowPathIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  ClockIcon,
  EllipsisHorizontalIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  HandThumbUpIcon,
  PlayIcon,
  ReceiptRefundIcon,
  StopIcon,
} from '@heroicons/react/24/outline'
import {
  CheckIcon,
  ShieldCheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid'
import CheckableTag from 'antd/lib/tag/CheckableTag'
import MSmallSubmitButton from './mSmallSubmitButton'
import { UserContext } from '../../contexts/UserContext'
import StatisticCard from './statisticCard'

export default function ModalReleased({
  isShown,
  setIsShown,
  title,
  body,
  handleConfirm,
  data,
}) {
  let { user, setUser } = useContext(UserContext)
  let url = process.env.NEXT_PUBLIC_BKEND_URL
  let apiUsername = process.env.NEXT_PUBLIC_API_USERNAME
  let apiPassword = process.env.NEXT_PUBLIC_API_PASSWORD

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
            onClick={() => {
              setIsShown(false)
            }}
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
            x-transitionEnter-start="opacity-0 trangray-y-4 sm:trangray-y-0 sm:scale-95"
            x-transitionEnter-end="opacity-100 trangray-y-0 sm:scale-100"
            x-transitionLeave="transition ease-in duration-200 transform"
            x-transitionLeave-start="opacity-100 trangray-y-0 sm:scale-100"
            x-transitionLeave-end="opacity-0 trangray-y-4 sm:trangray-y-0 sm:scale-95"
            className="my-20 inline-block w-full max-w-xl transform overflow-auto rounded-lg bg-white p-8 text-left shadow-xl transition-all 2xl:max-w-5xl"
          >
            <div className="mb-5 flex items-center justify-between space-x-4">
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

            {/* Body */}
            <div className="grid grid-cols-5 gap-3">
              {data?.map(($) => {
                return (
                  <StatisticCard
                    // intent="danger"
                    data={{
                      title: $['monthYear'],
                      content: `RWF ${$['totalRevenue']}`,
                    }}
                    icon={<BanknotesIcon className="h-5 w-5 text-blue-500" />}
                  />
                )
              })}
            </div>
            {/* Footer */}
            <div className="mt-6 flex flex-row justify-end space-x-5">
              <button
                onClick={() => {
                  setIsShown(false)
                }}
                type="button"
                className="transform rounded-md bg-white px-3 py-2 text-sm capitalize tracking-wide text-zinc-800 ring-1 ring-gray-200 transition-colors duration-200 hover:bg-gray-50 focus:bg-white focus:outline-none focus:ring focus:ring-zinc-300 focus:ring-opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  // handleConfirm()
                  setIsShown(false)
                }}
                type="button"
                className="transform rounded-md bg-red-400 px-3 py-2 text-sm capitalize tracking-wide text-white transition-colors duration-200 hover:bg-red-600 focus:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:bg-zinc-700"
              >
                Ok
              </button>
            </div>
            {/* <ToastContainer /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
