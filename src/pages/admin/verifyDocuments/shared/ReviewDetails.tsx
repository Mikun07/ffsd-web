import { FC } from "react";

interface ReviewDetailsProp {
  details: { title: string; content: { title: string; data: any }[] }[];
}

const ReviewDetails: FC<ReviewDetailsProp> = ({ details = [] }) => {
  return (
    <>
      <div className="flex w-full gap-2 flex-col ">
        {details?.map(({ title, content }, index) => {
          return (
            <div key={index} className="flex flex-col p-4 gap-3 mt-3 bg-slate-100 shadow-sm rounded-lg">
              <p className="font-bold text-[15px] leading-4 tracking-tighter">{title}</p>
              <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-4 grid-cols-2 mt-1 gap-y-3 gap-x-6 w-full">
                {content.map((data, dataIndex) => {
                  return (
                    <div key={dataIndex} className="flex flex-col ">
                      <p className="text-[15px] font-medium capitalize">{data?.title}</p>
                      <p className="text-[12px] font-medium text-gray-400">{data?.data || "N/A"}</p>
                    </div>
                );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ReviewDetails;