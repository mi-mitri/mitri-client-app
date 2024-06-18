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
    // @ts-ignore
    const telegram = window.Telegram.WebApp;
    if (telegram && telegram.initDataUnsafe) {
      const { username, first_name, last_name, id } = telegram.initDataUnsafe.user || {};
      setUsername(username || '');
      setFirstName(first_name || '');
      setLastName(last_name || '');

      // Send user data to the server
      fetch(`http://localhost:3000/get-user-data/${id}`)
        .then(response => response.json())
        .then(data => {
          console.log('User data:', data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
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

// const App: React.FC = () => {
//   const [page, setPage] = useState('workspace');
//   const [username, setUsername] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');

//   useEffect(() => {
//     // @ts-ignore
//     const telegram = window.Telegram.WebApp;
//     if (telegram && telegram.initDataUnsafe) {
//       const { username, first_name, last_name } = telegram.initDataUnsafe.user || {};
//       setUsername(username || '');
//       setFirstName(first_name || '');
//       setLastName(last_name || '');
//     }
//   }, []);

//   return (
//     <AppProvider>
//       <div className="App">
//         <Header username={username} firstName={firstName} lastName={lastName} />
//         {page === 'workspace' && <Workspace />}
//         {page === 'upgrades' && <Upgrades />}
//         {page === 'friends' && <Friends />}
//         {page === 'wallet' && <Wallet />}
//         <Navbar setPage={setPage} />
//       </div>
//     </AppProvider>
//   );
// };

// export default App;


