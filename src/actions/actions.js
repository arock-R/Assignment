/** API Header*/

const headers = new Headers();
headers.append("Content-Type", "application/json");
       
/** User Login*/

export const handleLogin = (cred) => {
    return (dipatch => {
        const obj = JSON.stringify(cred)

        const postOptions = {
            method: 'POST',
            headers: headers,
            redirect: 'follow',
            body: obj
        };
        
        fetch('https://reqres.in/api/login', postOptions)
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    alert('something went wrong!!')
                }
            })
            .then((data) => {
                console.log(data)
                dipatch({
                    type: 'LOGIN_USER',
                    token: typeof(data.token) !== 'undefined' ? data.token : ''
                })
            })
        .catch( err=> console.log(err))
    })
}

/** User registration*/

export const handleRegister = (cred) => {
    return (dipatch => {

        const obj = JSON.stringify(cred)

        const postOptions = {
            method: 'POST',
            headers: headers,
            redirect: 'follow',
            body: obj
        };
        
        fetch('https://reqres.in/api/register', postOptions)
        .then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                alert('something went wrong!!')
            }
        })
        .then((data) => {
            console.log(data)
            dipatch({
                type: 'LOGIN_USER',
                token: typeof(data.token) !== 'undefined' ? data.token : ''
            })
        })
        .catch( err=> console.log(err))
    })
}

/** Get all profiles*/

export const fetchAllProfiles = () => {
    return (dipatch => {
        fetch('https://reqres.in/api/users?page=1').then(response => {
            return response.json()
        }).then( data => {
            dipatch({
                type: 'GET_PROFILES',
                profiles: data.data
            })
        })
        .catch( err=> console.log(err))
    })
}

/** Get current user data*/

export const fetchCurrentUserData = () => {
    return (dipatch => {
        fetch('https://reqres.in/api/users/4').then(response => {
            return response.json()
        }).then(data => {
            console.log(data.data)
            dipatch({
                type: 'FETCH_USER',
                user: data.data
            })
        })
        .catch( err=> console.log(err))
    })
}


/** Get current user data*/

export const logoutUser = () => {
    return (dipatch => {
        dipatch({
            type: 'LOGOUT_USER',
            token: ''
        })
    })
}

