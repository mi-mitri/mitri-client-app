import React from 'react';
import { useAppContext } from '../context/AppContext';
import './styles/components/Header.scss';

interface HeaderProps {
  username: string;
  firstName: string;
  lastName: string;
}

const Header: React.FC<HeaderProps> = ({ username, firstName, lastName }) => {
  const { coins, coinRate } = useAppContext();

  return (
    <div className="header">
      <div className="user-info">
        <span className="username">{username}</span>
        <span className="full-name">{firstName} {lastName}</span>
      </div>
      <div className="coin-info">
        <span className="coin-count">{coins} Coins</span>
        <span className="coin-rate">{coinRate} Coins/hr</span>
      </div>
    </div>
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
