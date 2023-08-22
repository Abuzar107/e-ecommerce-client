import React, { useEffect, useState } from "react";
import dummyImg from "../../asset/naruto.jpeg";
import "./ProductDetail.scss";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import Loader from "../../components/loader/Loader";
import {useDispatch, useSelector} from 'react-redux'
import { addToCart, removeFromCart } from "../../redux/cartSlice";

function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cartReducer.cart);
  const quantity = cart.find(item => item.key === params.productId)?.quantity || 0;

  async function fetchData() {
    const productResponse = await axiosClient.get(
      `/products?filters[key][$eq]=${params.productId}&populate=image`
    );
    if (productResponse.data.data.length > 0) {
      setProduct(productResponse.data.data[0]);
    }
  }

  useEffect(() => {
    setProduct(null);
    fetchData();
  }, [params]);

  if (!product) {
    return <Loader />;
  }

  return (
    <div className="ProductDetail">
      <div className="container">
        <div className="product-layout">
          <div className="product-img center">
            <div className="img-container">
              <img src={product?.attributes.image.data.attributes.url} alt="" />
            </div>
          </div>
          <div className="product-info">
            <h1 className="heading">{product?.attributes.title}</h1>
            <h3 className="price">$ {product?.attributes.price}</h3>
            <p className="description">
              {product?.attributes.desc}
            </p>
            <div className="cart-options">
              <div className="quantity-selector">
                <span className="btn decrement" onClick={() => dispatch(removeFromCart(product))}>-</span>
                <span className="quantity"> {quantity}</span>
                <span className="btn increment" onClick={() => dispatch(addToCart(product))}>+ </span>
              </div>
              <button className="btn-primary add-to-cart">Add to Cart</button>
            </div>
            <div className="return-policy">
              <ul>
                <li>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Magni totam praesentium ut, porro nulla nisi vero harum dicta
                  magnam id illum ipsa explicabo rerum error sequi eligendi
                  blanditiis nostrum repudiandae.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
                  consequuntur tenetur sit quis aperiam dolores error
                  perspiciatis placeat asperiores culpa ipsam fugit, numquam
                  aspernatur magnam velit? At dignissimos odio nisi!
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
