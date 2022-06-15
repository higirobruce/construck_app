import { DocumentTextIcon } from '@heroicons/react/solid'
import {
  ChatIcon,
  DotsHorizontalIcon,
  CheckIcon,
  ExclamationIcon,
  XIcon,
} from '@heroicons/react/solid'
import React, { useContext, useState } from 'react'
import { Table } from 'semantic-ui-react'
import MTextView from './mTextView'

import MPagination from './pagination'

import { paginate } from '../../utils/paginate'

import { LanguageContext } from '../../contexts/languageContext'
import { labels, messages, placeholders } from '../../utils/labels'
import MLable from './mLabel'

const MStatusIndicator = ({ status }) => {
  if (status === 'approved')
    return (
      <div>
        <CheckIcon className="h-5 w-5 text-green-500" />
      </div>
    )
  else if (status === 'denied') {
    return (
      <div>
        <XIcon className="h-5 w-5 text-red-500" />
      </div>
    )
  } else {
    return (
      <div>
        <ExclamationIcon className="h-5 w-5 text-yellow-500" />
      </div>
    )
  }
}

export default function AircraftsTable({ data, handleOpen }) {
  const [pageSize, setPageSize] = useState(5)

  const { language, setLanguage } = useContext(LanguageContext)
  const [pageNumber, setPageNumber] = useState(1)
  function handlePageChange(e, data) {
    setPageNumber(data.activePage)
  }

  const pData = paginate(data, pageNumber, pageSize)
  return (
    <div>
      <Table size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{`${
              labels[`${language}`].operator
            }`}</Table.HeaderCell>
            <Table.HeaderCell>{`${
              labels[`${language}`].registration
            }`}</Table.HeaderCell>
            <Table.HeaderCell>{`${
              labels[`${language}`].model
            }`}</Table.HeaderCell>
            <Table.HeaderCell>{`${
              labels[`${language}`].type
            }`}</Table.HeaderCell>
            <Table.HeaderCell>{`${
              labels[`${language}`].homeBase
            }`}</Table.HeaderCell>
            <Table.HeaderCell>{`${
              labels[`${language}`].serialNumber
            }`}</Table.HeaderCell>
            <Table.HeaderCell>{`${
              labels[`${language}`].seats
            }`}</Table.HeaderCell>
            <Table.HeaderCell>{`${
              labels[`${language}`].actions
            }`}</Table.HeaderCell>
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
                  <MTextView content={row.operatorId?.name} />
                </Table.Cell>
                <Table.Cell>
                  <MTextView content={row.registration} />
                </Table.Cell>
                <Table.Cell>
                  <MTextView content={row.aircraftModel} />
                </Table.Cell>
                <Table.Cell>
                  <MTextView content={row.aircraftType} />
                </Table.Cell>
                <Table.Cell>
                  <MTextView content={row.homebase} />
                </Table.Cell>
                <Table.Cell>
                  <MTextView content={row.serialNumber} />
                </Table.Cell>
                <Table.Cell>
                  <MTextView content={row.seats} />
                </Table.Cell>

                <Table.Cell>
                  <div className="mr-2 flex flex-row">
                    <div
                      onClick={() => handleOpen(row)}
                      className="mr-4 flex h-8 w-11 cursor-pointer items-center justify-evenly rounded-full bg-white p-2 shadow-md hover:scale-105 active:scale-95 active:shadow-sm"
                    >
                      <DotsHorizontalIcon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="mr-4 flex h-8 w-11 cursor-pointer items-center justify-evenly rounded-full bg-white p-2 shadow-md hover:scale-105 active:scale-95 active:shadow-sm">
                      <ChatIcon className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="flex h-8 w-11 cursor-pointer items-center justify-evenly rounded-full bg-white p-2 shadow-md hover:scale-105 active:scale-95 active:shadow-sm">
                      <DocumentTextIcon className="h-5 w-5 text-yellow-400" />
                    </div>
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
    </div>
  )
}
