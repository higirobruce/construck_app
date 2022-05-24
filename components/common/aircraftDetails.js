import {
  DocumentTextIcon,
  ExclamationIcon,
  StopIcon,
} from "@heroicons/react/outline";
import ms from "ms";
import React from "react";
import MTextView from "./mTextView";

function getExpiration(expirationDate, thresholdDays) {
  if (new Date(expirationDate) < Date.now())
    return <ExclamationIcon className="h-5 w-5 text-red-400" />;

  let remainingDays = new Date(expirationDate) - Date.now();
  console.log(remainingDays);

  if (expirationDate) {
    if (remainingDays < thresholdDays) {
      return (
        ms(new Date(expirationDate) - Date.now(), { long: true }) +
        " to expiration"
      );
    }
  } else {
    return "No expiration date set!";
  }

  return (
    ms(new Date(expirationDate) - Date.now(), { long: true }) + " to expiration"
  );
}

export default function AircraftDetails({ selectedAircraft, setDisplay }) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col space-y-6 bg-white px-5 py-8 shadow-md rounded-lg mb-3 col-span-2">
          <div className="text-gray-700 font-bold ml-5 underline text-xl">
            {selectedAircraft.aircraftModel}
          </div>
          <div className="flex flex-row space-x-2">
            <div className="border-r-2 border-gray-100 pr-5 space-y-2">
              <div className="flex flex-row ml-5 items-center">
                <MTextView content="Registration :" />
                <div className="text-gray-700 font-bold ml-2">
                  {selectedAircraft.registration}
                </div>
              </div>

              <div className="flex flex-row ml-5 items-center">
                <MTextView content="MTOW - KGs :" />
                <div className="text-gray-700 font-bold ml-2">
                  {selectedAircraft.mtow}
                </div>
              </div>

              <div className="flex flex-row ml-5 items-center">
                <MTextView content="Aircraft Type :" />
                <div className="text-gray-700 font-bold ml-2">
                  {selectedAircraft.aircraftType}
                </div>
              </div>

              <div className="flex flex-row ml-5 items-center">
                <MTextView content="Homebase :" />
                <div className="text-gray-700 font-bold ml-2">
                  {selectedAircraft.homebase}
                </div>
              </div>
            </div>

            <div className="border-r-2 border-gray-100 pr-5 space-y-2">
              <div className="flex flex-row ml-5 items-center">
                <MTextView content="Serial Number :" />
                <div className="text-gray-700 font-bold ml-2">
                  {selectedAircraft.serialNumber}
                </div>
              </div>

              <div className="flex flex-row ml-5 items-center">
                <MTextView content="Number of Seats :" />
                <div className="text-gray-700 font-bold ml-2">
                  {selectedAircraft.seats}
                </div>
              </div>

              <div className="flex flex-row ml-5 items-center">
                <MTextView content="Year of Manufacture:" />
                <div className="text-gray-700 font-bold ml-2">
                  {selectedAircraft.manufactureYear}
                </div>
              </div>

              <div className="flex flex-row ml-5 items-center">
                <MTextView content="Note to CAA :" />
                <div className="text-gray-700 font-bold ml-2">
                  {selectedAircraft.noteToCaa}
                </div>
              </div>
            </div>

            <div className="border-r-2 border-gray-100 pr-5 space-y-2">
              <div className="flex flex-row ml-5 items-center">
                <div
                  className="hover:underline hover:text-blue-400 cursor-pointer flex flex-row items-center"
                  onClick={() => {
                    setDisplay("certOwnership");
                  }}
                >
                  <DocumentTextIcon className="h-5 w-5 text-blue-400" />
                  Certificate of Ownership{" "}
                </div>
              </div>

              <div className="flex flex-row ml-5 items-center">
                <div
                  className="hover:underline hover:text-blue-400 cursor-pointer flex flex-row items-center"
                  onClick={() => {
                    setDisplay("certRegist");
                  }}
                >
                  <DocumentTextIcon className="h-5 w-5 text-blue-400" />
                  Certificate of Registration
                </div>
              </div>

              <div className="flex flex-row ml-5 items-center space-x-2">
                <div
                  className="hover:underline hover:text-blue-400 cursor-pointer flex flex-row items-center"
                  onClick={() => {
                    setDisplay("certAirworth");
                  }}
                >
                  <DocumentTextIcon className="h-5 w-5 text-blue-400" />
                  Certificate of Airworthiness
                </div>
                <div className="text-yellow-500 text-sm">
                  {getExpiration(
                    selectedAircraft.certAirWorthExpDate,
                    172800000
                  )}{" "}
                </div>
              </div>
            </div>

            <div className="border-r-2 border-gray-100 pr-5 space-y-2">
              <div className="flex flex-row ml-5 items-center space-x-2">
                <div
                  className="hover:underline hover:text-blue-400 cursor-pointer flex flex-row items-center"
                  onClick={() => {
                    setDisplay("certInsurance");
                  }}
                >
                  <DocumentTextIcon className="h-5 w-5 text-blue-400" />
                  Certificate of Insurance
                </div>
                <div className="text-yellow-500 text-sm">
                  {getExpiration(
                    selectedAircraft.certInsuranceExpDate,
                    172800000
                  )}{" "}
                </div>
              </div>

              <div className="flex flex-row ml-5 items-center space-x-2">
                <div
                  className="hover:underline hover:text-blue-400 cursor-pointer flex flex-row items-center"
                  onClick={() => {
                    setDisplay("certNoise");
                  }}
                >
                  <DocumentTextIcon className="h-5 w-5 text-blue-400" />
                  Noise Certificate
                </div>
                <div className="text-yellow-500 text-sm">
                  {getExpiration(selectedAircraft.certNoiseExpDate, 172800000)}{" "}
                </div>
              </div>

              <div className="flex flex-row ml-5 items-center">
                <div
                  className="hover:underline hover:text-blue-400 cursor-pointer flex flex-row items-center"
                  onClick={() => {
                    setDisplay("certRadio");
                  }}
                >
                  <DocumentTextIcon className="h-5 w-5 text-blue-400" />
                  Radio Certificate
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-row ml-5 items-center">
                <div
                  className="hover:underline hover:text-blue-400 cursor-pointer flex flex-row items-center"
                  onClick={() => {
                    setDisplay("certLastRelease");
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
  );
}
