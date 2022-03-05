import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCurrentUserData, logoutUser } from "../actions/actions";
import { useHistory } from "react-router-dom";
import './styles.css'

const User = (props) => {

    const history = useHistory()

    useEffect(() => {
        if (props.token.length !== 0 && props.user == null) {
            props.fetchCurrentUserData()
        }
    }, [props.token])
    
    /** Logout and redirect*/
    const redirectUser = () => {
        props.logoutUser()
        history.push('/login')
    }
    
    return (
        <section className='user_profile_container'>
            <img className='user_img' src={props.user && props.user.avatar } alt="avatar" />
            <div>
                <h3>{props.user && props.user.first_name + ' ' + props.user.last_name}</h3>
                <p>{props.user && props.user.email}</p>
                <button className='logout_btn' onClick={redirectUser}>logout</button>
            </div>
        </section>
    )
}

const mapStateToProps = (store) => ({
    token: store.userState.token,
    user: store.userState.user,
});
  
const mapDispatchActions = (dispatch) =>
    bindActionCreators({ fetchCurrentUserData, logoutUser }, dispatch);
  
export default connect(mapStateToProps, mapDispatchActions)(User);
