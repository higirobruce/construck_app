import React from 'react';
import { Select, Space } from 'antd';
import MTextView from '../common/mTextView';

const Testing = (props) => {
  const {
    userList,
    operator,
    setOperator,
    operatorNotApplicable,
    setOperatorNotApp
  } = props;

  return (
    <>
      <div className='flex flex-col w-full space-x-3 my-4 p-4'>
        <div class="form-check mb-10 ml-3">
          <input
              class="form-check-input float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 focus:outline-none focus:ring-0"
              type="checkbox"
              name="check"
              id="checkNoIndex"
              checked={operatorNotApplicable}
              onChange={() => {
                  setOperatorNotApp(!operatorNotApplicable)
              }}
          />
          <label
              class="form-check-label inline-block text-zinc-800"
              for="checkNoIndex"
          >
              Operator N/A
          </label>
        </div>
        {!operatorNotApplicable && <div className='flex items-center'>
          <div className='flex flex-row'>
            <MTextView content={"Assign Driver/Operator:"} />
            <div className="text-sm text-red-600">*</div>
          </div>
          <div className='ml-3 w-full'>
            <Select
              showSearch
              className={"rounded-2xl w-1/3"}
              onChange={(value) => setOperator(value)}
              placeholder="Driver/Operator"
              defaultValue={(operator && operator.length > 0) ? operator : ''}
              optionLabelProp='label'
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
            >
              {userList.map((item, i) => (
                <Select.Option key={i} value={item.text} label={item.text}>
                  <Space>
                    {item.text}
                  </Space>
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>}
      </div>
    </>
  )
}

export default Testing