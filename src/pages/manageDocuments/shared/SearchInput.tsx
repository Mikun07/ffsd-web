import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({ result, setResult, data }) => {
  const [input, setInput] = useState("");

  const handleChange = (value) => {
    setInput(value);
    const result = data.filter((item) => {
      const { docOwnerFirstName, docOwnerLastName, ref_id } = item.userInfo;
      const searchTerm = value.toLowerCase();
      return (
        docOwnerFirstName.toLowerCase().includes(searchTerm) ||
        docOwnerLastName.toLowerCase().includes(searchTerm) ||
        ref_id?.split("/")[1].toLowerCase().includes(searchTerm)
      );
    });
    setResult(result);
  };
  return (
    <>
      <div className="relative">
        <div className="bg-white relative rounded-lg h-12 p-4 shadow-md flex items-center">
          <FaSearch className="text-primary cursor-pointer" />
          <input
            className="bg-transparent w-[300px] border-none outline-none text-[15px] ml-2 py-2 text-black placeholder:text-gray-300"
            type="text"
            placeholder="Search..."
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>

        {input && result.length > 0 && (
          <div className="absolute z-20 w-full border-2 rounded-lg mt-3 pt-2 h-60 bg-white overflow-y-auto custom__scrollbar px-2">
            {result.map((result, index) => {
              return (
                <div
                  key={index}
                  className="flex hover:bg-gray-100 px-3 rounded-lg h-[72px] items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-[40px] w-[40px] rounded-full bg-[#40B52D] cursor-pointer flex items-center justify-center text-white">
                      <p className="font-semibold">
                        {result?.userInfo?.docOwnerLastName &&
                          result?.userInfo?.docOwnerLastName[0]}
                        {result?.userInfo?.docOwnerFirstName &&
                          result?.userInfo?.docOwnerFirstName[0]}
                      </p>
                    </div>
                    <div className="font-medium gap-[0.5rem]">
                      <h5 className="text-[16px] font-bold text-black capitalize">
                        {result?.userInfo?.docOwnerLastName}{" "}
                        {result?.userInfo?.docOwnerFirstName}
                      </h5>
                      <div className="flex items-center gap-1">
                        <p className="flex items-center text-[12px] text-gray-400 uppercase">
                          <span className="text-black">#</span>
                          {result?.ref_id?.split("/")[1]}
                        </p>
                        <span className="w-1 h-1 rounded-full text-[14px] bg-black"></span>
                        <p className="flex items-center text-[12px] text-gray-400 gap-2">
                          {new Date(result?.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchInput;
