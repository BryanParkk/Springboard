import React, { useState } from 'react';
import SpaceBottom from './SpaceBottom'
// import SpaceshipBattle from './SpaceshipBattle'

const SpaceMain = () => {
    const [playerHp, setPlayerHp] = useState(100);
    const [enemyHp, setEnemyHp] = useState(100);
    const playerRandomHp = Math.floor(Math.random() * 30) + 1;
    const enemyRandomHp = Math.floor(Math.random() * 30) + 1;
    
    //
    const [btnText, setBtnText] = useState("Fire!");

    //
    const handleFire = () => {
        if (playerHp > 0 && enemyHp > 0) {
            // 둘 다 살아있을 때만 공격
            setPlayerHp(prev => {
              const newHp = Math.max(prev - playerRandomHp, 0);
              if (newHp === 0 || enemyHp - enemyRandomHp <= 0) {
                setBtnText('Restart?');
              }
              return newHp;
            });
        
            setEnemyHp(prev => Math.max(prev - enemyRandomHp, 0));
          } else {
            setBtnText('Restart?');
          }
        };

    return (
        <div className="space-area">
            <div className="top">
                <h1 className="title"> Space Battle Simulator</h1>
            </div>

            <div className="mid">
                <div className="player-info">
                    <label className="label-player-name">Player Health: </label>
                    <label className="label-player-hp">{playerHp}</label>
                </div>

                <button className="btn-battle" onClick={handleFire}>{btnText}</button>

                <div className="enemy-info">
                    <label className="label-enemy-name">Enemy Health: </label>
                    <label className="label-enemy-hp">{enemyHp}</label>
                </div>
            </div>

            <div className="bottom">
                <SpaceBottom />
            </div>
        </div>
    )
}
export default SpaceMain;