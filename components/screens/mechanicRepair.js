import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { DatePicker } from 'antd';
import MTextView from '../common/mTextView';
import { toast } from 'react-toastify';
import JobCard from '../common/jobCard';
import MSubmitButton from '../common/mSubmitButton';
import dayjs from 'dayjs';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const MechanicRepair = () => {

    const canCreateData = true;

    const [repairCard, setRepairCard] = useState([]);
    const [myRepair, setMyRepair] = useState([]);
    const [viewPort, setViewPort] = useState('list');
    const [search, setSearch] = useState('')
    const [row, setRow] = useState('');
    const [repairRow, setRepairRow] = useState('')

    // Form States
    const [startRepair, setStartRepair] = useState('');
    const [endRepair, setEndRepair] = useState('');

    const newUrl = process.env.NEXT_PUBLIC_BKEND_URL
    const apiUsername = process.env.NEXT_PUBLIC_API_USERNAME
    const apiPassword = process.env.NEXT_PUBLIC_API_PASSWORD

    const range = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
    };

    const disableDate = (current) => {
        return current && current > dayjs().endOf('day');
    }

    const disableCustomTime = (current) => ({
        disabledHours: () => (
            ((new Date()).getFullYear() == (new Date(startRepair)).getFullYear()
            && (new Date()).getMonth() == (new Date(startRepair)).getMonth()
            && (new Date()).getDate() == (new Date(startRepair)).getDate())
            ? range(0, (new Date()).getHours())
            : range((new Date()).getHours() + 1, 24)
        ),
        disabledMinutes: () => (
            ((new Date()).getFullYear() == (new Date(startRepair)).getFullYear()
            && (new Date()).getMonth() == (new Date(startRepair)).getMonth()
            && ((new Date()).getDate() == (new Date(startRepair)).getDate()) 
            && ((new Date()).getHours() == (new Date(startRepair)).getHours())))
            ? range(1, (new Date(startRepair)).getMinutes() + 1) 
            : range((new Date()).getMinutes() + 2, 60),
        disabledSeconds: () => [55, 56],    
    })

    const disabledTime = (current) => ({
        disabledHours: () => range((new Date()).getHours() + 1, 24),
        disabledMinutes: () => range((new Date()).getMinutes() + 2, 60),
        disabledSeconds: () => [55, 56],
    })

    const populateRepairCard = () => {
        fetch(`${newUrl}/api/maintenance`, {
            headers: {
                Authorization: 'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
            },
        })
        .then(res => res.json())
        .then(res => (
            setRepairCard(res)
        ))
        .catch((err) => {
            toast.error(err)
        })
    }

    const populateMyRepair = () => {
        fetch(`${newUrl}/api/repairs`, {
            headers: {
                Authorization: 'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
            },
        })
        .then(res => res.json())
        .then(res => (
            setMyRepair(res)
        ))
        .catch((err) => {
            toast.error(err)
        })
    }

    const setRepairCardToUpdate = (data) => {
        setRow(data)
        setStartRepair(data.startTime);
        setEndRepair(data.finishTime)
        setViewPort('change');
    }

    const handleSubmit = () => {
        if(startRepair && !endRepair) {
            const payload = {
                jobCard_id: row._id,
                startRepair
            }

            fetch(`${newUrl}/api/repairs`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
                },
                body: JSON.stringify({
                  payload
                }),
              })
            .then((res) => res.json())
            .then((res) => {
                setRepairRow(res)
                populateMyRepair();
                populateRepairCard();
                setViewPort('list');
            })
            .catch((err) => toast.error('Error Occured!'))
        } else {
            const payload = {
                jobCard: row,
                startRepair,
                endRepair
            }
            fetch(`${newUrl}/api/repairs/${row._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
                },
                body: JSON.stringify({payload})
            })
            .then(res => res.json())
            .then(res => {
                populateMyRepair();
                populateRepairCard();
                setViewPort('list');
            })
            .catch(err => toast.error(err));
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    useEffect(() => {
        populateRepairCard()
        populateMyRepair();
    }, []);

    const getData = () => {

        let mergedArray = myRepair.filter(({jobCard}) => {
            let matchingItem2 = repairCard.find(item2 => item2.plate.key === jobCard.plate.key);
            if (matchingItem2) {
              return true;
            }
            return false;
        }).concat(repairCard.filter((item2) => !myRepair.some(({jobCard}) => jobCard.plate.key === item2.plate.key)));

        let filtered = mergedArray;
        if(search)
            filtered = repairCard.filter(repairCard => 
                repairCard.plate.text.toLowerCase().includes(search.toLowerCase()) 
                ||
                repairCard.jobCard_Id.toLowerCase().includes(search.toLowerCase())
                ||
                repairCard.driver.text.toLowerCase().includes(search.toLowerCase())
            )
        return {totalCount: filtered.length, data: filtered}
    }

    return (
        <div className='my-5 flex flex-col space-y-5 px-10'>
            <div className="text-2xl font-semibold">
                {viewPort == 'list' ? 'My Repairs List' : `Start Repair: ${row.jobCard_id} `}
            </div>
            <div className="flex w-full flex-row items-center justify-between space-x-4">
                {(viewPort === 'change') && (
                    <MSubmitButton
                        submit={() => {
                            populateRepairCard();
                            populateMyRepair();
                            setViewPort('list')
                        }}
                        intent="primary"
                        icon={<ArrowLeftIcon className="h-5 w-5 text-zinc-800" />}
                        label="Back"
                    />
                )}
            </div>
            {viewPort === 'list' && (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {getData().totalCount > 0 ? getData().data.map((c) => {
                        return(
                            <JobCard
                                data={{
                                    _id: c._id,
                                    status: c.status || c.jobCard.status,
                                    jobCard_id: c.jobCard_Id || c.jobCard.jobCard_Id,
                                    finishTime: c.endRepair,
                                    startTime: c.startRepair,
                                    plate: c.plate || c.jobCard.plate,
                                    driver: c.driver || c.jobCard.driver,
                                    location: c.location || c.jobCard.location,
                                    entryDate: c.entryDate || c.jobCard.entryDate,
                                    // mileages: c.mileage || c.jobCard.mileage,
                                    inspectionTools: c.inspectionTools || c.jobCard.inspectionTools,
                                    mechanicalInspections: c.mechanicalInspections || c.jobCard.mechanicalInspections,
                                    assignIssue: c.assignIssue || c.jobCard.assignIssue
                                }}
                                updateMe={setRepairCardToUpdate}
                                canCreateData={canCreateData}
                            />
                        )
                    }): (<h5 className='text-center'>No Data ...</h5>)}
                </div>
            )}
            {viewPort == 'change' && (
                <div className='flex flex-col space-y-5 pt-5'>
                    <div className='flex items-center justify-between'>
                        <div className='flex flex-row'>
                            <MTextView content={"Start Repair Time:"} />
                            <div className="text-sm text-red-600">*</div>
                        </div>
                        <div className='w-4/5'>
                            <DatePicker
                                format="YYYY-MM-DD HH:mm:ss"
                                disabledDate={disableDate}
                                disabledTime={disabledTime}
                                showTime
                                value={startRepair && moment(startRepair)}
                                placeholder='Select Date / Time'
                                onChange={(values, dateStrings) => setStartRepair(dateStrings)}
                            />
                        </div>
                    </div>
                    {startRepair && <div className='flex items-center justify-between'>
                        <div className='flex flex-row'>
                            <MTextView content={"End Repair Time:"} />
                            <div className="text-sm text-red-600">*</div>
                        </div>
                        <div className='w-4/5'>
                            <DatePicker
                                format="YYYY-MM-DD HH:mm:ss"
                                disabledDate={disableDate}
                                disabledTime={disableCustomTime}
                                showTime
                                placeholder='Select Date / Time'
                                onChange={(values, dateStrings) => setEndRepair(dateStrings)}
                            />
                        </div>
                    </div>}
                    <div className='mt-5 w-1/2'>
                        <MSubmitButton submit={handleSubmit} label={`Save & Continue`} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default MechanicRepair