import React, { useState } from 'react';
import { FaCreditCard, FaUniversity, FaWallet, FaMoneyBillWave, FaArrowLeft } from 'react-icons/fa'; // Importing icons
import { TbSquareLetterA } from 'react-icons/tb'; // Importing square letter A icon
import { useDispatch, useSelector } from 'react-redux';
import { openLoginModal } from './ModalSlice';
import { addOrder } from './OrderActions';
import Spinner from './Spinner'; // Import the Spinner component

const customerId = "+918700934109";

export default function PaymentGateway({ onClose, isOpen, paymentStatus }) {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const selectedProducts = useSelector(state => state.order.selectedProducts);
  const selectedAddress = useSelector(state => state.order.selectedAddress);
  const dispatch = useDispatch();

  const handleOrder = async () => {
    setLoading(true);
    try {
      // Create an array to hold the orders
      const ordersData = selectedProducts.map(product => ({
        customerId: customerId,
        address: selectedAddress, // Same address for all orders
        orderId: product.id, // Assuming each product gets a unique orderId
        price: product.price*product.quantity,
        status: "Shipped",
        quantity: product.quantity,
        name: product.category,
        productName: product.title,
        description: product.description,
        image: product.thumbnail,
        orderedDate: new Date().toISOString().split('T')[0],
        shippingDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0]
      }));
      console.log("orderlelo", ordersData);
      dispatch(addOrder(ordersData));
      onClose();
    } catch (error) {
      console.error('Order failed:', error);
      // Optionally handle the error state or show an error message
    } finally {
      
      dispatch(openLoginModal("Order"));
      
    }
  };
  
  const totalPrice = selectedProducts.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <div className='p-6 w-full'>
            <h2 className="text-xl font-semibold mb-4">Complete Your Payment</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Card Number:</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full p-2 mt-1 border rounded-lg"
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block text-sm font-medium text-gray-700">Expiry Date:</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full p-2 mt-1 border rounded-lg"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">CVV:</label>
              <input
                type="text"
                placeholder="123"
                className="w-full p-2 mt-1 border rounded-lg"
              />
            </div>
          </div>
        );
      case 'upi':
        return (
          <div className='p-6 w-full'>
            <h2 className="text-xl font-semibold mb-4">Complete Your Payment</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">UPI ID:</label>
              <input
                type="text"
                placeholder="yourname@bank"
                className="w-full p-2 mt-1 border rounded-lg"
              />
            </div>
          </div>
        );
      case 'netbanking':
        return (
          <div className='p-6 w-full'>
            <h2 className="text-xl font-semibold mb-4">Complete Your Payment</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Select Bank:</label>
              <select className="w-full p-2 mt-1 border rounded-lg">
                <option value="bank1">Bank 1</option>
                <option value="bank2">Bank 2</option>
                <option value="bank3">Bank 3</option>
                <option value="bank4">Bank 4</option>
              </select>
            </div>
          </div>
        );
      case 'paylater':
        return (
          <div className='p-6 w-full'>
            <h2 className="text-xl font-semibold mb-4">Complete Your Payment</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Enter PayLater ID:</label>
              <input
                type="text"
                placeholder="yourname@paylater"
                className="w-full p-2 mt-1 border rounded-lg"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 min-h-[500px] relative flex flex-col items-center justify-between">
            <div className="bg-gradient-to-r w-full from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br shadow-lg text-white py-6 px-2 flex items-center justify-center rounded-t-lg">
              {paymentMethod && (
                <button
                  onClick={() => setPaymentMethod(null)} // Go back to payment selection
                  className="text-white rounded-full absolute mr-80"
                >
                  <FaArrowLeft className="text-xl" />
                </button>
              )}
              <div className="bg-white text-blue-500 rounded-lg p-2 flex item-center justify-center">
                <TbSquareLetterA className="text-2xl" />
              </div>
            </div>

            {!paymentMethod ? (
              <div className='py-10 p-3 w-full'>
                <div className='min-h-92'>
                  <p className="mb-2 text-left"> <strong>Card, UPI & More....</strong></p>
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className="w-full py-3 mb-2 text-gray-800 rounded-lg border border-dashed flex items-center pl-3 hover:bg-gray-200"
                  >
                    <FaCreditCard className="mr-2" /> Pay with Card
                  </button>
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className="w-full py-3 mb-2 text-gray-800 rounded-lg border border-dashed flex items-center pl-3 hover:bg-gray-200"
                  >
                    <FaWallet className="mr-2" /> Pay with UPI
                  </button>
                  <button
                    onClick={() => setPaymentMethod('netbanking')}
                    className="w-full py-3 mb-2 text-gray-800 rounded-lg border border-dashed flex items-center pl-3 hover:bg-gray-200"
                  >
                    <FaUniversity className="mr-2" /> Pay with NetBanking
                  </button>
                  <button
                    onClick={() => setPaymentMethod('paylater')}
                    className="w-full py-3 mb-2 text-gray-800 rounded-lg border border-dashed flex items-center pl-3 hover:bg-gray-200"
                  >
                    <FaMoneyBillWave className="mr-2" /> Pay Later
                  </button>
                </div>
              </div>
            ) : (
              renderPaymentForm()
            )}

            {paymentStatus && (
              <div className="p-6">
                <p className="text-lg font-semibold text-center">Payment {paymentStatus === 'success' ? 'Successful' : 'Failed'}</p>
              </div>
            )}

            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 bg-white rounded-full"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className='bg-gradient-to-r mt-1 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br shadow-lg h-20 rounded-b-lg flex items-center justify-between w-full px-4 bottom-0'>
              <div className='text-white'>
                <strong>Amount : ${totalPrice}</strong>
                <p className='underline text-[0.7rem] text-left text-gray-900'>View Details</p>
              </div>
              <button
                onClick={handleOrder}
                disabled={!paymentMethod || loading}
                className="text-white bg-gradient-to-r mt-1 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2"
              >
                {loading ? (
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
        fill="blue"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      ></path>
    </svg>
  ) : (
    'Pay Now'
  )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
