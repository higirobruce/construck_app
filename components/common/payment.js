import React, { useContext, useState } from 'react'
import MTextView from './mTextView'
import {
  ReceiptRefundIcon,
  CreditCardIcon,
  LibraryIcon,
} from '@heroicons/react/outline'
import MSubmitButton from './mSubmitButton'
import MUploadButton from './uploadButton'
import SmallTextInput from './mSmallTextIput'
import { LanguageContext } from '../../contexts/languageContext'
import { labels, messages, placeholders } from '../../utils/labels'

export default function MPayment({ submit, balance }) {
  const [paymentMethod, setPaymentMethod] = useState('wallet')
  const { language, setLanguage } = useContext(LanguageContext)

  return (
    <div className="my-3 rounded-md bg-white px-5 py-3 shadow-md">
      {/* Title */}
      <div className="text-lg font-semibold text-gray-700">
        {`${labels[`${language}`].reviewAndAuthorize}`}
      </div>
      {/* Intro text */}
      <div className="font-base w-3/4 text-sm text-gray-400">
        Consequat aliquip sint deserunt ullamco sunt non occaecat tempor in.
        Labore nisi nostrud pariatur duis minim aute velit. Commodo cillum culpa
        et exercitation irure officia tempor nisi fugiat est labore enim.
        Incididunt do culpa do labore nisi magna. Mollit anim irure nulla ad ea
        reprehenderit elit incididunt eiusmod.
      </div>

      {/* Invoice */}
      <div className="mt-4">
        <MTextView content={`${labels[`${language}`].invoice}`} />
      </div>

      <div className="grid w-1/5 grid-cols-2 gap-2 rounded-md px-2 pt-3 ring-1 ring-gray-200">
        <div>
          <div className="text-md font-bold text-gray-400">{`${
            labels[`${language}`].permits
          }`}</div>
          <div className="text-md font-bold text-gray-400">{`${
            labels[`${language}`].processingFees
          }`}</div>
          <div className="text-md mt-3 font-bold text-gray-600">{`${
            labels[`${language}`].totalBill
          }`}</div>
        </div>

        <div>
          <div className="flex flex-row justify-end">
            <div className="text-md font-bold text-gray-400">$ 150.5</div>
          </div>
          <div className="flex flex-row justify-end">
            <div className="text-md font-bold text-gray-400">$ 20</div>
          </div>

          <div className="mt-3 mb-3 flex flex-row justify-end">
            <div className="text-md font-bold text-gray-600">$ 170.5</div>
          </div>
        </div>
      </div>

      {/* Payment method */}
      <div className="mt-4">
        <MTextView content={`${labels[`${language}`].paymentMethod}`} />
      </div>

      <div className="grid w-3/5 grid-cols-3 gap-2">
        <button
          onClick={() => setPaymentMethod('wallet')}
          className={
            paymentMethod === 'wallet'
              ? 'flex h-16 cursor-pointer items-center justify-between rounded-sm bg-purple-500 px-5 text-gray-100 shadow-md ring-1 ring-gray-200 transition duration-200 ease-out'
              : 'flex h-16 cursor-pointer items-center justify-between rounded-sm px-5 text-gray-500 shadow-md ring-1 ring-gray-200 transition duration-200 ease-out hover:bg-gray-50'
          }
        >
          <ReceiptRefundIcon className="h-10 w-10" />
          <div className="text-xl font-semibold">{`${
            labels[`${language}`].myWallet
          }`}</div>
        </button>

        <button
          onClick={() => setPaymentMethod('card')}
          className={
            paymentMethod === 'card'
              ? 'flex h-16 cursor-pointer items-center justify-between rounded-sm bg-blue-500 px-5 text-gray-100 shadow-md ring-1 ring-gray-200 transition duration-200 ease-out'
              : 'flex h-16 cursor-pointer items-center justify-between rounded-sm px-5 text-gray-500 shadow-md ring-1 ring-gray-200 transition duration-200 ease-out hover:bg-gray-50'
          }
        >
          <CreditCardIcon className="h-10 w-10" />
          <div className="text-xl font-semibold">XXXX XXXX XXXX X1288</div>
        </button>

        <button
          onClick={() => setPaymentMethod('bank')}
          className={
            paymentMethod === 'bank'
              ? 'flex h-16 cursor-pointer items-center justify-between rounded-sm bg-red-400 px-5 text-white shadow-md ring-1 ring-gray-200 transition duration-200 ease-out'
              : 'flex h-16 cursor-pointer items-center justify-between rounded-sm px-5 text-gray-500 shadow-md ring-1 ring-gray-200 transition duration-200 ease-out hover:bg-gray-50'
          }
        >
          <LibraryIcon className="h-10 w-10" />
          <div className="text-xl font-semibold">{`${
            labels[`${language}`].bankTransfer
          }`}</div>
        </button>
      </div>

      {paymentMethod === 'bank' && (
        <div className="my-3">
          <SmallTextInput
            label="Bank Name"
            placeholder="bank"
            setValue={() => {}}
            value=""
          />
          <div className="my-3 flex flex-row items-center space-x-5">
            <MTextView content="Proof of payment:" />
            <MUploadButton />
          </div>
        </div>
      )}

      {/* Authorize payment */}
      <div className="mt-5 flex flex-row items-center space-x-16">
        <button
          onClick={() => submit(paymentMethod)}
          className="flex h-10 cursor-pointer items-center justify-center space-x-2 rounded-md bg-green-500 p-2 shadow-md transition duration-100 ease-in-out hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-green-800 active:scale-95 active:shadow-sm"
        >
          {/* <BadgeCheckIcon className="h-5 w-5 text-white" /> */}
          <div className="font-bold text-white">{`${
            labels[`${language}`].authorizePayment
          }`}</div>
        </button>

        {paymentMethod === 'wallet' && (
          <div className="relative flex font-bold text-purple-500">
            {`${labels[`${language}`].yourBalanceIs}`}{' '}
            {balance.toLocaleString()} $
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-200 opacity-50"></span>
          </div>
        )}
      </div>
    </div>
  )
}
