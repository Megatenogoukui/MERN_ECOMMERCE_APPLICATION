import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useOrderDeliveredMutation,
} from "../slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";

import React from "react";

function OrderScreen() {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
;
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function onApprove(data, action) {
    return action.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment Successfull");
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }
  function onError(err) {
    toast.error(err.message);
  }
  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Payment Successfull");
  }
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  const [updateDeliver, { isLoading: loadingDeliver }] =
    useOrderDeliveredMutation();

  const onDelivered = async () => {
    try {

      await updateDeliver(orderId);
      refetch();
      toast.success("Order Delivered");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };
 
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <>
          <h1>Order : {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name : </strong> {order.user?.name}
                  </p>
                  <p>
                    <strong>Email : </strong> {order.user?.email}
                  </p>
                  <p>
                    <strong>Address : </strong> {order.shippingAddress.address}{" "}
                    ,{order.shippingAddress.city} ,{" "}
                    {order.shippingAddress.postalCode}{" "}
                  </p>
                  <p>
                    {order.isDelivered ? (
                      <Message variant="success">
                        Delivered on : {order.deliveredAt}
                      </Message>
                    ) : (
                      <Message variant="danger">Not Delivered</Message>
                    )}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment</h2>
                  <p>
                    <strong>Method : </strong> {order.paymentMethod}
                  </p>
                  <p>
                    {order.isPaid ? (
                      <Message variant="success">
                        Paid on : {order.paidAt}
                      </Message>
                    ) : (
                      <Message variant="danger">Not Paid</Message>
                    )}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.map((item) => {
                    return (
                      <ListGroup.Item>
                        <Row>
                          <Col md={1}>
                            <Image src={item.image} fluid rounded />
                          </Col>
                          <Col>
                            <Link to={`/products/${item.product}`}>
                              {item?.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x {item.price} = {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
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
                      <Col>Items :</Col>
                      <Col>₹ {order.itemsPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Shipping :</Col>
                      <Col>₹ {order.shippingPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Tax :</Col>
                      <Col>₹ {order.taxPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Total :</Col>
                      <Col>₹ {order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <Spinner />}

                      {isPending ? (
                        <Spinner />
                      ) : (
                        <div>
                          <Button
                            variant="primary"
                            style={{ marginBottom: "10px" }}
                            onClick={onApproveTest}
                          >
                            Test pay button
                          </Button>

                          <PayPalButtons
                            onApprove={onApprove}
                            onError={onError}
                            createOrder={createOrder}
                          ></PayPalButtons>
                        </div>
                      )}
                    </ListGroup.Item>
                  )}
                  
                  {loadingDeliver ? <Spinner /> : (userInfo &&
                    userInfo.isAdmin && 
                    order.isPaid &&
                    !order.isDelivered && (
                      <ListGroup.Item>
                        <Button
                          type="button"
                          className="btn btn-block"
                          onClick={onDelivered}
                        >
                          Mark Delivered
                        </Button>
                      </ListGroup.Item>
                    ))}
                  
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default OrderScreen;
