import React, { useEffect, useState } from "react";
import Hero from "../../components/hero/Hero";
import Category from "../../components/category/Category";
import "./Home.scss";
import Product from "../../components/product/Product";
import { axiosClient } from "../../utils/axiosClient";
import { useSelector } from "react-redux";

function Home() {
  const categories = useSelector((state) => state.categoryReducer.categories);
  // const [categories, setCategories] = useState(null);
  const [topProducts, setTopProducts] = useState(null);

  async function fetchData() {
    // const   = await axiosClient.get(
    //   "/categories?populate=image"
    // );
    const topProductsResponse = await axiosClient.get(
      "/products?filters[isTopPick][$eq]=true&populate=image"
    );

    // console.log("topProduct", topProductsResponse);
    // console.log("category", categoryResponse);

    // setCategories(categoryResponse.data.data);
    setTopProducts(topProductsResponse.data.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Home">
      <Hero />
      <section className="collection container">
        <div className="info">
          <h2 className="heading">Shop By Categories</h2>
          <p className="subheading">
            Shop from the best, our Film and TV Posters
          </p>
        </div>
        <div className="content">
          {categories?.map((category) => (
            <Category key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="collection container">
        <div className="info">
          <h2 className="heading">Our Top Picks</h2>
          <p className="subheading">
            All New Designs, Same Old Details const [Categories]
          </p>
        </div>
        <div className="content">
          {topProducts?.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
