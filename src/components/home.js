import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './styles.css'
import { fetchAllProfiles } from "../actions/actions";
import { Profile } from './Profile'

const HomeComponent = (props) => {

    useEffect(() => {
        /** Checking token*/
        if (props.token.length !== 0 && props.profiles.length == 0) {
            props.fetchAllProfiles()
        }
    }, [props.token])
    

  return (
    <section>
          <div className='profiles_container'>
            { props.profiles.map(profile => <Profile profile={ profile }/>) }
          </div>
    </section>
  )
}

const mapStateToProps = (store) => ({
    profiles: store.profilesState.profiles,
    token: store.userState.token,
  });
  
const mapDispatchActions = (dispatch) =>
    bindActionCreators({ fetchAllProfiles }, dispatch);
  
export default connect(mapStateToProps, mapDispatchActions)(HomeComponent);
