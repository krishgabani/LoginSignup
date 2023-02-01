import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./components/homepage/Homepage";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import EmailVerify from "./components/EmailVerify";

function App() {
  const [user, setLoginUser] = useState({});
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              user && user.password ? (
                <Homepage setLoginUser={setLoginUser} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          />
          <Route
            path="/login"
            element={<Login setLoginUser={setLoginUser} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />

        </Routes>
      </Router>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
