import React, { useEffect } from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckOutSteps from "../components/CheckOutSteps";
import { useCreateOrderMutation } from "../slices/orderSlice";
import {
  Row,
  Col,
  Button,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import Message from "../components/Message";
import { clearCartItems } from "../slices/cartSlice";

function PlaceOrderScreen() {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress.address, navigate, cart.paymentMethod]);

  const [createOrder1, { isLoading, error }] = useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    try {
    
      const res = await createOrder1({
        orderItems: cart.cartitems,
        shippingAddress: cart.shippingAddress,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        paymentMethod: cart.paymentMethod,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      });

       // Check the response and log it
    console.log("Create Order Response:", res);

      dispatch(clearCartItems());
      navigate(`/order/${res.data._id}`);
    } catch (err) {
      console.error("Error creating order:", err);
    }
  };
  return (
    <div>
      <CheckOutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1>Shipping</h1>
              <strong>Address : </strong>
              <span>
                {cart.shippingAddress.address} ,{cart.shippingAddress.city},
                {cart.shippingAddress.postalCode}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <h1>Payment Method</h1>
              <strong>Method: </strong>
              <span>{cart.paymentMethod} </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <h1>Order Items</h1>
              <ListGroup variant="flush">
                {cart.cartitems.length === 0 ? (
                  <Message>Your Cart is Empty</Message>
                ) : (
                  cart.cartitems.map((item, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            {" "}
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/products/${item._id}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x {item.price} = {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })
                )}
                
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h1>Order Summary</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Item :</strong>{" "}
                  </Col>
                  <Col>₹ {cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Shipping :</strong>{" "}
                  </Col>
                  <Col>₹ {cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    {" "}
                    <strong>Tax :</strong>{" "}
                  </Col>
                  <Col>₹ {cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total :</strong>{" "}
                  </Col>
                  <Col>₹ {cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error.message}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  onClick={handlePlaceOrder}
                  disabled={cart.cartitems.length === 0}
                  variant="primary"
                >
                  PLace Order
                </Button>
                {isLoading && <Spinner />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
