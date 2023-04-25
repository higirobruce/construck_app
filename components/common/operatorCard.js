import React from 'react'
import { Checkbox } from 'antd';
import { LightBulbIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline'

const OperatorCard = (props) => {

    const {
        row,
        role,
        teamApproval,
        operatorApproval,
        setOperatorApproval
    } = props

    return (
        <>
            {(role == 'workshop-team-leader') && <div className={`${teamApproval == true ? 'bg-green-100 text-green-500' : "bg-red-100 text-red-500"} px-5 py-2 w-1/2`}>
                <span className='text-center font-normal'>
                    {teamApproval == true ? '!!! You have approved this Job Card to be released' : '!!! You haven\'t approved this Job Card to be released'}
                </span>
            </div>}
            {(role == 'workshop-supervisor') && <div className={`${teamApproval == true ? 'bg-green-100 text-green-500' : "bg-red-100 text-red-500"} px-5 py-2 w-1/2`}>
                <span className='text-center font-normal'>
                    {teamApproval == true ? '!!! This Job Card has been approved to be released' : '!!! This Job Card haven\'t been approved to be released'}
                </span>
            </div>}
            <div className='flex flex-col space-y-5'>
                <span className='text-gray-400 pt-6'>Job Card ID: <small className='text-black text-sm font-medium'>{row.jobCard_id}</small></span>
                <span className='text-gray-400 py-4'>Plate Number: <small className='text-black text-sm font-medium'>{row.plate.text}</small> <sup className='bg-blue-500 rounded-full px-2 pb-0.5'><small className='text-white'>{row.plate.eqDescription}</small></sup></span>
                <div className='flex items-center space-x-2'>
                    <span className='text-gray-500'>Tools:</span>
                </div>
                <span>
                    {row.inspectionTools.map((item) => (
                        <small className='bg-blue-50 text-blue-600 text-sm font-medium mx-2 pb-2 pt-1 px-4'>{item}</small>
                    ))}
                </span>
                <div>
                    <div className='flex items-center space-x-2 pt-6'>
                        <LightBulbIcon width={14} color={`#fcba03`} />
                        <span className='text-gray-500 font-semibold'>Mechanical Issues:</span>
                    </div>
                    <small className='text-gray-400'>&nbsp;&nbsp; !!! You can apply check on issues that are tested and fixed</small>
                </div>
                <span>
                    <div className='w-4/5'>
                        <Checkbox.Group options={row.mechanicalInspections.map((item) => ({label: item, value: item}))} defaultValue={operatorApproval} onChange={(value) => setOperatorApproval(value)} />
                    </div>
                </span>

            </div>
        </>
    )
}

export default OperatorCard