import { useState } from "react";
import { DocumentTextIcon } from "@heroicons/react/solid";
import {
  ChatIcon,
  DotsHorizontalIcon,
  CheckIcon,
  ExclamationIcon,
  ExclamationCircleIcon,
  XIcon,
  PauseIcon,
} from "@heroicons/react/solid";
import React from "react";
import { Table } from "semantic-ui-react";
import MTextView from "./mTextView";
import MLable from "./mLabel";
import MPagination from "./pagination";
import { paginate } from "../../utils/paginate";

const MStatusIndicator = ({ status }) => {
  if (status === "approved")
    return (
      <div className="flex flex-row">
        <CheckIcon className="h-5 w-5 text-green-500" />
        <MTextView content={status} />
      </div>
    );
  else if (status === "denied") {
    return (
      <div className="flex flex-row">
        <XIcon className="h-5 w-5 text-red-500" />
        <MTextView content={status} />
      </div>
    );
  } else if (status === "in progress") {
    return (
      <div className="flex flex-row">
        <ExclamationIcon className="h-5 w-5 text-yellow-500" />
        <MTextView content={status} />
      </div>
    );
  } else if (status === "checked") {
    return (
      <div className="flex flex-row">
        <ExclamationCircleIcon className="h-5 w-5 text-blue-500" />
        <MTextView content={status} />
      </div>
    );
  } else {
    return (
      <div className="flex flex-row">
        <PauseIcon className="h-5 w-5 text-gray-500" />
        <MTextView content={status} />
      </div>
    );
  }
};

export default function InvoicesTable({
  data,
  handelOpen,
  handelShowMessages,
}) {
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);

  function handlePageChange(e, data) {
    console.log(data);
    setPageNumber(data.activePage);
  }

  const pData = paginate(data, pageNumber, pageSize);
  return (
    <div className="hidden md:block">
      <Table size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Invoice Number</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Related To</Table.HeaderCell>
            <Table.HeaderCell>Created On</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
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
                  <MTextView content={row.invoiceNumber} />
                </Table.Cell>
                <Table.Cell>
                  <MTextView content={row.type} />
                </Table.Cell>
                <Table.Cell>
                  {" "}
                  <MTextView content={row.relatedTo} />{" "}
                </Table.Cell>
                <Table.Cell>
                  <MTextView content={row.createdOn} />
                </Table.Cell>

                <Table.Cell>
                  <MTextView content={row.amount} />
                </Table.Cell>
                <Table.Cell>
                  <div className="flex flex-row mr-2">
                    <div
                      onClick={() => handelOpen(row)}
                      className="flex items-center justify-evenly w-11 h-8 bg-white rounded-full shadow-md cursor-pointer p-2 mr-4 hover:scale-105 active:scale-95 active:shadow-sm"
                    >
                      <DotsHorizontalIcon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div
                      onClick={() => handelShowMessages(row)}
                      className="flex items-center justify-evenly w-11 h-8 bg-white rounded-full shadow-md cursor-pointer p-2 mr-4 hover:scale-105 active:scale-95 active:shadow-sm"
                    >
                      <ChatIcon className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="flex items-center justify-evenly w-11 h-8 bg-white rounded-full shadow-md cursor-pointer p-2 hover:scale-105 active:scale-95 active:shadow-sm">
                      <DocumentTextIcon className="h-5 w-5 text-yellow-400" />
                    </div>
                  </div>
                </Table.Cell>
                {/* <Table.Cell>{row.createdOn}</Table.Cell>
                <Table.Cell>{row.createdBy}</Table.Cell>
                <Table.Cell>{row.permit}</Table.Cell>
                <Table.Cell>{row.duration}</Table.Cell> */}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <MPagination
        count={data.length}
        onPageChange={handlePageChange}
        pageSize={pageSize}
      />
    </div>
  );
}
