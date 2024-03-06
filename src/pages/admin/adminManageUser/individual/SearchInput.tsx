import React, { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchInput = ({ result, setResult, data }) => {
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filterData = (searchTerm) => {
      if (!data) {
        setFilteredData([]);
        return;
      }

      const lowerCaseTerm = searchTerm.toLowerCase();

      if (lowerCaseTerm.startsWith("admin status")) {
        const systemAdminType = lowerCaseTerm
          .replace("admin status", "")
          .trim();
        const filtered = data.filter((item) =>
          item.system_admin_type?.toString().includes(systemAdminType)
        );
        // Update filtered data state
        setFilteredData(filtered);
      } else {
        // Filter data based on other fields
        const filtered = data?.data?.filter(
          (item) =>
            item.firstName?.toLowerCase().includes(lowerCaseTerm) ||
            item.lastName?.toLowerCase().includes(lowerCaseTerm) ||
            item.email?.toLowerCase().includes(lowerCaseTerm)
        );
        // Update filtered data state
        setFilteredData(filtered);
      }
    };

    // Set a timeout to debounce filtering logic
    const timeoutId = setTimeout(() => {
      filterData(input);
    }, 300);

    // Clear timeout on component unmount or input change
    return () => clearTimeout(timeoutId);
  }, [input, data]);

  // Define a function to handle input change
  const handleChange = (e) => {
    // Update input state with current input value
    setInput(e.target.value);
  };

  // Define a function to clear search input and results
  const clearSearch = () => {
    // Reset input state to empty string
    setInput("");
    // Clear search results by setting result state to empty array
    setResult([]);
  };

  return (
    <div className="relative">
      <div className="bg-slate-200 relative rounded-lg h-12 p-4 shadow-md flex items-center">
        <FaSearch className="text-primary cursor-pointer" />
        <input
          className="bg-transparent border-none outline-none text-[15px] w-[200px] ml-2 py-2 text-black placeholder:text-gray-800"
          type="text"
          placeholder="Search..."
          value={input}
          onChange={handleChange}
        />
        {input && (
          <FaTimes
            className="text-primary cursor-pointer absolute right-4"
            onClick={clearSearch}
          />
        )}
      </div>

      {input && filteredData.length > 0 && (
        <div className="absolute z-20 w-full border-2 rounded-lg mt-3 py-2 max-h-max bg-white overflow-y-auto custom__scrollbar px-2">
          {filteredData.map((searchResult, index) => (
            <div
              key={index}
              className="flex hover:bg-gray-100 px-3 rounded-lg h-[72px] items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="h-[40px] w-[40px] rounded-full bg-[#40B52D] cursor-pointer flex items-center justify-center text-white">
                  <p className="font-semibold uppercase">
                    {searchResult?.firstName && searchResult?.firstName[0]}
                    {searchResult?.lastName && searchResult?.lastName[0]}
                  </p>
                </div>
                <div className="font-medium gap-[0.5rem]">
                  <p className="flex justify-start items-center text-[14px] text-black  font-semibold capitalize gap-2">
                    {searchResult?.firstName} {searchResult?.lastName}
                  </p>

                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-medium text-gray-400 lowercase">
                      {searchResult?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
