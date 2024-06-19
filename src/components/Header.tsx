import React from 'react';
import { useAppContext } from '../context/AppContext';

const Header: React.FC = () => {
  const { user, coins, coinRate } = useAppContext();

  return (
    <header>
      {user && <div>Welcome, {user.username}!</div>}
      <div>Coins: {coins}</div>
      <div>Coin Rate: {coinRate} per hour</div>
    </header>
  );
};

export default Header;



// import React from 'react';
// import { useAppContext } from '../context/AppContext';
// import './styles/components/Header.scss';

// const Header: React.FC = () => {
//   const { coins, coinRate } = useAppContext();

//   return (
//     <header className="header">
//       <div className="coin-info">
//         <span>Coins: {Math.floor(coins)}</span>
//         <span>Coins per hour: {coinRate}</span>
//       </div>
//     </header>
//   );
// };

// export default Header;
