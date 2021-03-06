import React, { useState, useContext, useRef } from "react";
import Message from "../components/Message";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { Form, Button, Overlay, Tooltip } from "react-bootstrap";

const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);
  const [clicked, setClicked] = useState(false);
  const [show, setShow] = useState(false);
  const [typeError, setErrorType] = useState("");
  const target = useRef(null);
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (clicked === true) {
      axios
        .post("/api/users/login", user)
        .then((res) => {
          const { isAuthenticated, user } = res.data;
          if (isAuthenticated) {
            setMessage({ msgBody: "Account successfully logged in", msgError: false });
            setErrorType("successMessage");
            setShow(true);
            setTimeout(function () {
              authContext.setUser(user);
              authContext.setIsAuthenticated(isAuthenticated);
              setClicked(false);
              props.action();
            }, 1500);
          }
        })
        .catch(function (error) {
          setErrorType("errorMessage");
          setShow(true);
          setClicked(false);
          setMessage({ msgBody: "Invalid username or password", msgError: true });
        });
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" onChange={onChange} />
        </Form.Group>
        <Button
          ref={target}
          variant="primary"
          type="submit"
          onClick={() => {
            setClicked(true);
          }}
        >
          Submit
        </Button>
      </Form>
      <Overlay delay={{ show: 50, hide: 50 }} target={target.current} show={show} placement="right-end">
        {(props) => (
          <Tooltip className={typeError} id="messageLogin" {...props}>
            <Message message={message} />
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};

export default Login;
