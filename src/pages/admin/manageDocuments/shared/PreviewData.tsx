import React from "react";
import ArchiveIcon from "../../../../assets/icons/ArchiveIcon";
import { MdKeyboardArrowRight } from "react-icons/md";

function PreviewData() {
  return (
    <>
      <div className="flex flex-col h-full py-2 px-4">
        <header className="flex gap-1 text-gray-400 mt-4 items-center font-medium">
          <ArchiveIcon width="25" height="25" />
          <div className="text-black">
            <MdKeyboardArrowRight size={25} />
          </div>
          <p className="text-primary text-[20px]">User's Name</p>
        </header>
      </div>
    </>
  );
}

export default PreviewData;
