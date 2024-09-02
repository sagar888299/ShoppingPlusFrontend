import React, { useState } from "react";
import {
  FaUser,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaSignOutAlt,
  FaCross,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { setTab } from "./ProfileReducer";
import { resetState } from "../Store/RootReducer";
import { toast } from "react-toastify";

export default function ProfileDrawer({setIsOpen , isOpen}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTab = (item) => {
   navigate("/profile");
   dispatch(setTab(item));
    setIsOpen(false);
  }

  const handleNavigate = (item) => {
    setIsOpen(false);
    navigate(item)
  }

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("reduxState");
    dispatch(resetState());
    toast.success("Logout Successfully");
  }

  return (
    <>
      <div
        className={`fixed lg:hidden  md:hidden block
            bottom-0 top-0 right-0 h-full w-full bg-gray-100 shadow-lg transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="absolute items-right cursor-pointer ml-[320px] mt-5 bg-gray-300 p-2 rounded-full flex flex-row-reverse">
        <FaChevronRight className="" onClick={() => setIsOpen((prevState) => !prevState)}/>
        </div>
        <div className="flex flex-col h-full p-4">
          <ul className="space-y-4">
            <li
              onClick={() => navigate("/myOrder")}
              className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded"
            >
              <FaBoxOpen className="mr-2" /> My Orders
            </li>
            <li
              onClick={() => handleTab("address")}
              className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded"
            >
              <FaMapMarkerAlt className="mr-2" /> Address Change
            </li>
            <li
              onClick={() => handleNavigate("profile")}
              className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded"
            >
              <FaUser className="mr-2" /> Profile Change
            </li>
            <li
              onClick={() => handleNavigate("/cart")}
              className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded"
            >
              <FaMapMarkerAlt className="mr-2" /> Cart
            </li>
            <li
              onClick={() => handleLogout()}
              className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
