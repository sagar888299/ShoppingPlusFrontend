import React from "react";
import Header from "./Header";
import Categories from "./Categories";
import Carousel from "./Banner"


const Home = () => {

  return (
    <>
      <div>
        {" "}
        <Carousel/>
        <Categories />
      </div>
    </>
  );
};

export default Home;
