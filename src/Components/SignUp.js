import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, verifyOtp } from "./LoginAndSignUpAction";
import { fetchCartWithProducts, getCartFromBackend } from "./CartActions";
import { toast } from "react-toastify";

export default function AuthForm({ handleCloseModal }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [otpTimer, setOtpTimer] = useState(null);
  const [timerDuration, setTimerDuration] = useState(120); // 2 minutes in seconds
  const [phoneCode, setPhoneCode] = useState("+91"); // Default to +1 for US

  const dispatch = useDispatch();
  const otpSent = useSelector((state) => state.auth.otpSent);
  const isAuthenticated = useSelector((state) => state.auth.user);
  const customer = useSelector((state) => state.auth);
  const phoneNumbers = customer?.user?.customer?.phoneNumber;
  const isLoading = useSelector((state) => state.auth.loading); 
  const isError = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (isError) {
      if (!isError.message) {
        toast.error("Something Wrong");
      } else {
        toast.error(isError.message);
      }
    }
  }, [isError]);

  useEffect(() => {
    const fetchCartData = async () => {
      if (isAuthenticated !== null) {
        toast.success("You logged in successfully");
        handleCloseModal();
        try {
          // Await the cart fetching before dispatching the product fetching
          const cartResponse = await dispatch(getCartFromBackend({ phoneNumber: phoneNumbers })).unwrap();
          console.log(cartResponse, "cartresponse");
          // Dispatch fetchCartWithProducts after successful cart fetching
          dispatch(fetchCartWithProducts(cartResponse));
        } catch (error) {
          toast.error("Failed to fetch cart data");
        }
      }
    };

    fetchCartData();
  }, [dispatch, isAuthenticated, handleCloseModal,phoneNumber]);

  useEffect(() => {
    let timer;
    if (otpTimer) {
      timer = setInterval(() => {
        setTimerDuration((prevDuration) => {
          if (prevDuration <= 1) {
            clearInterval(timer);
            setOtpTimer(null);
            return 0;
          }
          return prevDuration - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer); // Clear interval on component unmount
  }, [otpTimer]);

  const handleNameChange = (e) => setName(e.target.value);
  const handlePhoneChange = (e) => setPhoneNumber(e.target.value);
  const handleOtpChange = (e) => setOtp(e.target.value);

  const handleSendOtp = (e) => {
    e.preventDefault();
    const fullPhoneNumber = `${phoneCode}${phoneNumber}`;
    dispatch(sendOtp(fullPhoneNumber));
    setOtpTimer(true); // Start the OTP timer
    setTimerDuration(120); // Reset the timer duration to 2 minutes
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const fullPhoneNumber = `${phoneCode}${phoneNumber}`;
    dispatch(verifyOtp({ phoneNumber: fullPhoneNumber, otp, name }));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div className="lg:h-96 lg:w-96 md:h-96 md:w-96 h-72 w-72">
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
        <div className="bg-white p-6 w-full max-w-md rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 underline mb-4">
            {isLogin ? "Login" : "Sign Up"}
          </h3>
          {otpSent && otpTimer && (
            <div className="text-red-600 text-sm mb-4">
              OTP expires in: {formatTime(timerDuration)}
            </div>
          )}

          <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
            {!isLogin && (
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleNameChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="John Doe"
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Phone Number:
              </label>
              <div className="flex border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                <select
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value)}
                  className="bg-gray-50 border text-gray-900 text-sm rounded-l-lg block"
                >
                  <option value="+91">+91 (IN)</option>
                  <option value="+1">+1 (US)</option>
                  <option value="+44">+44 (UK)</option>
                </select>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className="bg-gray-50 border text-gray-900 text-sm rounded-r-lg block w-full p-2.5"
                  placeholder="123-456-7890"
                  required
                />
              </div>
            </div>
            {otpSent && (
              <div className="mb-4">
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="123456"
                  required
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center"
              disabled={!otpTimer && otpSent} // Disable button if OTP timer is not running
            >
              {isLoading && (
                <svg
                  className="animate-spin w-6 h-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="blue"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              )}
              {isLoading
                ? " "
                : otpSent
                ? "Verify OTP"
                : "Send OTP"}
            </button>
          </form>
          <div className="text-sm font-medium text-gray-500 mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-700 hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
