import React from 'react';
import './styles/components/Navbar.scss';

interface NavbarProps {
  setPage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setPage }) => {
  return (
    <div className="navbar">
      <button onClick={() => setPage('workspace')}>Workspace</button>
      <button onClick={() => setPage('upgrades')}>Upgrades</button>
      <button onClick={() => setPage('friends')}>Friends</button>
      <button onClick={() => setPage('wallet')}>Wallet</button>
    </div>
  );
};

export default Navbar;
