import React, { useEffect } from 'react'
import { Row, Button, Col, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setCredentials } from '../slices/authSlice.js'
import { useRegisterMutation } from '../slices/usersApiSlice.js'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

// The RegisterScreen component handles user registration.
const RegisterScreen = () => {
    // State variables to store user input
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // Access the navigation function
    const navigate = useNavigate()

    // Access the Redux store's user information and dispatch function
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)

    // Use the generated registration mutation from the API slice
    const [register, { isLoading }] = useRegisterMutation()

    // Get the "redirect" parameter from the URL query string
    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    // Redirect the user if they are already logged in
    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    // Handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error("Password does not match")
        } else {
            try {
                const res = await register({ name, email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
                navigate(redirect)
                console.log(userInfo)
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

    // Render the registration form
    return (
        <FormContainer>
            <h1>SIGN UP</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup controlId='name' className='my-3'>
                    <FormLabel>NAME</FormLabel>
                    <FormControl
                        type='name'
                        placeholder='Enter your Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></FormControl>
                </FormGroup>
                <FormGroup controlId='email' className='my-3'>
                    <FormLabel>EMAIL ADDRESS</FormLabel>
                    <FormControl
                        type='email'
                        placeholder='Enter your Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></FormControl>
                </FormGroup>
                <FormGroup controlId='password' className='my-3'>
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        type='password'
                        placeholder='Enter your Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></FormControl>
                </FormGroup>
                <FormGroup controlId='confirmpassword' className='my-3'>
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        type='password'
                        placeholder='Enter your Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></FormControl>
                </FormGroup>
                <Button type='submit' variant='primary' className='mt-2'>Register</Button>
                {isLoading && <Spinner />}
            </Form>
            <Row className='py-3'>
                <Col>
                    Already have an account? <Link to={redirect ? `/login?/redirect=${redirect}` : '/register'}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen