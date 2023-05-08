import { DatePicker, Tooltip } from 'antd'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { Dropdown, Loader } from 'semantic-ui-react'
import MTextView from './mTextView'
import MLable from './mLabel'
import TextInput from './TextIput'
import TextInputLogin from './TextIputLogin'
import TextInputV from './TextIputV'
import SmallTextInput from './mSmallTextIput'
import * as _ from 'lodash'

import { toast, ToastContainer } from 'react-toastify'
import {
  ArrowPathIcon,
  CheckBadgeIcon,
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

const MStatusIndicator = ({ status }) => {
  if (status === 'approved')
    return (
      <Tooltip title={status}>
        <div className="flex flex-row items-center justify-center">
          <CheckIcon className="h-5 w-5 text-green-500" />
          {/* <MTextView content={status} /> */}
        </div>
      </Tooltip>
    )
  else if (status === 'rejected' || status === 'declined') {
    return (
      <Tooltip title={status}>
        <div className="flex flex-row items-center justify-center">
          <XMarkIcon className="h-5 w-5 text-red-500" />
          {/* <MTextView content={status} /> */}
        </div>
      </Tooltip>
    )
  } else if (status === 'validated') {
    return (
      <Tooltip title={status}>
        <div className="flex flex-row items-center justify-center">
          <ShieldCheckIcon className="h-5 w-5 text-green-500" />
          {/* <MTextView content={status} /> */}
        </div>
      </Tooltip>
    )
  } else if (status === 'in progress' || status === 'on going') {
    return (
      <Tooltip title={status}>
        <div className="flex flex-row items-center justify-center">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
          {/* <MTextView content={status} /> */}
        </div>
      </Tooltip>
    )
  } else if (status === 'checked') {
    return (
      <Tooltip title={status}>
        <div className="flex flex-row items-center justify-center">
          <ExclamationCircleIcon className="h-5 w-5 text-blue-500" />
          {/* <MTextView content={status} /> */}
        </div>
      </Tooltip>
    )
  } else if (status === 'created') {
    return (
      <Tooltip title={status}>
        <div className="flex flex-row items-center justify-center">
          <PlayIcon className="h-5 w-5 text-teal-500" />
          {/* <MTextView content={status} /> */}
        </div>
      </Tooltip>
    )
  } else if (status === 'stopped') {
    return (
      <Tooltip title={status}>
        <div className="flex flex-row items-center justify-center">
          <StopIcon className="h-5 w-5 text-red-500" />
          {/* <MTextView content={status} /> */}
        </div>
      </Tooltip>
    )
  } else if (status === 'recalled') {
    return (
      <Tooltip title={status}>
        <div className="flex flex-row items-center justify-center">
          <ReceiptRefundIcon className="h-5 w-5 text-zinc-600" />
          {/* <MTextView content={status} /> */}
        </div>
      </Tooltip>
    )
  } else {
    return (
      <div className="flex flex-row items-center justify-center">
        <Loader active size="tiny" inline />
        {/* <MTextView content={status} /> */}
      </div>
    )
  }
}
export default function ModalApprovalRejections({
  isShown,
  setIsShown,
  title,
  body,
  handleConfirm,
  data,
}) {
  let [workDetails, setWorkDetails] = useState(data)
  let [selectedWork, setSelectedWork] = useState(null)
  let [pendingConfirmation, setPendingConfirmation] = useState('')
  let { user, setUser } = useContext(UserContext)
  let url = process.env.NEXT_PUBLIC_BKEND_URL
  let apiUsername = process.env.NEXT_PUBLIC_API_USERNAME
  let apiPassword = process.env.NEXT_PUBLIC_API_PASSWORD

  function validate(work, isSiteWork, dailyWorkIndex, workIndex) {
    let _work = workDetails[workIndex]
    let _siteWorkDetails = [...workDetails]

    if (isSiteWork) {
      let _dailyWork = _work.dailyWork[dailyWorkIndex]
      _dailyWork.toConfirm = true

      _siteWorkDetails[workIndex] = _work

      setWorkDetails(_siteWorkDetails)
      setSelectedWork({
        id: work._id,
        postingDate: _dailyWork.date,
        approvedBy: user._id,
        approvedRevenue: _dailyWork.totalRevenue,
        approvedDuration: _dailyWork.duration,
        approvedExpenditure: _dailyWork.totalExpenditure,
      })
      setPendingConfirmation('validate')
      // console.log(work?.dailyWork[dailyWorkIndex])
    } else {
      // console.log(work)
      _work.toConfirm = true

      _siteWorkDetails[workIndex] = _work
      setWorkDetails(_siteWorkDetails)
      setSelectedWork({
        id: work._id,
        postingDate: _work.dispatch?.date,
        approvedBy: user._id,
        approvedRevenue: _work.approvedRevenue,
        approvedDuration: _work.approvedDuration,
        approvedExpenditure: _work.approvedExpenditure,
      })
      setPendingConfirmation('validate')
    }
  }

  function discard(work, isSiteWork, dailyWorkIndex, workIndex) {
    let _work = workDetails[workIndex]
    let _siteWorkDetails = [...workDetails]
    // console.log(ogWorkDetails)

    if (isSiteWork) {
      let _dailyWork = _work.dailyWork[dailyWorkIndex]
      _dailyWork.toConfirm = false
      _dailyWork.confirming = false

      _siteWorkDetails[workIndex] = _work

      setWorkDetails(_siteWorkDetails)

      // console.log(work?.dailyWork[dailyWorkIndex])
    } else {
      // console.log(work)
      _work.toConfirm = false
      _work.confirming = false

      _siteWorkDetails[workIndex] = _work
      setWorkDetails(_siteWorkDetails)
    }

    setPendingConfirmation('')
  }

  function confirm(work, isSiteWork, dailyWorkIndex, workIndex) {
    if (pendingConfirmation === 'validate') {
      let _work = workDetails[workIndex]
      let _siteWorkDetails = [...workDetails]
      let id = _work._id

      if (isSiteWork) {
        let _dailyWork = _work.dailyWork[dailyWorkIndex]
        _dailyWork.confirming = true
        _siteWorkDetails[workIndex] = _work
        setWorkDetails(_siteWorkDetails)

        fetch(`${url}/works/validateDailyWork/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
          },
          body: JSON.stringify(selectedWork),
        })
          .then((res) => res.json())
          .then((res) => {
            let _work2 = workDetails[workIndex]
            let _siteWorkDetails2 = [...workDetails]
            let _dailyWork2 = _work2.dailyWork[dailyWorkIndex]
            _dailyWork2.confirming = false
            _dailyWork2.toConfirm = false
            _dailyWork2.status = 'validated'
            _siteWorkDetails2[workIndex] = _work2
            setWorkDetails(_siteWorkDetails2)
          })
      } else {
        _work.confirming = true
        _siteWorkDetails[workIndex] = _work
        setWorkDetails(_siteWorkDetails)

        fetch(`${url}/works/validateWork/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
          },
          body: JSON.stringify(selectedWork),
        })
          .then((res) => res.json())
          .then((res) => {
            let _work2 = workDetails[workIndex]
            let _siteWorkDetails2 = [...workDetails]
            _work2.confirming = false
            _work2.toConfirm = false
            _work2.status = 'validated'
            _siteWorkDetails2[workIndex] = _work2
            setWorkDetails(_siteWorkDetails2)
          })
      }
    }
  }

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
            className="my-20 inline-block w-full transform overflow-auto rounded-lg bg-white p-8 px-10 text-left shadow-xl transition-all 2xl:max-w-7xl"
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
            {workDetails && workDetails.length > 0 && (
              <div className="flex flex-col rounded-lg ring-1 ring-gray-100">
                {workDetails.map((detail, workIndex) => {
                  if (detail.siteWork)
                    return (
                      detail.siteWork &&
                      detail.dailyWork.map((d, index) => {
                        return (
                          d.status &&
                          // d.status !== 'validated' &&
                          d.status !== 'released' && (
                            <div
                              key={d.date}
                              className="grid grid-cols-7 rounded p-3 shadow-sm"
                            >
                              {/* <div>{d.date}</div> */}
                              <MTextView
                                content={
                                  d.date +
                                  '-' +
                                  detail?.dispatch?.shift
                                    ?.substring(0, 1)
                                    .toUpperCase()
                                }
                              />
                              <div className="flex flex-col">
                                <MTextView
                                  content={detail?.equipment?.plateNumber}
                                />

                                <div className="text-xs text-gray-400">
                                  {detail?.equipment?.eqDescription}
                                </div>
                              </div>

                              <MTextView
                                content={
                                  (d.uom === 'day'
                                    ? d.duration
                                    : _.round(
                                        d.duration / (1000 * 60 * 60),
                                        2
                                      )) +
                                  d.uom +
                                  's'
                                }
                              />
                              {/* <div>
                                {d.uom === 'day'
                                  ? d.duration
                                  : _.round(d.duration / (1000 * 60 * 60), 2)}
                                {' ' + d.uom + 's'}
                              </div> */}
                              <div className="flex flex-col">
                                <MTextView
                                  content={
                                    detail?.driver?.firstName 
                                  }
                                />
                                <div className="font-mono text-xs">
                                  {detail?.driver?.phone}
                                </div>
                              </div>
                              <MTextView
                                content={
                                  'RWF ' + d.totalRevenue?.toLocaleString()
                                }
                              />
                              <div className="flex flex-col">
                                <MTextView content={d.status} />
                                <div className="font-mono text-xs">
                                  {d.rejectedReason
                                    ? 'Reason: ' + d.rejectedReason
                                    : ''}
                                </div>
                              </div>
                              {!d.toConfirm && d.status !== 'validated' && (
                                <div className="flex flex-row items-center space-x-3">
                                  {d.status === 'approved' && (
                                    <MSmallSubmitButton
                                      label="validate"
                                      intent="success"
                                      submit={() =>
                                        validate(detail, true, index, workIndex)
                                      }
                                    />
                                  )}

                                  {d.status === 'rejected' && (
                                    <MSmallSubmitButton
                                      label="objection"
                                      intent="danger"
                                      submit={() => {}}
                                    />
                                  )}
                                </div>
                              )}

                              {d.toConfirm && !d.confirming && (
                                <div className="flex flex-row items-center space-x-3">
                                  <MSmallSubmitButton
                                    label="confirm"
                                    submit={() =>
                                      confirm(detail, true, index, workIndex)
                                    }
                                  />

                                  <MSmallSubmitButton
                                    label="discard"
                                    intent="danger"
                                    submit={() =>
                                      discard(detail, true, index, workIndex)
                                    }
                                  />
                                </div>
                              )}

                              {d.confirming && (
                                <div className="flex flex-row items-center space-x-3">
                                  <Loader size="tiny" active inline />
                                </div>
                              )}

                              {d.status === 'validated' && (
                                <div className="flex flex-row items-center space-x-3">
                                  <MStatusIndicator status={d.status} />
                                </div>
                              )}
                            </div>
                          )
                        )
                      })
                    )

                  if (!detail.siteWork)
                    return (
                      detail.status && (
                        <div
                          key={detail._id}
                          className="grid grid-cols-7 rounded p-3 shadow-sm"
                        >
                          <MTextView
                            content={
                              moment(detail?.dispatch?.date).format(
                                'DD-MMM-YYYY'
                              ) +
                              '-' +
                              detail?.dispatch?.shift
                                ?.substring(0, 1)
                                .toUpperCase()
                            }
                          />

                          <div className="flex flex-col">
                            <MTextView
                              content={detail?.equipment?.plateNumber}
                            />

                            <div className="text-xs text-gray-400">
                              {detail?.equipment?.eqDescription}
                            </div>
                          </div>

                          <MTextView
                            content={
                              detail.status === 'rejected'
                                ? (detail.equipment.uom === 'day'
                                    ? detail.rejectedDuration
                                    : _.round(
                                        detail.rejectedDuration /
                                          (1000 * 60 * 60),
                                        2
                                      )) +
                                  detail.equipment.uom +
                                  's'
                                : (detail.equipment.uom === 'day'
                                    ? detail.approvedDuration
                                    : _.round(
                                        detail.approvedDuration /
                                          (1000 * 60 * 60),
                                        2
                                      )) +
                                  detail.equipment.uom +
                                  's'
                            }
                          />

                          <div className="flex flex-col">
                            <MTextView
                              content={
                                detail?.driver?.firstName
                              }
                            />
                            <div className="font-mono text-xs">
                              {detail?.driver?.phone}
                            </div>
                          </div>

                          <MTextView
                            content={
                              'RWF ' +
                              (detail.status === 'rejected'
                                ? detail.rejectedRevenue?.toLocaleString()
                                : detail.approvedRevenue?.toLocaleString())
                            }
                          />

                          <div className="flex flex-col">
                            <MTextView content={detail.status} />
                            <div className="font-mono text-xs">
                              {detail.rejectedReason
                                ? 'Reason: ' + detail.rejectedReason
                                : ''}
                            </div>
                          </div>

                          {!detail.toConfirm && detail.status !== 'validated' && (
                            <div className="flex flex-row items-center space-x-3">
                              {detail.status === 'approved' && (
                                <MSmallSubmitButton
                                  label="validate"
                                  intent="success"
                                  submit={() =>
                                    validate(detail, false, 0, workIndex)
                                  }
                                />
                              )}

                              {detail.status === 'rejected' && (
                                <MSmallSubmitButton
                                  label="objection"
                                  intent="danger"
                                  submit={() => {}}
                                />
                              )}
                            </div>
                          )}

                          {detail.toConfirm && !detail.confirming && (
                            <div className="flex flex-row items-center space-x-3">
                              <MSmallSubmitButton
                                label="confirm"
                                submit={() =>
                                  confirm(detail, false, 0, workIndex)
                                }
                              />

                              <MSmallSubmitButton
                                label="dicard"
                                intent="danger"
                                submit={() =>
                                  discard(detail, false, 0, workIndex)
                                }
                              />
                            </div>
                          )}

                          {detail.confirming && (
                            <div className="flex flex-row items-center space-x-3">
                              <Loader size="tiny" active inline />
                            </div>
                          )}

                          {detail.status === 'validated' && (
                            <div className="flex flex-row items-center space-x-3">
                              <MStatusIndicator status={detail.status} />
                            </div>
                          )}
                        </div>
                      )
                    )
                })}
              </div>
            )}

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
