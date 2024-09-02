import React from 'react';
import { useNavigate } from 'react-router-dom';
import { bag, bike, deo, football, furniture, glasses, groceries, HomeDeco, jwellery, kitchen, laptops, makeup, menboots, menshirts, menwatch, mobacc, phones, skincare, tablet, top, vehicle, wclothes, womenwatches, wshoes } from '../assests/images';

const categories = [
  {
    id: 1,
    name: "Beauty",
    image: makeup
  },
  {
    id: 2,
    name: "Fragrances",
    image: deo
  },
  {
    id: 3,
    name: "Furniture",
    image: furniture
  },
  {
    id: 4,
    name: "Groceries",
    image: groceries
  },
  {
    id: 5,
    name: "Home-Decoration",
    image: HomeDeco
  },
  {
    id: 6,
    name: "Kitchen-Accessories",
    image: kitchen
  },
  {
    id: 7,
    name: "Laptops",
    image: laptops
  },
  {
    id: 8,
    name: "Mens-Shirts",
    image: menshirts
  },
  {
    id: 9,
    name: "Mens-Shoes",
    image: menboots
  },
  {
    id: 10,
    name: "Mens-Watches",
    image: menwatch
  },
  {
    id: 11,
    name: "Mobile-accessories",
    image: mobacc
  },
  {
    id: 12,
    name: "Motorcycle",
    image: bike
  },
  {
    id: 13,
    name: "Skin-Care",
    image: skincare
  },
  {
    id: 14,
    name: "Smartphones",
    image: phones
  },
  {
    id: 15,
    name: "Sports-Accessories",
    image: football
  },
  {
    id: 16,
    name: "Sunglasses",
    image: glasses
  },
  {
    id: 17,
    name: "Tablets",
    image: tablet
  },
  {
    id: 18,
    name: "Tops",
    image: top
  },
  {
    id: 19,
    name: "Vehicle",
    image: vehicle
  },
  {
    id: 20,
    name: "Womens-Bags",
    image: bag
  },
  {
    id: 21,
    name: "Womens-Dresses",
    image: wclothes
  },
  {
    id: 22,
    name: "womens-Jewellery",
    image: jwellery
  },
  {
    id: 23,
    name: "Womens-Shoes",
    image: wshoes
  },
  {
    id: 24,
    name: "Womens-Watches",
    image: womenwatches
  }
];



export default function Categories() {
  const navigate = useNavigate();

  const handleCategoryClick = (name) => {
    navigate(`/products/${name}`);
  };

  return (
    <div className="p-6 grid border-dashed grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-16">
      {categories.map(category => (
        <div
          key={category.id}
          className="bg-white border-dashed rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-102"
          onClick={() => handleCategoryClick(category.name)}
        >
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-96 object-cover transition-transform duration-300 ease-in-out transform hover:scale-102"
          />
          <div className="p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 truncate"><strong>{category.name}</strong></h3>
            <h3 className="text-lg font-semibold truncate text-blue-700"><strong> See More  &rarr;</strong></h3>
          </div>
        </div>
      ))}
    </div>
  );
}
