import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Login from "./Login";
import Register from "./Register";
import axios from "axios";
import { Navbar, NavDropdown, Nav, Modal, Button } from "react-bootstrap";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const Navbarr = () => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
  const [loginShow, setLoginShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);

  const loginHandler = () => {
    setLoginShow(false);
  };
  const registerHandler = () => {
    setRegisterShow(false);
    setLoginShow(true);
  };

  function LoginModal(props) {
    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered dialogClassName="modal-50w">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login value={props} action={loginHandler} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function RegisterModal(props) {
    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered dialogClassName="modal-50w">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Register value={props} action={registerHandler} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const onClickLogoutHandler = async () => {
    await axios
      .get("/api/users/logout")
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
          setIsAuthenticated(false);
        }
      })
      .catch(function (error) {});

    var hostname = "http://localhost:5000";
    if (window.location.hostname.toString() !== "localhost") {
      hostname = window.location.hostname;
    }

    store.addNotification({
      title: "Success!",
      message: "You have logged out!",
      type: "info",
      insert: "top",
      container: "top-center",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      showIcon: true,
      dismiss: {
        duration: 3000,
        onScreen: true,
      },
    });
  };

  const unauthenticatedNavBar = () => {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand className="navDropLink">
          <Link to="/dashboard" className="navLink" id="brand">
            MyBudgetApp
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Account">
              <NavDropdown.Item className="navDropLink" smooth="true" duration={500}>
                <div data-dismiss="OverlayTrigger" className="navLink" onClick={() => setLoginShow(true)}>
                  Login
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item className="navDropLink" smooth="true" duration={500}>
                <div data-dismiss="OverlayTrigger" className="navLink" onClick={() => setRegisterShow(true)}>
                  Register
                </div>
              </NavDropdown.Item>
            </NavDropdown>
            <Nav>
              <Link to="/dashboard" className="navLink nav-link">
                Dashboard
              </Link>
              <Link to="/editbudgets" className="navLink nav-link">
                Input Spending
              </Link>
              <Link to="/configure" className="navLink nav-link">
                Configure
              </Link>
            </Nav>
          </Nav>
          <Nav>
            <Nav.Link href="https://github.com/antonybstack/MyBudgetApp" target="_blank">
              <img src={require("../assets/github.png")} alt="github" width="100" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <LoginModal show={loginShow} onHide={() => setLoginShow(false)} />
        <RegisterModal show={registerShow} onHide={() => setRegisterShow(false)} />
      </Navbar>
    );
  };

  const authenticatedNavBar = () => {
    console.log(user.avatar);
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand className="navDropLink">
          <Link to="/dashboard" className="navLink" id="brand">
            MyBudgetApp
          </Link>
        </Navbar.Brand>
        <Navbar.Text className="navProfile">
          &nbsp;&nbsp;&nbsp;
          <img src={user.avatar && require("../assets/avatars/" + user.avatar + ".png")} alt="Logo" width="20" /> {user.username}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Navbar.Text>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Account">
              {user.role === "admin" ? (
                <>
                  <NavDropdown.Item className="navDropLink">
                    <Link to="/admin" className="navLink">
                      Admin
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </>
              ) : null}
              <NavDropdown.Item onClick={onClickLogoutHandler} smooth="true" duration={500}>
                <div data-dismiss="OverlayTrigger">Logout</div>
              </NavDropdown.Item>
            </NavDropdown>
            <Link to="/dashboard" className="navLink nav-link">
              Dashboard
            </Link>
            <Link to="/editbudgets" className="navLink nav-link">
              Input Spending
            </Link>
            <Link to="/configure" className="navLink nav-link">
              Configure
            </Link>
          </Nav>

          <Nav>
            <Nav.Link href="https://github.com/antonybstack/MyBudgetApp" target="_blank">
              <img src={require("../assets/github.png")} alt="github" width="100" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };
  return <>{!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}</>;
};

export default Navbarr;
