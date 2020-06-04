import React, { useState } from 'react';
import './App.css';
import { api } from './api';
import UserCard from './components/UserCard';

const initialUser = {
  name: '',
  bio: ''
}

const App = () => {
  const [users, setUsers] = useState([]);
  const [createdUser, setCreatedUser] = useState({initialUser})
  const [creating, setCreating] = useState(false);

  const updateUsers = data => {
    setUsers(data);
  }

  const logCreatedUser = user => {
    console.log(user);
  }

  const toggleCreating = e => {
    e.preventDefault();
    if (creating) { 
      api('/users', 'POST', logCreatedUser, createdUser);
      updateUsers([
        ...users,
        createdUser
      ])
    }
    setCreating(!creating);
  }

  const handleCreation = e => {
    e.preventDefault();
    setCreatedUser({
      ...createdUser,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="App">
      <button onClick={() => api('/users', 'GET', updateUsers)}>Get Users</button><button onClick={toggleCreating}>Create User</button>
      {creating ?
        <form>
          <label htmlFor="name">Name:</label><br />
          <input type="text" name="name" id="name" value={createdUser.name} onChange={handleCreation} /><br />
          <label htmlFor="bio">Bio:</label><br />
          <textarea name="bio" id="bio" value={createdUser.bio} onChange={handleCreation} />
        </form>
        :
        null
      }
      <div>
        <h2>Users</h2>
        {users.map(user => {
          return <UserCard user={user} key={user.id} update={updateUsers} users={users} />
        })}
      </div>
    </div>
  );
}

export default App;
