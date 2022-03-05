import React from 'react'

export const Profile = ({profile}) => {
  return (
    <div className='profile_container'>
        <h5>{profile.first_name}</h5>
        <p>{profile.email}</p>
        <img src={profile.avatar} alt="" />
    </div>
  )
}
