import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

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

    useEffect(() => {
        const initData = window.Telegram.WebApp.initDataUnsafe;
        axios.post('http://83.166.232.161:3001/get-user-data', { userId: initData.user.id })
            .then(response => {
                const userData = response.data;
                setUser(userData);
                setCoins(userData.coins);
                setCoinRate(userData.coin_rate);
                setEnergy(userData.energy);
                setMaxEnergy(userData.max_energy);
                setUpgrades(userData.upgrades || upgrades);
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

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

    const saveProgress = () => {
        if (user) {
            axios.post('http://83.166.232.161:3001/save-progress', {
                userId: user.id,
                coins,
                coinRate,
                energy,
                maxEnergy,
                upgrades
            })
                .then(() => console.log('Progress saved successfully'))
                .catch(error => console.error('Error saving progress:', error));
        }
    };

    useEffect(() => {
        window.addEventListener('beforeunload', saveProgress);
        return () => {
            saveProgress();
            window.removeEventListener('beforeunload', saveProgress);
        };
    }, [coins, coinRate, energy, maxEnergy, upgrades]);

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
