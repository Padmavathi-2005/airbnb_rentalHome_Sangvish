import React from 'react';
import { UserItem } from './UserItem';

export const UserList = ({ 
  users, 
  activeUserId, 
  onUserSelect, 
  searchTerm 
}) => {
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      {filteredUsers.map(user => (
        <UserItem
          key={user.id}
          user={user}
          isActive={user.id === activeUserId}
          onClick={() => onUserSelect(user.id)}
        />
      ))}
    </div>
  );
};