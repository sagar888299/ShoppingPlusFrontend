import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { banner1, banner2, banner3 } from '../assests/images';

const Carousel = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const images = [
    banner2,
    banner1,
    banner3
  ];

  return (
    <div className='mx-2 overflow-x-hidden no-scrollbar'>
      <div className="carousel-container mt-20" style={{ position: 'relative' }}>
        <Slider ref={sliderRef} {...settings}>
          {images.map((src, index) => (
            <div key={index}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className='object-cover h-fit '
                onError={(e) => e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Found'}
              />
            </div>
          ))}
        </Slider>
        <button className="carousel-button prev" onClick={() => sliderRef.current.slickPrev()}>
          <FaChevronLeft />
        </button>
        <button className="carousel-button next" onClick={() => sliderRef.current.slickNext()}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
