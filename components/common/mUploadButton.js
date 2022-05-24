import React from "react";
import { BadgeCheckIcon, UploadIcon } from "@heroicons/react/outline";

export default function MUploadButton2({ label }) {
  return (
    <div className="flex items-center justify-center space-x-2 w-32 h-10 bg-blue-400 rounded-full mt-3 shadow-md cursor-pointer p-2 active:shadow-sm active:scale-95 hover:shadow-sm">
      <UploadIcon className="h-5 w-5 text-white" />
      <div className="text-white font-bold ">Upload</div>
    </div>
  );
}
