import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">ByteChat</span>
        <span className="title">Log in</span>
        <form action="" onSubmit={handleSubmit}>
          <input type="email" placeholder="email" name="email" />
          <input type="password" placeholder="password" name="password" />
          <button>Login</button>
          {error && <span>Something went wrong!</span>}
        </form>
        <p>
          You don't have an account?{" "}
          <Link
            to="/register"
            style={{
              textDecoration: "none",
              color: "#09644c",
              fontWeight: "bold",
            }}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
