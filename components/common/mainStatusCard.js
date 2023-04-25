import React from 'react'
  
export default function MainStatusCard({ intent, data, icon, onClick }) {
    function getClassFromIntent(intent) {
        if (intent == 'approved') {
            return 'flex flex-col space-y-1 py-1 px-3 rounded shadow-lg ring-1 ring-green-300 text-zinc-600 w-36 cursor-pointer'
        } else if (intent == 'canceled') {
            return 'flex flex-col space-y-1 py-1 px-3 rounded shadow-lg ring-1 ring-red-300 text-zinc-600 w-36 cursor-pointer'
        } else if (intent == 'available') {
            return 'flex flex-col space-y-1 py-1 px-3 rounded shadow-lg ring-1 ring-yellow-300 text-zinc-600 w-36 cursor-pointer'
        } else {
            return 'flex flex-col py-1 px-3 rounded ring-zinc-200 text-zinc-300 w-16 cursor-pointer'
        }
    }
    return (
        <div className={getClassFromIntent(intent)} onClick={onClick}>
            <div className="flex flex-row justify-between">
                <small className="font-medium">{data.title}</small>
            </div>
            <div className="flex flex-row items-center justify-between text-base">
                <div>{icon}</div>
                <p><b>{data.content}</b></p>
            </div>
        </div>
    )
}
