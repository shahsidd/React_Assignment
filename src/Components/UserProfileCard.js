import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import '../Styles/ProfileCard.css';

function UserProfileCard({ userDetails }) {
    const [allUserList, setallUserList] = useState([])
    const [selectedUser, setSelectedUser] = useState()

    useEffect(() => {
        if (userDetails) {
            setallUserList([...allUserList, userDetails])
        }
        else
            setallUserList([])
    }, [userDetails])

    useEffect(() => {
        localStorage.setItem('AllUsers', JSON.stringify(allUserList))
    }, [allUserList])

    return (
        <div className='mainCardWrapper'>
            {allUserList && allUserList.length > 0 ?
                <>
                    <div className='leftSide'>
                        {allUserList.map((user, index) => (
                            <RenderCard user={user} index={index} />
                        ))}
                    </div>
                    <div className='rightSide'>
                        <h1>User Details</h1>
                        {selectedUser ?
                            <div>
                                <p>Name - {Object.values(selectedUser.name).join(' ')}</p>
                                <p>Email - {selectedUser.email}</p>
                                <p>Gender - {selectedUser.gender}</p>
                                <p>Phone No. - {selectedUser.phone}</p>
                            </div>
                            : <h1>Please select any user</h1>}
                    </div>
                </>
                : <h1>No Users found</h1>}
        </div>
    );

    function RenderCard({ user, index }) {
        return (
            <Card sx={{ maxWidth: 345 }} key={index} onClick={() => openUserDetails(user)} className='eachCard'>
                <CardContent className='userCardContent'>
                    <Typography className="userName">
                        {Object.values(user.name).join(' ')}
                    </Typography>
                    <Typography className="userEmail">
                        {user.email}
                    </Typography>
                </CardContent>
                <div className='parentDivUserImg'>
                    <CardMedia
                        component="img"
                        image={user.picture.medium}
                        alt={`${user.name.first} ${user.name.last}`}
                        className='userImg'
                    />
                </div>
            </Card>
        )
    }

    function openUserDetails(userObjData) {
        setSelectedUser(userObjData)
    }
}


export default UserProfileCard;
