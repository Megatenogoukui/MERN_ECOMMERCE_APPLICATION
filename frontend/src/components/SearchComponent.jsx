import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

const SearchComponent = () => {
    const navigate = useNavigate()
    const { keyword : urlKey } = useParams()
    const [keyword , setKeyword] = useState(urlKey || '')

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            setKeyword('')
            navigate(`/search/${keyword}`)
        }
        else{
            navigate('/')
        }
        
    }
  return (
    <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control
        type='text'
        name = 'q'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder='Search a Product'
        className='mr-sm-2 ml-sm-5'
        ></Form.Control>
        <Button type = 'submit' variant = 'outline-light' className = 'p-2 mx-2'  >Search</Button>
    </Form>
  )
}

export default SearchComponent