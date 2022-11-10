import { useContext, useState } from 'react'
import { DocumentTextIcon } from '@heroicons/react/24/solid'
import {
  ChatIcon,
  EllipsisHorizontalIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  XIcon,
  PauseIcon,
} from '@heroicons/react/24/solid'
import React from 'react'
import { Table } from 'semantic-ui-react'
import MTextView from './mTextView'
import MLable from './mLabel'
import MPagination from './pagination'
import { paginate } from '../../utils/paginate'
import { UserContext } from '../../contexts/UserContext'
import { PencilSquareIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

const MStatusIndicator = ({ status }) => {
  if (status === 'approved')
    return (
      <div className="flex flex-row">
        <CheckIcon className="h-5 w-5 text-green-500" />
        <MTextView content={status} />
      </div>
    )
  else if (status === 'denied') {
    return (
      <div className="flex flex-row">
        <XIcon className="h-5 w-5 text-red-500" />
        <MTextView content={status} />
      </div>
    )
  } else if (status === 'in progress') {
    return (
      <div className="flex flex-row">
        <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
        <MTextView content={status} />
      </div>
    )
  } else if (status === 'checked') {
    return (
      <div className="flex flex-row">
        <ExclamationCircleIcon className="h-5 w-5 text-blue-500" />
        <MTextView content={status} />
      </div>
    )
  } else {
    return (
      <div className="flex flex-row">
        <PauseIcon className="h-5 w-5 text-gray-500" />
        <MTextView content={status} />
      </div>
    )
  }
}

export default function UsersTable({
  data,
  handelOpen,
  handelShowMessages,
  handelUpdateStatus,
  handleResetPassword,
  handleChange,
  canCreateData,
}) {
  const { user, setUSer } = useContext(UserContext)
  const [pageSize, setPageSize] = useState(10)
  const [pageNumber, setPageNumber] = useState(1)
  let filteredData = data
  let isCustomer =
    user.userType === 'customer-admin' ||
    user.userType === 'customer-project-manager'

  if (user.userType === 'customer-project-manager')
    filteredData = data.filter((data) => {
      return (
        user?.assignedProject?.prjDescription ===
          data?.assignedProject?.prjDescription &&
        data?.userType !== 'customer-admin' &&
        data?.userType !== 'customer-project-manager'
      )
    })

  function handlePageChange(e, data) {
    setPageNumber(data.activePage)
  }

  const pData = paginate(filteredData, pageNumber, pageSize).pagedData
  return (
    <div className="hidden w-full md:block">
      {pData?.length > 0 && (
        <>
          <Table size="tiny" compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Full Names</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Phone</Table.HeaderCell>
                <Table.HeaderCell>Role</Table.HeaderCell>
                {isCustomer && <Table.HeaderCell>Project</Table.HeaderCell>}

                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
                {/* <Table.HeaderCell>Created on</Table.HeaderCell>
            <Table.HeaderCell>Created by</Table.HeaderCell>
            <Table.HeaderCell>Permit</Table.HeaderCell>
            <Table.HeaderCell>Duration</Table.HeaderCell> */}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {pData.map((row) => {
                return (
                  <Table.Row key={row._id}>
                    <Table.Cell>
                      <MTextView content={row.firstName + ' ' + row.lastName} />
                    </Table.Cell>
                    <Table.Cell>
                      <MTextView content={row.email} />
                    </Table.Cell>
                    <Table.Cell>
                      <MTextView content={row.username} />
                    </Table.Cell>
                    <Table.Cell>
                      <MTextView content={row.phone} />
                    </Table.Cell>
                    <Table.Cell>
                      <MTextView content={row.userType} />
                    </Table.Cell>
                    {isCustomer && (
                      <Table.Cell>
                        <MTextView
                          content={row.assignedProject?.prjDescription}
                        />
                      </Table.Cell>
                    )}
                    <Table.Cell>
                      <MTextView content={row.status} />
                    </Table.Cell>

                    <Table.Cell>
                      <div className="mr-2 flex flex-row">
                        <div
                          onClick={() => handleResetPassword(row)}
                          className="mr-4 flex h-8 w-11 cursor-pointer items-center justify-evenly rounded-full bg-white p-2 shadow-md hover:scale-105 active:scale-95 active:shadow-sm"
                        >
                          <ArrowPathIcon className="h-5 w-5 text-blue-400" />
                        </div>
                        <div
                          onClick={() => handleChange(row)}
                          className="mr-4 flex h-8 w-11 cursor-pointer items-center justify-evenly rounded-full bg-white p-2 shadow-md hover:scale-105 active:scale-95 active:shadow-sm"
                        >
                          <PencilSquareIcon className="h-5 w-5 text-green-400" />
                        </div>

                        {/* <div
                      onClick={() => handelUpdateStatus(row, 'suspended')}
                      className="flex h-8 w-11 cursor-pointer items-center justify-evenly rounded-full bg-white p-2 shadow-md hover:scale-105 active:scale-95 active:shadow-sm"
                    >
                      <XIcon className="h-5 w-5 text-red-400" />
                    </div> */}
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
    </div>
  )
}
