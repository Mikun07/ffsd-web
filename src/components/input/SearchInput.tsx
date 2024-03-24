import { FaSearch, FaTimes } from "react-icons/fa";

const SearchInput = ({ input, handleChange, clearSearch }) => {

  return (
    <>
      <div className="relative">
        <div className="bg-slate-200 relative rounded-lg h-12 p-4 shadow-md flex items-center">
          <FaSearch className="text-primary cursor-pointer" />
          <input
            className="bg-transparent border-none outline-none text-base md:text-lg w-full md:w-[300px] ml-2 py-2 text-black placeholder:text-gray-800"
            type="text"
            placeholder="Search..."
            value={input}
            onChange={(e) => handleChange(e)}
          />
          {input && (
            <FaTimes
              className="text-primary cursor-pointer absolute right-4"
              onClick={() => clearSearch()}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SearchInput;
