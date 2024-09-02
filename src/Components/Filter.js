import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { selectProducts } from "./ProductsSelecter";
import { useSelector } from "react-redux";

export default function Filter({ products, setFilterData, setProductsData }) {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [rating, setRating] = useState(0);
  const [discount, setDiscount] = useState([]);
  const [category, setCategory] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const requestedProduct = useSelector(selectProducts) // To track the initial render

  const location = useLocation();
  const navigate = useNavigate();

  // Load filters from query params on mount
  useEffect(() => {
    if (!isMounted) {
      const params = new URLSearchParams(location.search);
      const priceMin = Number(params.get("priceMin")) || 0;
      const priceMax = Number(params.get("priceMax")) || 500;
      const ratingValue = Number(params.get("rating")) || 0;
      const discountValues = params.get("discount")
        ? params.get("discount").split(",").map(Number)
        : [];
      const categoryValues = params.get("category")
        ? params.get("category").split(",")
        : [];

      setPriceRange([priceMin, priceMax]);
      setRating(ratingValue);
      setDiscount(discountValues);
      setCategory(categoryValues);
      setProductsData(requestedProduct?.products);

      setIsMounted(true); // Mark the component as mounted
    }
  }, [location.search, isMounted]);

  const updateQueryParams = () => {
    const params = new URLSearchParams();
    params.set("priceMin", priceRange[0]);
    params.set("priceMax", priceRange[1]);
    params.set("rating", rating);
    if (discount.length > 0) {
      params.set("discount", discount.join(","));
    }
    if (category.length > 0) {
      params.set("category", category.join(","));
    }
    navigate(`?${params.toString()}`);
  };

  const handleFilter = () => {
    const filteredProducts = products.filter((product) => {
      const productDiscount = Number(product.discountPercentage);
      return (
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        product.rating >= rating &&
        (discount.length === 0 || discount.some((d) => productDiscount >= d)) &&
        (category.length === 0 || category.includes(product.tags[1]))
      );
    });
    setFilterData(filteredProducts);
    if (isMounted) {
      updateQueryParams();
    }
  };

  // Trigger filter when filter criteria or query params change
  useEffect(() => {
    handleFilter();
  }, [priceRange, rating, discount, category]);

  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = Number(value);
    setPriceRange(newRange);
  };

  const handleStarClick = (newRating) => {
    setRating(newRating);
  };

  const handleDiscountChange = (value) => {
    setDiscount((prevDiscounts) =>
      prevDiscounts.includes(value)
        ? prevDiscounts.filter((d) => d !== value)
        : [...prevDiscounts, value]
    );
  };

  const handleCategoryChange = (cat) => {
    setCategory((prevCategory) =>
      prevCategory.includes(cat)
        ? prevCategory.filter((d) => d !== cat)
        : [...prevCategory, cat]
    );
  };

  const uniqueCategories = Array.from(
    new Set(products.map((product) => product.tags[1]))
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <label className="block text-base font-semibold text-left text-gray-700 mb-4">
          Price Range
        </label>
        <div className="flex flex-col items-center space-y-2 gap-4">
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(0, e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none"
          />
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(1, e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none"
          />
          <span className="text-sm text-gray-600">{`$${priceRange[0]} - $${priceRange[1]}`}</span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-base font-semibold text-left text-gray-700 mb-4">
          Rating
        </label>
        <div className="flex space-x-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer text-lg h-6 w-6 ${
                rating >= star ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => handleStarClick(star)}
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-base font-semibold text-left text-gray-700 mb-4">
          Discount Percentage
        </label>
        <div className="flex flex-col space-y-2">
          {[0, 10, 20, 30].map((value) => (
            <label key={value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={discount.includes(value)}
                onChange={() => handleDiscountChange(value)}
                className="form-checkbox h-5 w-5 border-gray-300 text-blue-500 rounded"
              />
              <span className="text-gray-700">
                {value === 0 ? "No Discount" : `Up to ${value}%`}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-base font-semibold text-left text-gray-700 mb-4">
          Category
        </label>
        {uniqueCategories &&
          uniqueCategories.map(
            (cat) =>
              cat &&
              cat !== "undefined" && (
                <label key={cat} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={category.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                    className="form-checkbox h-5 w-5 border-gray-300 text-blue-500 rounded"
                  />
                  <span className="text-gray-700">
                    {cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}
                  </span>
                </label>
              )
          )}
      </div>
    </div>
  );
}
