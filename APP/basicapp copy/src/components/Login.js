import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserActions } from "./../Store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import FormReq from "./../Schema/FormReq";
import "./CSS/Login.css";
import { service } from "./../Service/Service";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => {
    return state.UserToken.token;
  });

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const [creds, setCreds] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    setError("");
    setLoading(true);
    if (creds.Email && creds.Password) {
      const credsgen = {
        Email: creds.Email,
        Password: creds.Password,
      };
      // const token = (await service.getLoginToken(credsgen));
      const token = [
        credsgen.Email == "police@demo.com" && credsgen.Password == "demopolice"
          ? "apoivsdfnvse,rkjfnsvja"
          : undefined,
      ];
      if (token) {
        dispatch(UserActions.storeToken(token));
        setLoading(false);
        navigate("/");
      } else {
        setError("Invalid username or password");
        setLoading(false);
      }
    } else {
      setError("Invalid login details*");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <p className="Title"> GO SAFE POLICE LOGIN</p>
        <div className="Card">
          <Form
            schema={FormReq.schema}
            validator={validator}
            onSubmit={submitHandler}
            onChange={(e) => {
              setCreds(e.formData);
            }}
            formData={creds}
          >
            <></>
          </Form>
          <br />
          {isLoading ? (
            <CircularProgress></CircularProgress>
          ) : (
            <Button variant="contained" onClick={submitHandler}>
              Login
            </Button>
          )}

          <p className="error">{error}</p>
        </div>
        <p>
          Don't Have a account signup ? Create one{" "}
          <Link to={"/signup"}>Click here</Link>
        </p>
      </div>
    </>
  );
};
export default Login;
