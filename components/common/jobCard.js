import React from 'react'
import {
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import moment from 'moment'

const JobCard = ({
intent,
  data,
  updateMe,
  role
}) => {

    function getClassFromIntent(intent) {
      if (intent == 'primary') {
        return 'flex flex-col space-y-5 p-5 rounded bg-blue-200  w-full'
      } else if (intent == 'secondary') {
        return 'flex flex-col space-y-5 p-5 rounded bg-yellow-200  w-full'
      } else if (intent == 'warning') {
        return 'flex flex-col space-y-5 p-5 rounded bg-red-200  w-full'
      } else if (intent == 'danger') {
        return 'flex flex-col space-y-5 p-5 rounded bg-red-400  w-full'
      } else if (intent == 'normal') {
        return 'flex flex-col space-y-5 p-5 rounded bg-green-200  w-full'
      } else {
        return 'flex flex-col rounded-xl border border-gray-100 px-4 shadow-xl sm:p-6 lg:px-3 lg:pt-4 cursor-pointer'
      }
    }
  return (
    <div
        onClick={() => updateMe(data)}
        className={`${getClassFromIntent(intent)} ${(data.startTime && data.jobCard_status == 'opened') ? `bg-orange-200` : (data.jobCard_status == 'closed') ? `bg-green-200` : ``}`}
    >
        <div className='flex items-center justify-between'>
            <h5 className='font-bold'>{data.plate.text + ' - ' + data.plate.eqDescription}</h5>
            {!data.finishTime && <span
                class="rounded-full bg-blue-100 py-1.5 px-3 text-xs font-medium text-blue-600"
            >
                {data.status.toUpperCase()}
            </span>}
        </div>
        <div class="pt-3 text-gray-500">
            <div>
                <small>
                    <span className='text-gray-400'>Job Card ID: </span><b>{data.jobCard_id}</b>
                </small>
            </div>
            <div className='mt-2'>
                <small>
                    <span className='text-gray-400'>Driver/Operator: </span><b>{data.driver.text}</b>
                </small>
            </div>
            <div className='mt-2'>
                <small>
                    <span className='text-gray-400'>Repair Location: </span><b>{data.location.text ? data.location.text : data.location}</b>
                </small>
            </div>

            {data.reason && <div class="flex items-center bg-red-100 text-red-500 text-sm font-bold px-5 py-2 mr-5 mt-3" role="alert">
              <ExclamationTriangleIcon width={14} />&nbsp;&nbsp;
              <p>
                {data.reason}
              </p>
            </div>}

            {((data.isViewed == 'approved' || data.isViewed == 'approved new request') && (data.status == 'requisition') && (data.sourceItem == 'Inventory' && data.sourceItem == 'Transfer')) && <div class="flex items-center bg-green-100 text-green-500 text-sm font-bold px-5 py-2 mr-5 mt-3" role="alert">
              <ExclamationTriangleIcon width={14} />&nbsp;&nbsp;
              <p>
                {role == 'workshop-manager' ? `You have approved the request` : `You can proceed with repair`}
              </p>
            </div>}
            
            {((data.isViewed == 'not viewed' || data.isViewed == 'new request') && (data.status == 'requisition') && (data.sourceItem == 'Inventory' || data.sourceItem == 'Transfer')) && <div class="flex items-center bg-orange-100 text-orange-500 text-sm font-bold px-5 py-2 mr-5 mt-3" role="alert">
              <ExclamationTriangleIcon width={14} />&nbsp;&nbsp;
              <p>
                {role == 'workshop-manager' ? `You have haven't approved the request the request` : `You can't proceed with repair until approved`}
              </p>
            </div>}

            <dl class="mt-5 flex justify-between pr-6 w-full">
                <div class="flex flex-col-reverse">
                    <dt class="text-sm font-medium text-gray-600">{moment(data.entryDate && data.entryDate.toLocaleString()).format('DD-MMMM-YYYY LT')}</dt>
                    <dd class="text-xs text-gray-500">Entry Date:</dd>
                </div>

                <div class="flex flex-col-reverse">
                <dt class="text-sm font-medium text-gray-600">{data.finishTime ? moment(data.finishTime).format('DD-MMMM-YYYY LT') : ' - '}</dt>
                <dd class="text-xs text-gray-500">Release Date:</dd>
                </div>
            </dl>
        </div>
    </div>
  )
}

export default JobCard;