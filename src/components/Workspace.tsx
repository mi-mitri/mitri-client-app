import React, { useState } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import { useAppContext } from '../context/AppContext';
import './styles/components/Workspace.scss';

const Workspace: React.FC = () => {
  const { energy, maxEnergy, addCoins, decreaseEnergy } = useAppContext();
  const [image] = useImage('https://github.com/mi-mitri/mitri_coin/blob/main/256_mitri.png?raw=true');
  const [imageX, setImageX] = useState<number>(100);
  const [imageY, setImageY] = useState<number>(100);

  const handleImageDragEnd = (e: any) => {
    setImageX(e.target.x());
    setImageY(e.target.y());
  };

  const handleWorkspaceClick = () => {
    if (energy >= 10) {
      addCoins(10);
      decreaseEnergy(10);
    }
  };

  return (
    <div className="workspace">
      <div className="energy-bar">
        <div className="energy-fill" style={{ width: `${(energy / maxEnergy) * 100}%` }}></div>
      </div>
      <div className="energy-text">
        Доступные киловаты: {Math.floor(energy)}/{maxEnergy}
      </div>
      <div className="work-area" onClick={handleWorkspaceClick}>
        <Stage width={window.innerWidth - 40} height={window.innerHeight - 120}>
          <Layer>
            <Image
              image={image}
              x={imageX}
              y={imageY}
              draggable={true}
              onDragEnd={handleImageDragEnd}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Workspace;
