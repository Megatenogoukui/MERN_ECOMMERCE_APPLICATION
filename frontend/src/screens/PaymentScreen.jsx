import React, { useState ,useEffect } from 'react'
import {Form , Button , Col } from 'react-bootstrap'
import CheckOutSteps from '../components/CheckOutSteps'
import FormContainer from '../components/FormContainer'
import { UseSelector ,useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../slices/cartSlice'
import { useNavigate } from 'react-router-dom'

  
function PaymentScreen() {
    const [paymentMethod , setPaymentMethod] = useState('Paypal')
    const {shippingAddress} = useSelector(state => state.cart)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
    
        if(!shippingAddress){
            navigate('/shipping')
        }
    },[shippingAddress , navigate])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeOrder')
    }

  return (
    <FormContainer>
        <CheckOutSteps step1 step2 step3 />
        <h1 className='mt-3 bold'>Payment Method</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label as = 'legend'>
                    Select Method
                </Form.Label>
                <Form.Check
                type='radio'
                label = 'Paypal or Credit Card'
                className='my-2'
                value={paymentMethod}
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
                >


                </Form.Check>
            </Form.Group>
            <Button type='submit' variant='primary' className='my-2'>Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen