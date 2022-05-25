import { useContext, useState } from 'react'
import {
  CashIcon,
  DotsHorizontalIcon,
  PrinterIcon,
  ReceiptRefundIcon,
} from '@heroicons/react/solid'
import {
  CheckIcon,
  ExclamationIcon,
  ExclamationCircleIcon,
  XIcon,
  PauseIcon,
} from '@heroicons/react/solid'
import React from 'react'
import { Table } from 'semantic-ui-react'
import MTextView from './mTextView'
import MLable from './mLabel'
import MPagination from './pagination'
import { paginate } from '../../utils/paginate'
import { UserContext } from '../../contexts/UserContext'
import _ from 'lodash'
import {
  ClipboardCheckIcon,
  ClipboardIcon,
  PlayIcon,
  StopIcon,
  SwitchVerticalIcon,
} from '@heroicons/react/outline'
import { ResponsiveWrapper } from '@nivo/core'
import { Tooltip } from 'antd'

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
  else if (status === 'rejected') {
    return (
      <Tooltip title={status}>
        <div className="flex flex-row items-center justify-center">
          <XIcon className="h-5 w-5 text-red-500" />
          {/* <MTextView content={status} /> */}
        </div>
      </Tooltip>
    )
  } else if (status === 'in progress') {
    return (
      <Tooltip title={status}>
        <div className="flex flex-row items-center justify-center">
          <ExclamationIcon className="h-5 w-5 text-yellow-500" />
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
      <Tooltip title={status}>
        <div className="flex flex-row items-center justify-center">
          <DotsHorizontalIcon className="h-5 w-5 text-gray-200" />
          {/* <MTextView content={status} /> */}
        </div>
      </Tooltip>
    )
  }
}

const getDuration = (startTime, duration) => {
  if (duration === 0 || !duration) {
    return Date.now() - new Date(startTime)
  } else {
    return duration
  }
}

function msToTime(duration) {
  var milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
    days = Math.floor(duration / (1000 * 60 * 60 * 24))

  days = days >= 1 ? days + 'days ' : ''
  hours = hours >= 1 ? +hours + 'hrs ' : ''
  minutes = minutes >= 1 ? minutes + 'min ' : ''
  seconds = seconds >= 1 ? seconds + 'sec.' : ''

  if (duration === 0 || (!days && !hours && !minutes)) return '...'
  else return days + hours + minutes
}

export default function WorkListTable({
  data,
  handelApprove,
  handelReject,
  handelRecall,
  handleOrder,
  handleSelect,
  handleDeselect,
}) {
  const [pageSize, setPageSize] = useState(10)
  const [pageNumber, setPageNumber] = useState(1)
  const { user, setUser } = useContext(UserContext)

  function handlePageChange(e, data) {
    console.log(data)
    setPageNumber(data.activePage)
  }

  let pData = paginate(data, pageNumber, pageSize)

  if (user.userType === 'customer') {
    let _pData = data.filter((p) => {
      return p.project?.customer === user.company?.name
    })
    data = _pData
    pData = paginate(_pData, pageNumber, pageSize)
  } else if (user.userType === 'driver') {
    let _pData = data.filter((p) => {
      return p.driver?._id === user._id
    })
    data = _pData
    pData = paginate(_pData, pageNumber, pageSize)
  }

  return (
    <div className="hidden md:block">
      {pData.length > 0 && (
        <>
          <Table size="small">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <div
                    className="flex cursor-pointer flex-row items-center space-x-1"
                    onClick={() => handleOrder('byDate')}
                  >
                    <div>Date</div>
                    <SwitchVerticalIcon className="h-4 w-4" />
                  </div>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <div
                    className="flex cursor-pointer flex-row items-center space-x-1"
                    onClick={() => handleOrder('by project')}
                  >
                    <div>Project Name</div>
                    <SwitchVerticalIcon className="h-4 w-4" />
                  </div>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <div className="w-30 truncate">Plate number</div>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <div className="w-20 truncate">Equipment type</div>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <div className="w-20 truncate">Work done</div>
                </Table.HeaderCell>
                <Table.HeaderCell>Duration</Table.HeaderCell>
                <Table.HeaderCell>Rate</Table.HeaderCell>
                <Table.HeaderCell>
                  <div
                    className="flex cursor-pointer flex-row items-center space-x-1"
                    onClick={() => handleOrder('byTotalAmount')}
                  >
                    <div>Total Amount</div>
                    <SwitchVerticalIcon className="h-4 w-4" />
                  </div>
                </Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>
                  <div
                    className="flex cursor-pointer flex-row items-center space-x-1"
                    onClick={() => handleOrder('byDriver')}
                  >
                    <div>Driver</div>
                    <SwitchVerticalIcon className="h-4 w-4" />
                  </div>
                </Table.HeaderCell>
                <Table.HeaderCell>Target Trips</Table.HeaderCell>
                <Table.HeaderCell>
                  <div
                    className="flex cursor-pointer flex-row items-center space-x-1"
                    onClick={() => handleOrder('byTripsDone')}
                  >
                    <div>Trips Done</div>
                    <SwitchVerticalIcon className="h-4 w-4" />
                  </div>
                </Table.HeaderCell>
                <Table.HeaderCell>Customer</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
                {/* <Table.HeaderCell>Created on</Table.HeaderCell>
            <Table.HeaderCell>Created by</Table.HeaderCell>
            <Table.HeaderCell>Permit</Table.HeaderCell>
            <Table.HeaderCell>Duration</Table.HeaderCell> */}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {pData.map((row, index) => {
                return (
                  <Table.Row key={row._id}>
                    <Table.Cell>
                      <MTextView
                        content={new Date(row.createdOn).toLocaleDateString()}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <MTextView content={row.project?.prjDescription} />
                    </Table.Cell>

                    <Table.Cell>
                      <MTextView content={row.equipment?.plateNumber} />
                    </Table.Cell>
                    <Table.Cell>
                      <MTextView content={row.equipment?.eqtype} />
                    </Table.Cell>
                    <Table.Cell>
                      <div className="w-20 truncate">
                        <MTextView content={row?.workDone?.jobDescription} />
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <MTextView
                        content={
                          row.status === 'stopped' ||
                          row.status === 'in progress' ||
                          row.status === 'approved' ||
                          row.status === 'rejected'
                            ? row?.equipment?.uom === 'hour'
                              ? msToTime(
                                  getDuration(row?.startTime, row?.duration)
                                )
                              : row?.duration + 'days'
                            : '...'
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <MTextView
                        content={
                          row.status === 'created' ||
                          row.status === 'recalled' ||
                          row.status === 'in progress'
                            ? 'RWF ' +
                              row.equipment?.rate?.toLocaleString() +
                              ' per ' +
                              row?.equipment?.uom
                            : 'RWF ' +
                              row.rate?.toLocaleString() +
                              ' per ' +
                              row?.uom
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <MTextView
                        selected={row?.selected}
                        content={
                          row.status === 'stopped' ||
                          row.status === 'approved' ||
                          row.status === 'rejected'
                            ? 'RWF ' +
                              _.round(row?.totalRevenue, 2).toLocaleString()
                            : '...'
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <MStatusIndicator status={row.status} />
                    </Table.Cell>
                    <Table.Cell>
                      <MTextView
                        content={
                          row.driver?.firstName + ' ' + row.driver?.lastName
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <MTextView
                        content={
                          row.equipment.eqtype === 'Truck'
                            ? row?.dispatch?.targetTrips
                            : 'NA'
                        }
                      />
                    </Table.Cell>

                    <Table.Cell>
                      <MTextView
                        content={
                          row.equipment.eqtype === 'Truck'
                            ? row?.tripsDone
                            : 'NA'
                        }
                      />
                    </Table.Cell>

                    <Table.Cell>
                      <MTextView content={row?.project?.customer} />
                    </Table.Cell>

                    <Table.Cell>
                      <div className="mr-2 flex flex-row">
                        {user.userType === 'customer' &&
                          row.status === 'stopped' && (
                            <>
                              <div
                                onClick={() => handelApprove(row, index)}
                                className="mr-4 flex h-8 w-11 cursor-pointer items-center justify-evenly rounded-full bg-white p-2 shadow-md hover:scale-105 active:scale-95 active:shadow-sm"
                              >
                                <CheckIcon className="h-5 w-5 text-green-400" />
                              </div>
                              <div
                                onClick={() => handelReject(row, index)}
                                className="mr-4 flex h-8 w-11 cursor-pointer items-center justify-evenly rounded-full bg-white p-2 shadow-md hover:scale-105 active:scale-95 active:shadow-sm"
                              >
                                <XIcon className="h-5 w-5 text-red-400" />
                              </div>

                              {row.selected && (
                                <div
                                  onClick={() => handleDeselect(row)}
                                  className="mr-4 flex h-8 w-11 cursor-pointer items-center justify-evenly rounded-full bg-white p-2 shadow-md hover:scale-105 active:scale-95 active:shadow-sm"
                                >
                                  <ClipboardIcon className="h-5 w-5 text-gray-600" />
                                </div>
                              )}
                              {!row.selected && (
                                <div
                                  onClick={() => handleSelect(row)}
                                  className="mr-4 flex h-8 w-11 cursor-pointer items-center justify-evenly rounded-full bg-white p-2 shadow-md hover:scale-105 active:scale-95 active:shadow-sm"
                                >
                                  <ClipboardCheckIcon className="h-5 w-5 text-blue-400" />
                                </div>
                              )}
                            </>
                          )}

                        {user.userType === 'admin' &&
                          row.status === 'approved' && (
                            <>
                              <div
                                // onClick={() => handelApprove(row)}
                                className="mr-4 flex h-8 w-11 cursor-pointer items-center justify-evenly rounded-full bg-white p-2 shadow-md hover:scale-105 active:scale-95 active:shadow-sm"
                              >
                                <CashIcon className="h-5 w-5 text-green-400" />
                              </div>
                              <div
                                // onClick={() => handelReject(row)}
                                className="mr-4 flex h-8 w-11 cursor-pointer items-center justify-evenly rounded-full bg-white p-2 shadow-md hover:scale-105 active:scale-95 active:shadow-sm"
                              >
                                <PrinterIcon className="h-5 w-5 text-blue-400" />
                              </div>
                            </>
                          )}

                        {user.userType === 'admin' && row.status === 'created' && (
                          <>
                            <div
                              onClick={() => handelRecall(row, index)}
                              className="mr-4 flex h-8 w-11 cursor-pointer items-center justify-evenly rounded-full bg-white p-2 shadow-md hover:scale-105 active:scale-95 active:shadow-sm"
                            >
                              <ReceiptRefundIcon className="h-5 w-5 text-zinc-700" />
                            </div>
                          </>
                        )}
                      </div>
                    </Table.Cell>
                    {/* <Table.Cell>{row.createdOn}</Table.Cell>
                <Table.Cell>{row.createdBy}</Table.Cell>
                <Table.Cell>{row.permit}</Table.Cell>
                <Table.Cell>{row.duration}</Table.Cell> */}
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
          <MPagination
            count={data.length}
            onPageChange={handlePageChange}
            pageSize={pageSize}
          />
        </>
      )}

      {pData.length === 0 && (
        <div className="my-2 flex w-full flex-row items-center justify-center">
          No data found!
        </div>
      )}
    </div>
  )
}
