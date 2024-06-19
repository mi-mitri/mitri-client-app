import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Workspace from './components/Workspace';
import Wallet from './components/Wallet';
import Upgrades from './components/Upgrades';
import { AppProvider } from './context/AppContext';

const App: React.FC = () => {
  const [page, setPage] = useState('workspace'); // Добавьте состояние для отслеживания текущей страницы

  return (
    <AppProvider>
      <div className="app">
        <Header />
        <Navbar setPage={setPage} />
        {page === 'workspace' && <Workspace />}
        {page === 'wallet' && <Wallet />}
        {page === 'upgrades' && <Upgrades />}
      </div>
    </AppProvider>
  );
};

export default App;
