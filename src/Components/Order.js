import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { FaPlus } from 'react-icons/fa';
import { indianStates } from './Constants';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedAddress, updateSelectedProducts } from './OrderReducer';
import { useNavigate, useLocation } from 'react-router-dom';
import {openLoginModal} from "./ModalSlice";

export default function Order({ onMakePayment, isLoading, setIsLoading, setIsOpen }) {
  const dispatch = useDispatch();
  const customerAddress = useSelector((state) => state.auth?.user?.customer);
  const setSelectedAddress = useSelector((state) => state.order?.selectedAddress);
  const loginStatus = useSelector((state) => state.auth?.status);
  const [addresses, setAddresses] = useState([]);
  const [isNewAddress, setIsNewAddress] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Helper functions to encode and decode addresses and products
  const encodeToQueryParam = (data) => btoa(JSON.stringify(data));
  const decodeFromQueryParam = (param) => {
    try {
      return JSON.parse(atob(param));
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const encodedAddresses = params.get('addresses');
    const encodedProducts = params.get('products');

    if (encodedAddresses) {
      const decodedAddresses = decodeFromQueryParam(encodedAddresses);
      setAddresses(decodedAddresses);
    } else {
      setAddresses([
        {
          addressLine1: customerAddress?.addressLine1 || " ",
          addressLine2: customerAddress?.addressLine2 || ' ',
          city: customerAddress?.city || '',
          state: customerAddress?.state || 'Delhi',
          pincode: customerAddress?.pincode || '',
          isDefaultAddress: false,
        },
      ]);
      if(encodedProducts){
        dispatch(updateSelectedProducts(encodedProducts));
      }
    }

    if (encodedProducts) {
      const decodedProducts = decodeFromQueryParam(encodedProducts);
      // Assuming you have a redux action to update selected products
      dispatch(updateSelectedProducts(decodedProducts));
    }
  }, [location.search, customerAddress, dispatch]);

  const startLoading = () => {
    if(loginStatus === "succeeded") {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onMakePayment();
        setIsOpen(true);
      }, 2000);
    }
    else{
      dispatch(openLoginModal("SignUP"));
    }

  };

  const handleAddressChange = (index) => {
    const updatedAddresses = addresses.map((address, i) => ({
      ...address,
      isDefaultAddress: i === index,
    }));

    const selectedAddress = `${updatedAddresses[index].addressLine1}, ${updatedAddresses[index].addressLine2}, ${updatedAddresses[index].city}, ${updatedAddresses[index].state}, ${updatedAddresses[index].pincode}`;

    setAddresses(updatedAddresses);
    setIsNewAddress(false);

    dispatch(updateSelectedAddress(selectedAddress));

    // Update the URL with the encoded addresses and products
    const encodedAddresses = encodeToQueryParam(updatedAddresses);
    const encodedProducts = encodeToQueryParam(selectedProducts);
    navigate(`?addresses=${encodedAddresses}&products=${encodedProducts}`, { replace: true });
  };

  const handleSubmit = (values) => {
    const updatedAddresses = [...addresses, values];
    setAddresses(updatedAddresses);
    setIsNewAddress(false);

    // Update the URL with the encoded addresses
    const encodedAddresses = encodeToQueryParam(updatedAddresses);
    const encodedProducts = encodeToQueryParam(selectedProducts);
    navigate(`?addresses=${encodedAddresses}&products=${encodedProducts}`, { replace: true });
  };

  const selectedProducts = useSelector(state => state.order.selectedProducts);
  const totalPrice = selectedProducts.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const initialValues = {
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    isDefaultAddress: false,
  };

  return (
    <div className='grid grid-cols-6 mt-24 lg:mx-10 md:mx-10 mx-5 gap-10 mb-10'>
      <div className="lg:col-span-4 col-span-6 sm:col-span-6 md:col-span-4 order-2 md:order-1 border shadow-lg py-6 px-10">
        <h1 className="text-xl font-semibold mb-4">ADDRESS DETAILS</h1>
        {addresses.map((address, index) => (
          <div key={index} className="mb-4 text-left">
            <input
              type="checkbox"
              id={`address-${index}`}
              name="defaultAddress"
              checked={address.isDefaultAddress}
              onChange={() => handleAddressChange(index)}
              className="mr-2"
            />
            <label htmlFor={`address-${index}`} className="text-gray-700 text-left">
              {address.addressLine1}, {address.addressLine2}, {address.city}, {address.state}, {address.pincode}
            </label>
          </div>
        ))}
        <div className="mb-4 flex justify-between items-center">
          <button
            type="button"
            onClick={() => setIsNewAddress(true)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaPlus className="mr-1" />
            <span>Add New Address</span>
          </button>
        </div>

        {isNewAddress && (
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {() => (
              <Form className="space-y-6 text-left">
                <div className="mb-4">
                  <label htmlFor="addressLine1" className="block text-gray-700">
                    Address Line 1
                  </label>
                  <Field
                    type="text"
                    id="addressLine1"
                    name="addressLine1"
                    className="w-full mt-2 p-2 border rounded-md"
                    placeholder="Enter address line 1"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="addressLine2" className="block text-gray-700">
                    Address Line 2
                  </label>
                  <Field
                    type="text"
                    id="addressLine2"
                    name="addressLine2"
                    className="w-full mt-2 p-2 border rounded-md"
                    placeholder="Enter address line 2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="city" className="block text-gray-700">
                    City
                  </label>
                  <Field
                    type="text"
                    id="city"
                    name="city"
                    className="w-full mt-2 p-2 border rounded-md"
                    placeholder="Enter city"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="state" className="block text-gray-700">
                    State
                  </label>
                  <Field
                    as="select"
                    id="state"
                    name="state"
                    className="w-full mt-2 p-2 border rounded-md"
                  >
                    <option value="">Select state</option>
                    {indianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="mb-4">
                  <label htmlFor="pincode" className="block text-gray-700">
                    Pincode
                  </label>
                  <Field
                    type="text"
                    id="pincode"
                    name="pincode"
                    className="w-full mt-2 p-2 border rounded-md"
                    placeholder="Enter pincode"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                >
                  SAVE DETAILS
                </button>
              </Form>
            )}
          </Formik>
        )}

        {!isNewAddress && (
          <button
            type="button"
            onClick={startLoading}
            className={`w-full py-2 ${isLoading ? 'bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} ${setSelectedAddress === null ? 'cursor-not-allowed': 'cursor-pointer' } text-white rounded-lg flex items-center justify-center`}
            disabled={setSelectedAddress === null}
          >
            {isLoading ? (
              <svg
                className="animate-spin w-6 mr-2 text-white"
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
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Make Payment"
            )}
          </button>
        )}
      </div>
      <div className="lg:col-span-2 col-span-6 sm:col-span-6 md:col-span-2 order-1 md:order-2 border shadow-lg py-6 px-10">
        <h1 className="text-xl font-semibold mb-4">YOUR ORDER</h1>
        {selectedProducts.length === 0 ? (
          <p className="text-gray-500">No products selected.</p>
        ) : (
          selectedProducts.map((item, index) => (
            <div key={index} className="border-b">
              <div className="border-b flex flex-col items-center text-center p-5">
                <div className="max-lg:w-60 max-lg:h-60 flex p-10 shrink-0 bg-gray-300 rounded-md flex items-center justify-center">
                  <img src={item.thumbnail} className="w-full object-contain" alt={item.title} />
                </div>
                <div className="w-full p-5">
                  <h3 className="text-base text-gray-700">{item.title}</h3>
                  <ul className="text-xs text-gray-700 space-y-2 mt-2">
                    <li className="flex flex-wrap gap-4">Quantity:<span className="ml-auto">{item.quantity}</span></li>
                    <li className="flex flex-wrap gap-4">Total Price:<span className="ml-auto">${item.price * item.quantity}</span></li>
                  </ul>
                </div>
              </div>
            </div>
          ))
        )}
        <hr className="my-4" />
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold">Total:</h2>
          <p className="text-lg font-semibold">₹{totalPrice}</p>
        </div>
      </div>
    </div>
  );
}
