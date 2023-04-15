import { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import classes from "./Register.module.css";

const Register = (req, res, next) => {

  const [input, setInput] = useState({
    user_name: undefined,
    email: undefined,
    password: undefined
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/register`, input);

      console.log(res);

      navigate('/login')
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    <h1 className={classes.register}>Register to use our home and hotel reservation platform</h1>
    <div className={classes.register}>
      <form className={classes.registerForm} onSubmit={handleSubmit}>
        <input
          type='text'
          className={classes.lInput}
          placeholder='Enter username'
          id='user_name'
          onChange={handleChange}
        />
        <input
          type='email'
          className={classes.lInput}
          placeholder='Enter email'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          className={classes.lInput}
          placeholder='Enter password'
          id='password'
          onChange={handleChange}
        />
        <button type='submit' className={classes.lButton}>
          Register
        </button>
        {/* {error && <span className={classes.error}>{error?.message}</span>} */}
      </form>
    </div>
    </>
  )
}

export default Register;