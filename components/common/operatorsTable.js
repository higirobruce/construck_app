import { EllipsisHorizontalIcon, PencilIcon } from '@heroicons/react/24/solid'
import React, { useContext, useState } from 'react'
import { Table } from 'semantic-ui-react'
import MTextView from './mTextView'
import MPagination from './pagination'

import { paginate } from '../../utils/paginate'
import { LanguageContext } from '../../contexts/languageContext'
import { labels, messages, placeholders } from '../../utils/labels'

export default function OperatorsTable({ data, handleOpen }) {
  const [pageSize, setPageSize] = useState(5)
  const [pageNumber, setPageNumber] = useState(1)
  const { language, setLanguage } = useContext(LanguageContext)
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
              labels[`${language}`].names
            }`}</Table.HeaderCell>
            <Table.HeaderCell>{`${
              labels[`${language}`].country
            }`}</Table.HeaderCell>
            <Table.HeaderCell>{`${
              labels[`${language}`].caoIdentifier
            }`}</Table.HeaderCell>
            <Table.HeaderCell>{`${
              labels[`${language}`].iataIdentifier
            }`}</Table.HeaderCell>
            <Table.HeaderCell>{`${
              labels[`${language}`].nationalCarrier
            }`}</Table.HeaderCell>
            <Table.HeaderCell>{`${
              labels[`${language}`].actions
            }`}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {pData.map((row) => {
            return (
              <Table.Row key={row._id}>
                <Table.Cell>
                  <MTextView content={row.name} />
                </Table.Cell>
                <Table.Cell>
                  <MTextView content={row.country} />
                </Table.Cell>
                <Table.Cell>
                  <MTextView content={row.caoIdentifier} />
                </Table.Cell>
                <Table.Cell>
                  <MTextView content={row.iataIdentifier} />
                </Table.Cell>
                <Table.Cell>
                  <MTextView content={row.nationalCarrier} />
                </Table.Cell>
                <Table.Cell>
                  <div className="mr-2 flex flex-row">
                    <div
                      onClick={() => handleOpen(row)}
                      className="mr-4 flex h-8 w-11 cursor-pointer items-center justify-evenly rounded-full bg-white p-2 shadow-md hover:scale-105 active:scale-95 active:shadow-sm"
                    >
                      <EllipsisHorizontalIcon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="mr-4 flex h-8 w-11 cursor-pointer items-center justify-evenly rounded-full bg-white p-2 shadow-md hover:scale-105 active:scale-95 active:shadow-sm">
                      <PencilIcon className="h-5 w-5 text-yellow-400" />
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
