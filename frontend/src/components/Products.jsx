import React from "react";
import { Card ,Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
function Products({ product }) {
  
  return (
    <div>
      <Card className="p-3 m-3 rounded">
        <Link to ={`/products/${product._id}`}>
          <Image src={product.image} alt="" fluid/>
        </Link>
        <Card.Body>
          <Card.Title as="div" className="product-title">
            <Link to ={`/products/${product._id}`}>
              <strong >{product.name}</strong>
            </Link>
          </Card.Title>
          <Card.Text as="div">
            <Ratings ratings={product.rating} noOfReviews={product.numReviews} />
          </Card.Text>
          <Card.Text as="h3">
            <p>Price : $ {product.price}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Products;
