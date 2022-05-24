import React, { useContext, useState } from "react";
import MTextView from "./mTextView";
import {
  CashIcon,
  CreditCardIcon,
  LibraryIcon,
} from "@heroicons/react/outline";
import MSubmitButton from "./mSubmitButton";
import MUploadButton from "./uploadButton";
import SmallTextInput from "./mSmallTextIput";
import { LanguageContext } from "../../contexts/languageContext";
import { labels, messages, placeholders } from "../../utils/labels";

export default function MPayment({ submit, balance }) {
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div className="rounded-md shadow-md bg-white px-5 py-3 my-3">
      {/* Title */}
      <div className="text-lg font-semibold text-gray-700">
        {`${labels[`${language}`].reviewAndAuthorize}`}
      </div>
      {/* Intro text */}
      <div className="text-sm font-base text-gray-400 w-3/4">
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

      <div className="grid grid-cols-2 w-1/5 gap-2 ring-1 ring-gray-200 rounded-md pt-3 px-2">
        <div>
          <div className="text-md font-bold text-gray-400">{`${
            labels[`${language}`].permits
          }`}</div>
          <div className="text-md font-bold text-gray-400">{`${
            labels[`${language}`].processingFees
          }`}</div>
          <div className="text-md font-bold text-gray-600 mt-3">{`${
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

          <div className="flex flex-row justify-end mt-3 mb-3">
            <div className="text-md font-bold text-gray-600">$ 170.5</div>
          </div>
        </div>
      </div>

      {/* Payment method */}
      <div className="mt-4">
        <MTextView content={`${labels[`${language}`].paymentMethod}`} />
      </div>

      <div className="grid grid-cols-3 w-3/5 gap-2 ">
        <button
          onClick={() => setPaymentMethod("wallet")}
          className={
            paymentMethod === "wallet"
              ? "flex justify-between ring-1 ring-gray-200 h-16 rounded-sm items-center bg-purple-500 transition ease-out duration-200 cursor-pointer px-5 shadow-md text-gray-100"
              : "flex justify-between ring-1 ring-gray-200 h-16 rounded-sm items-center hover:bg-gray-50 transition ease-out duration-200 cursor-pointer px-5 shadow-md text-gray-500"
          }
        >
          <CashIcon className="h-10 w-10" />
          <div className="text-xl font-semibold">{`${
            labels[`${language}`].myWallet
          }`}</div>
        </button>

        <button
          onClick={() => setPaymentMethod("card")}
          className={
            paymentMethod === "card"
              ? "flex justify-between ring-1 ring-gray-200 h-16 rounded-sm items-center bg-blue-500 transition ease-out duration-200 cursor-pointer px-5 shadow-md text-gray-100"
              : "flex justify-between ring-1 ring-gray-200 h-16 rounded-sm items-center hover:bg-gray-50 transition ease-out duration-200 cursor-pointer px-5 shadow-md text-gray-500"
          }
        >
          <CreditCardIcon className="h-10 w-10 " />
          <div className="text-xl font-semibold ">XXXX XXXX XXXX X1288</div>
        </button>

        <button
          onClick={() => setPaymentMethod("bank")}
          className={
            paymentMethod === "bank"
              ? "flex justify-between ring-1 ring-gray-200 h-16 rounded-sm items-center bg-red-400 transition ease-out duration-200 cursor-pointer px-5 shadow-md text-white"
              : "flex justify-between ring-1 ring-gray-200 h-16 rounded-sm items-center hover:bg-gray-50 transition ease-out duration-200 cursor-pointer px-5 shadow-md text-gray-500"
          }
        >
          <LibraryIcon className="h-10 w-10 " />
          <div className="text-xl font-semibold ">{`${
            labels[`${language}`].bankTransfer
          }`}</div>
        </button>
      </div>

      {paymentMethod === "bank" && (
        <div className="my-3">
          <SmallTextInput
            label="Bank Name"
            placeholder="bank"
            setValue={() => {}}
            value=""
          />
          <div className="flex flex-row items-center space-x-5 my-3">
            <MTextView content="Proof of payment:" />
            <MUploadButton />
          </div>
        </div>
      )}

      {/* Authorize payment */}
      <div className="flex flex-row space-x-16 items-center mt-5 ">
        <button
          onClick={() => submit(paymentMethod)}
          className="focus:outline-none focus:ring-2 focus:ring-green-800 flex items-center justify-center space-x-2  h-10 bg-green-500 rounded-md shadow-md cursor-pointer p-2 active:shadow-sm active:scale-95 hover:shadow-sm transition ease-in-out duration-100"
        >
          {/* <BadgeCheckIcon className="h-5 w-5 text-white" /> */}
          <div className="text-white font-bold ">{`${
            labels[`${language}`].authorizePayment
          }`}</div>
        </button>

        {paymentMethod === "wallet" && (
          <div className="text-purple-500 font-bold flex relative">
            {`${labels[`${language}`].yourBalanceIs}`}{" "}
            {balance.toLocaleString()} $
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-200 opacity-50"></span>
          </div>
        )}
      </div>
    </div>
  );
}
