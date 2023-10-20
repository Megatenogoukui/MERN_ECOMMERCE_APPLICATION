import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.css";
import App from "./App";
import "./assets/styles/bootstrap.custom.css";
import reportWebVitals from "./reportWebVitals";
import store from "./store.js";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Homescreen from "./screens/Homescreen";
import ProductScreen from "./screens/ProductScreen";
import { Provider } from "react-redux";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PrivateRoute from "./components/PrivateRoute";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import UserProfile from "./screens/UserProfile";
import AdminRoute from "./components/AdminRoute";
import OrderList from "./screens/Admin/OrderList";
import ProductList from "./screens/Admin/ProductList";
import { UpdateOrderScreen } from "./screens/Admin/UpdateOrderScreen";
import UserList from "./screens/Admin/UserList";
import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Homescreen />} />
      <Route path="/search/:keyword" element={<Homescreen />} />
      <Route  path="/page/:pageNumber" element={<Homescreen />} />
      <Route  path="/search/:keyword/page/:pageNumber" element={<Homescreen />} />
      <Route path="/products/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeOrder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<UserProfile />} />
      </Route>
      <Route path="" element = {<AdminRoute />}>
        <Route path="/admin/orderlist" element = {<OrderList />}  />
        <Route path="/admin/productlist" element = {<ProductList />}  />
        <Route path="/admin/productlist/:pageNumber" element = {<ProductList />}  />
        <Route path="/admin/userlist" element = {<UserList />}  />
        <Route path="/admin/product/:id/edit" element = {<UpdateOrderScreen />}  />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading = {true}>
        <RouterProvider router={router} />  
      </PayPalScriptProvider>
      
    </Provider>
    </HelmetProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
