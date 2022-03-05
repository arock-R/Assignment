import React, { useEffect, useRef, useState } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './styles.css'
import { handleRegister } from "../actions/actions";
import { useHistory } from "react-router-dom";

const Register = (props) => {
  
  /** password input element ref */
  const history = useHistory();

  /** Component states*/
  const passInputRef = useRef();
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
    /** Checking token */
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

  /** Validating form and executing register action*/
  const handleForm = () => {
    
    if (inputValue.email.length == 0) {
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
      props.handleRegister(inputValue)
    }
    console.log("form handled", inputValue, errorText);

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
          <button className="submit_button" onClick={handleForm} type="button">Register</button>
        </div>
      </form>
    </section>
  );
};


const mapStateToProps = (store) => ({
  token: store.userState.token,
});

const mapDispatchActions = (dispatch) =>
  bindActionCreators({ handleRegister }, dispatch);

export default connect(mapStateToProps, mapDispatchActions)(Register);
