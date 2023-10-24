import React, { useEffect, useState } from "react";
import { Row, Col, Table, Form ,Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useUserProfileMutation } from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { useGetMyOrderQuery } from "../slices/orderSlice";
import {FaTimes} from 'react-icons/fa'
import Message from '../components/Message'
import {LinkContainer} from 'react-router-bootstrap'
function UserProfile() {
  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [updateProfile , {isLoading : updateProfileLoading}] = useUserProfileMutation()
  const {data: orders , isLoading ,error } = useGetMyOrderQuery()

  const submitHandler = async(e) =>{
    e.preventDefault()
    if (password !== confirmPassword){
      toast.error("Password doesnot match")
    }else{
      try {
        const res = await updateProfile({id: userInfo._id , email , name , password}).unwrap()
    dispatch(setCredentials(res))
    toast.success("Profile Updated")
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
      

    }
  }

  useEffect(() => {
    if(userInfo){
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
   
  }, [userInfo,userInfo.name, userInfo.email]);

  return (
    <div>
      <Row>
        <Col md={3}>
          <h1>User Profile</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className="my-2">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button variant = 'primary' type = 'submit'>Update</Button>
            {updateProfileLoading && <Spinner  className="mx-4"/>}
          </Form>
        </Col>
        <Col md={9}>
          <h1>My Orders</h1>
          {isLoading ? <Spinner /> : error? <Message variant = 'danger'>{error?.data?.message || error.message}</Message> : (
            <Table striped hover responsive className="table-sm" >
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Date</td>
                  <td>Total</td>
                  <td>Paid</td>
                  <td>Delivered</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {orders && orders.map((item,index) => {
                  return <tr key={index}>
                    <td>{item._id}</td>
                    <td>{item.createdAt.substring(0,10)}</td>
                    <td>{item.totalPrice}</td>
                    <td>  {item.isPaid ? item.paidAt.substring(0,10) : <FaTimes style={{color : 'red'}}/> } </td>
                    <td>  {item.isDelivered ? item.deliveredAt.substring(0,10) : <FaTimes style={{color : 'red'}}/> } </td>
                    <td>
                      <LinkContainer to ={`/order/${item._id}`}>
                      <Button className="btn-sm" variant="light">Details</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                })}
              </tbody>
            </Table>
          )}
          
        </Col>
      </Row>
    </div>
  );
}

export default UserProfile;
