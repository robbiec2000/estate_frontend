import "./login.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import TextField from '@mui/material/TextField';
import { inputStyle } from "../../lib/muiStyle";



function Login() {


  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        username, password,
      });

      updateUser(res.data);

      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <TextField
            id="outlined-password-input"
            label="Username"
            type="text"
            name="username"
            InputLabelProps={{ required: false }}
            required
            
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            name="password"
            InputLabelProps={{ required: false }}
            required
          />
          {/* <input name="username" type="text" placeholder="Username" required />
          <input name="password" type="password" placeholder="Password" required /> */}
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
