import React, { useEffect, useState } from 'react'
import { Checkbox, Select, Space } from 'antd';
import MTextView from '../common/mTextView';

const tools = [
    {label: 'Fire extinguisher', value: 'Fire extinguisher'},
    {label: 'Wheel spanner', value: 'Wheel spanner'},
    {label: 'Triangle', value: 'Triangle'},
    {label: 'Jack', value: 'Jack'},
    {label: 'Air pipe', value: 'Air pipe'},
    {label: 'Crank Handle Tire Spare', value: 'Crank Handle Tire Spare'}
]

const InspectionDiagnosis = (props) => {
    const {
        inspectionTools,
        mechanicalInspections,
        setInspectionTools,
        setMechanicalInspections,
        role,
        previousMode
    } = props;

    const [mechanicIssues, setMechanicals] = useState([]);

    const newUrl = process.env.NEXT_PUBLIC_BKEND_URL
    const apiUsername = process.env.NEXT_PUBLIC_API_USERNAME
    const apiPassword = process.env.NEXT_PUBLIC_API_PASSWORD


    const { Option } = Select;

    const handleChange = (value) => {
        setMechanicalInspections(value)
    };

    const populateMechanicals = () => {
        fetch(`${newUrl}/api/mechanicals`, {
            headers: {
              Authorization: 'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
            }
        })
        .then((res) => res.json())
        .then(res => {
          setMechanicals(res.mechanicals);
        })
        .catch((err) => {
          toast.error(err)
        })
    }

    const onChange = (checkedValues ) => {
        setInspectionTools(checkedValues);
    };

    useEffect(() => {
        populateMechanicals();
    }, [])

    return (
        <div className='flex flex-col space-y-10'>
            <div className='flex items-center justify-between'>
                <div className='flex flex-row'>
                    <MTextView content={"Tools:"} />
                    <div className="text-sm text-red-600">*</div>
                </div>
                <div className='w-4/5'>
                    <Checkbox.Group options={tools} defaultValue={inspectionTools} disabled={previousMode && role != 'workshop-support'} onChange={onChange} />
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex flex-row'>
                    <MTextView content={"Mechanical Issues:"} />
                    <div className="text-sm text-red-600">*</div>
                </div>
                <div className='w-4/5'>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Select the tools you want"
                        defaultValue={mechanicalInspections}
                        onChange={handleChange}
                        disabled={previousMode && role != 'workshop-support'}
                        optionLabelProp="label"
                    >   
                        {mechanicIssues
                            .sort((a, b) => a['SERVICE'].toLowerCase() < b['SERVICE'].toLowerCase() ? -1 : a['SERVICE'].toLowerCase() > b['SERVICE'].toLowerCase() ? 1 : 0)
                            .map((item, i) => (
                                <Option key={i} value={item['SERVICE']} label={item['SERVICE']}>
                                    <Space>
                                        {item['SERVICE']}
                                    </Space>
                                </Option>
                        ))}
                    </Select>
                </div>
            </div>
        </div>
    )
}

export default InspectionDiagnosis