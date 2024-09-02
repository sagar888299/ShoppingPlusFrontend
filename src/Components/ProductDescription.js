import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from "./ProductsActions";
import { useDispatch, useSelector } from "react-redux";
import { addCartToBackend } from "./CartActions";
import { openLoginModal } from "./ModalSlice";
import Spinner from './Spinner'; // Import the spinner component
import { updateSelectedProducts } from "./OrderReducer";
import { addProductToCart, increaseQuantity } from "./CartReducer";

const ProductDetail = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const product = useSelector(state => state.products.selectedProduct);
    const loading = useSelector(state => state.products.status === 'loading'); // Simplify loading state check
    const [selectedImage, setSelectedImage] = useState('');
    const cartItems = useSelector(state => state.cart.items);
    const isAuthenticated = useSelector(state => state.auth.user);
    const [selectedProducts,setselectedProducts] = useState([]);
    const customer = useSelector((state) => state.auth);
    const phoneNumber = customer.user?.customer?.phoneNumber;

    useEffect(() => {
        dispatch(getProductById(productId));
    }, [dispatch, productId]);

    useEffect(() => {
        if (product && product.images) {
            setSelectedImage(product.images[0]);
        }
    }, [product]);

    const handleBuyNow = (item) => {
        // Create a new product object with quantity set to 1
        if(isAuthenticated === null){
            dispatch(openLoginModal("SignUP"));
        }else{
        const productWithQuantity = { ...item, quantity: 1 };
        
        // Create a new array with the existing selected products and the new product
        const updatedSelectedProducts = [...selectedProducts, productWithQuantity];
        
        // Dispatch the updated array
        dispatch(updateSelectedProducts(updatedSelectedProducts));
        // Navigate to the order page
        navigate("/order");
        }
    }

    const handleAddToCart = (product) => {
        const existingItem = cartItems.find(item => item.orderId === product.id);
        if (isAuthenticated === null) {
          dispatch(openLoginModal("SignUP"));
          return;
        }
        if (existingItem) {
          alert('Item is already in the cart');
        } else {
          dispatch(addCartToBackend({ phoneNumber: phoneNumber, orderId: product.id, quantity: 1 }));
          dispatch(addProductToCart(product));
        }
      };

    if (loading) {
        return <Spinner />;
    }

    if (!product) {
        return <div className="text-center text-gray-600">Product not found</div>;
    }

    return (
        <div className="font-sans bg-white mt-20">
            <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
                <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6 rounded-lg">
                    <div className="lg:col-span-3  border-dashed w-full lg:sticky top-0 text-center">
                        <div className="px-4 py-10 border border-dashed rounded-lg shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
                            <img
                                src={selectedImage}
                                alt="Product"
                                className="w-3/4 rounded object-cover mx-auto"
                            />
                            <button type="button" className="absolute top-4 right-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20px"
                                    fill="#ccc"
                                    className="mr-1 hover:fill-[#333]"
                                    viewBox="0 0 64 64"
                                >
                                    <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
                                </svg>
                            </button>
                        </div>

                        <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
                            {product.images.map((image, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedImage(image)}
                                    className="w-24 h-20 flex items-center justify-center rounded-lg p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] cursor-pointer"
                                >
                                    <img
                                        src={image}
                                        alt={`Product ${index + 1}`}
                                        className="w-full"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-extrabold text-gray-800">
                            {product.title}
                        </h2>

                        <p className="text-gray-600 mt-4">{product.description}</p>

                        <div className="flex space-x-2 mt-4">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-5 ${
                                        i < Math.floor(product.rating)
                                            ? "fill-blue-600"
                                            : i < Math.ceil(product.rating)
                                            ? "fill-blue-600"
                                            : "fill-[#CED5D8]"
                                    }`}
                                    viewBox="0 0 14 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                </svg>
                            ))}
                            <h4 className="text-gray-800 text-base">{product.reviews.length} Reviews</h4>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <p className="text-gray-800 text-3xl font-bold">
                                ${product.price}
                            </p>
                            <p className="text-gray-400 text-base">
                                <strike>${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}</strike>{" "}
                                <span className="text-sm ml-1">Tax included</span>
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <button
                                type="button"
                                className="min-w-[200px] px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded"
                                onClick={()=>handleBuyNow(product)}
                            >
                                Buy now
                            </button>
                            <button
                                type="button"
                                className="min-w-[200px] px-4 py-2.5 border border-blue-600 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded"
                                onClick={()=>{handleAddToCart(product)}}
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                    <h3 className="text-xl font-bold text-gray-800">
                        Product information
                    </h3>
                    <ul className="mt-4 flex  flex-col  space-y-4 font-semibold justify-between items-center text-gray-800">
                        <li className="text-sm w-full flex justify-between ">Brand <span className="ml-4 float-right">{product.brand}</span></li>
                        <li className="text-sm  w-full flex justify-between ">SKU <span className="ml-4 float-right">{product.sku}</span></li>
                        <li className="text-sm  w-full flex justify-between ">Weight <span className="ml-4 float-right">{product.weight} oz</span></li>
                        <li className="text-sm  w-full flex justify-between ">Dimensions (W x H x D) <span className="ml-4 float-right">{`${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm`}</span></li>
                        <li className="text-sm  w-full flex justify-between ">Warranty Information <span className="ml-4 float-right">{product.warrantyInformation}</span></li>
                        <li className="text-sm  w-full flex justify-between ">Category <span className="ml-4 float-right">{product.category}</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
