import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @des Fetch all Product
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT
  const page = Number(req.query.pageNumber || 1);
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (products) {
    return res.json({ products, page, pages: Math.ceil(count / pageSize) });
  }
  res.status(404).json({ message: "No products" });
});

// @des Fetch a Product
// @route  GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error("Product not found");
});

// @des Create a Product
// @route  POST /api/products/:id
// @access admin
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product({
    name: "sample name",
    user: req.user._id,
    brand: "sample Brand",
    category: "sample Category",
    price: 0,
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
    image: "/images/sample.jpg",
    rating: 0,
  });
  const newProduct = await product.save();
  res.status(200).json(newProduct);
});

// @des update a Product
// @route  PUT/api/products/:id/edit
// @access /Private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    category,
    image,
    price,
    countInStock,
    description,
  } = req.body;
  
  const product = await Product.findById(req.params.id)
  if(product){
    product.name = name
    product.brand = brand
    product.category =category
    product.price = price,
    product.countInStock = countInStock
    product.image = image
    product.description = description
    product.rating = 0
    }
    
  
  const newProduct = await product.save();
  res.status(200).json(newProduct);
});

// @des Delete a Product
// @route  DELETE /api/products/:id
// @access private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({_id : product._id})
    return res.json({
      message : "Deleted Successfully"
    });
  }
  res.status(404).json({ message: "not Deleted" });
});


// @des Create a new review
// @route  POST /api/products/:id/reviews
// @access Public
const newReview = asyncHandler(async (req, res) => {
  const {rating , comment } = req.body
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString())

    if (alreadyReviewed){
      return res.status(400).json({
        message : "Already Reviewed"
      });
    }
    
    const review = {
      user: req.user._id,
      rating,
      comment,
      name : req.user.name
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating = product.reviews.reduce((acc,review) => acc + review.rating ,0)/product.reviews.length

    await product.save()
    res.status(200).json({
        message : "Review Added Successfully"
      });
    }
  else{
    res.status(400).json({
      message : "Resource not found"
    });
  }
  
});

// @des Get top three Product
// @route  GET /api/products/:id
// @access Public
const getTopProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({rating : -1}).limit(3);
  if (products) {
    return res.json(products);
  }
  res.status(404);
  throw new Error("Product not found");
});


export {getTopProduct, getProductById, getProducts, createProduct ,updateProduct ,deleteProduct,
newReview};
