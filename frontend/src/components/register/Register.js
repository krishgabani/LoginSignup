import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  

  const register = async () => {
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && password === reEnterPassword) {
      await axios.post("http://127.0.0.1:3000/api/users", user).then((res) => {
        console.log("connect");
        console.log(res);
        console.log(res.data.status);
        
        if (res.status === 201) {
          toast.success(res.data.message);
        } else {
          console.log("this is meet gami");
          toast.error(res.data.message);
        }
        // alert(res.data.message);
        //navigate("/login");
      }).catch((err) => {
        toast.error("Invalid input | email is alreadt there");
      });
    } else {
      toast.error("Invalid input");
    }
  };

  return (
    <div className="register">
      {console.log("User", user)}
      <h1>Register</h1>
      <input
        type="text"
        name="name"
        value={user.name}
        placeholder="Your Name"
        onChange={handleChange}
      ></input>
      <input
        type="text"
        name="email"
        value={user.email}
        placeholder="Your Email"
        onChange={handleChange}
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="Your Password"
        onChange={handleChange}
      ></input>
      <input
        type="password"
        name="reEnterPassword"
        value={user.reEnterPassword}
        placeholder="Re-enter Password"
        onChange={handleChange}
      ></input>
      <div className="button" onClick={register}>
        Register
      </div>
      <div>or</div>
      <div className="button" onClick={() => navigate("/login")}>
        Already have an account?
      </div>
    </div>
  );
};

export default Register;
