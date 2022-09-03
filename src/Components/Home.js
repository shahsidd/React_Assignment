import React, { useState } from 'react';
import axios from 'axios';
import { randomUserApiUrl } from '../Configuration/Config'
import { Button } from '@mui/material';
import UserProfileCard from './UserProfileCard'
import '../Styles/Home.css';
import AddIcon from '@mui/icons-material/Add';

function Home() {
    const [userDetails, setUserDetails] = useState(null);

    const getNewUser = async () => {
        let randomUserDetails = await axios.get(randomUserApiUrl);
        setUserDetails(randomUserDetails.data.results[0]);
    }

    const deleteAllUsers = () => {
        setUserDetails(null);
    }

    return (
        <div className='mainDiv'>
            <div className='btnGrp'>
                <Button variant="contained" color="success" onClick={getNewUser}><AddIcon />Fetch New User</Button>
                <Button variant="contained" color="error" onClick={deleteAllUsers}>Delete All Users</Button>
            </div>
            <UserProfileCard userDetails={userDetails} />
        </div>
    )
}

export default Home;