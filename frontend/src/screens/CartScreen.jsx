import React from 'react'
import { Row , Col ,Image ,ListGroup ,Button ,Card, Form  } from 'react-bootstrap'
import { Link , useNavigate } from 'react-router-dom'
import { UseSelector, useDispatch, useSelector } from 'react-redux'
import { FaTrash } from 'react-icons/fa'
import Message from '../components/Message'
import { addToCart ,removeFromCart } from '../slices/cartSlice'
function CartScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const addToCarthandler = (product ,qty) => {
    dispatch(addToCart({...product , qty }))
  }

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkOutHandler = () => {
    navigate('/login?redirect=/shipping')
  }
  const {cartitems} = useSelector(state => state.cart)
  return (
    <div>
      <Row>
        <Col md = {8}>
          <h1 style={{marginBottom : "20px"}}>Shopping Cart</h1>
       
      {
        cartitems.length === 0 ? (<Message variant = "success"> Cart Empty <Link to= '/'>Go Back</Link> </Message>) : (
          <ListGroup variant='flush'> 
           {cartitems.map((item) => {
            return <ListGroup.Item key={item._id}>
              <Row>
              <Col lg = {2} md ={2}>
                <Image src= {item.image} alt= {item.name} fluid rounded />
              </Col>
              <Col lg = {2} md = {3}>
                <Link to= {`/products/${item._id}`}>
                  {item.name}
                </Link>
              </Col>
              <Col lg = {2} md ={2}>
                $ {item.price}
              </Col>
              <Col lg = {2} md= {2}>
              <Form.Control
                              as="select"
                              value={item.qty}
                              onChange={(e) =>{addToCarthandler(item ,Number(e.target.value))}}
                            >
                              {[...Array(item.countInStock).keys()].map(
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
              <Col md = {2}>
                <Button type='button' variant='light' onClick={() => removeFromCartHandler(item._id)} ><FaTrash /></Button>
              </Col>
            </Row>
            </ListGroup.Item>
           })}
            
          </ListGroup>
        )
      }
       </Col>
       <Col md = {4}>
        <Card>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h3>Subtotal ({cartitems.reduce((a,item) => a + item.qty , 0)}) items</h3>
          </ListGroup.Item>
          <ListGroup.Item>
            <p>Price : $ {cartitems.reduce((a,item) => a + item.price * item.qty ,0).toFixed(2)}</p>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button type='button' className='btn-block' disabled ={cartitems.length === 0} onClick={checkOutHandler}>PROCEED TO CHECKOUT</Button>
          </ListGroup.Item>
        </ListGroup>
        </Card>
        
       </Col>
      </Row>
    </div>
  )
}

export default CartScreen