import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

// A component for searching products
const SearchComponent = () => {
    // Initialize the router's navigation function and get the 'keyword' parameter from the URL
    const navigate = useNavigate()
    const { keyword: urlKey } = useParams()
    const [keyword, setKeyword] = useState(urlKey || '')

    // Handle the form submission for product search
    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            setKeyword('') // Clear the search input field
            navigate(`/search/${keyword}`) // Navigate to the search results page with the keyword
        } else {
            navigate('/') // If the search input is empty, navigate back to the homepage
        }
    }

    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)} // Update the 'keyword' state on input change
                value={keyword}
                placeholder='Search a Product'
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>
            <Button type='submit' variant='outline-light' className='p-2 mx-2'  >Search</Button>
        </Form>
    )
}

export default SearchComponent