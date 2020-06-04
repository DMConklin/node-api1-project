import React, { useState } from 'react';
import { api } from '../api';

const UserCard = props => {
    const [editing, setEditing] = useState(false);
    const [user, setUser] = useState(props.user);

    const updateUser = e => {
        e.preventDefault();
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const deleteUser = e => {
        e.preventDefault();
        api(`/users/${user.id}`, 'DELETE', handleResponse);
        props.update(props.users.filter(thisUser => thisUser.id !== user.id));
    }

    const toggleEdit = e => {
        e.preventDefault();
        if (editing) {
            api(`/users/${user.id}`, 'PUT', handleResponse, user);
        }
        setEditing(!editing);
    }

    const handleResponse = data => {
        console.log(data);
    }

    return(
        <div>
            <form onSubmit={console.log(editing)}>
                {editing ? 
                <>
                <label htmlFor="name">Name:</label><br />
                <input type="text" name="name" id="name" value={user.name} onChange={updateUser}  /><br/> 
                <label htmlFor="bio">Bio:</label><br />
                <textarea name="bio" id="bio" value={user.bio} onChange={updateUser}></textarea><br />
                </>
                :
                <>
                <h2>Name: {user.name}</h2>
                <p>{user.bio}</p> 
                </>
                }
                <button onClick={toggleEdit}>{editing ? 'Save' : 'Edit'}</button><button onClick={deleteUser}>Delete</button>
            </form> 
        </div>
    )
}

export default UserCard;