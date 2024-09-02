import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCartToBackend } from './CartActions';
import { increaseQuantity, decreaseQuantity } from './CartReducer';
import { updateSelectedProducts } from './OrderReducer';
import { cartbag } from '../assests/images';
import { addProductToCart } from './CartReducer';

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart.fetchItems);
    const loading = useSelector((state) => state.cart.statusFecth);

    const handleIncreaseQuantity = (id) => {
        dispatch(increaseQuantity(id));
        dispatch(addCartToBackend({ phoneNumber: "+918700934109", orderId: id.toString(), quantity: 1 }));
    };
    
    const handleDecreaseQuantity = (id) => {
        dispatch(decreaseQuantity(id));
        dispatch(addCartToBackend({ phoneNumber: "+918700934109", orderId: id.toString(), quantity: -1 }));
    };

    const handleCheckout = () => {
        dispatch(updateSelectedProducts(cart.cartWithProducts));
        // Navigate to the order page
        navigate("/order");
    }

    const isCartEmpty = cart.length === 0;

    return (
        <div className="font-[sans-serif] bg-white h-full">
            <div className="max-w-7xl max-lg:max-w-3xl mx-auto p-6">
                <h2 className="text-3xl font-extrabold text-gray-800">Your shopping bag</h2>

                {loading === 'loading' ? (
                    <div className="flex justify-center items-center h-60">
                        <div className="w-12 h-12 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
                    </div>
                ) : isCartEmpty ? (
                    <div className='flex itrems-center justify-center h-fit'>
                    <div className="flex flex-col w-2/4 items-center justify-center mt-8 p-4 
                    ">
                        <div>
                        <img src = {cartbag} className='h-64 w-64' />
                        </div>
                        <div className='flex flex-col'>
                        <h3 className="text-lg font-bold text-gray-800">Your cart is empty</h3>
                        <p className="text-gray-500 mt-2">Add some items to your cart to see them here.</p>
                        <button 
                            onClick={() => navigate('/')}
                            type="button" 
                            className="mt-4 text-sm px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-md">
                            Shop Now
                        </button>
                        </div>
                    </div>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-6 relative mt-8">
                        <div className="lg:col-span-2 space-y-6">
                            {cart.cartWithProducts.map((item, index) => (
                                <div key={index} className="p-2 bg-white shadow-[0_3px_20px_-10px_rgba(6,81,237,0.4)] rounded-md relative">
                                    <div className="grid sm:grid-cols-2 items-center gap-4">
                                        <div className="bg-gradient-to-tr from-gray-300 via-gray-100 rounded-md to-gray-50 w-full h-full p-4 shrink-0 text-center">
                                            <img src={item.thumbnail} alt={item.title} className="w-56 h-full object-contain inline-block bg-white" />
                                        </div>
                                        <div className="p-2">
                                            <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>

                                            <ul className="text-sm text-gray-500 space-y-2 list-disc pl-4 mt-3">
                                                <li>{item.description}</li>
                                            </ul>

                                            <div className="flex items-center justify-between flex-wrap gap-4 mt-6">
                                                <div className="flex items-center gap-3">
                                                    <h4 className="text-sm text-gray-500">Qty:</h4>
                                                    <button type="button"
                                                        onClick={() => handleDecreaseQuantity(item.id)}
                                                        className="flex items-center justify-center w-5 h-5 bg-blue-600 outline-none rounded-full">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-2 fill-white" viewBox="0 0 124 124">
                                                            <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                                                        </svg>
                                                    </button>
                                                    <span className="font-bold text-sm leading-[16px]">{item.quantity}</span>
                                                    <button type="button"
                                                        onClick={() => handleIncreaseQuantity(item.id)}
                                                        className="flex items-center justify-center w-5 h-5 bg-blue-600 outline-none rounded-full">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-2 fill-white" viewBox="0 0 42 42">
                                                            <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                                                        </svg>
                                                    </button>
                                                </div>

                                                <div>
                                                    <h4 className="text-lg font-bold text-blue-600">${item.price}</h4>
                                                </div>
                                            </div>

                                            <div className="divide-x border-y grid grid-cols-2 text-center mt-6">
                                                <button type="button" className="bg-transparent hover:bg-gray-100 flex items-center justify-center font-semibold py-3 text-gray-500 text-sm">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 fill-current mr-3 inline-block" viewBox="0 0 128 128">
                                                        <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                                    </svg>
                                                    View details
                                                </button>
                                                <button type="button" className="bg-transparent hover:bg-gray-100 flex items-center justify-center font-semibold py-3 text-gray-500 text-sm">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current mr-3 inline-block" viewBox="0 0 390 390">
                                                        <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.362 28.608 0 39.682L67.777 311.83c-5.479 5.401-12.676 8.753-20.632 8.753zM344.382 19.272c-9.522-9.809-24.521-10.307-34.948-1.383L28.795 253.528c-8.398 8.37-8.398 21.978 0 30.705 8.671 8.851 22.847 8.851 31.48 0L340.354 48.953c9.619-10.333 9.619-26.885 0-37.68z" data-original="#000000"></path>
                                                    </svg>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="lg:col-span-1 lg:sticky lg:top-0 mt-8 lg:mt-0">
                            <div className="p-4 rounded-md shadow-md">
                                <h3 className="text-xl font-bold text-gray-800">Order Summary</h3>
                                <ul className="divide-gray-300 mt-4">
                                    {cart.cartWithProducts.map((item, index) => (
                                        <li key={index} className="py-2 flex justify-between text-gray-600">
                                            <span>{item.title}</span>
                                            <span>${item.price * item.quantity}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-4 flex justify-between font-bold text-gray-800">
                                    <span>Total:</span>
                                    <span>${cart.cartWithProducts.reduce((total, item) => total + (item.price * item.quantity), 0)}</span>
                                </div>
                                <button 
                                    onClick={() => handleCheckout()} 
                                    type="button" 
                                    className="mt-4 w-full px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShoppingCart;
