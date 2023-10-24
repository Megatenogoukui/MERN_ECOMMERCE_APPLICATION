import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetProductsDetailsQuery,
  useUpdateProductMutation,
  useUploadImageMutation,
} from "../../slices/productApiSlice";
import FormContainer from "../../components/FormContainer";
import { Button, Form, FormGroup, Spinner } from "react-bootstrap";
import Message from "../../components/Message";
import { toast } from "react-toastify";

export const UpdateOrderScreen = () => {
  const { id: productId } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductsDetailsQuery(productId);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const navigate = useNavigate();

  // Populate form fields with product details when product data is available
  useEffect(() => {
    if (product) {
      setName(product.name);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setImage(product.image);
      setPrice(product.price);
    }
  }, [product]);

  // Handle form submission to update the product
  const submitHandler = (e) => {
    e.preventDefault();
    const updatedProduct = {
      image,
      _id: product._id,
      name,
      brand,
      category,
      description,
      countInStock,
      price,
    };

    const result = updateProduct(updatedProduct);
    if (result) {
      toast.success('Product Updated');
      navigate('/admin/productlist');
    } else {
      toast.error(result.error);
    }
  };

  const [uploadImage, { isLoading: loadingUpload }] = useUploadImageMutation();

  // Handle file upload for the product image
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go back
      </Link>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <FormContainer>
          <h1>Edit Products</h1>
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                type="name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                value={price}
                type="price"
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="countInStock">
              <Form.Label>CountInStock</Form.Label>
              <Form.Control
                value={countInStock}
                type="countInStock"
                placeholder="CountInStock"
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </FormGroup>

            {loadingUpdate ? (
              <Spinner />
            ) : (
              <FormGroup controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Image Path"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                <Form.Control
                  type="file"
                  label="Choose file"
                  onChange={uploadFileHandler}
                  className="my-2"
                ></Form.Control>
                {loadingUpload && <Spinner />}
              </FormGroup>
            )}

            <FormGroup controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                value={brand}
                type="brand"
                placeholder="Brand"
                onChange={(e) => setBrand(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                value={category}
                type="category"
                placeholder="Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={description}
                type="description"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
            <Button type="submit" variant="primary" className="my-3">
              Update
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};