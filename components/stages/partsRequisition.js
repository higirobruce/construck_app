import React, { useEffect, useState } from 'react'
import { Select, Space } from 'antd'
import MTextView from '../common/mTextView'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const PartsRequisition = (props) => {
  const {
    sourceItem,
    mechanicalInspections,
    transferParts,
    transferData,
    inventoryItems,
    inventoryData,
    eqList,
    page,
    setTransferData,
    setTransferParts,
    setSourceItem,
    setInventoryItems,
    setInventoryData,
    setPage,
    reason,
    role,
    previousMode,
    setAssignIssue,
  } = props

  const [eqType, setEqType] = useState([])
  const [itemsPart, setItems] = useState([])

  const newUrl = process.env.NEXT_PUBLIC_BKEND_URL
  const apiUsername = process.env.NEXT_PUBLIC_API_USERNAME
  const apiPassword = process.env.NEXT_PUBLIC_API_PASSWORD

  const populateItems = () => {
    fetch(`${newUrl}/api/items`, {
      headers: {
        Authorization: 'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setItems(res.items)
      })
      .catch((err) => {
        toast.error(err)
      })
  }

  const handleInventory = (value, i) => {
    let newData = [...inventoryItems]

    if (newData[i] == undefined) {
      newData = [...newData, { value: '', index: 0 }]
    }

    newData[i]['value'] = value
    newData[i]['index'] = i

    setInventoryItems(newData)

    for (let i = 0; i <= mechanicalInspections.length; i++) {
      if (inventoryItems.length < mechanicalInspections.length) {
        setInventoryItems([...inventoryItems, { value: '', index: i }])
      }
    }

    if (inventoryData[i]) {
      let foundInventory = inventoryData
      let newInventory = [...inventoryData[i]]

      let updatedInventory = [
        ...newInventory,
        { issue: '', item: '', qty: '', recQty: '' },
      ]

      // Remove existing
      foundInventory.splice(i, 1)

      // Add new array
      foundInventory.splice(i, 0, updatedInventory)

      setInventoryData([
        ...foundInventory,
        [{ issue: '', item: '', qty: '', recQty: '' }],
      ])
    } else {
      setInventoryData([
        ...inventoryData,
        [{ issue: '', item: '', qty: '', recQty: '' }],
      ])
    }
  }

  const handleQuantity = ({ target }, key, inventory, i, item) => {
    if (target.value < 1) return

    let newData = [...inventoryData]

    if (newData[i] && newData[i][key]) {
      newData[i][key]['issue'] = item
      newData[i][key]['item'] = inventory
      newData[i][key][target.name] = target.value
    }

    setInventoryData(newData)
  }

  const handleReceivedQty = ({ target }, key, inventory, i, item) => {
    if (+target.value > +inventoryData[i][key]['qty'] || target.value < 0)
      return

    let newData = [...inventoryData]

    if (newData[i]) {
      newData[i][key][target.name] = target.value
    }

    setInventoryData(newData)
  }

  const handleTransfers = (value) => {
    for (let i = 0; i <= transferParts.length; i++) {
      setTransferData([...transferData, { parts: '', from: '', qty: '' }])
    }
    setTransferParts(value)

    if (transferData.length > value.length) {
      const validParts = transferData.filter(
        (item) => item.parts == value.map((val) => val)
      )
      setTransferData(validParts)
    }
  }

  const handleTransferQty = ({ target }, i) => {
    if (target.value < 1) return
    const newData = [...transferData]
    newData[i]['qty'] = target.value
    setTransferData(newData)
  }

  const handleChange = (value, part, i) => {
    const foundItem = eqList.filter(({ text }) => value == text)
    const updatedEqList = [...eqType]

    if (updatedEqList && updatedEqList[i]) {
      if (updatedEqList[i]['text'] != value) {
        updatedEqList[i]['eqDescription'] = foundItem[0]['eqDescription']
        updatedEqList[i]['eqStatus'] = foundItem[0]['eqStatus']
        updatedEqList[i]['key'] = foundItem[0]['key']
        updatedEqList[i]['status'] = foundItem[0]['status']
        updatedEqList[i]['text'] = foundItem[0]['text']
        updatedEqList[i]['value'] = foundItem[0]['value']
        setEqType(updatedEqList)
      }
    } else {
      setEqType([...eqType, foundItem])
    }

    let newData = [...transferData]

    newData[i]['from'] = value
    newData[i].parts = part
    newData[i]['qty'] = 1

    setTransferData(newData)
  }

  useEffect(() => {
    let foundItem

    transferData.map((transfer, i) => {
      foundItem = eqList.filter(({ text }) => transfer['from'] == text)
      setEqType((prevState) => [...prevState, foundItem[0]])
    })

    let aIssues = []

    mechanicalInspections.map((issue) => {
      let assignedIssue = {
        endRepair: null,
        issue,
        mech: [],
        startRepair: null,
      }

      aIssues.push(assignedIssue)
    })

    setAssignIssue(aIssues)
    populateItems()
  }, [])

  const handleSource = (value) => {
    setSourceItem(value)
  }

  return (
    <div className="flex flex-col space-y-10">
      {reason && (
        <div
          class="mr-5 mt-3 flex items-center bg-orange-100 px-5 py-2 text-sm font-bold text-orange-500"
          role="alert"
        >
          <ExclamationTriangleIcon width={14} /> &nbsp;&nbsp;
          <p>{reason}</p>
        </div>
      )}
      {page == 4 ? (
        <div className="flex items-center space-x-10">
          <div className="flex flex-row">
            <MTextView content={'Source of Parts:'} />
            <div className="text-sm text-red-600">*</div>
          </div>
          <div className="w-2/3">
            <Select
              style={{ width: '50%' }}
              placeholder="Select the tools you want"
              defaultValue={sourceItem}
              disabled={true}
              optionLabelProp="label"
            >
              {['No parts needed', 'Inventory', 'Transfer'].map((item, i) => (
                <Option key={i} value={item} label={item}>
                  <Space>{item}</Space>
                </Option>
              ))}
            </Select>
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-10">
          <div className="flex flex-row">
            <MTextView content={'Source of Parts:'} />
            <div className="text-sm text-red-600">*</div>
          </div>
          <div className="w-2/3">
            <Select
              style={{ width: '100%' }}
              placeholder="Select the tools you want"
              defaultValue={sourceItem}
              onChange={handleSource}
              disabled={previousMode && role != 'workshop-support'}
              optionLabelProp="label"
            >
              {['No Parts Required', 'Inventory', 'Transfer'].map((item, i) => (
                <Option key={i} value={item} label={item}>
                  <Space>{item}</Space>
                </Option>
              ))}
            </Select>
          </div>
        </div>
      )}
      {sourceItem == 'Transfer' && (
        <div className="flex items-center space-x-10">
          <div className="flex flex-row">
            <MTextView content={'Parts to transfer:'} />
            <div className="text-sm text-red-600">*</div>
          </div>
          <div className="w-2/3">
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Select parts to transfer"
              defaultValue={transferParts.length > 0 ? transferParts : []}
              disabled={previousMode && role != 'workshop-support'}
              onChange={handleTransfers}
              optionLabelProp="label"
            >
              {itemsPart
                .sort((a, b) =>
                  a['ITEM & PART'].toLowerCase() <
                  b['ITEM & PART'].toLowerCase()
                    ? -1
                    : a['ITEM & PART'].toLowerCase() >
                      b['ITEM & PART'].toLowerCase()
                    ? 1
                    : 0
                )
                .map((item, i) => (
                  <Option
                    key={i}
                    value={item['ITEM & PART']}
                    label={item['ITEM & PART']}
                  >
                    <Space>{item['ITEM & PART']}</Space>
                  </Option>
                ))}
            </Select>
          </div>
        </div>
      )}
      {sourceItem == 'Transfer' &&
        transferParts.length > 0 &&
        transferParts.map((item, i) => (
          <div className="w-full">
            <div className="flex items-center space-x-5">
              <span>{item}</span>
              <div className="flex w-2/3 items-center space-x-5">
                <div className="flex w-full flex-col space-y-1">
                  <div className="flex flex-row items-center">
                    <MTextView content={'From'} />
                    <div className="text-sm text-red-600">*</div>
                    {eqType[i] && (
                      <div className="ml-2 rounded shadow-md">
                        <MTextView
                          content={
                            eqType[i].eqDescription ||
                            eqType[i][0].eqDescription
                          }
                          selected
                        />
                      </div>
                    )}
                  </div>
                  <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Parts transfer from"
                    defaultValue={
                      transferData.length > 0 ? transferData[i]['from'] : []
                    }
                    onChange={(value) => handleChange(value, item, i)}
                    disabled={previousMode && role != 'workshop-support'}
                    optionLabelProp="label"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {eqList
                      .filter((item) => item.eqStatus == 'workshop')
                      .map((item, i) => (
                        <Option key={i} value={item.text} label={item.text}>
                          <Space>{item.text}</Space>
                        </Option>
                      ))}
                  </Select>
                </div>
                <div className="flex w-1/3 flex-col space-y-1">
                  <div className="flex flex-row items-center">
                    <MTextView content={'Quantity'} />
                    <div className="text-sm text-red-600">*</div>
                  </div>
                  <input
                    className="w-full rounded-sm border-gray-100 py-2.5 px-3 text-sm font-medium shadow-none ring-1 ring-gray-200 transition duration-200 ease-in-out hover:ring-1 hover:ring-gray-400 focus:outline-none focus:ring-blue-300"
                    onChange={(e) => handleTransferQty(e, i)}
                    name="qty"
                    value={
                      transferData && transferData[i] && transferData[i]['qty']
                    }
                    type={'number'}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      {sourceItem == 'Inventory' && (
        <div className="grid grid-cols-1 gap-4">
          {mechanicalInspections.map((item, i) => (
            <>
              {page == 4 ? (
                <div className="rounded border border-gray-200 bg-white px-6 pt-2 pb-5 shadow hover:bg-gray-200">
                  <h6>{item}</h6>
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    className="mb-20"
                    placeholder="Select Items for this part"
                    disabled
                    defaultValue={
                      inventoryItems.length > 0
                        ? inventoryItems[i] &&
                          inventoryItems[i].value &&
                          inventoryItems[i].value
                        : []
                    }
                  >
                    {itemsPart
                      .sort((a, b) =>
                        a['ITEM & PART'].toLowerCase() <
                        b['ITEM & PART'].toLowerCase()
                          ? -1
                          : a['ITEM & PART'].toLowerCase() >
                            b['ITEM & PART'].toLowerCase()
                          ? 1
                          : 0
                      )
                      .map((item, i) => (
                        <Option
                          key={i}
                          value={item['ITEM & PART']}
                          label={item['ITEM & PART']}
                        >
                          <Space>{item['ITEM & PART']}</Space>
                        </Option>
                      ))}
                  </Select>
                  {inventoryItems.length > 0 &&
                    inventoryItems[i] &&
                    inventoryItems[i].value &&
                    inventoryItems[i].value.length > 0 &&
                    inventoryItems[i].value.map((inventory, key) => (
                      <div className="mt-4 flex items-center space-x-4">
                        <h6 className="w-1/3">{inventory}</h6>
                        <div className="flex w-1/2 flex-col space-y-1">
                          <div className="flex flex-row items-center">
                            <MTextView content={'Requested Qty'} />
                            <div className="text-sm text-red-600">*</div>
                          </div>
                          <input
                            className="w-1/2 rounded-sm border-gray-100 py-2.5 px-3 text-sm font-medium shadow-none ring-1 ring-gray-200 transition duration-200 ease-in-out hover:ring-1 hover:ring-gray-400 focus:outline-none focus:ring-blue-300"
                            // onChange={(e) => handleQuantity(e, key, inventory, i, item)}
                            disabled
                            value={
                              inventoryData[i][key] && inventoryData[i][key].qty
                            }
                            name="qty"
                            type={'number'}
                          />
                        </div>
                        <div className="flex w-1/2 flex-col space-y-1">
                          <div className="flex flex-row items-center">
                            <MTextView content={'Received Qty'} />
                            <div className="text-sm text-red-600">*</div>
                          </div>
                          <input
                            className="w-1/2 rounded-sm border-gray-100 py-2.5 px-3 text-sm font-medium shadow-none ring-1 ring-gray-200 transition duration-200 ease-in-out hover:ring-1 hover:ring-gray-400 focus:outline-none focus:ring-blue-300"
                            onChange={(e) =>
                              handleReceivedQty(e, key, inventory, i, item)
                            }
                            value={
                              inventoryData[i][key] &&
                              inventoryData[i][key].recQty
                            }
                            name="recQty"
                            type={'number'}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="rounded border border-gray-200 bg-white px-6 pt-2 pb-5 shadow hover:bg-gray-200">
                  <h6>{item}</h6>
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    className="mb-20"
                    placeholder="Select Items for this part"
                    defaultValue={
                      inventoryItems.length < 1 ||
                      inventoryItems[0]['value'] == ''
                        ? []
                        : inventoryItems[i] &&
                          inventoryItems[i].value &&
                          inventoryItems[i].value
                    }
                    disabled={previousMode && role != 'workshop-support'}
                    onChange={(value) => handleInventory(value, i)}
                  >
                    {itemsPart
                      .sort((a, b) =>
                        a['ITEM & PART'].toLowerCase() <
                        b['ITEM & PART'].toLowerCase()
                          ? -1
                          : a['ITEM & PART'].toLowerCase() >
                            b['ITEM & PART'].toLowerCase()
                          ? 1
                          : 0
                      )
                      .map((item, i) => (
                        <Option
                          key={i}
                          value={item['ITEM & PART']}
                          label={item['ITEM & PART']}
                        >
                          <Space>{item['ITEM & PART']}</Space>
                        </Option>
                      ))}
                  </Select>
                  {inventoryItems.length > 0 &&
                    inventoryItems[i] &&
                    inventoryItems[i].value &&
                    inventoryItems[i].value.length > 0 &&
                    inventoryItems[i].value.map((inventory, key) => (
                      <div className="mt-4 flex items-center space-x-4">
                        <h6>{inventory}</h6>
                        <div className="flex w-full flex-col space-y-1">
                          <div className="flex flex-row items-center">
                            <MTextView content={'Quantity'} />
                            <div className="text-sm text-red-600">*</div>
                          </div>
                          <input
                            className="rounded-sm border-gray-100 py-2.5 px-3 text-sm font-medium shadow-none ring-1 ring-gray-200 transition duration-200 ease-in-out hover:ring-1 hover:ring-gray-400 focus:outline-none focus:ring-blue-300"
                            onChange={(e) =>
                              handleQuantity(e, key, inventory, i, item)
                            }
                            value={
                              inventoryData &&
                              inventoryData[i] &&
                              inventoryData[i][key] &&
                              inventoryData[i][key].qty
                            }
                            name="qty"
                            type={'number'}
                            disabled={
                              previousMode && role != 'workshop-support'
                            }
                          />
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </>
          ))}
        </div>
      )}
    </div>
  )
}

export default PartsRequisition
