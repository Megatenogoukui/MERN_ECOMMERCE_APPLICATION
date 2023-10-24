import React from "react";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from '../slices/authSlice.js';
import SearchComponent from "./SearchComponent";

const Header = () => {

  // Select relevant data from Redux store using useSelector
  const { cartitems } = useSelector(state => state.cart);
  const { userInfo } = useSelector(state => state.auth);

  // Initialize necessary hooks and functions
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutCallApi] = useLogoutMutation();

  // Function to handle user logout
  const logoutHandler = async () => {
    try {
      // Call the logout API and dispatch the 'logout' action
      await logoutCallApi().unwrap();
      dispatch(logout());

      // Navigate to the login page after successful logout
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              {" "}
              <img src={logo} alt="ABs Store" width={100} />{" "}
            </Navbar.Brand>
          </LinkContainer>

          {/* Navbar toggle button for small screens */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">

              {/* SearchComponent for searching products */}
              <SearchComponent />

              {/* Link to the shopping cart */}
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart />
                  Cart
                  {
                    // Display a badge with the number of items in the cart
                    cartitems.length > 0 && (
                      <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                        {cartitems.reduce((a, c) => a + c.qty, 0)}
                      </Badge>
                    )
                  }
                </Nav.Link>
              </LinkContainer>

              {/* Conditional rendering for user authentication */}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {/* Conditional rendering for admin options */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown id="adminmenu" title='Admin'>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>
                      Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>
                      Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>
                      Users
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;