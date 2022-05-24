import {
  DocumentAddIcon,
  DocumentDuplicateIcon,
  PaperClipIcon,
} from "@heroicons/react/outline";
import React, { useState } from "react";

export default function MUploadButton({ fileChangeHandler }) {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("File");
  return (
    <div className="flex flex-row">
      <div className="flex pt-1 mr-10">
        <label
          className={
            !fileUploaded
              ? " p-1 flex flex-row justify-center items-center bg-white text-blue-400 rounded-lg shadow-md tracking-wide uppercase border  cursor-pointer transition duration-300 ease-in-out hover:bg-blue-400 hover:text-white"
              : " p-1 flex flex-row justify-center items-center bg-white text-green-400 rounded-lg shadow-md tracking-wide uppercase border  cursor-pointer transition duration-300 ease-in-out hover:bg-green-400 hover:text-white"
          }
        >
          <PaperClipIcon className="h-5 w-5" />
          {/* <span className="pl-2 text-sm font-semibold leading-normal">
            {fileName}
          </span> */}
          <input
            // disabled={!fileUploaded}
            type="file"
            className="hidden"
            webkitdirectory
            directory
            multiple
            // value={fileName}
            onChange={(e) => {
              setFileName("Ready!");
              setFileUploaded(true);
              fileChangeHandler(e);
            }}
            onClick={(event) => {
              event.target.value = null;
            }}
          />
        </label>
      </div>
    </div>
  );
}
