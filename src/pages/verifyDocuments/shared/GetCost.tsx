import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../types/redux/root";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchUser } from "../../../redux/features/userSlice";

const GetCost = ({ data }) => {
//   console.log(data);

  return (
    <>
      <div>GetCost</div>
    </>
  );
};

export default GetCost;
