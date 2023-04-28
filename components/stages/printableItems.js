import React, { useCallback, useRef } from 'react';
import ReactToPrint from "react-to-print";
import Signature from '../../public/images/signature.svg';
import Image from 'next/image'
import itemsPart from '../../public/data/itemParts.json';
import moment from 'moment';

const PrintableItems = ({row, setPage}) => {
    const componentRef = useRef(null);
    const user = JSON.parse(localStorage.getItem('user'))

    const reactToPrintContent = useCallback(() => {
        return componentRef.current;
    }, [componentRef.current]);

    const handleAfterPrint = React.useCallback(() => {
        row.sourceItem == 'Inventory' ? setPage(4) : setPage(5);
    }, []);
    
    return (
        <div className='flex flex-col items-center space-y-5'>
            <ReactToPrint
                content={reactToPrintContent}
                documentTitle="Requistion Report"
                trigger={() => (
                    <button class="w-36 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center">
                        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                        <span>Print Now</span>
                    </button>
                )}
                onAfterPrint={handleAfterPrint}
            />
            <div ref={componentRef} className='m-4 w-full'>
                <div className='flex justify-between items-center w-full'>
                    <div />
                    <h3 className='text-xl font-extrabold my-10'>MATERIAL REQUISITION FORM</h3>
                    <p className='text-lg'><b>S.N</b> &nbsp;<span className='text-xl'>{row.jobCard_id}</span></p>
                </div>
                <div className='flex items-center space-x-4 mt-3'>
                    <h6 className='font-bold'>REQUESTED BY: </h6>
                    <small className='border-black border-b-2 w-60'>
                        <span className='text-lg pl-4'>{user.firstName + ' ' + user.lastName}</span>
                    </small>
                </div>
                <div className='flex justify-between items-center mt-5'>
                    <div className='flex items-center space-x-4'>
                        <h6 className='font-bold'>PLATE NUMBER: </h6>
                        <small className='border-black border-b-2 w-72'>
                            <span className='text-lg pl-4'>{row.plate.text + ' - ' + row.plate.eqDescription}</span>
                        </small>
                    </div>
                    <h6 className='font-semi'>DATE: {moment(row['updated_At']).format('DD-MMMM-YYYY LT')}</h6>
                </div>
                {row.sourceItem == 'Inventory' ? (
                    <table style={{fontFamily: 'arial, sans-serif', borderCollapse: 'collapse', width: '100%', margin: '35px 0px'}}>
                        <tr>
                            <th style={{border: '1px solid #ddd', textAlign: 'left', paddingLeft: '10px'}}>S/No</th>
                            <th style={{border: '1px solid #ddd', textAlign: 'left', paddingLeft: '10px'}}>ITEM DESCRIPTION</th>
                            <th style={{border: '1px solid #ddd', textAlign: 'left', paddingLeft: '10px'}}>QTY</th>
                            <th style={{border: '1px solid #ddd', textAlign: 'left', paddingLeft: '10px'}}>UOM</th>
                            <th style={{border: '1px solid #ddd', textAlign: 'left', paddingLeft: '10px'}}>Outstanding <br /> Bal (Store)</th>
                            <th style={{border: '1px solid #ddd', textAlign: 'left', paddingLeft: '10px'}}>REMARKS</th>
                        </tr>
                        {row.inventoryData && row.inventoryData.map((item, i) => (
                            <>
                                {item.map((value) => {
                                    let foundItem = itemsPart.find((v) => v['ITEM & PART'] == value['item']);
                                    return (
                                        <tr>
                                            <td style={{border: '1px solid #ddd', textAlign: 'left', paddingLeft: '10px'}}></td>
                                            <td style={{border: '1px solid #ddd', textAlign: 'left', paddingLeft: '10px'}}>
                                                {value.item}
                                            </td>
                                            <td style={{border: '1px solid #ddd', textAlign: 'left', paddingLeft: '10px'}}>
                                                {value.qty}
                                            </td>
                                            <td style={{border: '1px solid #ddd', textAlign: 'left', paddingLeft: '10px'}}>
                                                {foundItem['UOM']}
                                            </td>
                                            <td style={{border: '1px solid #ddd', textAlign: 'left', paddingLeft: '10px'}}></td>
                                            <td style={{border: '1px solid #ddd', textAlign: 'left', paddingLeft: '10px'}}></td>
                                        </tr>
                                    )}
                                )}
                            </>
                        ))}
                    </table>
                ) : (
                    <table style={{fontFamily: 'arial, sans-serif', borderCollapse: 'collapse', width: '100%', margin: '35px 0px'}}>
                        <tr>
                            <th style={{border: '1px solid #ddd', textAlign: 'left', paddingLeft: '10px'}}>S/No</th>
                            <th style={{border: '1px solid #ddd', textAlign: 'left', paddingLeft: '10px'}}>ITEMS</th>
                            <th style={{border: '1px solid #ddd', textAlign: 'left', paddingLeft: '10px'}}>FROM</th>
                            <th style={{border: '1px solid #ddd', textAlign: 'left', paddingLeft: '10px'}}>REMARKS</th>
                        </tr>
                        {row.transferData.map((value, i) => (
                            <tr>
                                <td style={{border: '1px solid #ddd', textAlign: 'left', paddingLeft: '10px'}}></td>
                                <td style={{border: '1px solid #ddd', textAlign: 'left', paddingLeft: '10px'}}>
                                    {value.parts}
                                </td>
                                <td style={{border: '1px solid #ddd', textAlign: 'left', paddingLeft: '10px'}}>
                                    {value.from}
                                </td>
                                <td style={{border: '1px solid #ddd', textAlign: 'left', paddingLeft: '10px'}}></td>
                            </tr>
                        ))}
                    </table>
                )}
                <div className='flex justify-between items-center mt-5'>
                    <div className='flex items-center space-x-4'>
                        <h6 className='font-bold'><i>Authorized Signature :</i> </h6>
                        <div className='border-black border-b-2 w-52 flex justify-center'>
                            <Image
                                // loader={Signature}
                                src={Signature}
                                alt="Picture of the author"
                                width={100}
                                height={100}
                                className="self-center items-center text-center"
                            />
                        </div>
                    </div>
                    <div className='flex items-center space-x-1 pl-10'>
                        <div>
                            <h6 className='font-bold'><i>Approved by :</i> </h6>
                            <h6 className='font-bold'><i>Inventory Manager</i> </h6>
                        </div>
                        <small className='border-black border-b-2 w-72'></small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrintableItems