import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addItem, delItem, deletemore } from "../redux/actions/index";

const ProductDetail = () => {
  const state = useSelector((state) => state.addItem);
  const [product, setProduct] = useState({});
  const [cartBtn, setCartBtn] = useState("Add to Cart");
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const handleCart = (product) => {
    if (cartBtn === "Add to Cart") {
      dispatch(addItem(product));
      setCartBtn("Remove from Cart");
    } else {
      dispatch(delItem(product));
      setCartBtn("Add to Cart");
    }
  };

  const addMore = () => {
    dispatch(addItem(product));
  };

  const removeMore = () => {
    dispatch(deletemore(product));
  };

  const quantity = state.find((item) => item.id === product.id)?.quantity || 0;

  return (
    <>
      <div className="container my-5 py-3">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center mx-auto product">
            <img src={product.image} alt={product.title} height="400px" />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h1 className="display-5 fw-bold">{product.title}</h1>
            <hr />
            <h2 className="my-4">${product.price}</h2>
            <p className="lead">{product.description}</p>
            <div className="d-flex justify-content-evenly">
              <button
                className="px-2 border border-1 display-5"
                onClick={() => addMore(product)}
              >
                +
              </button>
              <p>Quantity: {quantity}</p>
              <button
                className="px-3 border border-1 display-5"
                onClick={() => removeMore(product)}
              >
                -
              </button>
            </div>
            <button
              onClick={() => handleCart(product)}
              className="btn btn-outline-primary my-5"
            >
              {cartBtn}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
