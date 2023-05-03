import React, { useEffect, useState } from 'react'
import MSubmitButton from '../common/mSubmitButton';
import { PlusIcon } from '@heroicons/react/24/solid';
import TextInput from '../common/TextIput';
import { AdjustmentsVerticalIcon, ArrowDownTrayIcon, ArrowLeftIcon, ArrowPathRoundedSquareIcon, CheckIcon, ClockIcon, FolderPlusIcon, ListBulletIcon, QueueListIcon, UsersIcon, WrenchScrewdriverIcon, XCircleIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import { toast, ToastContainer } from 'react-toastify';
import JobCard from '../common/jobCard';
import JobCards from '../stages/jobCard';
import PartsRequisitions from '../stages/partsRequisition';
import InspectionDiagnosis from '../stages/inspectionDiagnosis';
import Repair from '../stages/repair';
import Testing from '../stages/testing';
import GatePass from '../stages/gatePass';
import MainStatusCard from '../common/mainStatusCard';
import { Modal, Button, Dropdown, Popconfirm } from 'antd';
import moment from 'moment';
import MTextView from '../common/mTextView';
import PrintableItems from '../stages/printableItems';
import OperatorCard from '../common/operatorCard';
import * as XLSX from 'xlsx'
import * as FileSaver from 'file-saver'

const Maintenance = () => {
    
    const canCreateData = true;
    const role = JSON.parse(localStorage.getItem('user')).userType;
    const text = 'Are you sure to approve the request of parts?';
    const textConfirm = 'Are you sure you want to save this action and proceed?';

    const [filterBy, setFilterBy] = useState('all');
    const [nAvailable, setNAvailable] = useState(0);
    const [nApproved, setNApproved] = useState(0);
    const [nCanceled, setNCanceled] = useState(0);
    const [nEntry, setNEntry] = useState(0);
    const [nDiagnosis, setNDiagnosis] = useState(0);
    const [nParts, setNParts] = useState(0);
    const [nRepair, setNRepair] = useState(0);
    const [nTesting, setNTesting] = useState(0);
    const [nClosed, setNClosed] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previousMode, setPreviousMode] = useState(false);

    const [viewPort, setViewPort] = useState('list');
    const [search, setSearch] = useState('');
    const [projectList, setProjectList] = useState([]);
    const [eqList, setEqList] = useState([]);
    const [usersList, setUsers] = useState([]);
    const [jobCards, setJobCards] = useState([]);
    const [jobLogCards, setJobLogCards] = useState([]);
    const [row, setRow] = useState('');
    const [existingRow, setExistingRow] = useState('')
    const [page, setPage] = useState(0);
    const [isReason, setIsReason] = useState(false);
    const [checkReason, setCheckReason] = useState(false);
    const [updatedAt, setUpdatedAt] = useState('');
    const [loading, setLoading] = useState(false);

    // Form States
    const [entryDate, setEntryDate] = useState('');
    const [driver, setDriver] = useState('');
    const [carPlate, setCarPlate] = useState('');
    const [mileages, setMileages] = useState('');
    const [location, setLocation] = useState('');
    const [startRepair, setStartRepair] = useState('');
    const [endRepair, setEndRepair] = useState('');
    const [inspectionTools, setInspectionTools] = useState([]);
    const [mechanicalInspections, setMechanicalInspections] = useState([]);
    const [startIndexNotApplicable, setStartIndxNotApp] = useState(false);
    const [sourceItem, setSourceItem] = useState('');
    const [operator, setOperator] = useState('')
    const [assignIssue, setAssignIssue] = useState([]);
    const [itemsRequest, setItemsRequest] = useState([]);
    const [transferParts, setTransferParts] = useState([]);
    const [transferData, setTransferData] = useState([]);
    const [inventoryItems, setInventoryItems] = useState([{value: '', index: 0}]);
    const [inventoryData, setInventoryData] = useState([]);
    const [reason, setReason] = useState('');
    const [isViewed, setIsViewed] = useState('not viewed');
    const [operatorApproval, setOperatorApproval] = useState([]);
    const [teamApproval, setTeamApproval] = useState(false);
    const [supervisorApproval, setSupervisorApproval] = useState(false);
    const [operatorNotApplicable, setOperatorNotApp] = useState(false);
    const [mileagesNotApplicable, setMileagesNotApplicable] = useState(false);
    const [nextMileages, setNextMileages] = useState('')

    const url = process.env.NEXT_PUBLIC_BKEND_URL
    const newUrl = process.env.NEXT_PUBLIC_BKEND_URL
    const apiUsername = process.env.NEXT_PUBLIC_API_USERNAME
    const apiPassword = process.env.NEXT_PUBLIC_API_PASSWORD
    let foundItem = '';

    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const exportToCSV = (apiData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(apiData)
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, fileName + fileExtension)
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsViewed(isViewed == 'new request' ? 'approved new request' : 'approved')
        setIsReason(false);
        setCheckReason(false);
        setReason('');
        setIsModalOpen(false);
        setPage(4);
        handleUpdate();
        // role != 'workshop-support' && handleLogsUpdate()
    };

    const handleApproveReject = () => {
        setCheckReason(false);
        setPage(4);
        setIsModalOpen(false);
        handleUpdate();
        // role != 'workshop-support' && handleLogsUpdate()
    }

    const handleCancel = () => {
        setIsReason(false);
        setIsModalOpen(false);
    };
    
    const handleReject = () => {
        setIsReason(true);
        setCheckReason(false);
        setCheckReason(true);
    }

    const emptyState = () => {
        setEntryDate('');
        setMileages('');
        setDriver('');
        setCarPlate('');
        setLocation('');
        setInspectionTools([]);
        setMechanicalInspections([]);
        setStartIndxNotApp(false);
        setSourceItem('');
        setAssignIssue([]);
        setItemsRequest([]);
        setTransferParts([]);
        setTransferData([]);
        setInventoryItems([{value: '', index: 0}]);
        setInventoryData([]);
        setIsReason(false);
        setReason('');
        setIsViewed('not viewed');
        setOperatorApproval([]);
        setTeamApproval(false);
        setSupervisorApproval(false)
        setStartRepair('');
        setEndRepair('');
        setOperatorNotApp(false);
    }

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

    // const disableCustomTime = (current) => ({
    //     disabledHours: () => (
    //         ((new Date()).getFullYear() == (new Date(startRepair)).getFullYear()
    //         && (new Date()).getMonth() == (new Date(startRepair)).getMonth()
    //         && (new Date()).getDate() == (new Date(startRepair)).getDate())
    //         ? range(0, (new Date()).getHours())
    //         : range((new Date()).getHours() + 1, 24)
    //     ),
    //     disabledMinutes: () => (
    //         ((new Date()).getFullYear() == (new Date(startRepair)).getFullYear()
    //         && (new Date()).getMonth() == (new Date(startRepair)).getMonth()
    //         && ((new Date()).getDate() == (new Date(startRepair)).getDate()) 
    //         && ((new Date()).getHours() == (new Date(startRepair)).getHours())))
    //         ? range(1, (new Date(startRepair)).getMinutes() + 1) 
    //         : range((new Date()).getMinutes() + 2, 60),
    //     disabledSeconds: () => [55, 56],    
    // })

    const disabledTime = (current) => ({
        disabledHours: () => range((new Date()).getHours() + 1, 24),
        disabledMinutes: () => range((new Date()).getMinutes() + 2, 60),
        disabledSeconds: () => [55, 56],
    })

    const setJobCardsToUpdate = async (data) => {
        setRow(data)
        setExistingRow(prevState => prevState != '' ? data : prevState )
        setEntryDate(data.entryDate)
        setCarPlate(data.plate)
        setDriver(data.driver)
        setLocation(data.location)
        setStartRepair(data.startTime)
        setOperator(data.operator);
        setEndRepair(data.finishTime)
        setMileages(data.mileages)
        setInspectionTools(data.inspectionTools)
        setMechanicalInspections(data.mechanicalInspections)
        setAssignIssue(data.assignIssue)
        setTeamApproval(data.teamApproval)
        setInventoryData(data.inventoryData)
        setInventoryItems(data.inventoryItems.length < 1 ? [{value: '', index: 0}] : data.inventoryItems)
        setTransferData(data.transferData)
        setSourceItem(data.sourceItem)
        setTransferParts(data.transferParts)
        setReason(data.reason)
        setIsViewed(data.isViewed)
        setOperatorApproval(data.operatorApproval)
        setSupervisorApproval(data.supervisorApproval)
        setUpdatedAt(data.updated_At)
        setOperatorNotApp(data.operatorNotApplicable)
        setPage(
            role == 'workshop-support' && (data.status != 'pass' && data.status != 'requisition')
            ? 1
            : (data && data.status) == 'entry'
            ? 1 
            : (data && data.status) == 'diagnosis'
            ? 2
            : (role == 'workshop-support' && (data && data.status) == 'requisition' && data.isViewed == 'approved new request')
            ? 3
            : (role != 'workshop-support' && (data && data.status) == 'requisition' && data.isViewed == 'approved')
            ? 3
            : (role != 'workshop-support' && (data && data.status) == 'requisition' && data.sourceItem == 'Transfer' && data.isViewed == 'approved')
            ? 3
            : (data && data.status) == 'requisition'
            ? 2
            : ((data && data.status) == 'repair' && (data.finishTime) && data.finishTime.length > 1)
            ? 6
            : (data && data.status) == 'repair'
            ? 5
            : (data && data.jobCard_status) == 'closed'
            ? 7
            : (data && data.status) == 'testing'
            ? 6
            : (data && data.status) == 'pass'
            ? 7
            : 0
        )
        setMileagesNotApplicable(data.mileagesNotApplicable);
        setNextMileages(data.nextMileages);
        
        if((role == 'workshop-manager' && (data && data.status) && data.status == 'requisition')) {
            showModal()
        } else if(role == 'operatorOfficer' || role == 'workshop-team-leader' || (role == 'workshop-supervisor' && data.jobCard_status == 'opened')) {
            setViewPort('operatorView');
        } else {
            setViewPort((data && data.status) && 'change');
        }
    }

    const download = (query) => {
        fetch(`${newUrl}/api/maintenance`, {
            headers: {
                Authorization: 'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
            }
        })
        .then((res) => res.json())
        .then((res) => {
            let data = [];

            if(query == 'general') {
                data = res.flatMap((obj) => {
                    if(obj.sourceItem == 'Inventory') {
                        return obj.inventoryData.map((subObj) => {
                            return subObj.map((anotherSub) => {
                                return {
                                    'jobCard-Id': obj.jobCard_Id,
                                    'entry Date': moment(obj.entryDate).format('DD-MMMM-YYYY LT'),
                                    'driver / Operator': obj.operator,
                                    'location': obj.location,
                                    'mileages': obj.mileage,
                                    'mechanical Issue': anotherSub.issue,
                                    'plate number': obj.plate.text,
                                    'source of parts': obj.sourceItem,
                                    'parts requested': anotherSub.item,
                                    'quantity requested': anotherSub.qty,
                                    'quantity received': anotherSub.recQty,
                                    'status': obj.status,
                                    'end repair': obj.endRepair && moment(obj.endRepair).format('DD-MMMM-YYYY LT'),
                                    'mechanics': obj.assignIssue.map((item) => item.mech).join(', ')
                                }
                            })
                        })
                    } else if(obj.sourceItem == 'Transfer') {
                        return obj.transferData.map((subObj) => {
                            return {
                                'jobCard-Id': obj.jobCard_Id,
                                'entry Date': moment(obj.entryDate).format('DD-MMMM-YYYY LT'),
                                'driver / Operator': obj.operator,
                                'location': obj.location,
                                'mileages': obj.mileage,
                                'mechanical Issue': obj.mechanicalInspections.join(', '),
                                'plate number': obj.plate.text,
                                'source of parts': obj.sourceItem,
                                'parts transfered': subObj.parts,
                                'parts taken from': subObj.from,
                                'status': obj.status,
                                'end repair': obj.endRepair && moment(obj.endRepair).format('DD-MMMM-YYYY LT'),
                                'mechanics': obj.assignIssue.map((item) => item.mech).join(', ')
                            }
                        })
                    } else {
                        return {
                            'jobCard-Id': obj.jobCard_Id,
                            'entry Date': moment(obj.entryDate).format('DD-MMMM-YYYY LT'),
                            'driver / Operator': obj.operator,
                            'location': obj.location,
                            'mileages': obj.mileage,
                            'mechanical Issue': obj.mechanicalInspections.join(', '),
                            'plate number': obj.plate.text,
                            'source of parts': obj.sourceItem,
                            'status': obj.status,
                            'end repair': obj.endRepair && moment(obj.endRepair).format('DD-MMMM-YYYY LT'),
                            'mechanics': obj.assignIssue.map((item) => item.mech).join(', ')
                        }
                    }
                })
            } else if(query == 'mechanic') {
                data = res.flatMap((obj) => {
                    if(obj.assignIssue.length > 0) {
                        return obj.assignIssue.map((subObj) => {
                            return {
                                'jobCard-Id': obj.jobCard_Id,
                                'mechanical Issue': subObj.issue,
                                'plate number': obj.plate.text,
                                'mechanics': subObj.mech.join(', '),
                                'start date & time': moment(subObj.startRepair).format('DD-MMMM-YYYY LT'),
                                'end date & time': moment(subObj.endRepair).format('DD-MMMM-YYYY LT'),
                            }
                        })
                    }
                })
            } else {
                data = [];
                // data = res.flatMap((obj) => {
                //     if(obj.sourceItem == 'Inventory') {
                //         return obj.inventoryData.map((subObj) => {
                //             return {
                //                 'jobCard-Id': obj.jobCard_Id,
                //                 'entry Date': moment(obj.entryDate).format('DD-MMMM-YYYY LT'),
                //                 'driver / Operator': obj.operator,
                //                 'location': obj.location,
                //                 'mileages': obj.mileage,
                //                 'mechanical Issue': anotherSub.issue,
                //                 'plate number': obj.plate.text,
                //                 'source of parts': obj.sourceItem,
                //                 'parts requested': anotherSub.item,
                //                 'quantity requested': anotherSub.qty,
                //                 'quantity received': anotherSub.recQty,
                //                 'status': obj.status,
                //                 'end repair': obj.endRepair && moment(obj.endRepair).format('DD-MMMM-YYYY LT'),
                //                 'mechanics': obj.assignIssue.map((item) => item.mech).join(', ')
                //             }
                //         })
                //     }
                // })
            }
            
            const flattenMap = data.flatMap((item) => {
                if(Array.isArray(item)) {
                    return item.map((subObj) => ({...subObj}))
                }
                return [item]
            }).filter((item) => item !== undefined);
            
            exportToCSV(flattenMap,
            `Detailed Workshop ${moment().format('DD-MMM-YYYY HH-mm-ss')}`
            )
        })
        .catch((err) => {
            console.log('Error ', err)
        })
    }

    const populateJobLogsCard = () => {
        fetch(`${newUrl}/api/maintenance/logs`, {
            headers: {
                Authorization: 'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
            }
        })
        .then((res) => res.json())
        .then(res => (
            setJobLogCards(res)
        ))
    }

    const populateJobCards = () => {
        fetch(`${newUrl}/api/maintenance`, {
            headers: {
                Authorization: 'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
            },
        })
        .then(res => res.json())
        .then(res => {
            let availableCards = res.filter((result) => result.status == 'requisition' && (!result.isViewed) || (result.isViewed == 'not viewed' || result.isViewed == 'new request'));
            let approvedCards = res.filter((result) => result.status == 'requisition' && (!result.isViewed) || (result.isViewed == 'approved' || result.isViewed == 'approved new request'));
            let canceledCards = res.filter((result) => result.status == 'requisition' && (!result.isViewed) || result.isViewed == 'denied');
            let EntryCards = res.filter((result) => result.status == 'entry');
            let diagnosisCards = res.filter((result) => result.status == 'diagnosis');
            let requisitionCards = res.filter((result) => result.status == 'requisition');
            let repairCards = res.filter((result) => result.status == 'repair');
            let testingCards = res.filter((result) => result.status == 'testing');
            let closedCards = res.filter((result) => result.status == 'pass');
            setNAvailable(availableCards.length);
            setNApproved(approvedCards.length);
            setNCanceled(canceledCards.length);
            setNEntry(EntryCards.length);
            setNDiagnosis(diagnosisCards.length);
            setNParts(requisitionCards.length);
            setNRepair(repairCards.length);
            setNTesting(testingCards.length);
            setNClosed(closedCards.length);
            setJobCards(res)
        }
        )
        .catch((err) => {
            toast.error(err)
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setFilterBy('all')
    }, [])

    useEffect(() => {
        fetch(`${url}/projects/v2`, {
            headers: {
                Authorization: 'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
            },
        })
           .then((res) => res.json())
           .then(res => {
            let list = res;
            let projectOptions = list.map((p) => {
                return {
                    key: p._id,
                    value: p._id,
                    text: p.prjDescription,
                    customer: p.customer
                }
            })
            setProjectList(projectOptions);
           })
           .catch((err) => {
                toast.error(err)
            })
    }, [])
    
    useEffect(() => {
        fetch(`${url}/equipments`, {
            headers: {
                Authorization: 'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
            },
        })
           .then((res) => res.json())
           .then(res => {
            let list = res.equipments;
            let eqOptions = list.map((p) => {
                return {
                    key: p._id,
                    value: p._id,
                    text: p.plateNumber,
                    status: p.eqStatus,
                    eqDescription: p.eqDescription,
                    eqStatus: p.eqStatus
                }
            })
            setEqList(eqOptions);
           })
           .catch((err) => {
                toast.error(err)
                // setLoadingData(false)
            })
    }, [])
    
    useEffect(() => {
        fetch(`${url}/employees`, {
            headers: {
                Authorization: 'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
            },
        })
           .then((res) => res.json())
           .then(res => {
            let list = res;
            let userOptions = 
                list.map((p) => ( {
                    key: p._id,
                    value: p._id,
                    text: p.firstName + ' ' + p.lastName,
                    email: p.email,
                    username: p.username,
                    title: p.title,
                    assignedShift: p.assignedShift,
                    phone: p.phone,
                    userType: p.type
                })
            )
            setUsers(userOptions);
           })
           .catch((err) => {
                toast.error(err)
                // setLoadingData(false)
            })
    }, [])

    useEffect(() => {
        populateJobCards();
        populateJobLogsCard();
    }, [])

    const handleSubmit = () => {
        setLoading(true)
        const payload = {
            entryDate,
            carPlate,
            mileages,
            driver,
            location,
            status: 'entry'
        }

        fetch(`${newUrl}/api/maintenance`, {
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
            setRow(res)
            setExistingRow(res)
            fetch(`${url}/equipments/sendToWorkshop/${res.plate.key}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
                },
            }).then(res => res.json())
            .then((res) => {
                setPage(1)
            })
            .catch((err) => toast.error('Error Occured!'))
            setLoading(false)
        })
        .catch((err) => toast.error('Error Occured!'))
    }

    const handleLogsSubmit = () => {
        setLoading(true);
        const payload = {
            entryDate,
            carPlate,
            mileages,
            driver,
            location,
            status: 'entry'
        }

        fetch(`${newUrl}/api/maintenance/logs`, {
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
            fetch(`${url}/equipments/sendToWorkshop/${res.plate.key}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
                },
            }).then(res => res.json())
            .then((res) => {
                setPage(1)
            })
            .catch((err) => toast.error('Error Occured!'))
            setLoading(false);
        })
        .catch((err) => toast.error('Error Occured!'))
    }

    const handleUpdate = () => {
        setLoading(true);
        const payload = {
            entryDate,
            carPlate,
            mileages,
            driver,
            location,
            inspectionTools,
            startRepair,
            endRepair,
            mechanicalInspections,
            assignIssue,
            transferData,
            inventoryData,
            inventoryItems,
            operatorApproval,
            operator,
            sourceItem,
            transferParts,
            operatorNotApplicable,
            mileagesNotApplicable,
            nextMileages,
            teamApproval: role === 'workshop-team-leader' ? true : teamApproval,
            supervisorApproval: role === 'workshop-supervisor' ? true : row.supervisorApproval,
            isViewed:
                (role == 'workshop-support') ? 'new request' :
                (role === 'workshop-manager' && row.status == 'requisition') ?
                    (isReason && isViewed == 'new request') ? 'denied' :
                    (!isReason && isViewed == 'new request') ? 'approved new request' :
                    (isReason) ? 'denied' : 'approved' : isViewed,
            status: role != 'workshop-manager' ? page == 1 
            ? 'diagnosis'
            : page == 2 || page == 4
            ? 'requisition'
            : page == 5
            ? 'repair'
            : page == 6
            ? 'testing'
            : page == 7 && 'pass' : 'requisition',
            reason: (role == 'workshop-manager' && !checkReason) ? '' : reason,
            requestParts: role == 'recording-officer' && row.status == 'requisition' && (row.isViewed == 'denied' || row.isViewed == 'not viewed') ? Date.now() : '',
            receivedParts: role == 'recording-officer' && row.status == 'requisition' && (row.isViewed != 'denied' || row.isViewed != 'not viewed') ? Date.now() : ''
        }

        fetch(`${newUrl}/api/maintenance/${row._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
            },
            body: JSON.stringify({payload})
        })
        .then(res => res.json())
        .then(result => {
            populateJobCards();
            let endWork = result.assignIssue && result.assignIssue.filter(item => item.endRepair == "" || item.hasOwnProperty('endRepair') == false)
            setLoading(false);
            if((page == 2 && result.status == 'requisition' && (result.sourceItem == 'Inventory' || result.sourceItem == 'Transfer')) && (role == 'recording-officer' || role == 'workshop-support')) {
                fetch(`${url}/email/send`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization:
                        'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
                    },
                    body: JSON.stringify({
                      workPayload: {
                        jobCard_Id: result.jobCard_Id,
                        plate: result.plate,
                        postingDate: moment(Date.now()).format('DD-MMMM-YYYY LT'),
                      },
                      from: 'appinfo@construck.rw',
                      to: 'amushimiyimana@construck.rw',
                      subject: 'Work Notification',
                      messageType: 'notification',
                    }),
                })
                    .then((res) => res.json())
                    .then((res) => {})
                    .catch((err) => console.log(err))

                setViewPort('list')
            } else if(role == 'workshop-supervisor' && result.jobCard_status == 'closed') {
                fetch(`${url}/equipments/makeAvailable/${result.plate.key}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization:
                        'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
                    },
                }).then((res) => res.json())
                .then((r) => {
                    setPage(7);
                    populateJobCards();
                })
            } else if (result.status == 'testing' && role == 'recording-officer') {
                populateJobCards();
                setViewPort('list')
            } else if (result.status !== 'repair' && result.sourceItem == 'No Parts Required' && role == 'recording-officer') {
                setPage(5);
            } else if (role != 'workshop-support' && result.status == 'requisition' && result.sourceItem == 'Transfer' && role == 'recording-officer') {
                setRow(result);
                setPage(3);
            } 
            else if(result.status == 'repair' && endWork.length > 0) {
                populateJobCards();
                setViewPort('list')
            } 
            else if(role == 'recording-officer' && result.status == 'testing') {
                populateJobCards();
                setViewPort('list')
            }
            else
                setPage(page + 1)
        })
        .catch(err => toast.error(err));
    }
    
    const handleLogsUpdate = () => {
        setLoading(true);
        const payload = {
            entryDate,
            carPlate,
            mileages,
            driver,
            location,
            inspectionTools,
            startRepair,
            endRepair,
            mechanicalInspections,
            assignIssue,
            transferData: (role == 'workshop-manager' && (isViewed !== 'new request' && isViewed !== 'approve new request')) ? transferData : existingRow.transferData,
            inventoryData: (role == 'workshop-manager' && (isViewed !== 'new request' && isViewed !== 'approve new request')) ? inventoryData : existingRow.inventoryData,
            inventoryItems,
            operatorApproval,
            operator,
            sourceItem,
            transferParts,
            operatorNotApplicable,
            mileagesNotApplicable,
            nextMileages,
            teamApproval: role === 'workshop-team-leader' ? true : teamApproval,
            supervisorApproval: role === 'workshop-supervisor' ? true : row.supervisorApproval,
            isViewed:
                (role === 'workshop-manager' && row.status == 'requisition') ?
                    (isReason) ? 'denied' : 'approved' : isViewed,
            status: role != 'workshop-manager' ? page == 1 
            ? 'diagnosis'
            : page == 2 || page == 4
            ? 'requisition'
            : page == 5
            ? 'repair'
            : page == 6
            ? 'testing'
            : page == 7 && 'pass' : 'requisition',
            reason: (role == 'workshop-manager' && !checkReason) ? '' : reason,
            requestParts: role == 'recording-officer' && row.status == 'requisition' && (row.isViewed == 'denied' || row.isViewed == 'not viewed') ? Date.now() : '',
            receivedParts: role == 'recording-officer' && row.status == 'requisition' && (row.isViewed != 'denied' || row.isViewed != 'not viewed') ? Date.now() : ''
        }
        
        fetch(`${newUrl}/api/maintenance/logs/${row.jobCard_Id || row.jobCard_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + window.btoa(`${apiUsername}:${apiPassword}`),
            },
            body: JSON.stringify({payload})
        })
        .then(res => res.json())
        .then(result => {
            setLoading(false);
            populateJobCards();
        })
        .catch(err => toast.error(err));
    }

    const getData = () => {
        let filtered = jobCards;
        if(search) {
            filtered = jobCards.filter(jobCard => 
                jobCard.plate.text.toLowerCase().includes(search.toLowerCase()) 
                ||
                jobCard.jobCard_Id.toLowerCase().includes(search.toLowerCase())
                ||
                (jobCard.driver) && jobCard.driver.text.toLowerCase().includes(search.toLowerCase())
                ||
                jobCard.plate.eqDescription.toLowerCase().includes(search.toLowerCase())
            )
        } else if(filterBy !== 'all') {
            filtered = jobCards.filter(jobCard => 
                jobCard.status == filterBy || jobCard.isViewed == filterBy
            )
        }
        return {totalCount: filtered.length, data: filtered}
    }

    // Multi steps
    const componentList = [
        <JobCards 
            entryDate={entryDate}
            setEntryDate={setEntryDate}
            driver={driver}
            setDriver={setDriver}
            carPlate={carPlate}
            setCarPlate={setCarPlate}
            mileages={mileages}
            setMileages={setMileages}
            location={location}
            setLocation={setLocation}
            startIndexNotApplicable={startIndexNotApplicable}
            setStartIndxNotApp={setStartIndxNotApp}
            disableDate={disableDate}
            disabledTime={disabledTime}
            usersList={usersList}
            eqList={eqList}
            projectList={projectList}
            viewPort={viewPort}
        />,
        <InspectionDiagnosis 
            inspectionTools={inspectionTools}
            setInspectionTools={setInspectionTools}
            mechanicalInspections={mechanicalInspections}
            setMechanicalInspections={setMechanicalInspections}
            role={role}
            previousMode={previousMode}
        />,
        <PartsRequisitions 
            sourceItem={sourceItem}
            setSourceItem={setSourceItem}
            itemsRequest={itemsRequest}
            setItemsRequest={setItemsRequest}
            mechanicalInspections={mechanicalInspections}
            setPage={setPage}
            eqList={eqList}
            mileages={mileages}
            setTransferParts={setTransferParts}
            transferParts={transferParts}
            transferData={transferData}
            setTransferData={setTransferData}
            inventoryItems={inventoryItems}
            inventoryData={inventoryData}
            setInventoryItems={setInventoryItems}
            setInventoryData={setInventoryData}
            reason={reason}
            role={role}
            previousMode={previousMode}
        />,
        <PrintableItems 
            row={row} 
            jobLogCards={jobLogCards}
            setPage={setPage}
            role={role}
        />,
        <PartsRequisitions 
            sourceItem={sourceItem}
            setSourceItem={setSourceItem}
            itemsRequest={itemsRequest}
            setItemsRequest={setItemsRequest}
            mechanicalInspections={mechanicalInspections}
            page={page}
            setPage={setPage}
            mileages={mileages}
            setTransferParts={setTransferParts}
            transferParts={transferParts}
            transferData={transferData}
            setTransferData={setTransferData}
            inventoryItems={inventoryItems}
            inventoryData={inventoryData}
            setInventoryItems={setInventoryItems}
            setInventoryData={setInventoryData}
            reason={reason}
            role={role}
            previousMode={previousMode}
        />,
        <Repair
            mechanicalInspections={mechanicalInspections}
            row={row}
            setAssignIssue={setAssignIssue}
            assignIssue={assignIssue}
            entryDate={entryDate}
            role={role}
            previousMode={previousMode}
        />,
        <Testing 
            userList={usersList}
            operator={operator}
            setOperator={setOperator}
            operatorNotApplicable={operatorNotApplicable}
            setOperatorNotApp={setOperatorNotApp}
            role={role}
            previousMode={previousMode}
        />,
        <GatePass 
            row={row}
        />
    ];

    const items = [
        {
          key: '1',
          label: (
            <a className='flex items-center' onClick={() => download('general')}>
              <ListBulletIcon className='w-6 h-6 mr-3' />
              General Report
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a className='flex items-center' onClick={() => download('mechanic')}>
              <UsersIcon className='w-5 h-5 mr-3' />
              Mechanic Productivity Report
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a className='flex items-center' onClick={() => download('items')}>
              <WrenchScrewdriverIcon className='w-5 h-5 mr-3' />
              Items Requisition Report
            </a>
          ),
        },
    ];

    return (
        <div className="my-5 flex flex-col space-y-5 px-10">
            <div className="text-2xl font-semibold">
                {viewPort == 'list' ? 'Maintenance Centre' : page == 0 
                ? 'Job Card'
                : page == 1
                ? 'Diagnosis & Inspection'
                : page == 2 || page == 4
                ? 'Parts Requisition'
                : page == 3
                ? 'Print Requisition'
                : page == 5
                ? 'Repair'
                : page == 6
                ? 'Testing Equipment'
                : 'Gate Pass' 
                }
            </div>
            <div className="flex w-full flex-row items-center space-x-4">
                {viewPort === 'list' && canCreateData && (
                    <MSubmitButton
                        submit={() => {
                            emptyState();
                            setViewPort('new')
                        }}
                        intent="primary"
                        icon={<PlusIcon className="h-5 w-5 text-zinc-800" />}
                        label="New"
                    />
                )}
                {viewPort === 'list' && (
                    <div className="mx-auto px-10 flex-1">
                        <TextInput placeholder="Search..." setValue={setSearch} />
                    </div>
                )}
                {viewPort === 'list' && (
                    <>
                        {role == 'workshop-manager' ? (
                            <div className="flex flex-row items-center space-x-5">
                                <MainStatusCard
                                    data={{ title: 'Available', content: nAvailable }}
                                    intent={
                                        filterBy === 'not viewed' || filterBy === 'all' || filterBy === 'new request'
                                            ? 'not viewed'
                                            : ''
                                    }
                                    icon={<FolderPlusIcon className="h-5 w-5" />}
                                    onClick={() =>
                                    filterBy === 'not viewed' || filterBy === 'new request'
                                        ? setFilterBy('all')
                                        : setFilterBy('not viewed')
                                    }
                                />
                                <MainStatusCard
                                    data={{ title: 'Approved', content: nApproved }}
                                    intent={
                                    filterBy === 'approved' || filterBy === 'all'
                                        ? 'approved'
                                        : ''
                                    }
                                    icon={<CheckIcon className="h-5 w-5" />}
                                    onClick={() =>
                                    filterBy === 'approved'
                                        ? setFilterBy('all')
                                        : setFilterBy('approved')
                                    }
                                />
                                <MainStatusCard
                                    data={{ title: 'Canceled', content: nCanceled }}
                                    intent={
                                    filterBy === 'canceled' || filterBy === 'all'
                                        ? 'canceled'
                                        : ''
                                    }
                                    icon={<XCircleIcon className="h-5 w-5" />}
                                    onClick={() =>
                                    filterBy === 'Canceled'
                                        ? setFilterBy('all')
                                        : setFilterBy('Canceled')
                                    }
                                />
                            </div>
                        ) : (
                            <div className="flex flex-row items-center space-x-5">
                                <MainStatusCard
                                    data={{ title: 'Entry', content: nEntry }}
                                    intent={
                                        filterBy === 'entry' || filterBy === 'all'
                                            ? 'entry'
                                            : ''
                                    }
                                    icon={<FolderPlusIcon className="h-5 w-5" />}
                                    onClick={() =>
                                    filterBy === 'entry'
                                        ? setFilterBy('all')
                                        : setFilterBy('entry')
                                    }
                                />
                                <MainStatusCard
                                    data={{ title: 'Diagnos', content: nDiagnosis }}
                                    intent={
                                    filterBy === 'diagnosis' || filterBy === 'all'
                                        ? 'diagnosis'
                                        : ''
                                    }
                                    icon={<CheckIcon className="h-5 w-5" />}
                                    onClick={() =>
                                    filterBy === 'diagnosis'
                                        ? setFilterBy('all')
                                        : setFilterBy('diagnosis')
                                    }
                                />
                                <MainStatusCard
                                    data={{ title: 'Requisition', content: nParts }}
                                    intent={
                                        filterBy === 'requisition' || filterBy === 'all'
                                            ? 'requisition'
                                            : ''
                                    }
                                    icon={<ArrowPathRoundedSquareIcon className="h-5 w-5" />}
                                    onClick={() =>
                                        filterBy === 'requisition'
                                        ? setFilterBy('all')
                                        : setFilterBy('requisition')
                                    }
                                />
                                <MainStatusCard
                                    data={{ title: 'Repair', content: nRepair }}
                                    intent={
                                        filterBy === 'repair' || filterBy === 'all'
                                        ? 'repair'
                                        : ''
                                    }
                                    icon={<AdjustmentsVerticalIcon className="h-5 w-5" />}
                                    onClick={() =>
                                    filterBy === 'repair'
                                        ? setFilterBy('all')
                                        : setFilterBy('repair')
                                    }
                                />
                                <MainStatusCard
                                    data={{ title: 'Testing', content: nTesting }}
                                    intent={
                                        filterBy === 'testing' || filterBy === 'all'
                                        ? 'testing'
                                        : ''
                                    }
                                    icon={<WrenchScrewdriverIcon className="h-5 w-5" />}
                                    onClick={() =>
                                    filterBy === 'testing'
                                        ? setFilterBy('all')
                                        : setFilterBy('testing')
                                    }
                                />
                                <MainStatusCard
                                    data={{ title: 'Closed', content: nClosed }}
                                    intent={
                                        filterBy === 'pass' || filterBy === 'all'
                                        ? 'closed'
                                        : ''
                                    }
                                    icon={<XCircleIcon className="h-5 w-5" />}
                                    onClick={() =>
                                    filterBy === 'pass'
                                        ? setFilterBy('all')
                                        : setFilterBy('pass')
                                    }
                                />
                            </div>
                        )}
                    </>
                )}
                {viewPort === 'list' && (
                    <Dropdown menu={{ items }} placement="bottomRight">
                        <QueueListIcon
                            className="h-10 w-10 cursor-pointer"
                            // onClick={() => download()}
                        />
                    </Dropdown>
                    
                )}
                
                {(viewPort === 'new' || viewPort === 'change' || viewPort === 'operatorView') && (
                    <MSubmitButton
                        submit={() => {
                            setPreviousMode(false);
                            setPage(0);
                            populateJobCards();
                            setViewPort('list');
                        }}
                        intent="primary"
                        icon={<ArrowLeftIcon className="h-5 w-5 text-zinc-800" />}
                        label="Back"
                    />
                )}
            </div>
            {console.log('Row Check ', row)}
            <Modal
                open={isModalOpen}
                onCancel={handleCancel}
                on
                width={800}
                footer={
                    (((row.isViewed != 'approved' && row.isViewed != 'approved new request') && (row.sourceItem == 'Inventory' || row.sourceItem == 'Transfer')) && ((!checkReason) ? [
                        <Button className='pt-0 pb-2' key="back" onClick={handleReject}>
                            Reject Request
                        </Button>,
                        isViewed == 'denied' 
                        ?   <Popconfirm
                                placement="topLeft"
                                title={text}
                                onConfirm={handleOk}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button className='pt-0 pb-2' type="primary">
                                    Approve
                                </Button>
                            </Popconfirm>
                        :   <Button className='pt-0 pb-2' key="submit" type="primary" onClick={handleOk}>
                                Approve
                            </Button>
                    ] : [
                        <Button disabled={reason.length < 1} className='pt-0 pb-2' key="submit" type="primary" onClick={handleApproveReject}>
                            Apply Denial
                        </Button>
                    ]))
                }
            >
                {row.sourceItem != 'No Parts Required' ? 
                    <div className='py-10'>
                        <div className='flex justify-between'>
                            <h5 className='text-sm text-gray-400'>Job Card: <b className='text-gray-600'>{row.jobCard_id}</b></h5>
                            <div className='flex space-x-2 text-lg text-gray-400'>
                                <ClockIcon width={15} /> 
                                <small className='text-gray-600 font-bold'>{moment(row.entryDate).format('DD-MMMM-YYYY LT')}</small>
                            </div>
                        </div>
                        <h5 className='mt-5 text-sm text-gray-400'>Eq. Plate: <b className='text-gray-600'>{row.plate && row.plate.text}</b></h5>
                        <h5 className='mt-7 text-sm text-gray-400'>Mech. Issues: </h5>
                        <div className='flex items-start space-x-3'>
                            {row.sourceItem == 'Inventory' ? row.inventoryData && row.inventoryData.map((item) => (
                                <div className='bg-gray-100 px-5 mt-2 py-2'>
                                    {item.map((value, i) => {
                                        if(foundItem != value.issue) {
                                            foundItem = value.issue;
                                            return (
                                                <>
                                                    <h6 className='p-0 m-0'>{value.issue}</h6>
                                                    <small>{value.item}: <b>{value.qty}</b></small>
                                                    <br />
                                                </>
                                            )
                                        } else {
                                            return (
                                                <>
                                                    <small>{value.item}: <b>{value.qty}</b></small>
                                                    <br />
                                                </>
                                            )
                                        }

                                    })}
                                    

                                </div>
                            )) : (
                                <>
                                    {row.transferData && row.transferData.map((item) => (
                                        <div className='bg-gray-100 px-5 mt-2 py-2'>
                                            <small>{item.from}: <b>{item.parts}</b></small>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                        {(isReason || reason) && (
                            <div className='flex w-full flex-col space-y-1 mt-5'>
                                <div className='flex flex-row items-center'>
                                    <MTextView content={'Denial Reason'} />
                                    <div className='text-sm text-red-600'>*</div>
                                </div>
                                <input type={'text'} name="reason" value={reason} onChange={({target}) => setReason(target.value)} className="w-full flex-grow rounded-sm border-gray-100 py-2.5 px-3 text-sm font-medium shadow-none ring-1 ring-gray-200 transition duration-200 ease-in-out hover:ring-1 hover:ring-gray-400 focus:outline-none focus:ring-blue-300" placeholder={'Specify your reason'} />
                            </div>
                        )}
                    </div> 
                : 
                    <h5 className='text-lg font-semibold text-center mt-5'>Not Part of Inventory</h5>
                }
            </Modal>
            {/* Displaying Job Cards List */}
            {viewPort === 'list' && (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {getData().totalCount > 0 ? getData().data.map((c) => {
                        return (
                            <JobCard 
                                data={{
                                    _id: c._id,
                                    status: c.status,
                                    jobCard_id: c.jobCard_Id,
                                    finishTime: c.endRepair,
                                    startTime: c.startRepair,
                                    plate: c.plate,
                                    driver: c.driver,
                                    operator: c.operator,
                                    location: c.location,
                                    operatorApproval: c.operatorApproval,
                                    teamApproval: c.teamApproval,
                                    supervisorApproval: c.supervisorApproval,
                                    entryDate: c.entryDate,
                                    mileages: c.mileage,
                                    inspectionTools: c.inspectionTools,
                                    mechanicalInspections: c.mechanicalInspections,
                                    assignIssue: c.assignIssue,
                                    inventoryData: c.inventoryData,
                                    inventoryItems: c.inventoryItems,
                                    sourceItem: c.sourceItem,
                                    transferData: c.transferData,
                                    transferParts: c.transferParts,
                                    isViewed: c.isViewed,
                                    reason: c.reason,
                                    jobCard_status: c.jobCard_status,
                                    updated_At: c.updated_At,
                                    operatorNotApplicable: c.operatorNotApplicable,
                                    mileagesNotApplicable: c.mileagesNotApplicable,
                                    nextMileages: c.nextMileages
                                }}
                                role={role}
                                updateMe={setJobCardsToUpdate}
                                canCreateData={canCreateData}
                            />
                        )
                    }) : (
                        <h5 className='text-center'>No Data ...</h5>
                    )}
                </div>
            )}
            
            {/* Creating Job Cards Forms*/}
            {(viewPort === 'new') && (
                <div className='mt-5 w-1/2'>
                    {role == 'recording-officer' ? componentList[page] : <h5 className='text-lg font-medium mt-5 text-center'>Logged in user is not authorized for job card creation</h5>}
                    <div className='flex mt-10 space-x-5'>
                        {(page != 0 && page != 1) && 
                            <MSubmitButton submit={() => {setPage(page - 1); setPreviousMode(true)}} label={`Go to Previous`} intent={'primary'} />
                        }
                        {role == 'recording-officer' && (
                            <Popconfirm
                                placement="topLeft"
                                title={textConfirm}
                                disabled={loading}
                                onConfirm={() => {
                                    if(loading) return;
                                    previousMode && setViewPort('list');
                                    if(page == 0) {
                                        handleSubmit();
                                        role != 'workshop-support' && handleLogsSubmit()
                                    } else {
                                        handleUpdate();
                                        role != 'workshop-support' && handleLogsUpdate()
                                    }
                                }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <button 
                                    disabled={loading}
                                    className='flex items-center justify-center space-x-1 bg-blue-400 rounded  ring-1 ring-zinc-300 shadow-sm cursor-pointer px-3 py-2  active:scale-95 hover:bg-blue-500 text-white'>
                                    <div className='font-bold'>{`${page == 2 ? `Submit Request` : page == 0 ? `Create Job Card` : `Save & Continue`}`}</div>
                                </button>
                            </Popconfirm>
                        )}
                    </div>
                </div>
            )}

            {viewPort === 'change' && (
                <div className={`mt-5 ${row && (row.isViewed == 'approved' || row.isViewed == 'approved new request') ? 'w-3/4' : 'w-1/2'}`}>
                    {componentList[page]}
                    {(row && (page != 3 && page != 7)) && <div className='flex mt-10 space-x-5'>
                        {((page != 0 && page != 1) || (page != 1 && role !== 'workshop-support')) &&
                            <MSubmitButton intent='primary' submit={() => {setPage(page - 1); setPreviousMode(true)}} label={`Go to Previous`} />
                        }
                        <Popconfirm
                            placement="topLeft"
                            title={textConfirm}
                            disabled={loading}
                            onConfirm={() => {
                                if(loading) return;
                                if(row) {
                                    previousMode && setViewPort('list')
                                    handleUpdate();
                                    role != 'workshop-support' && handleLogsUpdate();
                                }
                            }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <button 
                                disabled={loading}
                                className='flex items-center justify-center space-x-1 bg-blue-400 rounded  ring-1 ring-zinc-300 shadow-sm cursor-pointer px-3 py-2  active:scale-95 hover:bg-blue-500 text-white'
                            >
                                <div>{`${page == 2 ? `Submit Request` : `Save & Continue`}`}</div>
                            </button>
                        </Popconfirm>
                    </div>}
                </div>
            )}

            {viewPort == 'operatorView' && (
                <div className='mt-5 w-3/4'>
                    <OperatorCard 
                        row={row}
                        role={role}
                        teamApproval={teamApproval}
                        operatorApproval={operatorApproval}
                        setOperatorApproval={setOperatorApproval}
                        setNextMileages={setNextMileages}
                        nextMileages={nextMileages}
                        mileagesNotApplicable={mileagesNotApplicable}
                        setMileagesNotApplicable={setMileagesNotApplicable}
                    />
                    <div className='flex mt-10 space-x-5'>
                        {role != 'workshop-team-leader' && <MSubmitButton intent='danger' submit={() => {
                                setTeamApproval(false);
                                setViewPort('list')
                            }} 
                            intentColor={'danger'}
                            label={`Denie Approval`}
                        />}
                        
                        {((role == 'workshop-team-leader' && row.teamApproval == false) || (role == 'workshop-supervisor' && (row.teamApproval == true && row.supervisorApproval == false))) && <MSubmitButton 
                            submit={() => {
                                (role == 'workshop-supervisor') && setPage(7);
                                handleUpdate();
                                role != 'workshop-support' && handleLogsUpdate();
                                setViewPort('list')
                            }}
                            intent={'success'}
                            intentColor={'success'}
                            label={`${role == 'workshop-supervisor' ? 'Authorise Gate Pass' : role == 'workshop-team-leader' ? 'Validate Repairs' : 'Save & Continue'}`} 
                        />}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Maintenance;