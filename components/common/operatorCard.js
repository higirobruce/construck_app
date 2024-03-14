import React from 'react'
import { Checkbox } from 'antd';
import { LightBulbIcon, UserIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline'
import TextInputLogin from './TextIputLogin';

const OperatorCard = (props) => {

    const {
        row,
        role,
        teamApproval,
        operatorApproval,
        setOperatorApproval,
        mileagesNotApplicable,
        setMileagesNotApplicable,
        nextMileages,
        setNextMileages
    } = props;

    return (
        <>
            {(role == 'workshop-team-leader') && <div className={`${teamApproval == true ? 'bg-green-100 text-green-500' : "bg-red-100 text-red-500"} px-5 py-2 w-1/2`}>
                <span className='text-center font-normal'>
                    {teamApproval == true ? '!!! You have approved this Job Card to be released' : '!!! You haven\'t approved this Job Card to be released'}
                </span>
            </div>}
            {(role == 'workshop-supervisor') && <div className={`${teamApproval == true ? 'bg-green-100 text-green-500' : "bg-red-100 text-red-500"} px-5 py-2 w-1/2`}>
                <span className='text-center font-normal'>
                    {teamApproval == true ? '!!! This Job Card has been approved to be released' : '!!! This Job Card isn\'t yet approved to be released'}
                </span>
            </div>}
            <div className='flex flex-col space-y-5'>
                <span className='text-gray-400 pt-6'>Job Card ID: <small className='text-black text-sm font-medium'>{row.jobCard_id}</small></span>
                <span className='text-gray-400 py-4'>Plate Number: <small className='text-black text-sm font-medium'>{row.plate.text}</small> <sup className='bg-blue-500 rounded-full px-2 pb-0.5'><small className='text-white'>{row.plate.eqDescription}</small></sup></span>
                <span className='text-gray-400 pb-4'>Operator: <small className='text-black text-sm font-medium'>{row.operator ? row.operator : 'N/A'}</small></span>
                <div className='flex items-center space-x-2'>
                    <span className='text-gray-500'>Tools:</span>
                </div>
                <span>
                    {row.inspectionTools.map((item) => (
                        <small className='bg-blue-50 text-blue-600 text-sm font-medium mx-2 pb-2 pt-1 px-4'>{item}</small>
                    ))}
                </span>
                <div className='flex items-center space-x-2'>
                    <span className='text-gray-500'>Items Used:</span>
                </div>
                <span>
                    {row.inventoryItems.map((item) => (
                        
                        <>
                            {item.value.length > 0 && item.value.map((value) => (
                                <small className='bg-red-50 text-red-600 text-sm font-medium mx-2 pb-2 pt-1 px-4'>{value}</small>
                            ))}
                        </>
                    ))}
                </span>
                <div className='flex items-center space-x-2 pt-5'>
                    <UserIcon width={14} color={`#344a5c`} />
                    <span className='text-gray-500'>Mechanics Assigned:</span>
                </div>
                <span>
                    {row.assignIssue.map((item) => (
                        <>
                            {item.mech.map((value) => (
                                <small className='bg-gray-100 text-gray-600 text-sm font-medium mx-2 pb-2 pt-1 px-4'>{value}</small>
                            ))}
                        </>
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
                        <Checkbox.Group disabled={(role == 'workshop-supervisor') || (role == 'workshop-team-leader' && row.teamApproval == true)} options={row.mechanicalInspections.map((item) => ({label: item, value: item}))} defaultValue={operatorApproval} onChange={(value) => setOperatorApproval(value)} />
                    </div>
                </span>
                {role === 'workshop-team-leader' && <div className='flex flex-col w-full my-4 py-4'>
                    <div class="form-check mb-10">
                        <input
                            class="form-check-input mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 focus:outline-none focus:ring-0"
                            type="checkbox"
                            name="check"
                            id="checkNoIndex"
                            checked={mileagesNotApplicable}
                            disabled={row.teamApproval == true}
                            onChange={() => {
                                setMileagesNotApplicable(!mileagesNotApplicable)
                            }}
                        />
                        <label
                            class="form-check-label inline-block text-zinc-800"
                            for="checkNoIndex"
                        >
                            Next Mileages N/A
                        </label>
                    </div>
                    {!mileagesNotApplicable && (<div className='w-1/5'>
                        <TextInputLogin
                            label="Next Service Mileages"
                            type="number"
                            value={nextMileages}
                            placeholder="Mileages"
                            disabled={row.teamApproval == true}
                            isRequired
                            setNextMileages={setNextMileages}
                            setValue={setNextMileages}
                        />
                    </div>)} 
                </div>}
            </div>
        </>
    )
}

export default OperatorCard