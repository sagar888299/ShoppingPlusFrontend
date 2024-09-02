import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders , cancelOrder} from './OrderActions';
import Spinner from './Spinner'; // Assuming you have a Spinner component
import NoOrders from './NoOrder';
import { useNavigate } from 'react-router-dom';

export default function MyOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector((state) => state.order.orders);
  const loading = useSelector((state) => state.order.loading); // Assuming you have a loading state in Redux
  const [selectedStatus, setSelectedStatus] = useState('All Orders');
  const customer = useSelector((state) => state.auth);
  const phoneNumber = customer?.user?.customer?.phoneNumber;
  const SHIPPED = "Shipped";
  
  useEffect(() => {
    dispatch(fetchOrders(phoneNumber));
  }, [dispatch]);

  const handleStatus = (status, end) => {
    const todayDate = new Date();
    const endDate = new Date(end);

    if (status === 'Cancelled') {
      return <p className="font-semibold text-lg leading-8 text-red-300 text-left whitespace-nowrap">Cancelled</p>;
    }

    if (todayDate > endDate) {
      return <p className="font-semibold text-lg leading-8 text-green-300 text-left whitespace-nowrap">Delivered</p>;
    }

    return <p className="font-semibold text-lg leading-8 text-yellow-300 text-left whitespace-nowrap">Shipped</p>;
  };

  const handleDetails = (id) => {
    navigate(`/productDetails/${id}`);
  }

  const handleCancel = (id) => {
     dispatch(cancelOrder(id));
  }

  const filterOrders = () => {
    if (selectedStatus === 'All Orders') {
      return orders;
    }

    return orders.filter(order => {
      const statusText = handleStatus(order.status, order.shippingDate).props.children;
      return statusText === selectedStatus;
    });
  };

  if (loading) {
    return (
      <section className="py-24 relative">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <Spinner /> {/* Show spinner while loading */}
        </div>
      </section>
    );
  }

  const filteredOrders = filterOrders();

  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="font-manrope font-extrabold text-3xl lead-10 text-black mb-9">Order History</h2>

        <div className="flex sm:flex-col lg:flex-row sm:items-center justify-between">
          <ul className="flex max-sm:flex-col sm:items-center gap-x-14 gap-y-3">
            {['All Orders', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
              <li
                key={status}
                className={`font-medium text-lg leading-8 cursor-pointer transition-all duration-500 ${selectedStatus === status ? 'text-indigo-600' : 'text-black'} hover:text-indigo-600`}
                onClick={() => setSelectedStatus(status)}
              >
                {status}
              </li>
            ))}
          </ul>
          <div className="flex max-sm:flex-col items-center justify-end gap-2 max-lg:mt-5">
            {/* Date inputs here */}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <NoOrders /> // Show no orders message if no orders match the filter
        ) : (
          <div className="mt-7 border border-gray-300 pt-9">
            {filteredOrders.map((order, index) => (
              <div key={index}>
                <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
                  <div className="data">
                    <p className="font-medium text-lg leading-8 text-black whitespace-nowrap">Order : #{order.purchasedId}</p>
                    <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">Order Date : {order.orderedDate}</p>
                  </div>
                  <div className="flex items-center gap-3 max-md:mt-5">
                    <button
                      className="rounded-full px-7 py-3 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400"
                    >
                      Show Invoice
                    </button>
                    <button
                      onClick={() => handleDetails(order.orderId)}
                      className="rounded-full px-7 py-3 bg-blue-600 shadow-sm shadow-transparent text-white font-semibold text-sm transition-all duration-500 hover:shadow-indigo-400 hover:bg-indigo-700"
                    >
                      Buy Again
                    </button>
                    {SHIPPED === handleStatus(order.status, order.shippingDate).props.children && (
                      <button
                         onClick={() =>handleCancel(order.purchasedId)}
                        className="rounded-full px-7 py-3 bg-red-600 text-white font-semibold text-sm shadow-sm shadow-transparent transition-all duration-500 hover:bg-red-700"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>

                <svg className="my-9 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2" fill="none">
                  <path d="M0 1H1216" stroke="#E5E7EB" strokeWidth="2" />
                </svg>

                <div className="md:px-11 px-3 pb-8">
                  <div className="grid grid-cols-3 max-md:grid-cols-1 max-md:gap-y-3 flex flex-col justify-center">
                    <div className="product-details flex items-center gap-9">
                      <div className="h-24 w-24">
                        <img src={order.image} alt="order_image" className="h-full w-full rounded-2xl" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-black mb-1">{order.productName}</h4>
                      </div>
                    </div>
                    <div className="flex items-center justify-around w-full sm:pl-28 lg:pl-0">
                      <div className="flex flex-col justify-center items-start max-sm:items-center">
                        <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                          Status
                        </p>
                        {handleStatus(order.status, order.shippingDate)}
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col justify-center items-end max-sm:items-center">
                        <p className="font-normal text-lg text-center text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                          Delivery Expected by
                        </p>
                        <p className="font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">{order.shippingDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <svg className="my-9 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2" fill="none">
                  <path d="M0 1H1216" stroke="#E5E7EB" strokeWidth="2" />
                </svg>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
