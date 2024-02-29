import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({ result, setResult, data }) => {
  const [input, setInput] = useState("");

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleChange = (value) => {
    setInput(value);
    const searchResult = data.filter((item) => {
      const { docOwnerFirstName, docOwnerLastName, tag } = item.userInfo;
      const searchTerm = value.toLowerCase();
      return (
        docOwnerFirstName?.toLowerCase().includes(searchTerm) ||
        docOwnerLastName?.toLowerCase().includes(searchTerm) ||
        tag?.toLowerCase().includes(searchTerm)
      );
    });
    setResult(searchResult);
  };

  const debouncedHandleChange = debounce(handleChange, 300);

  return (
    <>
      <div className="relative">
        <div className="bg-slate-200 relative rounded-lg h-12 p-4 shadow-md flex items-center">
          <FaSearch className="text-primary cursor-pointer" />
          <input
            className="bg-transparent border-none outline-none text-[15px] w-[300px] ml-2 py-2 text-black placeholder:text-gray-800"
            type="text"
            placeholder="Search..."
            onChange={(e) => debouncedHandleChange(e.target.value)}
          />
        </div>

        {input && result.length > 0 && (
          <div className="absolute z-20 w-full border-2 rounded-lg mt-3 py-2 max-h-max bg-white overflow-y-auto custom__scrollbar px-2">
            {result.map((searchResult, index) => {
              return (
                <div
                  key={index}
                  className="flex hover:bg-gray-100 px-3 rounded-lg h-[72px] items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-[40px] w-[40px] rounded-full bg-[#40B52D] cursor-pointer flex items-center justify-center text-white">
                      <p className="font-semibold">
                        {searchResult?.userInfo?.docOwnerLastName &&
                          searchResult?.userInfo?.docOwnerLastName[0]}
                        {searchResult?.userInfo?.docOwnerFirstName &&
                          searchResult?.userInfo?.docOwnerFirstName[0]}
                      </p>
                    </div>
                    <div className="font-medium gap-[0.5rem]">
                      <h5 className="text-[13px] font-bold text-black capitalize">
                        {searchResult?.userInfo?.docOwnerLastName}{" "}
                        {searchResult?.userInfo?.docOwnerFirstName}
                      </h5>
                      <div className="flex items-center gap-1">
                        <p className="flex items-center text-[12px] text-gray-400 gap-2">
                          {new Date(
                            searchResult?.created_at
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col font-medium text-[12px] justify-end items-end">
                    <p className="flex justify-end items-center text-black font-semibold capitalize gap-2">
                      {searchResult?.tag}
                    </p>
                    <p className="flex items-center text-gray-400 uppercase">
                      <span className="text-black">#</span>
                      {searchResult?.ref_id?.split("/")[1]}
                    </p>
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
