import React from 'react';
import { useAppContext } from '../context/AppContext';
import './styles/components/Header.scss';

const Header: React.FC = () => {
  const { coins, coinRate } = useAppContext();

  return (
    <div className="header">
      <span>Пользователь:</span>
      <span>Coins: <strong>{Math.floor(coins)}</strong></span>
      <span>Coins per hour: <strong>{Math.floor(coinRate)}</strong></span>
    </div>
  );
};

export default Header;

