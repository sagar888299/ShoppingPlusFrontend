import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 1, name: "beauty" },
  { id: 2, name: "fragrances" },
  { id: 3, name: "furniture" },
  { id: 4, name: "groceries" },
  { id: 5, name: "home-decoration" },
  { id: 6, name: "kitchen-accessories" },
  { id: 7, name: "laptops" },
  { id: 8, name: "mens-shirts" },
  { id: 9, name: "mens-shoes" },
  { id: 10, name: "mens-watches" },
  { id: 11, name: "mobile-accessories" },
  { id: 12, name: "motorcycle" },
  { id: 13, name: "skin-care" },
  { id: 14, name: "smartphones" },
  { id: 15, name: "sports-accessories" },
  { id: 16, name: "sunglasses" },
  { id: 17, name: "tablets" },
  { id: 18, name: "tops" },
  { id: 19, name: "vehicle" },
  { id: 20, name: "womens-bags" },
  { id: 21, name: "womens-dresses" },
  { id: 22, name: "womens-jewellery" },
  { id: 23, name: "womens-shoes" },
  { id: 24, name: "womens-watches" }
];

export default function SearchBar() {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleCategoryClick = (name) => {
    setShowCategoryDropdown(false);
    navigate(`/products/${name}`);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products/search?q=${search}`);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowCategoryDropdown(false);
    }
  };

  useEffect(() => {
    if (showCategoryDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCategoryDropdown]);

  return (
    <form className="mx-auto sm:w-4/6 w-full px-2" onSubmit={handleSearchSubmit}>
      <div className="flex">
        <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <button 
          id="dropdown-button" 
          data-dropdown-toggle="dropdown" 
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" 
          type="button"
          onClick={() => setShowCategoryDropdown(prev => !prev)}
          ref={dropdownRef} // Attach ref to button to manage focus
        >
          All categories 
          <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>
        {showCategoryDropdown && (
          <div ref={dropdownRef} id="dropdown" className="z-10 absolute mt-11 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 max-h-96 overflow-y-auto scrollable" aria-labelledby="dropdown-button">
              {categories.map(category => (
                <li key={category.id}>
                  <button 
                    onClick={() => handleCategoryClick(category.name)} 
                    type="button" 
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="relative w-full">
          <input 
            type="search" 
            id="search-dropdown" 
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" 
            placeholder="Search Products....." 
            required 
            value={search} 
            onChange={handleSearchChange} 
          />
          <button 
            type="submit" 
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  )
}
