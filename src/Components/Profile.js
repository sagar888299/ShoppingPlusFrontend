import React, { useEffect } from "react";
import ProfileChange from "./ProfileChange";
import AddressChange from "./AddressChange";
import { FaUserCog, FaArrowRight, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { setTab } from "./ProfileReducer";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomer } from "./ProfileAction";
import Spinner from "./Spinner"; // Import your spinner component

export default function Profile() {
  const activeTab = useSelector((state) => state.profile.selectedTab);
  const customerDetails1 = useSelector(
    (state) => state.auth?.user?.customer?.phoneNumber
  );
  const customerDetails = useSelector((state) => state.profile?.customer);
  const isLoading = useSelector((state) => state.profile?.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCustomer(customerDetails1));
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 p-6 mt-24">
      <div className="col-span-1 lg:block md:block hidden flex flex-col space-y-4 text-left">
        <div className="h-20 flex items-center p-6 border rounded-lg shadow-lg font-semibold lg:text-2xl md:text-base">
          <div role="img" aria-label="man" className="mr-1 h-8">
            👨
          </div>
        { isLoading === "succeeded" && <span>Hello, {customerDetails.name}</span>}
        </div>
        <div
          onClick={() => navigate("/myOrder")}
          className="flex items-center justify-between p-6 border rounded-lg shadow-lg font-semibold lg:text-2xl md:text-base cursor-pointer"
        >
          <div className="flex items-center">
            <MdOutlineShoppingBag className="text-blue-500 mr-2" size={25} />
            <h1 className="lg:text-2xl md:text-base font-semibold">My Order</h1>
          </div>
          <FaArrowRight className="text-blue-500" size={20} />
        </div>
        <div className="flex flex-col gap-6 mb-6 p-6 h-lg border shadow-lg rounded-lg">
          <div className="flex items-center">
            <FaUserCog className="text-blue-500 mr-2" size={24} />
            <h1 className="lg:text-2xl md:text-base font-semibold truncate ">
              Account Settings
            </h1>
          </div>
          <button
            onClick={() => dispatch(setTab("profile"))}
            className={`text-left rounded-md border-b p-2 ${
              activeTab === "profile"
                ? "text-blue-700 bg-gray-100"
                : "text-gray-800"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => dispatch(setTab("address"))}
            className={`text-left rounded-md border-b p-2 mb-4 ${
              activeTab === "address"
                ? "text-blue-700 bg-gray-100"
                : "text-gray-800"
            }`}
          >
            Address
          </button>
          <div className="flex items-center cursor-pointer">
            <FaSignOutAlt className="text-blue-500 mr-2" size={24} />
            <h1 className="text-2xl font-semibold">Logout</h1>
          </div>
        </div>
      </div>
      <div className="lg:col-span-3 md:col-span-3 col-span-4 bg-white shadow-md rounded-lg border">
        {isLoading === "succeeded" ? (
                    <>
                    {activeTab === "profile" && (
                      <ProfileChange customerDetails={customerDetails} />
                    )}
                    {activeTab === "address" && (
                      <AddressChange customerDetails={customerDetails} />
                    )}
                  </>
        ) : (
          <div className="flex justify-center items-center h-full">
            <Spinner /> {/* Display spinner while loading */}
          </div>
        )}
      </div>
    </div>
  );
}
