import React, { useEffect } from 'react'
import { Row, Button, Col, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setCredentials } from '../slices/authSlice.js'
import { useLoginMutation } from '../slices/usersApiSlice.js'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userInfo } = useSelector(state => state.auth)

    const [login, { isLoading }] = useLoginMutation()

    const { search } = useLocation();
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    // Redirect to the specified page if the user is already logged in
    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    // Handle form submission for user login
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await login({ email, password }).unwrap()
            dispatch(setCredentials({ ...res }))
            navigate(redirect)
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    return (
        <FormContainer>
            <h1>SIGN IN</h1>
            <Form onSubmit={handleSubmit}>
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
                    <FormLabel>Password </FormLabel>
                    <FormControl
                        type='password'
                        placeholder='Enter your Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></FormControl>
                </FormGroup>
                <Button type='submit' variant='primary' className='mt-2'>Sign In</Button>
                {isLoading && <Spinner />}
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? <Link to={`/register?redirect=${redirect}`}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen