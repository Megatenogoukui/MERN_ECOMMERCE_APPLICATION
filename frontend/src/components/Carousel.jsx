import React from "react";
import { useTopProductQuery } from "../slices/productApiSlice";
import Message from "./Message";
import { Carousel, Image } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const CarouselComponent = () => {
  const { data: topProduct, isLoading, error } = useTopProductQuery();
  return isLoading ? (
    <Spinner />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <Carousel
      pause="hover"
      classname="bg-primary mb-4"
      style={{ background: "#7B8A8B" }}
    >
      {topProduct.map((product) => (
        <Carousel.Item>
          <Link to={`/products/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid></Image>
            <Carousel.Caption
              classname="carousel-caption"
              style={{
                position: 'absolute',
                width: "100%",
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <h2>
                {product.name} (₹ {product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
