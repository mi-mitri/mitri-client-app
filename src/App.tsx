import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Workspace from './components/Workspace';
import Upgrades from './components/Upgrades';
import Friends from './components/Friends';
import Wallet from './components/Wallet';
import './components/styles/App.scss';

const App: React.FC = () => {
  const [page, setPage] = useState<string>('workspace');

  const renderPage = () => {
    switch (page) {
      case 'workspace':
        return <Workspace />;
      case 'upgrades':
        return <Upgrades />;
      case 'friends':
        return <Friends />;
      case 'wallet':
        return <Wallet />;
      default:
        return <Workspace />;
    }
  };

  return (
    <div className="app">
      <Header />
      <div className="content">
        {renderPage()}
      </div>
      <Navbar setPage={setPage} />
    </div>
  );
};

export default App;
