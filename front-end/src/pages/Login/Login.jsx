import React, { useContext } from "react";
import axios from "axios";
import classes from "../Login/Login.module.css";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../../contextapi/AuthContext";

const Login = () => {
  const [input, setInput] = React.useState({
    user_name: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_USER" });
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/login`, input);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate('/')
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  return (
    <div className={classes.login}>
      <form className={classes.loginForm} onSubmit={handleSubmit}>
        <input
          type='text'
          className={classes.lInput}
          placeholder='username'
          id='user_name'
          onChange={handleChange}
        />
        <input
          type='password'
          className={classes.lInput}
          placeholder='password'
          id='password'
          onChange={handleChange}
        />
        <button disabled={loading} type='submit' className={classes.lButton}>
          Log in
        </button>
        {error && <span className={classes.error}>{error?.message}</span>}
      </form>
    </div>
  );
};

export default Login;
