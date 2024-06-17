import React from 'react';
import './styles/components/Friends.scss';

const Friends: React.FC = () => {
  return (
    <div className="friends">
      <h2>Friends</h2>
      <div className="friend-list">
        <div className="friend-item">Friend 1</div>
        <div className="friend-item">Friend 2</div>
        <div className="friend-item">Friend 3</div>
      </div>
    </div>
  );
};

export default Friends;

