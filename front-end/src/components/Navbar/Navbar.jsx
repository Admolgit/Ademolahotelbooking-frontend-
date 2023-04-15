import { Link } from "react-router-dom";
import {useContext} from "react"
import classes from "./Navbar.module.css";
import { AuthContext } from "../../contextapi/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  
  return (
    <div className={classes.navbar}>
      <div className={classes.navContainer}>
        <Link to='/' style={{color: "inherit", textDecoration: "none"}}>
          <span className={classes.logo}>Ademolabooking</span>
        </Link>
        {user ? `Welcome ${user.user.user_name}` : <div className={classes.navItems}>
        <Link to='/auth/register' style={{color: "inherit", textDecoration: "none"}}>
          <button className={classes.navButton}>Register</button>
        </Link>
        <Link to='/auth/login' style={{color: "inherit", textDecoration: "none"}}>
          <button className={classes.navButton}>Login</button>
        </Link>
        </div>}
      </div>
    </div>
  )
}

export default Navbar