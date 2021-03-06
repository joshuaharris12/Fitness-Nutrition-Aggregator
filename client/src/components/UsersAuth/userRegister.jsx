import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from "yup";
import { authenticate, isAuth } from '../../actions/userAuth.js';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import './userRegister.css';
import Google from './googleLogin.jsx';
import Facebook from './facebookLogin.jsx';
import { useHistory } from 'react-router-dom';
import { baseUrl } from '../../api/index.js';

const Register = (client) => {

const isClient = client.checkClient;

const history = useHistory();

const eye = <FontAwesomeIcon icon={faEye} />;

const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
  };
      
const schema = Yup.object().shape({
    email: Yup.string()
        .email("Email must be valid.")
        .required("No email provided."),
    username: Yup.string()
        .min(3, "Username is too short - should be 3 chars minimum.")
        .max(30, "Username is too long - should be 30 chars maximum.")
        .matches(/^[a-zA-Z0-9._]*$/, "Username should not contain space or special characters.")
        .required("No username provided."),
    name: Yup.string()
        .required("No name provided."),
    password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number.")
        .matches(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/, "Password should not contain blank space."),
    retypePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords don't match.")
        .required("Required.")
});

const formik = useFormik({
    initialValues:{ email: "", username: "", password: "", retypePassword: "", name: "", profession: ""},
    validationSchema: schema,
    onSubmit: (values, actions) => {
      setTimeout(() => {
        console.log("Signing Up", values);
      if(isClient == "true"){
        const newData = {
          email: values.email,
          username: values.username.toLowerCase(),
          password: values.password,
          name: values.name,
        }
        axios
          .post(`${baseUrl}/basicUsers/register`, newData)
          .then(res => {
            authenticate(res, () => {
            history.push(`/user/quiz/${JSON.parse(localStorage.getItem('user'))._id}`)
            })
          })
          .catch(err => {
                if(err.response == undefined){
                  window.location.reload();
                }
                else if(err.response.data.errors){
                          console.log(err.response.data.errors)
                          if(err.response.data.errors.includes('Email'))
                            actions.setFieldError('email', 'Email already in use')
                          else
                            actions.setFieldError('username', 'Username already in use')
                        }  
                      })
        }
        else{
        const newData2 = {
            email: values.email,
            username: values.username.toLowerCase(),
            password: values.password,
            name: values.name,
            profession: values.profession,
        }
        axios
          .post(`${baseUrl}/professionalUsers/register`, newData2)
          .then(res => {
            authenticate(res, () => {
            history.push(`/professional/quiz/${JSON.parse(localStorage.getItem('user'))._id}`)
            })
          })
            .catch(err => {
                if(err.response == undefined){
                  window.location.reload();
                }
                else if(err.response.data.errors){
                          console.log(err.response.data.errors)
                          if(err.response.data.errors.includes('Email'))
                            actions.setFieldError('email', 'Email already in use')
                          else
                            actions.setFieldError('username', 'Username already in use')
                        }  
                      })
          }
        actions.setSubmitting(false);
      }, 500);
    },
});

  return (
    <div className ="RegisterComponent">
        {isAuth() ? <Redirect to='/' /> : null}
      
    <Form autoComplete="off" onSubmit={formik.handleSubmit}>
    <Form.Label hidden = {true} htmlFor="email">Email</Form.Label>
      <Form.Control
          id="email"
          name="email"
          type="text"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.errors.email && formik.touched.email && "error"}
      />
      
      {formik.errors.email && formik.touched.email && (
      <div style={{color: "red"}} className="input-feedback">{formik.errors.email}</div>
      ) }
      <p/>

      <Form.Label hidden = {true} htmlFor="name">Name</Form.Label>
      <Form.Control
          id="name"
          name="name"
          type="text"
          placeholder="Insert your name here"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.errors.name && formik.touched.name && "error"}
      />
      {formik.errors.name && formik.touched.name && (
      <div style={{color: "red"}} className="input-feedback">{formik.errors.name}</div>
      )}
      <p/>    
  
    <Form.Label hidden = {true} htmlFor="username">Username</Form.Label>
      <Form.Control
          id="username"
          name="username"
          type="text"
          placeholder="Create your username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.errors.username && formik.touched.username && "error"}
      />
      {formik.errors.username && formik.touched.username && (
      <div style={{color: "red"}} className="input-feedback">{formik.errors.username}</div>
      )}
      <p/>
      
    {isClient != "true" ? 
      <div>
      <Form.Label hidden = {true} htmlFor="profession">Profession</Form.Label>
        <Form.Control
            id="profession"
            name="profession"
            type="text"
            placeholder="Enter your profession here"
            value={formik.values.profession}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.errors.profession && formik.touched.profession && "error"}
        />
        {formik.errors.profession && formik.touched.profession && (
        <div style={{color: "red"}} className="input-feedback">{formik.errors.profession}</div>
        )}
      </div>
    :
      null
    }
    <p/>
  
    <Form.Label hidden = {true} htmlFor="password">Password</Form.Label> 
      <div className="parent1">
      <Form.Control
          id="password"
          name="password"
          type={passwordShown ? "text" : "password"}
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.errors.password && formik.touched.password && "error"}
      /> 
      <i className="child1" onClick={togglePasswordVisibility}>{eye}</i>
      </div>
      {formik.errors.password && formik.touched.password && (
      <div style={{color: "red"}} className="input-feedback">{formik.errors.password}</div>
      )}
      <p/>
    
    <Form.Label hidden = {true} htmlFor="retypePassword">Re-type Password</Form.Label>
      <div className="parent2">
      <Form.Control
          id="retypePassword"
          name="retypePassword"
          type={passwordShown ? "text" : "password"}
          placeholder="Re-enter your password"
          value={formik.values.retypePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.errors.retypePassword && formik.touched.retypePassword && "error"}
      />
       <i className="child2" onClick={togglePasswordVisibility}>{eye}</i>
       </div>
      {formik.errors.retypePassword && formik.touched.retypePassword && (
      <div style={{color: "red"}} className="input-feedback">{formik.errors.retypePassword}</div>
      )}
      <p/>
      
      <Button className="registerButtonModal" variant="outline-success" type="submit" disabled={formik.isSubmitting}>
          Register
      </Button>
      <p style={{ 'marginLeft': '45%',"marginRight":"45%", 'fontWeight': 'bold' }}> OR </p>
    </Form>
    <Google isClient = {isClient}/>
    <p/>
    <Facebook isClient = {isClient}/>
    </div>
    );
};

export default Register;