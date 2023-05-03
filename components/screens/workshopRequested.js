import React, { useEffect } from 'react'

const WorkshopRequested = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='my-5 flex flex-col space-y-5 px-10'>
            <div className="text-2xl font-semibold">
                My Workshop
            </div>
        </div>
    )
}

export default WorkshopRequested