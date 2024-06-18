import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Workspace from './components/Workspace';
import Upgrades from './components/Upgrades';
import Friends from './components/Friends';
import Wallet from './components/Wallet';
import { AppProvider } from './context/AppContext';
import './components/styles/App.scss';

const App: React.FC = () => {
  const [page, setPage] = useState('workspace');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const telegram = (window as any).Telegram.WebApp;
    if (telegram && telegram.initDataUnsafe) {
      const { username, first_name, last_name } = telegram.initDataUnsafe.user || {};
      setUsername(username || '');
      setFirstName(first_name || '');
      setLastName(last_name || '');
    }
  }, []);

  return (
    <AppProvider>
      <div className="App">
        <Header username={username} firstName={firstName} lastName={lastName} />
        {page === 'workspace' && <Workspace />}
        {page === 'upgrades' && <Upgrades />}
        {page === 'friends' && <Friends />}
        {page === 'wallet' && <Wallet />}
        <Navbar setPage={setPage} />
      </div>
    </AppProvider>
  );
};

export default App;



// import React, { useState } from 'react';
// import Navbar from './components/Navbar';
// import Header from './components/Header';
// import Workspace from './components/Workspace';
// import Upgrades from './components/Upgrades';
// import Friends from './components/Friends';
// import Wallet from './components/Wallet';
// import './components/styles/App.scss';

// const App: React.FC = () => {
//   const [page, setPage] = useState<string>('workspace');

//   const renderPage = () => {
//     switch (page) {
//       case 'workspace':
//         return <Workspace />;
//       case 'upgrades':
//         return <Upgrades />;
//       case 'friends':
//         return <Friends />;
//       case 'wallet':
//         return <Wallet />;
//       default:
//         return <Workspace />;
//     }
//   };

//   return (
//     <div className="app">
//       <Header />
//       <div className="content">
//         {renderPage()}
//       </div>
//       <Navbar setPage={setPage} />
//     </div>
//   );
// };

// export default App;
