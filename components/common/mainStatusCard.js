import React from 'react'
  
export default function MainStatusCard({ intent, data, icon, onClick }) {
    function getClassFromIntent(intent) {
        if (intent == 'approved') {
            return 'flex flex-col py-1 px-3 rounded shadow-lg ring-1 ring-green-300 text-zinc-600 w-24 cursor-pointer'
        } else if (intent == 'canceled') {
            return 'flex flex-col py-1 px-3 rounded shadow-lg ring-1 ring-red-300 text-zinc-600 w-24 cursor-pointer'
        } else if (intent == 'not viewed') {
            return 'flex flex-col py-1 px-3 rounded shadow-lg ring-1 ring-yellow-300 text-zinc-600 w-24 cursor-pointer'
        } else if (intent == 'entry') {
            return 'flex flex-col py-1 px-3 rounded shadow-lg ring-1 ring-green-300 text-zinc-600 w-24 cursor-pointer'
        } else if (intent == 'diagnosis') {
            return 'flex flex-col py-1 px-3 rounded shadow-lg ring-1 ring-yellow-300 text-zinc-600 w-24 cursor-pointer'
        } else if (intent == 'requisition') {
            return 'flex flex-col py-1 px-3 rounded shadow-lg ring-1 ring-rose-300 text-zinc-600 w-24 cursor-pointer'
        } else if (intent == 'repair') {
            return 'flex flex-col py-1 px-3 rounded shadow-lg ring-1 ring-purple-300 text-zinc-600 w-24 cursor-pointer'
        } else if (intent == 'testing') {
            return 'flex flex-col py-1 px-3 rounded shadow-lg ring-1 ring-amber-300 text-zinc-600 w-24 cursor-pointer'
        } else if (intent == 'closed') {
            return 'flex flex-col py-1 px-3 rounded shadow-lg ring-1 ring-indigo-300 text-zinc-600 w-24 cursor-pointer'
        } else {
            return 'flex flex-col py-1 px-3 rounded ring-zinc-200 text-zinc-300 w-16 cursor-pointer'
        }
    }
    return (
        <div className={getClassFromIntent(intent)} onClick={onClick}>
            <div className="flex flex-row justify-between">
                <small className="font-medium">{data.title}</small>
            </div>
            <div className="flex flex-row items-center justify-between bg- text-base">
                <div>{icon}</div>
                <p><b>{data.content}</b></p>
            </div>
        </div>
    )
}
