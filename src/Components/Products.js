import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import getProducts from "./ProductsActions";
import { selectProducts } from "./ProductsSelecter";
import { addCartToBackend } from "./CartActions";
import { openLoginModal } from "./ModalSlice";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import Filter from "./Filter";
import { FaFilter } from "react-icons/fa";
import { addProductToCart } from "./CartReducer";

const Products = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filterRef = useRef(null);
  const productsRef = useRef(null);
  const pageRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const cartItems = useSelector(state => state.cart.items);
  const isAuthenticated = useSelector(state => state.auth.user);
  const customer = useSelector((state) => state.auth);
  const phoneNumber = customer?.user?.customer?.phoneNumber;

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q');
  
  const handleAddToCart = (product) => {
    let existingItem = false;
    if(cartItems.length > 0){
       existingItem = cartItems.find(item => item.orderId === product.id);
    }

    if (isAuthenticated === null) {
      dispatch(openLoginModal("SignUP"));
      return;
    }
    if (existingItem) {
      toast.info('Item is already in the cart');
    } else {
      dispatch(addCartToBackend({ phoneNumber: phoneNumber, orderId: product.id, quantity: 1 }));
      dispatch(addProductToCart(product));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchQuery) {
          await dispatch(getProducts({ search: searchQuery })); // Fetch products based on search query
        } else if (categoryId) {
          await dispatch(getProducts({ category: categoryId })); // Fetch products based on categoryId
        }
      } finally {
        setLoading(false); // Set loading to false once fetching is complete
      }
    };

    fetchData();
  }, []);

  const handleDetails = (product) => {
    navigate(`/productDetails/${product.id}`);
  }
  const requestedProduct = useSelector(selectProducts)
  const [productsData,setProductsData] = useState(requestedProduct?.products || []);
  const [filterData,setFilterData] = useState(requestedProduct?.products || []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div ref={pageRef} className="m-4">
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-20 grid grid-cols-4 gap-2 sticky overflow-y-auto h-full no-scrollbar">
          <button
            className="sm:hidden md:hidden block mt-10 absolute lg:hidden p-2 bg-blue-500 text-white rounded-full fixed top-4 z-5"
            onClick={toggleDrawer}
          >
            <FaFilter/>
          </button>
          <div
            ref={filterRef}
            className={`col-span-4 mt-10 absolute top-0 left-0 w-full h-full bg-white shadow-lg z-50 bottom-0  transform transition-transform ${
              isDrawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Filter products={productsData}  setFilterData = {setFilterData} setProductsData = {setProductsData}/>
            <button
              className="absolute top-4 right-4 text-gray-600"
              onClick={toggleDrawer}
            >
              ✕
            </button>
          </div>
          <div ref={filterRef} className="hidden lg:block md:block sm:block lg:col-span-1 md:col-span-1 sm:col-span-2 border rounded h-full">
            <Filter products={productsData} setFilterData = {setFilterData} setProductsData = {setProductsData}/>
          </div>
          <div ref={productsRef} className="col-span-4 lg:col-span-3 md:col-span-3 sm:col-span-2 no-scrollbar overflow-y-auto border rounded p-2 h-screen">
            <section
              id="Products"
              className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-items-center justify-center gap-y-20 gap-x-14 mb-5"
            >
              {filterData &&
                filterData?.map((product) => (
                  <div
                    key={product.id}
                    className="w-72 bg-white shadow-md rounded-xl border"
                  >
                    <a href="#">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        onClick={() => handleDetails(product)}
                        className="h-80 w-72 object-cover rounded-t-xl" // Ensure consistent sizing
                      />
                      <div className="px-4 py-3 w-72">
                        <span className="text-gray-400 mr-3 uppercase text-xs">
                          {product.category.name}
                        </span>
                        <p className="text-lg font-bold text-black truncate block capitalize">
                          {product.title}
                        </p>
                        <div className="flex items-center">
                          <p className="text-lg font-semibold text-black cursor-auto my-3">
                            ${product.price}
                          </p>
                          <del>
                            <p className="text-sm text-gray-600 cursor-auto ml-2">
                              ${product.price + 50}
                            </p>
                          </del>
                          <div className="ml-auto">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              className="bi bi-bag-plus"
                              viewBox="0 0 16 16"
                              onClick={() => handleAddToCart(product)}
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                              />
                              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                            </svg>
                          </div>
                        </div>
                        <div className="text-gray-600 text-sm mt-2"></div>
                      </div>
                    </a>
                  </div>
                ))}
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
