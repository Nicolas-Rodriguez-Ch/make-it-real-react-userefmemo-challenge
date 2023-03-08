import React, { useState, useMemo, useRef } from "react";
import { User } from "./User";

export const UserList = ({ users }) => {
  const userCacheRef = useRef({});
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  const selectedUser = useMemo(() => {
    if (!selectedUserId) {
      return null;
    }
  
    if (userCacheRef.current[selectedUserId]) {
      return userCacheRef.current[selectedUserId];
    }
  
    fetch(`https://jsonplaceholder.typicode.com/users/${selectedUserId}`)
      .then((response) => response.json())
      .then((data) => {
        userCacheRef.current[selectedUserId] = data;
        return data;
      });
  }, [selectedUserId]);


  return (
    <div>
      <h1>Lista de usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => handleUserClick(user.id)}>
            {user.name}
          </li>
        ))}
      </ul>
      {selectedUser ? <User user={selectedUser} /> : null}
    </div>
  );
};