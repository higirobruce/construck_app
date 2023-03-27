import {
  CheckIcon,
  PencilSquareIcon,
  PlayIcon,
  ReceiptRefundIcon,
  StopIcon,
  CogIcon,
  ArchiveBoxXMarkIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline'
import {
  FolderOpenIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/solid'
import React, { useState, useEffect } from 'react'
import { Loader } from 'semantic-ui-react'
import MTextView from './mTextView'

const MStatusIndicator = ({ status }) => {
  if (status === 'available')
    return (
      <div className="flex flex-row items-center space-x-1">
        <CheckIcon className="h-5 w-5 text-green-500" />
        {/* <MTextView content={status} /> */}
      </div>
    )
  else if (status === 'assigned to job') {
    return (
      <div className="flex flex-row items-center space-x-1">
        <ExclamationTriangleIcon className="h-5 w-5 text-zinc-600" />
        {/* <MTextView content={status} /> */}
      </div>
    )
  } else if (status === 'not available') {
    return (
      <div className="flex flex-row items-center space-x-1">
        <ArchiveBoxXMarkIcon className="h-5 w-5 text-orange-500" />
        {/* <MTextView content={status} /> */}
      </div>
    )
  } else if (status === 'under maintenance') {
    return (
      <div className="flex flex-row items-center space-x-1">
        <CogIcon className="h-5 w-5 text-blue-500" />
        {/* <MTextView content={status} /> */}
      </div>
    )
  } else if (status === 'created') {
    return (
      <div className="flex flex-row items-center space-x-1">
        <PlayIcon className="h-5 w-5 text-teal-500" />
        {/* <MTextView content={status} /> */}
      </div>
    )
  } else if (status === 'stopped') {
    return (
      <div className="flex flex-row items-center space-x-1">
        <StopIcon className="h-5 w-5 text-red-500" />
        {/* <MTextView content={status} /> */}
      </div>
    )
  } else if (status === 'recalled') {
    return (
      <div className="flex flex-row items-center space-x-1">
        <ReceiptRefundIcon className="h-5 w-5 text-zinc-600" />
        {/* <MTextView content={status} /> */}
      </div>
    )
  } else {
    return (
      <div className="flex flex-row items-center space-x-1">
        <CheckIcon className="h-5 w-5 text-green-500" />
        {/* <MTextView content={status} /> */}
      </div>
    )
  }
}

export default function ProjectCard({
  intent,
  data,
  icon,
  handleChange,
  handleShowDetails,
  handleShowReleased,
  canCreateData,
}) {
  let url = process.env.NEXT_PUBLIC_BKEND_URL
  let apiUsername = process.env.NEXT_PUBLIC_API_USERNAME
  let apiPassword = process.env.NEXT_PUBLIC_API_PASSWORD

  let [loadingApprovedRev, setLoadingApprovedRev] = useState(true)
  let [approvedRevenue, setApprovedRevenue] = useState(0)

  let [loadingRejectedRev, setLoadingRejectedRev] = useState(true)
  let [rejectedRevenue, setRejectedRevenue] = useState(0)

  let [loadingDetails, setLoadingDetails] = useState(true)
  let [workDetails, setWorkDetails] = useState(null)

  let [loadingReleased, setLoadingReleased] = useState(true)
  let [releasedMonthlyWorks, setReleasedMonthlyWorks] = useState(null)

  function getClassFromStatus(intent) {
    if (intent == 'available') {
      return 'flex flex-col space-y-5 px-3 py-1 rounded shadow-lg ring-1 ring-zinc-200 w-full'
    } else if (intent == 'assigned to job') {
      return 'flex flex-col space-y-5 px-3 py-1 rounded bg-gray-200  w-full'
    } else if (intent == 'warning') {
      return 'flex flex-col space-y-5 px-3 py-1 rounded bg-red-200  w-full'
    } else if (intent == 'danger') {
      return 'flex flex-col space-y-5 px-3 py-1 rounded bg-red-400  w-full'
    } else if (intent == 'normal') {
      return 'flex flex-col space-y-5 px-3 py-1 rounded bg-green-200  w-full'
    } else {
      return 'flex flex-col space-y-5 px-3 py-1 rounded shadow-lg ring-1 ring-zinc-200 w-full'
    }
  }

  function getApprovedRevenue(prjDescription) {
    fetch(
      `${url}/projects/approvedRevenue/${encodeURIComponent(prjDescription)}`,
      {
        headers: {
          Authorization:
            'Basic ' + window.btoa(apiUsername + ':' + apiPassword),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        let result = res[0]
        setLoadingApprovedRev(false)
        setApprovedRevenue(result?.totalRevenue ? result?.totalRevenue : 0)
      })
  }

  function getRejectedRevenue(prjDescription) {
    fetch(
      `${url}/projects/rejectedRevenue/${encodeURIComponent(prjDescription)}`,
      {
        headers: {
          Authorization:
            'Basic ' + window.btoa(apiUsername + ':' + apiPassword),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        let result = res[0]
        setLoadingRejectedRev(false)
        setRejectedRevenue(result?.totalRevenue ? result?.totalRevenue : 0)
      })
  }

  function getReleasedMonthly(prjDescription) {
    fetch(
      `${url}/projects/releasedRevenue/${encodeURIComponent(prjDescription)}`,
      {
        headers: {
          Authorization:
            'Basic ' + window.btoa(apiUsername + ':' + apiPassword),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setLoadingReleased(false)
        setReleasedMonthlyWorks(res)
      })
  }

  function getWorksToBeValidated(prjDescription) {
    setLoadingDetails(true)
    fetch(
      `${url}/projects/worksToBeValidated/${encodeURIComponent(
        prjDescription
      )}`,
      {
        headers: {
          Authorization:
            'Basic ' + window.btoa(apiUsername + ':' + apiPassword),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setLoadingDetails(false)
        setWorkDetails(res)
      })
  }

  useEffect(() => {
    setLoadingApprovedRev(true)
    setLoadingRejectedRev(true)
    getApprovedRevenue(data.prjDescription)
    getRejectedRevenue(data.prjDescription)
    getReleasedMonthly(data.prjDescription)
    getWorksToBeValidated(data.prjDescription)
  }, [approvedRevenue])

  return (
    <div className={getClassFromStatus(intent)} key={workDetails?._id}>
      <div className="flex flex-row items-start justify-between py-1">
        <div className="flex flex-col space-y-1">
          <div className="flex flex-row items-center space-x-3">
            {canCreateData && (
              <div
<<<<<<< HEAD
                className="text-md cursor-pointer font-semibold text-gray-700"
=======
                className="cursor-pointer text-lg font-semibold text-gray-700"
>>>>>>> parent of 03f79d2 (updates)
                onClick={() => handleChange(data)}
              >
                {data.prjDescription}
              </div>
            )}

            {!canCreateData && (
              <div className="text-lg font-semibold text-gray-700">
                {data.prjDescription}
              </div>
            )}
            {/* <MStatusIndicator status={data.status} /> */}
          </div>

          <div className="text-sm font-semibold text-gray-400">
            {data.customer}
          </div>
          <div className="text-sm font-semibold text-gray-500">
            {data.status}
          </div>
        </div>
        <div className="mt-1 flex flex-row space-x-3">
<<<<<<< HEAD
          <ArrowPathIcon
            onClick={() => {
              setLoadingApprovedRev(true)
              setLoadingRejectedRev(true)
              getApprovedRevenue(data.prjDescription)
              getRejectedRevenue(data.prjDescription)
              getReleasedMonthly(data.prjDescription)
              getWorksToBeValidated(data.prjDescription)
            }}
            className={
              intent === 'available'
                ? 'h-5 w-5 cursor-pointer text-blue-500'
                : 'h-5 w-5 cursor-pointer text-blue-400'
            }
          />
=======
>>>>>>> parent of 03f79d2 (updates)
          {!loadingApprovedRev &&
            !loadingRejectedRev &&
            !loadingDetails &&
            workDetails?.length > 0 && (
              <FolderOpenIcon
                onClick={() => handleShowDetails(data, workDetails)}
                className={
                  intent === 'available'
                    ? 'h-5 w-5 cursor-pointer text-blue-500'
                    : 'h-5 w-5 cursor-pointer text-blue-400'
                }
              />
            )}
          {loadingReleased && (
            <div className="pl-2">
              {' '}
              <Loader active size="tiny" inline />
            </div>
          )}
          {!loadingReleased && (
            <ListBulletIcon
              onClick={() => handleShowReleased(data, releasedMonthlyWorks)}
              className={
                intent === 'available'
                  ? 'h-5 w-5 cursor-pointer text-blue-500'
                  : 'h-5 w-5 cursor-pointer text-blue-400'
              }
            />
          )}
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <div className="text-sm font-semibold text-gray-500">
          {loadingApprovedRev && <Loader active size="tiny" inline />}
          {!loadingApprovedRev &&  workDetails?.length > 0  &&(
            <div className="text-sm font-semibold text-green-500">
              {'RWF ' + approvedRevenue.toLocaleString()}
            </div>
          )}
        </div>

        <div className="text-sm font-semibold text-gray-500">
          {loadingRejectedRev && <Loader active size="tiny" inline />}
          {!loadingRejectedRev &&  workDetails?.length > 0 && (
            <div className="text-sm font-semibold text-red-500">
              {'RWF ' + rejectedRevenue.toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
