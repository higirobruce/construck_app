import {
  DocumentTextIcon,
  ExclamationTriangleIcon,
  StopIcon,
} from '@heroicons/react/24/outline'
import ms from 'ms'
import React from 'react'
import MTextView from './mTextView'

function getExpiration(expirationDate, thresholdDays) {
  if (new Date(expirationDate) < Date.now())
    return <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />

  let remainingDays = new Date(expirationDate) - Date.now()

  if (expirationDate) {
    if (remainingDays < thresholdDays) {
      return (
        ms(new Date(expirationDate) - Date.now(), { long: true }) +
        ' to expiration'
      )
    }
  } else {
    return 'No expiration date set!'
  }

  return (
    ms(new Date(expirationDate) - Date.now(), { long: true }) + ' to expiration'
  )
}

export default function AircraftDetails({ selectedAircraft, setDisplay }) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 mb-3 flex flex-col space-y-6 rounded-lg bg-white px-5 py-8 shadow-md">
          <div className="ml-5 text-xl font-bold text-gray-700 underline">
            {selectedAircraft.aircraftModel}
          </div>
          <div className="flex flex-row space-x-2">
            <div className="space-y-2 border-r-2 border-gray-100 pr-5">
              <div className="ml-5 flex flex-row items-center">
                <MTextView content="Registration :" />
                <div className="ml-2 font-bold text-gray-700">
                  {selectedAircraft.registration}
                </div>
              </div>

              <div className="ml-5 flex flex-row items-center">
                <MTextView content="MTOW - KGs :" />
                <div className="ml-2 font-bold text-gray-700">
                  {selectedAircraft.mtow}
                </div>
              </div>

              <div className="ml-5 flex flex-row items-center">
                <MTextView content="Aircraft Type :" />
                <div className="ml-2 font-bold text-gray-700">
                  {selectedAircraft.aircraftType}
                </div>
              </div>

              <div className="ml-5 flex flex-row items-center">
                <MTextView content="Homebase :" />
                <div className="ml-2 font-bold text-gray-700">
                  {selectedAircraft.homebase}
                </div>
              </div>
            </div>

            <div className="space-y-2 border-r-2 border-gray-100 pr-5">
              <div className="ml-5 flex flex-row items-center">
                <MTextView content="Serial Number :" />
                <div className="ml-2 font-bold text-gray-700">
                  {selectedAircraft.serialNumber}
                </div>
              </div>

              <div className="ml-5 flex flex-row items-center">
                <MTextView content="Number of Seats :" />
                <div className="ml-2 font-bold text-gray-700">
                  {selectedAircraft.seats}
                </div>
              </div>

              <div className="ml-5 flex flex-row items-center">
                <MTextView content="Year of Manufacture:" />
                <div className="ml-2 font-bold text-gray-700">
                  {selectedAircraft.manufactureYear}
                </div>
              </div>

              <div className="ml-5 flex flex-row items-center">
                <MTextView content="Note to CAA :" />
                <div className="ml-2 font-bold text-gray-700">
                  {selectedAircraft.noteToCaa}
                </div>
              </div>
            </div>

            <div className="space-y-2 border-r-2 border-gray-100 pr-5">
              <div className="ml-5 flex flex-row items-center">
                <div
                  className="flex cursor-pointer flex-row items-center hover:text-blue-400 hover:underline"
                  onClick={() => {
                    setDisplay('certOwnership')
                  }}
                >
                  <DocumentTextIcon className="h-5 w-5 text-blue-400" />
                  Certificate of Ownership{' '}
                </div>
              </div>

              <div className="ml-5 flex flex-row items-center">
                <div
                  className="flex cursor-pointer flex-row items-center hover:text-blue-400 hover:underline"
                  onClick={() => {
                    setDisplay('certRegist')
                  }}
                >
                  <DocumentTextIcon className="h-5 w-5 text-blue-400" />
                  Certificate of Registration
                </div>
              </div>

              <div className="ml-5 flex flex-row items-center space-x-2">
                <div
                  className="flex cursor-pointer flex-row items-center hover:text-blue-400 hover:underline"
                  onClick={() => {
                    setDisplay('certAirworth')
                  }}
                >
                  <DocumentTextIcon className="h-5 w-5 text-blue-400" />
                  Certificate of Airworthiness
                </div>
                <div className="text-sm text-yellow-500">
                  {getExpiration(
                    selectedAircraft.certAirWorthExpDate,
                    172800000
                  )}{' '}
                </div>
              </div>
            </div>

            <div className="space-y-2 border-r-2 border-gray-100 pr-5">
              <div className="ml-5 flex flex-row items-center space-x-2">
                <div
                  className="flex cursor-pointer flex-row items-center hover:text-blue-400 hover:underline"
                  onClick={() => {
                    setDisplay('certInsurance')
                  }}
                >
                  <DocumentTextIcon className="h-5 w-5 text-blue-400" />
                  Certificate of Insurance
                </div>
                <div className="text-sm text-yellow-500">
                  {getExpiration(
                    selectedAircraft.certInsuranceExpDate,
                    172800000
                  )}{' '}
                </div>
              </div>

              <div className="ml-5 flex flex-row items-center space-x-2">
                <div
                  className="flex cursor-pointer flex-row items-center hover:text-blue-400 hover:underline"
                  onClick={() => {
                    setDisplay('certNoise')
                  }}
                >
                  <DocumentTextIcon className="h-5 w-5 text-blue-400" />
                  Noise Certificate
                </div>
                <div className="text-sm text-yellow-500">
                  {getExpiration(selectedAircraft.certNoiseExpDate, 172800000)}{' '}
                </div>
              </div>

              <div className="ml-5 flex flex-row items-center">
                <div
                  className="flex cursor-pointer flex-row items-center hover:text-blue-400 hover:underline"
                  onClick={() => {
                    setDisplay('certRadio')
                  }}
                >
                  <DocumentTextIcon className="h-5 w-5 text-blue-400" />
                  Radio Certificate
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="ml-5 flex flex-row items-center">
                <div
                  className="flex cursor-pointer flex-row items-center hover:text-blue-400 hover:underline"
                  onClick={() => {
                    setDisplay('certLastRelease')
                  }}
                >
                  <DocumentTextIcon className="h-5 w-5 text-blue-400" />
                  Last Release for Service
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
