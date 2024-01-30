import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({ result, setResult, data }) => {
  const [input, setInput] = useState("");

  // console.log({ data });

  const handleChange = (value) => {
    setInput(value);
    const result = data.filter((item) => {
      const { docOwnerFirstName, docOwnerLastName, ref_id } = item.userInfo;
      const searchTerm = value.toLowerCase();
      return (
        docOwnerFirstName.toLowerCase().includes(searchTerm) ||
        docOwnerLastName.toLowerCase().includes(searchTerm)
        // ref_id?.split("/")[1].toLowerCase().includes(searchTerm)
      );
    });
    setResult(result);
    // console.log(result);
  };
  return (
    <>
      <div className="relative">
        <div className="bg-white relative rounded-lg h-12 p-4 shadow-md flex items-center">
          <FaSearch className="text-primary cursor-pointer" />
          <input
            className="bg-transparent border-none outline-none text-[15px] ml-2 py-2 text-black placeholder:text-gray-300"
            type="text"
            placeholder="Search..."
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>

        <div className=" absolute z-20 w-full border-2 rounded-lg mt-3 h-40 bg-white">
          {
            result.map((result, index) => {
              console.log(result)
              return (
                <div key={index}>
                    <p>{result.docOwnerFirstName}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  );
};

export default SearchInput;
