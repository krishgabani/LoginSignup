import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {Homepage } from "../homepage/Homepage"

const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({   
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    axios.post("http://127.0.0.1:3000/api/auth", user).then((res) => {
      //console.log("hello guys");
      console.log(res);
      
      if (res.status === 200) {
        console.log("this is done");
        toast.success(res.data.message);
        console.log(user);
        //console.log(res.data.user);
        setLoginUser(user);
        navigate("/");
      }else{
        console.log("error");
        toast.error(res.data.message);
      }
      // alert(res.data.message)
      
      
    }).catch((err) => {
      console.log(err);
      toast.error("please put valid email or please verifyed on your email");
      //console.log("He");
      
      // if(err.status === 401) {
      //   console.log("hey");
      //   toast.error("Plase Enter the Valid Email ID");
      // }      
    });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Your Email"
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Your Password"
      ></input>
      <div className="button" onClick={login}>
        Login
      </div>
      <div>or</div>
      <div className="button" onClick={() => navigate("/register")}>
        Create new account
      </div>
    </div>
  );
};

export default Login;
