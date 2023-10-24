import React from "react";
import { useDeleteProductMutation, useGetProductsQuery } from "../../slices/productApiSlice";
import { Button, Table, Row, Col} from "react-bootstrap";
import Message from "../../components/Message";
import Spinner from "../../components/Spinner";
import { FaTimes, FaTrash, FaEdit } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useCreateProductMutation } from "../../slices/productApiSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Paginate from "../../components/Pagination";

function ProductList() {
  const {pageNumber ,keyword } = useParams()
  const {
    data,
    isLoading: loadingProduct,
    error,
    refetch
  } = useGetProductsQuery({pageNumber, keyword});


  const [deleteProduct , {isLoading : loadingDelete,}] = useDeleteProductMutation()
  const deleteHandler = async(id) => {
    try {
      const result = await deleteProduct(id)
      toast.success(result.message)
      refetch()
    } catch (err) {
      toast.error(err?.data?.message || err.message)
    }
  }


  const [createProduct , {isLoading : loadingCreate }] = useCreateProductMutation()

  const navigate = useNavigate()

  const handleCreate = async () => {
    if (window.confirm('Are u Sure u want to create a new Product ? ')){
       try {
         await createProduct()
         refetch()
       } catch (err) {
        toast.error(err?.data?.message || err.error)
       }
    }
    
  }
  return (
    <>
      <Row className="text-align-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m3" onClick={handleCreate}>
            <FaEdit /> Create Product
          </Button>
          {loadingCreate && <Spinner />}
        </Col>
      </Row>
      {loadingProduct ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Table responsive hover striped>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.products.length !== 0 &&
              data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>₹{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button variant="danger" className="btn-sm mx-2" onClick={() => deleteHandler(product._id)}>
                      <FaTrash style ={{color : "white"}} />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
      {console.log(data)}
      <Paginate pages={data?.pages} page = {data?.page} isAdmin  />
    </>
  );
}

export default ProductList;
