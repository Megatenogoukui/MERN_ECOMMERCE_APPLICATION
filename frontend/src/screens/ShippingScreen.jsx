import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../slices/cartSlice";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import CheckOutSteps from "../components/CheckOutSteps";

function ShippingScreen() {
  // Get the shipping address from the Redux store
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // Initialize state variables to manage address, postal code, city, and country
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission to save the shipping address and proceed to payment
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, postalCode, city, country }));
    navigate("/payment");
  };

  return (
    <>
      {/* Render a checkout step indicator for step 1 and 2 */}
      <CheckOutSteps step1 step2 />
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="address" className="my-2">
            <Form.Label id="address">Address</Form.Label>
            <Form.Control
              type="text"
              value={address}
              placeholder="Enter Address"
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="city" className="my-2">
            <Form.Label id="city">City</Form.Label>
            <Form.Control
              type="text"
              value={city}
              placeholder="Enter City"
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="postalCode" className="my-2">
            <Form.Label id="postalCode">Postal Code</Form.Label>
            <Form.Control
              type="text"
              value={postalCode}
              placeholder="Enter Postal Code"
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="country" className="my-2">
            <Form.Label id="country">Country</Form.Label>
            <Form.Control
              type="text"
              value={country}
              placeholder="Enter Country"
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="my-2">
            Proceed To Payment
          </Button>
        </Form>
      </FormContainer>
    </>
  );
}

export default ShippingScreen;