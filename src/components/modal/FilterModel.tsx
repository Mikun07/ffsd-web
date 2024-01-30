import React, { useState } from "react";

function FilterModel({setSelectedFilter}) {
  const [modal, openModal] = useState(false);

  const status = [
    { name: "submitted", style: "#46A437" },
    { name: "pending", style: "#D4973B" },
    { name: "archived", style: "#D1D43B" },
    { name: "querried", style: "#D43B3B" },
  ];

  return (
    <>
      <div className="relative">
        <div
          onClick={() => openModal(!modal)}
          className="bg-white w-12 h-12 rounded-lg relative flex items-center shadow-md justify-center cursor-pointer"
        >
          <svg
            className="h-8 w-8"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M6 10.5a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>

        {modal && (
          <div className="absolute z-10 w-56 bg-white border-2 border-slate-200 top-16 right-0 rounded-lg">
            <div className="flex flex-col gap-2">
              {status.map(({ name, style }, index) => (
                <p
                  key={index}
                  onClick={() => setSelectedFilter(name)}
                  className="py-2 pl-2 capitalize flex flex-col gap-2 hover:bg-slate-200"
                  style={{
                    color: style,
                    opacity: "0.95",
                  }}
                >
                  {name}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FilterModel;
