import React, { useState } from "react";
import Form from "@rjsf/mui";
import Specifications from "../Schema/signupForm";
import "./CSS/Signup.css";
import { service } from "../Service/Service";
import { Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setFormData(e.formData);
  };
  const submitHandler = async () => {
    setLoading(true);
    const sendRequest = await service.signUp(formData);
    if (!sendRequest[1]) {
      setLoading(false);
      setFormData({});
      setError("User created succesfully");
    }

    if (!sendRequest[0]) {
      setLoading(false);
      setError(sendRequest[1]);
    }
  };
  return (
    <div className="signup-container">
      <p className="Title">GO SAFE SIGNUP</p>
      <div className="signup-card">
        <Form
          validator={Specifications.validator}
          schema={Specifications.schema}
          formData={formData}
          onChange={changeHandler}
        >
          <></>
        </Form>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button onClick={submitHandler} variant="contained">
            SignUp
          </Button>
        )}

        <p>{error}</p>
      </div>
      <p>
        Already have a account then login <Link to={"/login"}>click here</Link>
      </p>
    </div>
  );
};

export default SignUp;
