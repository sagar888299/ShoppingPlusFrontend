import React, { useState, useEffect, useRef } from "react";
import "react-responsive-modal/styles.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { openLoginModal } from "./ModalSlice";
import SearchBar from "./SearchBar";
import { toast } from "react-toastify";
import { resetState } from "../Store/RootReducer";
import ProfileDrawer from "./ProfileDrawer";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isAuthenticated = useSelector((state) => state.auth?.user);
  const userName = useSelector((state) => state.auth?.user?.customer?.name);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (isAuthenticated !== null) {
      navigate("/cart");
    } else {
      onOpenLoginModal("SignUP");
    }
  };

  const onOpenLoginModal = () => {
    dispatch(openLoginModal("SignUP"));
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("reduxState");
    dispatch(resetState());
    toast.success("Logout Successfully");
    setShowDropdown(false);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  const handleDropdown = () => {
    setShowDropdown(true);
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <header className="bg-white shadow-md fixed w-screen top-0 z-10 h-auto">
      <ProfileDrawer setIsOpen={setIsOpen} isOpen={isOpen} />
      <div className="sticky container mx-auto flex justify-between items-center p-2">
        <div
          onClick={() => navigate("/")}
          className="text-blue-700 hover:text-gray-600 text-xl flex font-medium cursor-pointer"
        >
          Shopping <span className="text-amber-600 text-3xl">+</span>
        </div>
        <div className="w-full hidden lg:block md:block">
          <SearchBar />
        </div>
        <nav className="flex items-center space-x-4 gap-4">
          {isAuthenticated !== null && (
            <button
              className="text-blue-700 hover:text-blue-600 text-xl font-medium lg:block md:block sm:block hidden"
              onClick={() => navigate("/myOrder")}
            >
              MyOrder
            </button>
          )}
          <button
            className="text-blue-700 hover:text-gray-600 text-lg lg:block md:block sm:block hidden"
            onClick={handleNavigate}
          >
            <FaShoppingCart size={24} />
          </button>
          {isAuthenticated !== null ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="text-white bg-gradient-to-r mt-1 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-6 py-1 text-center mb-2"
                onClick={() => handleDropdown()}
              >
                <span className="inline-block bg-white text-black rounded-full h-8 w-8 flex items-center justify-center mr-2">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </button>
              {showDropdown && (
                <div className="absolute lg:block md:block hidden top-full ml-2 right-0 bg-white shadow-md rounded mt-1 min-w-[120px]">
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => navigate("/profile")}
                  >
                    Your Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="text-white bg-gradient-to-r mt-1 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center mb-2"
              onClick={onOpenLoginModal}
            >
              LogIn
            </button>
          )}
        </nav>
      </div>
      <div className="w-full block lg:hidden md:hidden mb-2">
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
