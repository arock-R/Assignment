import React, { useEffect, useRef, useState } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './styles.css'
import { handleLogin } from "../actions/actions";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  
  const history = useHistory();
  
  /** password input element ref */
  const passInputRef = useRef();
  
  /** Component states*/
  const [visibility, setVisibility] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [errorText, setErrorText] = useState({
    emailError: null,
    passwordError: null,
  });


  useEffect(() => {
    /** Checking token*/
    if (props.token.length !== 0) {
      history.push('/')
    }
  }, [props.token])

  /** Setting input values to state */
  const handleInputField = (event) => {
    setInputValue({
      ...inputValue,
      [event.target.id] : event.target.value
    })
  };

  /** Password visibility toggle*/
  const togglePasswordVisibility = () => {
    setVisibility(!visibility);
    visibility
      ? (passInputRef.current.type = "password")
      : (passInputRef.current.type = "text");
  };

  /** Validating form and executing login function*/
  const handleForm = () => {
    
    if (inputValue.email.length == 0) {
      /** Setting error message*/
      setErrorText({
        ...errorText,
        emailError: 'email cannot be empty'
      })
    } else if (!inputValue.email.match(/@/g)) {
      setErrorText({
        ...errorText,
        emailError: 'invalid email id'
      })
    } else if (inputValue.password.length == 0) {
      setErrorText({
        ...errorText,
        passwordError: 'password cannot be empty'
      })
    } else {
      setErrorText({
        emailError: null,
        passwordError: null
      })
      props.handleLogin(inputValue)
    }
  };

  return (
    <section className="login_section">
      <form>
        <label>Email</label>
        <div className="input_block">
          <input
            value={inputValue.email}
            onInput={(ev) => handleInputField(ev)}
            type="text"
            id="email"
          />
          <div className={errorText.emailError ? 'showText' : 'hideText'}>{ errorText.emailError }</div>
        </div>
        <label>Password</label>
        <div className="input_block">
          <input
            value={inputValue.password}
            onInput={(ev) => handleInputField(ev)}
            id="password"
            ref={passInputRef}
            type="password"
          />
          <div
            className={visibility ? "eye_icon active" : "eye_icon"}
            onClick={togglePasswordVisibility}
          >
            &#128065;
          </div>
        </div>
        <div  className={errorText.passwordError ? 'showText' : 'hideText'}>{ errorText.passwordError }</div>  

        <div className="input_block">
          <button className="submit_button" onClick={handleForm} type="button">login</button>
        </div>
      </form>
    </section>
  );
};


const mapStateToProps = (store) => ({
  token: store.userState.token,
});

const mapDispatchActions = (dispatch) =>
  bindActionCreators({ handleLogin }, dispatch);

export default connect(mapStateToProps, mapDispatchActions)(Login);
