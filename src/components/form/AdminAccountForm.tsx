import React from "react";

function AdminAccountForm() {
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center gap-y-6">
        <div className="flex flex-col w-full h-full gap-8">
          <div className="flex lg:flex-row flex-col justify-between">
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="font-semibold capitalize">
                Firstname
              </label>
              <input
                type="text"
                disabled
                className="h-[45px] lg:w-[340px] cursor-pointer px-2 bg-transparent border-2 border-[#40B52D] rounded-lg "
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="font-semibold capitalize">
                Lastname
              </label>
              <input
                type="text"
                disabled
                className="h-[45px] lg:w-[340px] cursor-pointer px-2 bg-transparent border-2 border-[#40B52D] rounded-lg "
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="font-semibold capitalize">
                Email
              </label>
              <input
                type="email"
                disabled
                className="h-[45px] lg:w-[340px] cursor-pointer px-2 bg-transparent border-2 border-[#40B52D] rounded-lg "
              />
            </div>
          </div>

          <div className="flex lg:flex-row flex-col justify-between">
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="font-semibold capitalize">
                Phone number
              </label>
              <input
                type="number"
                disabled
                className="h-[45px] lg:w-[340px] cursor-pointer px-2 bg-transparent border-2 border-[#40B52D] rounded-lg "
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="font-semibold capitalize">
                Role
              </label>
              <input
                type="text"
                disabled
                className="h-[45px] lg:w-[340px] cursor-pointer px-2 bg-transparent border-2 border-[#40B52D] rounded-lg "
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="font-semibold capitalize">
                password
              </label>
              <input
                type="password"
                disabled
                className="h-[45px] lg:w-[340px] cursor-pointer px-2 bg-transparent border-2 border-[#40B52D] rounded-lg "
              />
            </div>
          </div>
        </div>

        <div className="flex w-full lg:flex-row flex-col justify-between">
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="font-semibold capitalize">
              Address
            </label>
            <input
              type="text"
              disabled
              className="h-[45px] lg:w-[600px] cursor-pointer px-2 bg-transparent border-2 border-[#40B52D] rounded-lg "
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="" className="font-semibold capitalize">
              City
            </label>
            <input
              type="text"
              disabled
              className="h-[45px] lg:w-[340px] cursor-pointer px-2 bg-transparent border-2 border-[#40B52D] rounded-lg "
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminAccountForm;
