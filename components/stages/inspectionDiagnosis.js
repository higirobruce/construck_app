import React from 'react'
import { Checkbox, Select, Space } from 'antd';
import MTextView from '../common/mTextView';
import mechanicIssues from '../../public/data/mechanicIssue.json'

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
        setMechanicalInspections
    } = props;

    const { Option } = Select;

    const handleChange = (value) => {
        setMechanicalInspections(value)
    };

    const onChange = (checkedValues ) => {
        setInspectionTools(checkedValues);
    };

    return (
        <div className='flex flex-col space-y-10'>
            <div className='flex items-center justify-between'>
                <div className='flex flex-row'>
                    <MTextView content={"Tools:"} />
                    <div className="text-sm text-red-600">*</div>
                </div>
                <div className='w-4/5'>
                    <Checkbox.Group options={tools} defaultValue={inspectionTools} onChange={onChange} />
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
                        optionLabelProp="label"
                    >   
                        {mechanicIssues.map((item, i) => (
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