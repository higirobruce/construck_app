import React from 'react'
import { DatePicker } from 'antd';
import MTextView from '../common/mTextView';
import { Dropdown } from 'semantic-ui-react';
import TextInputLogin from '../common/TextIputLogin';
import locations from '../../public/data/location.json';

const JobCard = (props) => {
    const {
        carPlate,
        startIndexNotApplicable,
        setEntryDate,
        setDriver,
        setCarPlate,
        setMileages,
        setLocation,
        setStartIndxNotApp,
        disableDate,
        disabledTime,
        viewPort,

        // Lists
        usersList,
        eqList,
        projectList
    } = props;

    return (
        <>
            {viewPort == 'new' ? (
                <div className='flex flex-col space-y-5'>
                    <div className='flex items-center justify-between'>
                        <div className='flex flex-row'>
                            <MTextView content={"Entry Date:"} />
                            <div className="text-sm text-red-600">*</div>
                        </div>
                        <div className='w-4/5'>
                            <DatePicker
                                format="YYYY-MM-DD HH:mm:ss"
                                disabledDate={disableDate}
                                disabledTime={disabledTime}
                                showTime
                                placeholder='Select Date / Time'
                                onChange={(values, dateStrings) => setEntryDate(dateStrings)}
                            />
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='flex flex-row'>
                            <MTextView content={"Driver/Operator:"} />
                            <div className="text-sm text-red-600">*</div>
                        </div>
                        <div className='w-4/5'>
                            <Dropdown 
                                placeholder='Driver name' 
                                search 
                                selection 
                                options={usersList.sort((a, b) => a.text.toLowerCase() < b.text.toLowerCase() ? -1 : a.text.toLowerCase() > b.text.toLowerCase() ? 1 : 0)}
                                className="w-1/3"
                                onChange={(e, data) => setDriver(
                                        usersList.filter((u) => u.key == data.value)[0]
                                    )
                                }
                            />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex flex-row'>
                            <MTextView content={"Plate Number:"} />
                            <div className="text-sm text-red-600">*</div>
                                {carPlate && (
                                    <div className="ml-2 rounded shadow-md">
                                    <MTextView
                                        content={carPlate.eqDescription}
                                        selected
                                    />
                                    </div>
                                )}
                        </div>
                        <div className='w-4/5 mt-2'>
                            <Dropdown 
                                placeholder='Car Plates' 
                                search 
                                selection 
                                options={eqList.sort((a, b) => a.text.toLowerCase() < b.text.toLowerCase() ? -1 : a.text.toLowerCase() > b.text.toLowerCase() ? 1 : 0).filter(item => item.eqStatus !== "workshop")}
                                className="w-1/3"
                                onChange={(e, data) => setCarPlate(
                                    eqList.filter((e) => e.key == data.value)[0]
                                )}
                            />
                        </div>
                    </div>
                    <div class="form-check">
                        <input
                            class="form-check-input float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 focus:outline-none focus:ring-0"
                            type="checkbox"
                            name="check"
                            id="checkNoIndex"
                            onChange={() => {
                                setStartIndxNotApp(!startIndexNotApplicable)
                            }}
                        />
                        <label
                            class="form-check-label inline-block text-zinc-800"
                            for="checkNoIndex"
                        >
                            Index N/A
                        </label>
                    </div>
                    {!startIndexNotApplicable && (<div className='w-2/5'>
                        <TextInputLogin
                            label="Index"
                            type="number"
                            placeholder="Mileages"
                            isRequired
                            setValue={setMileages}
                        />
                    </div>)}
                    <div className='flex items-center justify-between'>
                        <div className='flex flex-row'>
                            <MTextView content={"Repair Location:"} />
                            <div className="text-sm text-red-600">*</div>
                        </div>
                        <div className='w-4/5'>
                            <Dropdown 
                                placeholder='Choose location' 
                                search 
                                selection 
                                options={locations.map((item) => ({key: item['WORKSHOP'], value: item['WORKSHOP'], text: item['WORKSHOP']}))}
                                className="w-1/3"
                                onChange={(e, {value}) => setLocation(
                                    value
                                )}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <h4>Edit Mode</h4>
            )}
        </>
    )
}

export default JobCard