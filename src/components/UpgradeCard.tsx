import React from 'react';
import './styles/components/UpgradeCard.scss';

interface UpgradeCardProps {
  name: string;
  image: string;
  cost: number;
  level: number;
  coinRateIncrease: number;
  userCoins: number;
  onPurchase: () => void;
}

const UpgradeCard: React.FC<UpgradeCardProps> = ({ name, image, cost, level, coinRateIncrease, userCoins, onPurchase }) => {
  const buttonText = level === 0 ? 'Purchase' : 'Upgrade';
  const isDisabled = userCoins < cost;

  return (
    <div className="upgrade-card">
      <img src={image} alt={name} className="upgrade-image" />
      <h3 className="upgrade-name">{name}</h3>
      <p className="upgrade-cost">Cost: {Math.floor(cost)} coins</p>
      <p className="upgrade-coin-rate">+{Math.floor(coinRateIncrease)} coins per hour</p>
      <p className="upgrade-level">Level: {level}</p>
      <button className={`upgrade-button ${isDisabled ? 'disabled' : ''}`} onClick={onPurchase} disabled={isDisabled}>
        {buttonText}
      </button>
    </div>
  );
};

export default UpgradeCard;


