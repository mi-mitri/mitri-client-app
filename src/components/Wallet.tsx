import React from 'react';
import { useAppContext } from '../context/AppContext';
import './styles/components/Wallet.scss';

const Wallet: React.FC = () => {
  const { coins } = useAppContext();

  return (
    <div className="wallet">
      <h2>Wallet</h2>
      <div className="wallet-info">
        <p>Current Coins: {Math.floor(coins)}</p>
        <div className="wallet-buttons">
          <button>Exchange to Mitri Coin</button>
          <button>Connect TON Wallet</button>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
