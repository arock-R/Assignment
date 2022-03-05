import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Navbar = (props) => {

  const history = useHistory();
  
  useEffect(() => {
    /** Checking token */
    if (props.token.length !== 0) {
      history.push('/')
    } else {
      history.push('/login')
    }
  }, [props.token])
  
    
  return (
    <nav>
      <Link className="nav-link" to={"/"}> <h4>logo</h4> </Link>
      {props.token.length !== 0 ?
        <Link className="nav-link" to={"/my-profile"}> My profile </Link>
        :
        <div className="nav-menu">
          <Link className="nav-link" to={"/login"}>
            Login
          </Link>
          <Link className="nav-link" to={"/register"}>
            Register
          </Link>
        </div>
      }
    </nav>
  );
};

const mapStateToProps = (store) => ({
    token: store.userState.token,
  });
  
export default connect(mapStateToProps, null)(Navbar);
