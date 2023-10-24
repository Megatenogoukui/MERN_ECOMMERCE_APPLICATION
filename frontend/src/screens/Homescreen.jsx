import {  Col,  Row } from 'react-bootstrap'
import Products from '../components/Products'
import { useGetProductsQuery } from '../slices/productApiSlice'
import Spinner1 from '../components/Spinner'
import Message from '../components/Message'
import { Link, useParams } from 'react-router-dom'
import Paginate from '../components/Pagination'
import CarouselComponent from '../components/Carousel'

function Homescreen() {
  //Getting the pagenumber and the keyword from the URL
  const {pageNumber ,keyword} = useParams()

  //Getting Products data with pagination content from backend :GET - /api/products
  const  {data  , isLoading , error} = useGetProductsQuery({keyword ,pageNumber})
  
  return (
    <div>
        {keyword ? <Link to = '/' className='btn btn-light'>GO Back</Link> : <CarouselComponent /> }

        {isLoading ? (
         <Spinner1 />
        ) : error ? (<Message variant = 'danger'>{error?.data?.message || error.error}</Message>) : (<>
        <h1 style={{marginTop : '50px' }}>LATEST PRODUCTS</h1>
          <Row>
          {/* Mapping the array of data */}
          {data.products.map((product ,index) => {
              return  <Col key = {index} sm = {12} md = {6} lg = {4} xl = {3}>
                  <Products product={product} />
              </Col>
          })}
          
      </Row>
      <Paginate pages = {data.pages} page = {data.page}keyword= {keyword} />

        </>)}
        
    </div>
  )
}

export default Homescreen