import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import UpgradeCard from './UpgradeCard';
import './styles/components/Upgrades.scss';

const Upgrades: React.FC = () => {
  const { coins, upgrades, purchaseUpgrade } = useAppContext();
  const [activeTab, setActiveTab] = useState<'new' | 'purchased'>('new');

  const handlePurchase = (upgrade: any) => {
    purchaseUpgrade(upgrade);
  };

  const filteredUpgrades = upgrades.filter(upgrade => upgrade.type === activeTab);

  return (
    <div className="upgrades">
      <h2>Upgrades</h2>
      <div className="tabs">
        <button className={`tab ${activeTab === 'new' ? 'active' : ''}`} onClick={() => setActiveTab('new')}>
          New
        </button>
        <button className={`tab ${activeTab === 'purchased' ? 'active' : ''}`} onClick={() => setActiveTab('purchased')}>
          Purchased
        </button>
      </div>
      <div className="upgrade-list">
        {filteredUpgrades.map(upgrade => {
          const cost = Math.floor(upgrade.baseCost * Math.pow(1.7, upgrade.level));
          const coinRateIncrease = Math.floor(upgrade.additionalCoinRate * Math.pow(1.3, upgrade.level));
          return (
            <UpgradeCard
              key={upgrade.id}
              name={upgrade.name}
              image={upgrade.image}
              cost={cost}
              level={upgrade.level}
              coinRateIncrease={coinRateIncrease}
              userCoins={coins}
              onPurchase={() => handlePurchase(upgrade)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Upgrades;
