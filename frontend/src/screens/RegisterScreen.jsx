import React, { useEffect } from 'react'
import { Row ,Button, Col ,Form, FormGroup, FormLabel, FormControl} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useNavigate , useLocation, useParams  } from 'react-router-dom'
import { useSelector ,useDispatch } from 'react-redux'
import {setCredentials} from '../slices/authSlice.js'
import {useRegisterMutation} from '../slices/usersApiSlice.js'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'


const RegisterScreen = () => {
    const [name ,setName] = useState('')
    const [email ,setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {userInfo} = useSelector(state => state.auth)

    const [register , {isLoading}] = useRegisterMutation()

    const {search} = useLocation();
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'
    
    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[userInfo,redirect ,navigate])


    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error("Password donot match")
        }else{
            try {
                const res = await register({name ,email , password}).unwrap()
                dispatch(setCredentials({...res}))
                navigate(redirect)
                console.log(userInfo)
            } catch (err) {
                toast.error(err?.data?.message || err.error)    
            }
        }
        
    }
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
                    onChange = {(e) => setName(e.target.value)}
                ></FormControl>
           </FormGroup>
           <FormGroup controlId='email' className='my-3'>
                <FormLabel>EMAIL ADDRESS</FormLabel>
                <FormControl
                    type='email'
                    placeholder='Enter your Email Address'
                    value={email}
                    onChange = {(e) => setEmail(e.target.value)}
                ></FormControl>
           </FormGroup>
           <FormGroup controlId='password' className='my-3'>
                <FormLabel>Password </FormLabel>
                <FormControl
                    type='password'
                    placeholder='Enter your Password'
                    value={password}
                    onChange = {(e) => setPassword(e.target.value)}
                ></FormControl>
           </FormGroup>
           <FormGroup controlId='confirmpassword' className='my-3'>
                <FormLabel>Password </FormLabel>
                <FormControl
                    type='password'
                    placeholder='Enter your Password'
                    value={confirmPassword}
                    onChange = {(e) => setConfirmPassword(e.target.value)}
                ></FormControl>
           </FormGroup>
           <Button type='submit' variant='primary' className='mt-2'>Register</Button>
           {isLoading && <Spinner />}
        </Form>
        <Row className='py-3'>
            <Col>
                Already have an account ? <Link to= {redirect ? `/login?/redirect=${redirect}` : '/register'}>Login</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen