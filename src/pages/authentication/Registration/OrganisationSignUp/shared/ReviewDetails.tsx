import { FC } from "react";

interface ReviewDetailsProp {
  details: { title: string; content: { title: string; data: any }[] }[];
}

const ReviewDetails: FC<ReviewDetailsProp> = ({ details = [] }) => {
  return (
    <>
      <div className="p-2 flex flex-col justify-between">
        {details?.map(({ title, content }, index) => {
          return (
            <div key={index} className="flex flex-col p-4 rounded ">
              <p className="font-bold text-[15px] leading-4 tracking-tighter">{title}</p>
              <div className="grid grid-cols-2 mt-1 gap-y-1 gap-x-6">
                {content.map((data, dataIndex) => {
                  return (
                    <div key={dataIndex} className="flex flex-col ">
                      <p className="text-[12px] font-medium">{data?.title}</p>
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
