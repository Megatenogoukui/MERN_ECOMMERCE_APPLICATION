import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import Ratings from "../components/Ratings";
import Spinner1 from "../components/Spinner";
import { useCreateProductReviewMutation, useGetProductsDetailsQuery } from "../slices/productApiSlice";
import Message from "../components/Message";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice.js";
import {toast} from 'react-toastify'
import Meta from "../components/Meta";

function ProductScreen() {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const {
    data: product,
    isLoading,
    error,
    refetch
  } = useGetProductsDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);
  const [createReview  , {isLoading : loadingReview}] = useCreateProductReviewMutation()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createReview({
        rating,
        comment,
        productId
      }).unwrap()
      refetch()
      toast.success('Review Added')
      setRating(0)
      setComment('')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div>
      <Meta title={product?.name} />
      {isLoading ? (
        <Spinner1 />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Link className="btn btn-lite my-3" to="/">
            Back
          </Link>
          <div>
            <Row>
              <Col md={5}>
                <Image src={product.image} fluid />
              </Col>
              <Col md={4}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>
                      <h3> {product.name}</h3>
                    </strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Ratings
                      ratings={product.rating}
                      noOfReviews={product.numReviews}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <p> DESCRIPTION : $ {product.description}</p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <p> PRICE : $ {product.price}</p>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>PRICE : </Col>
                        <Col> $ {product.countInStock}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>STATUS : </Col>
                        <Col>
                          {product.countInStock == 0
                            ? "Out Of Stock"
                            : "In Stock"}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>QTY :</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(Number(e.target.value))}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => {
                                  return (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  );
                                }
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                      <Button
                        className="btn-block"
                        type="button"
                        disabled={product.countInStock == 0}
                        onClick={addToCartHandler}
                      >
                        ADD TO CART
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </div>
          <Row className="review mt-4">
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <Message variant="success">No Reviews</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => {
                  console.log(review)
                  return <ListGroup.Item>
                    <strong>{review.name}</strong>
                    <Ratings ratings={review.rating} />
                    <p> {review.createdAt.substring(0, 10)} </p>
                    <p> {review.comment} </p>
                  </ListGroup.Item>;
                })}
                <ListGroup.Item>
                  <h2>Write A Customer Review</h2>
                  {userInfo ? (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="rating" className="my-2">
                        <Form.Label>Ratings</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair </option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - VeryGood</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          value={comment}
                          rows='3'
                          onChange={(e) => setComment(e.target.value)}
                        >
                          
                        </Form.Control>
                        <Button disabled = {loadingReview} variant="primary" type="submit">Submit</Button>
                      </Form.Group>
                    </Form>
                  ) : (
                    <Message variant='success'><Link to='/login'>Sign In</Link>to add a review</Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default ProductScreen;
