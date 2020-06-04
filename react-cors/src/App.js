import React, { useState } from 'react';
import './App.css';
import { api } from './api';
import UserCard from './components/UserCard';

const App = () => {
  const [users, setUsers] = useState([]);

  const updateUsers = data => {
    setUsers(data);
  }

  return (
    <div className="App">
      <button onClick={() => api('/users', 'GET', updateUsers)}>Get Users</button>
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
