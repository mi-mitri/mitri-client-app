import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface Upgrade {
  id: number;
  name: string;
  image: string;
  baseCost: number;
  level: number;
  type: 'new' | 'purchased';
  additionalCoinRate: number;
}

interface AppContextProps {
  user: any;
  coins: number;
  coinRate: number;
  energy: number;
  maxEnergy: number;
  upgrades: Upgrade[];
  addCoins: (amount: number) => void;
  decreaseEnergy: (amount: number) => void;
  setCoinRate: (rate: number) => void;
  increaseMaxEnergy: (amount: number) => void;
  purchaseUpgrade: (upgrade: Upgrade) => void;
  saveProgress: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [coins, setCoins] = useState<number>(0);
  const [coinRate, setCoinRate] = useState<number>(3600); // Example rate
  const [energy, setEnergy] = useState<number>(1000);
  const [maxEnergy, setMaxEnergy] = useState<number>(1000);
  const [upgrades, setUpgrades] = useState<Upgrade[]>([
    {
      id: 1,
      name: 'Upgrade Coin Rate',
      image: 'https://via.placeholder.com/150',
      baseCost: 100,
      level: 0,
      type: 'new',
      additionalCoinRate: 100 * 0.22 // 22 coins per hour
    }
  ]);

  const saveProgress = useCallback(() => {
    if (user) {
      const ws = new WebSocket('ws://83.166.232.161:3001');
      
      ws.onopen = () => {
        ws.send(JSON.stringify({
          type: 'save-progress',
          payload: {
            userId: user.telegram_id,
            coins,
            coinRate,
            energy,
            maxEnergy,
          }
        }));
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === 'success') {
          console.log('Progress saved successfully');
        } else if (message.type === 'error') {
          console.error('Error saving progress:', message.payload);
        }
        ws.close();
      };
    }
  }, [user, coins, coinRate, energy, maxEnergy]);

  useEffect(() => {
    const ws = new WebSocket('ws://83.166.232.161:3001');
    
    ws.onopen = () => {
      console.log('Connected to server');
      const initData = window.Telegram.WebApp.initDataUnsafe;
      ws.send(JSON.stringify({ type: 'get-user-data', payload: { userId: initData.user.id } }));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'user-data') {
        const userData = message.payload;
        setUser(userData);
        setCoins(userData.coins);
        setCoinRate(userData.coin_rate);
        setEnergy(userData.energy);
        setMaxEnergy(userData.max_energy);
        setUpgrades(userData.upgrades || upgrades);
      }
    };

    window.addEventListener('beforeunload', saveProgress);
    return () => {
      saveProgress();
      ws.close();
      window.removeEventListener('beforeunload', saveProgress);
    };
  }, [saveProgress, upgrades]);

  useEffect(() => {
    const coinInterval = setInterval(() => {
      setCoins(prev => prev + Math.floor(coinRate / 3600));
    }, 1000);

    return () => clearInterval(coinInterval);
  }, [coinRate]);

  useEffect(() => {
    const energyInterval = setInterval(() => {
      setEnergy(prev => Math.min(prev + maxEnergy / 1800, maxEnergy));
    }, 1000);

    return () => clearInterval(energyInterval);
  }, [maxEnergy]);

  const addCoins = (amount: number) => {
    setCoins(prev => prev + amount);
  };

  const decreaseEnergy = (amount: number) => {
    setEnergy(prev => Math.max(prev - amount, 0));
  };

  const increaseMaxEnergy = (amount: number) => {
    setMaxEnergy(prev => prev + amount);
  };

  const purchaseUpgrade = (upgrade: Upgrade) => {
    const cost = Math.floor(upgrade.baseCost * Math.pow(1.7, upgrade.level));
    if (coins >= cost) {
      setCoins(prev => prev - cost);
      const newLevel = upgrade.level + 1;
      const additionalCoinRate = Math.floor(upgrade.additionalCoinRate * Math.pow(1.3, upgrade.level));
      const newCoinRate = coinRate + additionalCoinRate;
      setCoinRate(newCoinRate);

      setUpgrades(prev => 
        prev.map(u => 
          u.id === upgrade.id 
            ? { ...u, level: newLevel, type: 'purchased', additionalCoinRate } 
            : u
        )
      );
    }
  };

  return (
    <AppContext.Provider value={{ user, coins, coinRate, energy, maxEnergy, upgrades, addCoins, decreaseEnergy, setCoinRate, increaseMaxEnergy, purchaseUpgrade, saveProgress }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};


// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// interface Upgrade {
//   id: number;
//   name: string;
//   image: string;
//   baseCost: number;
//   level: number;
//   type: 'new' | 'purchased';
//   additionalCoinRate: number;
// }

// interface AppContextProps {
//   coins: number;
//   coinRate: number;
//   energy: number;
//   maxEnergy: number;
//   upgrades: Upgrade[];
//   addCoins: (amount: number) => void;
//   decreaseEnergy: (amount: number) => void;
//   setCoinRate: (rate: number) => void;
//   increaseMaxEnergy: (amount: number) => void;
//   purchaseUpgrade: (upgrade: Upgrade) => void;
// }

// const AppContext = createContext<AppContextProps | undefined>(undefined);

// export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [coins, setCoins] = useState<number>(0);
//   const [coinRate, setCoinRate] = useState<number>(3600); // Example rate
//   const [energy, setEnergy] = useState<number>(1000);
//   const [maxEnergy, setMaxEnergy] = useState<number>(1000);
//   const [upgrades, setUpgrades] = useState<Upgrade[]>([
//     {
//       id: 1,
//       name: 'Upgrade Coin Rate',
//       image: 'https://via.placeholder.com/150',
//       baseCost: 100,
//       level: 0,
//       type: 'new',
//       additionalCoinRate: 100 * 0.22 // 22 coins per hour
//     }
//   ]);

//   useEffect(() => {
//     const coinInterval = setInterval(() => {
//       setCoins(prev => prev + Math.floor(coinRate / 3600));
//     }, 1000);

//     return () => clearInterval(coinInterval);
//   }, [coinRate]);

//   useEffect(() => {
//     const energyInterval = setInterval(() => {
//       setEnergy(prev => Math.min(prev + maxEnergy / 1800, maxEnergy));
//     }, 1000);

//     return () => clearInterval(energyInterval);
//   }, [maxEnergy]);

//   const addCoins = (amount: number) => {
//     setCoins(prev => prev + amount);
//   };

//   const decreaseEnergy = (amount: number) => {
//     setEnergy(prev => Math.max(prev - amount, 0));
//   };

//   const increaseMaxEnergy = (amount: number) => {
//     setMaxEnergy(prev => prev + amount);
//   };

//   const purchaseUpgrade = (upgrade: Upgrade) => {
//     const cost = Math.floor(upgrade.baseCost * Math.pow(1.7, upgrade.level));
//     if (coins >= cost) {
//       setCoins(prev => prev - cost);
//       const newLevel = upgrade.level + 1;
//       const additionalCoinRate = Math.floor(upgrade.additionalCoinRate * Math.pow(1.3, upgrade.level));
//       const newCoinRate = coinRate + additionalCoinRate;
//       setCoinRate(newCoinRate);

//       setUpgrades(prev => 
//         prev.map(u => 
//           u.id === upgrade.id 
//             ? { ...u, level: newLevel, type: 'purchased', additionalCoinRate } 
//             : u
//         )
//       );
//     }
//   };

//   return (
//     <AppContext.Provider value={{ coins, coinRate, energy, maxEnergy, upgrades, addCoins, decreaseEnergy, setCoinRate, increaseMaxEnergy, purchaseUpgrade }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error('useAppContext must be used within an AppProvider');
//   }
//   return context;
// };
